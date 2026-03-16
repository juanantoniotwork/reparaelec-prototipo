"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const categoryData = [
  { category: "Motores", queries: 2840 },
  { category: "Transformadores", queries: 2120 },
  { category: "Instalaciones", queries: 1890 },
  { category: "Protecciones", queries: 1650 },
  { category: "Cableado", queries: 1420 },
  { category: "Otros", queries: 980 },
]

const chartConfig = {
  queries: {
    label: "Consultas",
    color: "var(--chart-2)",
  },
}

export function CategoryChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Consultas por categoría</CardTitle>
        <CardDescription>
          Distribución de consultas por tipo de problema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={categoryData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs text-muted-foreground"
            />
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={90}
              className="text-xs text-muted-foreground"
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="queries"
              fill="var(--chart-2)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
