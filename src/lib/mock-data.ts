import { ChatSession } from './types'

export type DateGroup = 'Hoy' | 'Ayer' | 'Esta semana' | 'Anteriores'

export const MOCK_SESSIONS: ChatSession[] = [
  {
    id: '1',
    title: 'Piloto caldera Junkers',
    category: 'Caldera',
    lastMessage: '¿Cómo encender el piloto de la Junkers?',
    updatedAt: new Date().toISOString(),
    messages: [
      { id: '1', role: 'user', content: '¿Cómo encender el piloto de la Junkers?', timestamp: new Date().toISOString() },
      { id: '2', role: 'assistant', content: 'Siga estos pasos...', timestamp: new Date().toISOString() },
    ]
  },
  {
    id: '2',
    title: 'Error E15 Lavavajillas Bosch',
    category: 'Lavavajillas',
    lastMessage: 'El error E15 indica una fuga en la bandeja base.',
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      { id: '3', role: 'user', content: 'Error E15 Bosch', timestamp: new Date().toISOString() },
      { id: '4', role: 'assistant', content: 'El error E15...', timestamp: new Date().toISOString() },
    ]
  }
]

export function groupSessionsByDate(sessions: ChatSession[]): Record<DateGroup, ChatSession[]> {
  const groups: Record<DateGroup, ChatSession[]> = {
    'Hoy': [],
    'Ayer': [],
    'Esta semana': [],
    'Anteriores': []
  }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const yesterday = today - 86400000
  const thisWeek = today - (now.getDay() * 86400000)

  sessions.forEach(session => {
    const updatedAt = new Date(session.updatedAt).getTime()
    if (updatedAt >= today) groups['Hoy'].push(session)
    else if (updatedAt >= yesterday) groups['Ayer'].push(session)
    else if (updatedAt >= thisWeek) groups['Esta semana'].push(session)
    else groups['Anteriores'].push(session)
  })

  return groups
}
