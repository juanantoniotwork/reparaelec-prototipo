"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const dailyData = [
  { day: "1", queries: 320 },
  { day: "2", queries: 380 },
  { day: "3", queries: 290 },
  { day: "4", queries: 420 },
  { day: "5", queries: 510 },
  { day: "6", queries: 380 },
  { day: "7", queries: 290 },
  { day: "8", queries: 450 },
  { day: "9", queries: 520 },
  { day: "10", queries: 480 },
  { day: "11", queries: 390 },
  { day: "12", queries: 560 },
  { day: "13", queries: 620 },
  { day: "14", queries: 480 },
  { day: "15", queries: 550 },
  { day: "16", queries: 470 },
]

const chartConfig = {
  queries: {
    label: "Consultas",
    color: "var(--chart-1)",
  },
}

export function DailyQueriesChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Consultas diarias</CardTitle>
        <CardDescription>
          Número de consultas al asistente este mes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="fillQueries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
              className="text-xs text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs text-muted-foreground"
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              type="monotone"
              dataKey="queries"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#fillQueries)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
