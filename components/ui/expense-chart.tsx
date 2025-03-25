import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { ExpenseBarChartProps } from "@/types/expense-chart"
import { EXPENSE_CATEGORIES } from "@/types/transaction-form"

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#ef4444", // red-500
  Housing: "#f97316", // orange-500
  Transportation: "#eab308", // yellow-500
  Entertainment: "#22c55e", // green-500
  Utilities: "#3b82f6", // blue-500
  Healthcare: "#8b5cf6", // violet-500
  Education: "#ec4899", // pink-500
  Shopping: "#14b8a6", // teal-500
  Other: "#64748b", // slate-500
}

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
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
          animationBegin={300}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || "#8884d8"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
} 