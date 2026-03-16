'use client'

import { MessageSquarePlus } from 'lucide-react'
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
  onNewConsultation: () => void
}

export function EmptyState({ onNewConsultation }: EmptyStateProps) {
  return (
    <Empty className="border-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquarePlus className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No tienes consultas anteriores</EmptyTitle>
        <EmptyDescription>
          Inicia una nueva consulta para obtener ayuda con tus reparaciones de electrodomésticos.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onNewConsultation} className="w-full max-w-xs">
          Nueva consulta
        </Button>
      </EmptyContent>
    </Empty>
  )
}
