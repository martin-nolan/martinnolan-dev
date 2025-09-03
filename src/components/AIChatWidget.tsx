import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { useChatWidget } from '@/hooks/useChatWidget';
import { cmsClient } from '@/lib/cms';
import { silentWarn, silentError } from '@/lib/logger';
import type { Message, ErrorResponse, ChatOK } from '@/types';
import { Button, Input, GlassCard } from '@/ui';
import { useToast } from '@/ui/use-toast';

const AIChatWidget: React.FC = () => {
  const { isOpen, toggleModal } = useChatWidget();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content:
        "Hi! I'm Marty - Martin's AI assistant. Ask me anything about his background, experience, or projects!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hitTimes, setHitTimes] = useState<number[]>([]);
  const [cvText, setCvText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollToBottom, [messages]);

  // Improved scroll behavior: prevent background scroll when interacting with chat
  useEffect(() => {
    if (!isOpen) return;

    const el = chatScrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Always prevent background scroll when scrolling within the chat area
      // This provides better scroll isolation and prevents accidental background scrolling
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;

      // If chat content doesn't need scrolling, we still prevent background scroll
      // to avoid confusion when users interact with the chat area
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const atTop = scrollTop <= 1;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Prevent default scroll behavior when at boundaries to avoid double-scrolling
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  // Improved mobile touch scroll behavior: prevent background scroll when interacting with chat
  useEffect(() => {
    if (!isOpen) return;

    const el = chatScrollRef.current;
    if (!el) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Always prevent background scroll when touching within the chat area
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;

      // If chat content doesn't need scrolling, prevent background scroll
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const atTop = scrollTop <= 1;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Prevent default behavior when at boundaries to avoid double-scrolling
      if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  // Handle mobile viewport changes (keyboard appearance)
  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => {
      // Force a small delay to ensure proper viewport calculation after keyboard appears
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    // Listen for viewport changes on mobile devices
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [isOpen]);

  // Fetch and extract CV text when component mounts
  useEffect(() => {
    const fetchCvText = async () => {
      try {
        if (!cmsClient) {
          silentWarn('CMS client not available - Strapi not configured');
          return;
        }
        const profile = await cmsClient.getProfile();
        if (profile.cvPdf) {
          const res = await fetch('/api/extract-pdf-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfUrl: profile.cvPdf }),
          });
          if (res.ok) {
            const { text } = await res.json();
            setCvText(text);
          } else {
            silentWarn('Failed to fetch CV text', { status: res.status });
          }
        }
      } catch (error) {
        silentError('Error fetching CV', {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };
    fetchCvText();
  }, []);

  const withinRate = () => {
    const now = Date.now();
    const windowMs = 60_000;
    const newHits = hitTimes.filter((t) => now - t < windowMs);
    if (newHits.length >= 5) return false;
    setHitTimes([...newHits, now]);
    return true;
  };

  const isChatOK = (body: unknown): body is ChatOK =>
    !!body && typeof body === 'object' && 'choices' in body;

  const safeJson = async (r: Response) => {
    try {
      return await r.json();
    } catch {
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!withinRate()) {
      toast({
        title: 'Rate limit exceeded',
        description: 'Please wait a moment before sending another message.',
        variant: 'destructive',
      });
      return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // System prompt is now built server-side in the API route
      const chatMessages = [
        ...messages.map((m) => ({
          role: m.isUser ? 'user' : 'assistant',
          content: m.content,
        })),
        { role: 'user', content: input },
      ];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages, maxTokens: 256, cvText }),
      });

      const data = await safeJson(res);

      if (!res.ok || !isChatOK(data)) {
        const err = (data as ErrorResponse)?.error?.message ?? 'Unknown error';
        throw new Error(err);
      }

      const reply = (data as ChatOK).choices[0].message.content;
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        content: reply,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const description =
        typeof err === 'object' && err && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Failed to get response. Please try again.';
      toast({ title: 'Error', description, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 max-sm:bottom-12 max-sm:right-4">
        <Button
          onClick={toggleModal}
          size="icon"
          className="glow-primary size-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 max-sm:size-12 [&_svg]:size-8 max-sm:[&_svg]:size-6"
          aria-label="Open AI Chat"
        >
          {isOpen ? <X /> : <MessageCircle />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 h-[32rem] w-[26rem] animate-scale-in max-md:h-[28rem] max-md:w-[22rem] max-sm:inset-x-4 max-sm:bottom-24 max-sm:top-16 max-sm:size-auto">
          <GlassCard className="flex h-full flex-col border-surface-border">
            <div className="border-b border-surface-border p-4 max-sm:p-3">
              <h3 className="font-semibold max-sm:text-base">Chat with Marty</h3>
              <p className="text-xs text-muted-foreground max-sm:text-xs">
                Ask about experience, projects &amp; more
              </p>
            </div>

            <div
              ref={chatScrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4 max-sm:space-y-2 max-sm:p-3"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm max-sm:max-w-[85%] max-sm:p-2 max-sm:text-sm ${
                      m.isUser ? 'bg-primary text-white' : 'border border-surface-border bg-surface'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-surface-border bg-surface p-3 text-sm max-sm:p-2">
                    <div className="flex space-x-1">
                      <div className="size-2 animate-pulse rounded-full bg-muted-foreground" />
                      <div
                        className="size-2 animate-pulse rounded-full bg-muted-foreground"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <div
                        className="size-2 animate-pulse rounded-full bg-muted-foreground"
                        style={{ animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-surface-border p-4 max-sm:p-3">
              <div className="flex space-x-2 max-sm:space-x-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Martin…"
                  className="flex-1 border-surface-border bg-surface max-sm:text-base"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="px-3 max-sm:min-h-[44px] max-sm:min-w-[44px] max-sm:px-2"
                >
                  <Send className="size-4 max-sm:size-5" />
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground max-sm:text-[10px] max-sm:leading-tight">
                Note: AI responses may not always be accurate. For verified info, please refer to my{' '}
                <a
                  href="https://www.linkedin.com/in/martinnolan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline max-sm:touch-manipulation"
                >
                  LinkedIn
                </a>
                , Resume, or{' '}
                <a
                  href="mailto:martinnolan_1@hotmail.co.uk"
                  className="underline max-sm:touch-manipulation"
                >
                  contact me
                </a>{' '}
                directly.
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
