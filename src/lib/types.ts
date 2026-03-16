export type CategoryType = 'Caldera' | 'Lavadora' | 'Frigorífico' | 'Lavavajillas' | 'Horno' | 'Microondas'

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
  updatedAt: string
  messages: Message[]
}
