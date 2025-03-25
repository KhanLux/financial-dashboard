import { useState, useEffect } from "react"
import { useTransactions } from "@/contexts/transaction-context"
import { IncomeData } from "@/types/income-chart"

export function useIncomeChart() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<IncomeData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset animation state when data changes
    setIsLoaded(false)

    // Get only income
    const incomes = transactions.filter((t) => t.type === "income")

    // Group by category
    const categories: Record<string, number> = {}

    incomes.forEach((income) => {
      const category = income.category
      if (categories[category]) {
        categories[category] += income.amount
      } else {
        categories[category] = income.amount
      }
    })

    // Format for chart
    const data = Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value.toFixed(2)),
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