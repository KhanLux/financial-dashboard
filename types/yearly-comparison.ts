export interface YearlyData {
  name: string
  income: number
  expenses: number
  savings: number
}

export interface YearlyComparisonProps {
  className?: string
}

export interface YearlyChartProps {
  data: YearlyData[]
} 