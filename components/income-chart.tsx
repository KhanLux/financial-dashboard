"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function IncomeChart() {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<any[]>([])
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
        <CardDescription>Breakdown of your income by category</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="scale" show={isLoaded} className="h-[300px]">
          {chartData.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No income data</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add income transactions to see your sources breakdown.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value}`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

