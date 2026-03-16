"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type DocumentStatus = "pendiente" | "procesando" | "procesado" | "error"

interface Document {
  id: string
  nombre: string
  categorias: string[]
  estado: DocumentStatus
  fechaSubida: string
}

const categoryColors: Record<string, string> = {
  Caldera: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Lavadora: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Frigorífico: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Lavavajillas: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Horno: "bg-red-500/20 text-red-400 border-red-500/30",
  Microondas: "bg-purple-500/20 text-purple-400 border-purple-500/30",
}

const statusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  procesando: {
    label: "Procesando",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  procesado: {
    label: "Procesado",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  error: {
    label: "Error",
    className: "bg-red-500/20 text-red-400 border-red-500/30",
  },
}

interface DocumentsTableProps {
  documents: Document[]
  onView?: (id: string) => void
  onDelete?: (id: string) => void
}

export function DocumentsTable({ documents, onView, onDelete }: DocumentsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground">Nombre</TableHead>
            <TableHead className="text-muted-foreground">Categorías</TableHead>
            <TableHead className="text-muted-foreground">Estado</TableHead>
            <TableHead className="text-muted-foreground">Fecha subida</TableHead>
            <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} className="border-border">
              <TableCell className="font-medium text-foreground">
                {doc.nombre}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {doc.categorias.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className={cn(
                        "text-xs font-medium",
                        categoryColors[cat] || "bg-muted text-muted-foreground"
                      )}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn("text-xs font-medium", statusConfig[doc.estado].className)}
                >
                  {statusConfig[doc.estado].label}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{doc.fechaSubida}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onView?.(doc.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="size-4" />
                    <span className="sr-only">Ver documento</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete?.(doc.id)}
                    className="text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Eliminar documento</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
