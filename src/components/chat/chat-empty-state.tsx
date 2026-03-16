"use client"

import { Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatEmptyStateProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  "¿Cómo encender el piloto de mi caldera?",
  "Mi lavadora no centrifuga, ¿qué hago?",
  "El frigorífico hace ruido extraño",
  "¿Cómo limpiar el filtro de la lavadora?",
]

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="flex size-16 items-center justify-center rounded-full bg-blue-600/20">
        <Bot className="size-8 text-blue-500" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">
          ¡Hola! Soy tu asistente de reparaciones
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Puedo ayudarte con problemas de calderas, lavadoras y frigoríficos.
          ¿En qué puedo ayudarte hoy?
        </p>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            className="h-auto justify-start gap-2 whitespace-normal py-3 text-left text-sm"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <Sparkles className="size-4 shrink-0 text-blue-500" />
            <span>{suggestion}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
