"use client"

import { ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentInteractions = [
  {
    id: 1,
    tecnico: "Carlos Mendoza",
    pregunta: "¿Cómo diagnosticar sobrecalentamiento en motor trifásico de 5HP?",
    categoria: "Motores",
    modelo: "GPT-4o",
    feedback: "positive",
  },
  {
    id: 2,
    tecnico: "Ana García",
    pregunta: "Procedimiento para reemplazo de fusibles en tablero principal",
    categoria: "Protecciones",
    modelo: "GPT-4o-mini",
    feedback: "positive",
  },
  {
    id: 3,
    tecnico: "Miguel Torres",
    pregunta: "Cálculo de sección de cable para instalación industrial 380V",
    categoria: "Cableado",
    modelo: "GPT-4o",
    feedback: "neutral",
  },
  {
    id: 4,
    tecnico: "Laura Sánchez",
    pregunta: "Verificación de aislamiento en transformador de distribución",
    categoria: "Transformadores",
    modelo: "GPT-4o-mini",
    feedback: "positive",
  },
  {
    id: 5,
    tecnico: "Roberto Díaz",
    pregunta: "Error en variador de frecuencia código F0001",
    categoria: "Motores",
    modelo: "GPT-4o",
    feedback: "negative",
  },
]

const categoryColors: Record<string, string> = {
  Motores: "bg-chart-1/20 text-[var(--chart-1)] border-chart-1/30",
  Protecciones: "bg-chart-2/20 text-[var(--chart-2)] border-chart-2/30",
  Cableado: "bg-chart-3/20 text-[var(--chart-3)] border-chart-3/30",
  Transformadores: "bg-chart-4/20 text-[var(--chart-4)] border-chart-4/30",
  Instalaciones: "bg-chart-5/20 text-[var(--chart-5)] border-chart-5/30",
}

function FeedbackIcon({ feedback }: { feedback: string }) {
  switch (feedback) {
    case "positive":
      return <ThumbsUp className="h-4 w-4 text-[oklch(0.7_0.18_150)]" />
    case "negative":
      return <ThumbsDown className="h-4 w-4 text-destructive" />
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />
  }
}

export function RecentInteractionsTable() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Interacciones recientes</CardTitle>
        <CardDescription>
          Las últimas 5 consultas realizadas al asistente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Técnico</TableHead>
              <TableHead className="text-muted-foreground">Pregunta</TableHead>
              <TableHead className="text-muted-foreground">Categoría</TableHead>
              <TableHead className="text-muted-foreground">Modelo</TableHead>
              <TableHead className="text-muted-foreground text-center">Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentInteractions.map((interaction) => (
              <TableRow key={interaction.id} className="border-border">
                <TableCell className="font-medium text-card-foreground">
                  {interaction.tecnico}
                </TableCell>
                <TableCell className="max-w-md truncate text-muted-foreground">
                  {interaction.pregunta}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={categoryColors[interaction.categoria] || ""}
                  >
                    {interaction.categoria}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground font-mono">
                    {interaction.modelo}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <FeedbackIcon feedback={interaction.feedback} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
