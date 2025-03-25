"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { EmptyTrends } from "@/components/ui/empty-trends"
import { useMonthlyTrends } from "@/hooks/use-monthly-trends"
import { MonthlyTrendsProps } from "@/types/monthly-trends"

export function MonthlyTrends({ className, monthsToShow = 6 }: MonthlyTrendsProps) {
  const { chartData, isLoaded } = useMonthlyTrends(monthsToShow)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
        <CardDescription>Income vs. expenses over the last {monthsToShow} months</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedContainer animation="slide" direction="up" show={isLoaded} className="h-[300px]">
          {chartData.length === 0 ? (
            <EmptyTrends />
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

