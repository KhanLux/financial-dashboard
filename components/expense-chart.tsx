"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function ExpenseChart() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<any[]>([])
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>Breakdown of your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="fade" show={isLoaded} className="h-[300px] rounded-md bg-card">
          {chartData.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No expense data</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add expenses to see your spending breakdown.</p>
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
                  formatter={(value) => [`$${value}`, "Amount"]}
                  labelFormatter={(label) => `Category: ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  className="fill-primary"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

