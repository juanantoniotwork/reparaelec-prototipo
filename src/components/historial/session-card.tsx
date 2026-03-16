'use client'

import { MessageSquare, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ChatSession, categoryColors } from '@/lib/types'
import { formatTime } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface SessionCardProps {
  session: ChatSession
  onSelect: (session: ChatSession) => void
}

export function SessionCard({ session, onSelect }: SessionCardProps) {
  return (
    <button
      onClick={() => onSelect(session)}
      className="w-full text-left bg-card hover:bg-secondary/50 rounded-xl p-4 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground line-clamp-2 text-sm leading-snug mb-2">
            {session.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-normal border",
                categoryColors[session.category]
              )}
            >
              {session.category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MessageSquare className="size-3" />
              <span>{session.messages.length}</span>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatTime(session.lastMessageAt)}
            </span>
          </div>
        </div>
        <ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
      </div>
    </button>
  )
}
