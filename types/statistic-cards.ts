export interface StatisticData {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  monthlyAverage: number
}

export interface StatisticCardsProps {
  className?: string
}

export interface StatisticCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  valueClassName?: string
} 