import { useState, useEffect } from "react"
import { getYear } from "date-fns"
import { useTransactions } from "@/contexts/transaction-context"
import { YearlyData } from "@/types/yearly-comparison"

export function useYearlyComparison() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<YearlyData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset animation state when data changes
    setIsLoaded(false)

    // Group by year and type
    const yearlyData: Record<string, { income: number; expenses: number }> = {}

    transactions.forEach((transaction) => {
      const year = getYear(new Date(transaction.date)).toString()

      if (!yearlyData[year]) {
        yearlyData[year] = { income: 0, expenses: 0 }
      }

      if (transaction.type === "income") {
        yearlyData[year].income += transaction.amount
      } else {
        yearlyData[year].expenses += transaction.amount
      }
    })

    // Format for chart
    const data = Object.entries(yearlyData).map(([year, values]) => ({
      name: year,
      income: Number(values.income.toFixed(2)),
      expenses: Number(values.expenses.toFixed(2)),
      savings: Number((values.income - values.expenses).toFixed(2)),
    }))

    // Simulate loading delay for smoother animation
    setTimeout(() => {
      setChartData(data)
      setIsLoaded(true)
    }, 300)
  }, [transactions])

  return {
    chartData,
    isLoaded,
  }
} 