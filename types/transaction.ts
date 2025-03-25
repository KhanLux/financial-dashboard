export interface Transaction {
  id: string
  date: string | Date
  type: "income" | "expense"
  category: string
  amount: number
  description?: string
}

export interface TransactionListProps {
  itemsPerPage?: number
  showPagination?: boolean
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
} 