import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm Martin's AI assistant. Ask me anything about his background, experience, or projects!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Rate limiting: max 5 requests per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    if (requestCount >= 5) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait a moment before sending another message.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setRequestCount(prev => prev + 1);

    try {
      // Simulate AI response - replace with actual Gemini/OpenAI API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getContextualResponse(input),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getContextualResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("experience") || input.includes("work")) {
      return "Martin is an Associate Gen AI Software Engineer at Sky, where he builds AI-powered solutions like cricket commentary generation and knowledge search platforms. He has experience with Python, TypeScript, OpenAI APIs, and Google Cloud.";
    }
    
    if (input.includes("education") || input.includes("degree")) {
      return "Martin studied at the University of Glasgow, where he developed strong foundations in computer science and software engineering.";
    }
    
    if (input.includes("project") || input.includes("build")) {
      return "Martin has worked on several exciting projects including Cricket Command Centre (AI commentary), Knowledge Search Platform (semantic search), and personal projects like inTENt-Fitness (Alexa skill) and blockchain marketplaces.";
    }
    
    if (input.includes("skill") || input.includes("technology")) {
      return "Martin's technical expertise includes Python, TypeScript, React, Next.js, OpenAI, Google Cloud, Vector Search, AWS Lambda, and more. He specializes in AI/ML solutions and full-stack development.";
    }
    
    if (input.includes("contact") || input.includes("reach")) {
      return "You can reach Martin at martinnolan_1@live.co.uk, connect on LinkedIn at linkedin.com/in/martinnolan0110, or check out his GitHub at github.com/martin-nolan.";
    }
    
    return "I'd be happy to help you learn more about Martin! You can ask about his work experience, projects, skills, education, or how to get in touch with him.";
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg glow-primary"
          aria-label="Open AI Chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 animate-scale-in">
          <GlassCard className="h-full flex flex-col border-surface-border">
            {/* Header */}
            <div className="p-4 border-b border-surface-border">
              <h3 className="font-semibold">Chat with Martin's AI</h3>
              <p className="text-xs text-muted-foreground">Ask about experience, projects & more</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? "bg-primary text-white"
                        : "bg-surface border border-surface-border"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-surface-border p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-surface-border">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Martin..."
                  className="flex-1 bg-surface border-surface-border"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};