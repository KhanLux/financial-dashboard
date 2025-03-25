import { useState, useEffect } from "react"
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"
import { useTransactions } from "@/contexts/transaction-context"
import { MonthlyData, ChartData } from "@/types/monthly-trends"

export function useMonthlyTrends(monthsToShow: number = 6) {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset animation state when data changes
    setIsLoaded(false)

    // Get last N months
    const months: MonthlyData[] = Array.from({ length: monthsToShow }, (_, i) => {
      const date = subMonths(new Date(), i)
      return {
        date,
        month: format(date, "MMM"),
        income: 0,
        expenses: 0,
      }
    }).reverse()

    // Calculate totals for each month
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date)

      months.forEach((monthData) => {
        const start = startOfMonth(monthData.date)
        const end = endOfMonth(monthData.date)

        if (isWithinInterval(transactionDate, { start, end })) {
          if (transaction.type === "income") {
            monthData.income += transaction.amount
          } else {
            monthData.expenses += transaction.amount
          }
        }
      })
    })

    // Format for chart
    const data = months.map((month) => ({
      name: month.month,
      income: Number(month.income.toFixed(2)),
      expenses: Number(month.expenses.toFixed(2)),
    }))

    // Simulate loading delay for smoother animation
    const timer = setTimeout(() => {
      setChartData(data)
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [transactions, monthsToShow])

  return {
    chartData,
    isLoaded,
  }
} 