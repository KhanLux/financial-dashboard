"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTransactions } from "@/contexts/transaction-context"

export function CategoryBreakdown() {
  const { transactions } = useTransactions()
  const [expenseData, setExpenseData] = useState<any[]>([])
  const [incomeData, setIncomeData] = useState<any[]>([])

  useEffect(() => {
    // Process expenses
    const expenses = transactions.filter((t) => t.type === "expense")
    const expenseCategories: Record<string, number> = {}

    expenses.forEach((expense) => {
      const category = expense.category
      if (expenseCategories[category]) {
        expenseCategories[category] += expense.amount
      } else {
        expenseCategories[category] = expense.amount
      }
    })

    const expenseChartData = Object.entries(expenseCategories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value.toFixed(2)),
    }))

    // Process income
    const incomes = transactions.filter((t) => t.type === "income")
    const incomeCategories: Record<string, number> = {}

    incomes.forEach((income) => {
      const category = income.category
      if (incomeCategories[category]) {
        incomeCategories[category] += income.amount
      } else {
        incomeCategories[category] = income.amount
      }
    })

    const incomeChartData = Object.entries(incomeCategories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value.toFixed(2)),
    }))

    setExpenseData(expenseChartData)
    setIncomeData(incomeChartData)
  }, [transactions])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Detailed view of your financial categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="h-[300px] pt-4">
            {expenseData.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <h3 className="mt-2 text-lg font-semibold">No expense data</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add expenses to see your category breakdown.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          <TabsContent value="income" className="h-[300px] pt-4">
            {incomeData.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <h3 className="mt-2 text-lg font-semibold">No income data</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add income to see your category breakdown.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

