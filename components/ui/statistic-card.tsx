import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatisticCardProps } from "@/types/statistic-cards"

export function StatisticCard({ title, value, icon, description, valueClassName }: StatisticCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueClassName}`}>${Math.abs(value).toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
} 