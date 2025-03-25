"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { EmptyExpense } from "@/components/ui/empty-expense"
import { ExpenseChart } from "@/components/ui/expense-chart"
import { useExpenseChart } from "@/hooks/use-expense-chart"
import { ExpenseChartProps } from "@/types/expense-chart"

export function ExpenseChartContainer({ className }: ExpenseChartProps) {
  const { chartData, isLoaded } = useExpenseChart()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>Breakdown of your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="fade" show={isLoaded} className="h-[300px] rounded-md bg-card">
          {chartData.length === 0 ? (
            <EmptyExpense />
          ) : (
            <ExpenseChart data={chartData} />
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

