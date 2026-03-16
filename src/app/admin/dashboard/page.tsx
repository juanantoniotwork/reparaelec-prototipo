import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { DailyQueriesChart } from "@/components/dashboard/daily-queries-chart"
import { RecentInteractionsTable } from "@/components/dashboard/recent-interactions-table"

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
        <KPICards />
        <div className="grid gap-6 md:grid-cols-2">
          <CategoryChart />
          <DailyQueriesChart />
        </div>
        <RecentInteractionsTable />
      </main>
    </div>
  )
}
