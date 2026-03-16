"use client"

import { useEffect, useRef, useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatEmptyState } from "./chat-empty-state"
import { ChatMessage, type Message } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock AI responses for demonstration
const mockResponses: Record<string, { content: string; citation: string }> = {
  caldera: {
    content:
      "Para encender el piloto de tu caldera, primero asegúrate de que la válvula de gas esté abierta. Luego, gira el selector a la posición 'piloto', presiona el botón de encendido mientras mantienes pulsado el botón del piloto durante 30 segundos. Una vez que la llama se mantenga estable, gira el selector a la posición deseada.",
    citation: "Manual Caldera Junkers 2024.pdf",
  },
  lavadora: {
    content:
      "Si tu lavadora no centrifuga, verifica primero que la carga esté bien distribuida. Un desequilibrio puede activar la protección de seguridad. También comprueba que el desagüe no esté obstruido y que el filtro esté limpio. Si el problema persiste, podría ser un fallo en el sensor de equilibrio o en el motor.",
    citation: "Guía Reparación Lavadoras.pdf",
  },
  frigorifico: {
    content:
      "Los ruidos extraños en el frigorífico pueden tener varias causas. Un zumbido constante suele indicar que el compresor trabaja en exceso, posiblemente por suciedad en el condensador. Ruidos de goteo son normales durante el desescarche. Si escuchas clics repetitivos, podría ser un problema con el relé de arranque.",
    citation: "Diagnóstico Frigoríficos.pdf",
  },
}

export function ChatContainer() {
  const [category, setCategory] = useState("caldera")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[category]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        citation: {
          documentName: response.citation,
        },
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleFeedback = (messageId: string, feedback: "up" | "down") => {
    console.log(`Feedback for message ${messageId}: ${feedback}`)
    // Here you would send feedback to your backend
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <ChatHeader category={category} onCategoryChange={setCategory} />
      
      {messages.length === 0 ? (
        <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
      ) : (
        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="flex flex-col gap-4 p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onFeedback={handleFeedback}
              />
            ))}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-sm text-white">IA</span>
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
      
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}
