export type CategoryType = 'Caldera' | 'Lavadora' | 'Frigorífico' | 'Lavavajillas' | 'Horno' | 'Microondas'

export const categoryColors: Record<string, string> = {
  Caldera: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Lavadora: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Frigorífico: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  Lavavajillas: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Horno: "bg-red-500/10 text-red-500 border-red-500/20",
  Microondas: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  citation?: {
    documentName: string
    pageNumber?: number
    relevance?: number
  }
}

export interface ChatSession {
  id: string
  title: string
  category: CategoryType
  lastMessage: string
  lastMessageAt: string
  updatedAt: string
  messages: Message[]
}
