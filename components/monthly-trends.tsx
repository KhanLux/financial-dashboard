"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function MonthlyTrends() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset animation state when data changes
    setIsLoaded(false)

    // Get last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
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
    setTimeout(() => {
      setChartData(data)
      setIsLoaded(true)
    }, 300)
  }, [transactions])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
        <CardDescription>Income vs. expenses over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="slide" direction="up" show={isLoaded} className="h-[300px]">
          {chartData.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No trend data</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add transactions to see your monthly trends.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4ade80"
                  name="Income"
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f87171"
                  name="Expenses"
                  animationDuration={1500}
                  animationBegin={600}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

