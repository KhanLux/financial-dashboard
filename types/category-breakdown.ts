export interface CategoryData {
  name: string
  value: number
}

export interface CategoryBreakdownProps {
  className?: string
}

export interface CategoryChartProps {
  data: CategoryData[]
  colors: string[]
} 