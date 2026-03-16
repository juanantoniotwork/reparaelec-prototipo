"use client"

import { useState } from 'react'
import { SearchHeader } from '@/components/historial/search-header'
import { SessionList } from '@/components/historial/session-list'
import { ChatView } from '@/components/historial/chat-view'
import { EmptyState } from '@/components/historial/empty-state'
import { MOCK_SESSIONS } from '@/lib/mock-data'
import { ChatSession } from '@/lib/types'

export default function HistorialPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar: Search & List */}
      <div className="w-full max-w-sm flex flex-col border-r border-border bg-muted/30">
        <SearchHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 overflow-y-auto p-4">
          <SessionList
            sessions={MOCK_SESSIONS}
            searchQuery={searchQuery}
            onSelectSession={setSelectedSession}
          />
        </div>
      </div>

      {/* Main Content: Chat View */}
      <main className="flex-1 flex flex-col bg-background">
        {selectedSession ? (
          <ChatView
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
          />
        ) : (
          <EmptyState
            title="Selecciona una consulta"
            description="Elige una conversación de la lista para ver los detalles y las soluciones proporcionadas."
          />
        )}
      </main>
    </div>
  )
}
