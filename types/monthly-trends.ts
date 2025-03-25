export interface MonthlyData {
  date: Date
  month: string
  income: number
  expenses: number
}

export interface ChartData {
  name: string
  income: number
  expenses: number
}

export interface MonthlyTrendsProps {
  className?: string
  monthsToShow?: number
} 