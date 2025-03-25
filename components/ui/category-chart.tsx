import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { CategoryChartProps } from "@/types/category-breakdown"

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  fill
}: any) => {
  const radius = outerRadius * 1.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  const sin = Math.sin(-midAngle * RADIAN)
  const cos = Math.cos(-midAngle * RADIAN)
  const textAnchor = cos >= 0 ? 'start' : 'end'
  const lineX2 = cx + (outerRadius + 10) * cos
  const lineY2 = cy + (outerRadius + 10) * sin

  return (
    <g>
      <path
        d={`M${cx + outerRadius * cos},${cy + outerRadius * sin}L${lineX2},${lineY2}L${x},${y}`}
        stroke={fill}
        strokeWidth={1}
        fill="none"
      />
      <circle cx={x} cy={y} r={2} fill={fill} stroke="none" />
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill={fill}
        dominantBaseline="middle"
        className="text-xs font-medium"
        dx={textAnchor === 'start' ? 5 : -5}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  )
}

export function CategoryChart({ data, colors }: CategoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
          minAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "6px",
            padding: "8px 12px",
          }}
          itemStyle={{
            color: "hsl(var(--foreground))",
          }}
          labelStyle={{
            color: "hsl(var(--muted-foreground))",
          }}
        />
        <Legend 
          verticalAlign="bottom"
          height={36}
          content={({ payload }) => (
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {payload?.map((entry: any) => (
                <div key={entry.value} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-sm" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
} 