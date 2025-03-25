import { DashboardHeader } from "@/components/dashboard-header"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { StatisticCards } from "@/components/statistic-cards"
import { ExpenseChart } from "@/components/expense-chart"
import { IncomeChart } from "@/components/income-chart"

export default function Home() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatisticCards />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <TransactionForm />
          <TransactionList />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <ExpenseChart />
          <IncomeChart />
        </div>
      </div>
    </div>
  )
}

