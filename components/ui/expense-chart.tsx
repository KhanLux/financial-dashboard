import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ExpenseBarChartProps } from "@/types/expense-chart"

export function ExpenseChart({ data }: ExpenseBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
  )
} 