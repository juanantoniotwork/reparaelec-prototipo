'use client'

import { ArrowLeft, Bot, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatSession, categoryColors } from '@/lib/types'
import { formatTime } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ChatViewProps {
  session: ChatSession
  onBack: () => void
}

export function ChatView({ session, onBack }: ChatViewProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="size-9 shrink-0"
          >
            <ArrowLeft className="size-5" />
            <span className="sr-only">Volver</span>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-foreground text-sm line-clamp-1">
              {session.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs font-normal border",
                  categoryColors[session.category]
                )}
              >
                {session.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {session.messages.length} mensajes
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {session.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  "size-8 rounded-full flex items-center justify-center shrink-0",
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                {message.role === 'user' ? (
                  <User className="size-4" />
                ) : (
                  <Bot className="size-4" />
                )}
              </div>
              <div
                className={cn(
                  "flex-1 max-w-[85%]",
                  message.role === 'user' ? 'text-right' : 'text-left'
                )}
              >
                <div
                  className={cn(
                    "inline-block rounded-2xl px-4 py-2.5 text-sm",
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-card text-card-foreground rounded-tl-sm border border-border'
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
