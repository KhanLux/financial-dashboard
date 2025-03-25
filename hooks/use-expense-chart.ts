import { useState, useEffect } from "react"
import { useTransactions } from "@/contexts/transaction-context"
import { ExpenseData } from "@/types/expense-chart"

export function useExpenseChart() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<ExpenseData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset animation state when data changes
    setIsLoaded(false)

    // Get only expenses
    const expenses = transactions.filter((t) => t.type === "expense")

    // Group by category
    const categories: Record<string, number> = {}

    expenses.forEach((expense) => {
      const category = expense.category
      if (categories[category]) {
        categories[category] += expense.amount
      } else {
        categories[category] = expense.amount
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
 