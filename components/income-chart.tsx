"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { EmptyIncome } from "@/components/ui/empty-income"
import { IncomeChart } from "@/components/ui/income-chart"
import { useIncomeChart } from "@/hooks/use-income-chart"
import { IncomeChartProps } from "@/types/income-chart"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function IncomeChartContainer({ className }: IncomeChartProps) {
  const { chartData, isLoaded } = useIncomeChart()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
        <CardDescription>Breakdown of your income by category</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="scale" show={isLoaded} className="h-[300px]">
          {chartData.length === 0 ? (
            <EmptyIncome />
          ) : (
            <IncomeChart data={chartData} colors={COLORS} />
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

