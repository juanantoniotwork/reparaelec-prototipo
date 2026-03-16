'use client'

import { MessageSquarePlus, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: LucideIcon
  onAction?: () => void
  actionLabel?: string
}

export function EmptyState({ 
  title = "No tienes consultas anteriores", 
  description = "Inicia una nueva consulta para obtener ayuda con tus reparaciones de electrodomésticos.",
  icon: Icon = MessageSquarePlus,
  onAction,
  actionLabel = "Nueva consulta"
}: EmptyStateProps) {
  return (
    <Empty className="border-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {onAction && (
        <EmptyContent>
          <Button onClick={onAction} className="w-full max-w-xs">
            {actionLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
