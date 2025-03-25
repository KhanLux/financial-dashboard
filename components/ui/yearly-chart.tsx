import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { YearlyChartProps } from "@/types/yearly-comparison"

export function YearlyChart({ data }: YearlyChartProps) {
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
          formatter={(value) => [`$${value}`, ""]}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            color: "hsl(var(--card-foreground))",
          }}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Legend formatter={(value) => <span className="text-foreground">{value}</span>} />
        <Bar dataKey="income" fill="#4ade80" name="Income" animationDuration={1500} animationBegin={300} />
        <Bar dataKey="expenses" fill="#f87171" name="Expenses" animationDuration={1500} animationBegin={600} />
        <Bar dataKey="savings" fill="#60a5fa" name="Savings" animationDuration={1500} animationBegin={900} />
      </BarChart>
    </ResponsiveContainer>
  )
} 