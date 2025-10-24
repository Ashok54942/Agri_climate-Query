import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-4 p-6", isUser ? "bg-muted/30" : "bg-card")}>
      <div className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
        isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="font-semibold text-sm">
          {isUser ? "You" : "Project Samarth"}
        </p>
        <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    </div>
  );
};
