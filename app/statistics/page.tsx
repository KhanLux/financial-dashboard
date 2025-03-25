import { DashboardHeader } from "@/components/dashboard-header"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { MonthlyTrends } from "@/components/monthly-trends"
import { YearlyComparison } from "@/components/yearly-comparison"

export default function StatisticsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold">Financial Statistics</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <CategoryBreakdown />
          <MonthlyTrends />
        </div>
        <div className="mt-6">
          <YearlyComparison />
        </div>
      </div>
    </div>
  )
}

