"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getYear } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function YearlyComparison() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<any[]>([])
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yearly Comparison</CardTitle>
        <CardDescription>Income, expenses, and savings by year</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="scale" show={isLoaded} className="h-[400px] rounded-md bg-card">
          {chartData.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No yearly data</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add transactions to see your yearly comparison.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  className="text-xs fill-muted-foreground"
                  tick={{ fill: "currentColor" }}
                  tickLine={{ stroke: "currentColor" }}
                  axisLine={{ stroke: "currentColor" }}
                />
                <YAxis
                  className="text-xs fill-muted-foreground"
                  tick={{ fill: "currentColor" }}
                  tickLine={{ stroke: "currentColor" }}
                  axisLine={{ stroke: "currentColor" }}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, ""]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Legend formatter={(value) => <span className="text-foreground">{value}</span>} />
                <Bar dataKey="income" fill="#4ade80" name="Income" animationDuration={1500} animationBegin={300} />
                <Bar dataKey="expenses" fill="#f87171" name="Expenses" animationDuration={1500} animationBegin={600} />
                <Bar dataKey="savings" fill="#60a5fa" name="Savings" animationDuration={1500} animationBegin={900} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

