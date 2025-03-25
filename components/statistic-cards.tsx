"use client"

import { useEffect, useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function StatisticCards() {
  const { transactions } = useTransactions()
  const [stats, setStats] = useState({
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

  return (
    <>
      <AnimatedContainer animation="slide" delay="none" show={isLoaded}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer animation="slide" delay="short" show={isLoaded}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer animation="slide" delay="medium" show={isLoaded}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            {stats.netIncome >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${stats.netIncome >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              ${Math.abs(stats.netIncome).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">{stats.netIncome >= 0 ? "Positive" : "Negative"} balance</p>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </>
  )
}

