import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { SampleQuestions } from "@/components/SampleQuestions";
import { Loader2, Sprout } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (question: string) => {
    const userMessage: Message = { role: "user", content: question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('agriculture-qa', {
        body: {
          question,
          conversationHistory: messages
        }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center gap-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Project Samarth</h1>
            <p className="text-xs text-muted-foreground">
              Intelligent Q&A over India's Agricultural & Climate Data
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container flex-1 py-6">
        <Card className="flex h-[calc(100vh-12rem)] flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="max-w-2xl space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      Welcome to Project Samarth
                    </h2>
                    <p className="text-muted-foreground">
                      Ask complex questions about India's agricultural economy and climate patterns.
                      Get data-backed insights with source citations from data.gov.in.
                    </p>
                  </div>
                  <SampleQuestions onSelectQuestion={handleSendMessage} />
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {messages.map((message, index) => (
                  <ChatMessage key={index} {...message} />
                ))}
                {isLoading && (
                  <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing data...</span>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="container text-center text-xs text-muted-foreground">
          Data sources: Ministry of Agriculture & Farmers Welfare, India Meteorological Department (IMD) via data.gov.in
        </div>
      </footer>
    </div>
  );
};

export default Index;
