import { DashboardHeader } from "@/components/dashboard-header"
import { TransactionCalendar } from "@/components/transaction-calendar"

export default function CalendarPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold">Expense Calendar</h1>
        <TransactionCalendar />
      </div>
    </div>
  )
}

