import { useState, useEffect } from "react"
import { useTransactions } from "@/contexts/transaction-context"
import { StatisticData } from "@/types/statistic-cards"

export function useStatistics() {
  const { transactions } = useTransactions()
  const [stats, setStats] = useState<StatisticData>({
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    monthlyAverage: 0,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const netIncome = income - expenses

    // Calculate monthly average (simplified)
    const monthlyAverage = transactions.length > 0 ? expenses / 3 : 0

    setStats({
      totalIncome: income,
      totalExpenses: expenses,
      netIncome,
      monthlyAverage,
    })

    // Trigger animation after stats are calculated
    setIsLoaded(true)
  }, [transactions])

  return {
    stats,
    isLoaded,
  }
} 