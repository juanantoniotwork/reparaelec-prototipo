"use client"

import { Bot } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ChatHeaderProps {
  category: string
  onCategoryChange: (value: string) => void
}

export function ChatHeader({ category, onCategoryChange }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-blue-600">
          <Bot className="size-5 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-foreground">
          Asistente IA Reparaelec
        </h1>
      </div>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="caldera">Caldera</SelectItem>
          <SelectItem value="lavadora">Lavadora</SelectItem>
          <SelectItem value="frigorifico">Frigorífico</SelectItem>
        </SelectContent>
      </Select>
    </header>
  )
}
