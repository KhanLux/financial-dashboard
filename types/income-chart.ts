export interface IncomeData {
  name: string
  value: number
}

export interface IncomeChartProps {
  className?: string
}

export interface IncomePieChartProps {
  data: IncomeData[]
  colors: string[]
} 