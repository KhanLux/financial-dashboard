"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { EmptyYearly } from "@/components/ui/empty-yearly"
import { YearlyChart } from "@/components/ui/yearly-chart"
import { useYearlyComparison } from "@/hooks/use-yearly-comparison"
import { YearlyComparisonProps } from "@/types/yearly-comparison"

export function YearlyComparison({ className }: YearlyComparisonProps) {
  const { chartData, isLoaded } = useYearlyComparison()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Yearly Comparison</CardTitle>
        <CardDescription>Income, expenses, and savings by year</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="scale" show={isLoaded} className="h-[400px] rounded-md bg-card">
          {chartData.length === 0 ? (
            <EmptyYearly />
          ) : (
            <YearlyChart data={chartData} />
          )}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}

