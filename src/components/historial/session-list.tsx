'use client'

import { SessionCard } from './session-card'
import { ChatSession, CategoryType } from '@/lib/types'
import { groupSessionsByDate, DateGroup } from '@/lib/mock-data'
import { useMemo } from 'react'

interface SessionListProps {
  sessions: ChatSession[]
  searchQuery: string
  onSelectSession: (session: ChatSession) => void
}

export function SessionList({ sessions, searchQuery, onSelectSession }: SessionListProps) {
  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return sessions
    const query = searchQuery.toLowerCase()
    return sessions.filter(
      session =>
        session.title.toLowerCase().includes(query) ||
        session.category.toLowerCase().includes(query) ||
        session.messages.some(m => m.content.toLowerCase().includes(query))
    )
  }, [sessions, searchQuery])

  const groupedSessions = useMemo(() => 
    groupSessionsByDate(filteredSessions), 
    [filteredSessions]
  )

  const groupOrder: DateGroup[] = ['Hoy', 'Ayer', 'Esta semana', 'Anteriores']

  return (
    <div className="flex flex-col gap-6">
      {groupOrder.map(group => {
        const sessionsInGroup = groupedSessions[group]
        if (sessionsInGroup.length === 0) return null

        return (
          <section key={group}>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
              {group}
            </h2>
            <div className="flex flex-col gap-2">
              {sessionsInGroup.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onSelect={onSelectSession}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
