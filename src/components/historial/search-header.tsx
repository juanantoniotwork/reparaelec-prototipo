'use client'

import { Search, X } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/input-group'

interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SearchHeader({ searchQuery, onSearchChange }: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="px-4 py-4">
        <h1 className="text-xl font-semibold text-foreground mb-4">
          Mis consultas
        </h1>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar consultas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                onClick={() => onSearchChange('')}
              >
                <X className="size-3.5" />
                <span className="sr-only">Limpiar búsqueda</span>
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
    </header>
  )
}
