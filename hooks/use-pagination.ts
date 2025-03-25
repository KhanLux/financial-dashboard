import { useState, useMemo } from "react"
import { Transaction } from "@/types/transaction"

interface UsePaginationProps {
  items: Transaction[]
  itemsPerPage: number
}

export function usePagination({ items, itemsPerPage }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
  }
} 