"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, FileText, MessageCircle, type LucideIcon } from "lucide-react"

interface CategoryCardProps {
  name: string
  icon: LucideIcon
  documentsCount: number
  queriesCount: number
  onEdit: () => void
  onDelete: () => void
}

export function CategoryCard({
  name,
  icon: Icon,
  documentsCount,
  queriesCount,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <Card className="bg-card border-border hover:border-amber-500/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              <Icon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>{documentsCount} documentos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  <span>{queriesCount} consultas</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onEdit}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Editar {name}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar {name}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
