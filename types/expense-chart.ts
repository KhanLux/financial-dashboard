export interface ExpenseData {
  name: string
  value: number
}

export interface ExpenseChartProps {
  className?: string
}

export interface ExpenseBarChartProps {
  data: ExpenseData[]
} 