"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button, Input, GlassCard } from "@/shared/ui";
import { useToast } from "@/shared/ui/use-toast";
import { buildSystemPrompt } from "./lib/buildSystemPrompt";
import type { Message, ErrorResponse, ChatOK } from "@/shared/types";

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi! I'm Marty - Martin's AI assistant. Ask me anything about his background, experience, or projects!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hitTimes, setHitTimes] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  // Prevent background scroll when reaching top/bottom of chat
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  const withinRate = () => {
    const now = Date.now();
    const windowMs = 60_000;
    const newHits = hitTimes.filter((t) => now - t < windowMs);
    if (newHits.length >= 5) return false;
    setHitTimes([...newHits, now]);
    return true;
  };

  const isChatOK = (body: unknown): body is ChatOK =>
    !!body && typeof body === "object" && "choices" in body;

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
        title: "Rate limit exceeded",
        description: "Please wait a moment before sending another message.",
        variant: "destructive",
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
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = await buildSystemPrompt();
      const chatMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.isUser ? "user" : "assistant",
          content: m.content,
        })),
        { role: "user", content: input },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages, maxTokens: 256 }),
      });

      const data = await safeJson(res);

      if (!res.ok || !isChatOK(data)) {
        const err = (data as ErrorResponse)?.error?.message ?? "Unknown error";
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
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Failed to get response. Please try again.";
      toast({ title: "Error", description, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="glow-primary size-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
          aria-label="Open AI Chat"
        >
          {isOpen ? (
            <X className="size-6" />
          ) : (
            <MessageCircle className="size-6" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 h-[32rem] w-[26rem] animate-scale-in">
          <GlassCard className="flex h-full flex-col border-surface-border">
            <div className="border-b border-surface-border p-4">
              <h3 className="font-semibold">Chat with Marty</h3>
              <p className="text-xs text-muted-foreground">
                Ask about experience, projects &amp; more
              </p>
            </div>

            <div
              ref={chatScrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      m.isUser
                        ? "bg-primary text-white"
                        : "border border-surface-border bg-surface"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-surface-border bg-surface p-3 text-sm">
                    <div className="flex space-x-1">
                      <div className="size-2 animate-pulse rounded-full bg-muted-foreground" />
                      <div
                        className="size-2 animate-pulse rounded-full bg-muted-foreground"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="size-2 animate-pulse rounded-full bg-muted-foreground"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-surface-border p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Martin…"
                  className="flex-1 border-surface-border bg-surface"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Note: AI responses may not always be accurate. For verified
                info, please refer to my{" "}
                <a
                  href="https://www.linkedin.com/in/martinnolan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
                , Resume, or{" "}
                <a
                  href="mailto:martinnolan_1@hotmail.co.uk"
                  className="underline"
                >
                  contact me
                </a>{" "}
                directly.
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};
