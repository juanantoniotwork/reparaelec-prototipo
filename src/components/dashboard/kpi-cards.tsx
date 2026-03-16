"use client"

import { MessageSquare, ThumbsUp, Database, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const kpis = [
  {
    title: "Total consultas",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "vs. mes anterior",
  },
  {
    title: "Satisfacción",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: ThumbsUp,
    description: "valoraciones positivas",
  },
  {
    title: "Ahorro caché",
    value: "68.3%",
    change: "+5.4%",
    changeType: "positive" as const,
    icon: Database,
    description: "consultas en caché",
  },
  {
    title: "Coste tokens",
    value: "$342.50",
    change: "-8.2%",
    changeType: "positive" as const,
    icon: Coins,
    description: "este mes",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{kpi.value}</div>
            <div className="flex items-center gap-1 text-xs">
              <span
                className={
                  kpi.changeType === "positive"
                    ? "text-[oklch(0.7_0.18_150)]"
                    : "text-destructive"
                }
              >
                {kpi.change}
              </span>
              <span className="text-muted-foreground">{kpi.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
