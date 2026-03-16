"use client"

import { Bot, FileText, ThumbsDown, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citation?: {
    documentName: string
  }
}

interface ChatMessageProps {
  message: Message
  onFeedback?: (messageId: string, feedback: "up" | "down") => void
}

export function ChatMessage({ message, onFeedback }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600">
          <Bot className="size-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser
              ? "rounded-br-sm bg-blue-600 text-white"
              : "rounded-bl-sm bg-secondary text-foreground"
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {!isUser && message.citation && (
          <div className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2.5 py-1.5 text-xs text-muted-foreground">
            <FileText className="size-3" />
            <span>{message.citation.documentName}</span>
          </div>
        )}

        {!isUser && onFeedback && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-7 text-muted-foreground hover:text-green-500"
              onClick={() => onFeedback(message.id, "up")}
            >
              <ThumbsUp className="size-3.5" />
              <span className="sr-only">Útil</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-7 text-muted-foreground hover:text-red-500"
              onClick={() => onFeedback(message.id, "down")}
            >
              <ThumbsDown className="size-3.5" />
              <span className="sr-only">No útil</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
