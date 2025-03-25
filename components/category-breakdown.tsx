"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyCategory } from "@/components/ui/empty-category"
import { CategoryChart } from "@/components/ui/category-chart"
import { useCategoryBreakdown } from "@/hooks/use-category-breakdown"
import { CategoryBreakdownProps } from "@/types/category-breakdown"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"]

export function CategoryBreakdown({ className }: CategoryBreakdownProps) {
  const { expenseData, incomeData } = useCategoryBreakdown()

  return (
    <Card className={className}>
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
              <EmptyCategory type="expense" />
            ) : (
              <CategoryChart data={expenseData} colors={COLORS} />
            )}
          </TabsContent>
          <TabsContent value="income" className="h-[300px] pt-4">
            {incomeData.length === 0 ? (
              <EmptyCategory type="income" />
            ) : (
              <CategoryChart data={incomeData} colors={COLORS} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

