"use client"

import { useState, useMemo, useEffect } from "react"
import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { TransactionPagination } from "@/components/ui/transaction-pagination"
import { DeleteTransactionDialog } from "@/components/ui/delete-transaction-dialog"
import { usePagination } from "@/hooks/use-pagination"
import { TransactionListProps } from "@/types/transaction"

export function TransactionList({ itemsPerPage = 5, showPagination = true }: TransactionListProps) {
  const { toast } = useToast()
  const { transactions, deleteTransaction } = useTransactions()
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [animateRows, setAnimateRows] = useState(false)

  // Sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [transactions])

  const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination({
    items: sortedTransactions,
    itemsPerPage,
  })

  useEffect(() => {
    // Trigger initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setTimeout(() => {
        setAnimateRows(true)
      }, 300)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Reset row animations when page changes
    setAnimateRows(false)
    const timer = setTimeout(() => {
      setAnimateRows(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [currentPage])

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      await deleteTransaction(id)
      setTransactionToDelete(null)
      toast({
        title: "Transaction deleted",
        description: "The transaction has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AnimatedContainer animation="slide" direction="up" show={isLoaded} delay="medium">
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your most recent financial activities</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {sortedTransactions.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No transactions yet</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">Add your first transaction using the form.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[120px] py-3">Date</TableHead>
                      <TableHead className="py-3">Category</TableHead>
                      <TableHead className="py-3">Amount</TableHead>
                      <TableHead className="w-[80px] text-right py-3">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedItems.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-muted/50">
                        <TableCell className="py-3 font-medium">
                          {format(new Date(transaction.date), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={transaction.type === "income" ? "default" : "destructive"}
                              className="capitalize"
                            >
                              {transaction.type === "income" ? (
                                <ArrowUpIcon className="mr-1 h-3 w-3" />
                              ) : (
                                <ArrowDownIcon className="mr-1 h-3 w-3" />
                              )}
                              {transaction.type}
                            </Badge>
                            <span className="capitalize">{transaction.category}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`py-3 font-medium ${
                            transaction.type === "income"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <DeleteTransactionDialog
                            transactionId={transaction.id}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {showPagination && (
                <TransactionPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}

              <div className="text-center text-sm text-muted-foreground">
                Showing {Math.min(sortedTransactions.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length}{" "}
                transactions
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  )
}

