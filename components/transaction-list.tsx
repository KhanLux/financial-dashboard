"use client"

import { useState, useMemo, useEffect } from "react"
import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useTransactions } from "@/contexts/transaction-context"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function TransactionList() {
  const { toast } = useToast()
  const { transactions, deleteTransaction } = useTransactions()
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [animateRows, setAnimateRows] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Set to display 5 transactions per page

  // Sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [transactions])

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)

  useEffect(() => {
    // Trigger initial load animation
    setTimeout(() => {
      setIsLoaded(true)
      setTimeout(() => {
        setAnimateRows(true)
      }, 300)
    }, 100)
  }, [])

  useEffect(() => {
    // Reset row animations when page changes
    setAnimateRows(false)
    setTimeout(() => {
      setAnimateRows(true)
    }, 100)
  }, [currentPage])

  const handleDelete = (id: string) => {
    setIsDeleting(true)

    // Use the context to delete the transaction
    deleteTransaction(id)
    setTransactionToDelete(null)
    setIsDeleting(false)

    toast({
      title: "Transaction deleted",
      description: "The transaction has been deleted successfully.",
    })
  }

  const getPaginatedTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedTransactions.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
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
                    {getPaginatedTransactions().map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-muted/50">
                        <TableCell className="py-3 font-medium">
                          {format(new Date(transaction.date), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={transaction.type === "income" ? "success" : "destructive"}
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTransactionToDelete(transaction.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Transaction</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this transaction? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setTransactionToDelete(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => transactionToDelete && handleDelete(transactionToDelete)}
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center pt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="h-8 w-8"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous page</span>
                        </Button>
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1
                        // Show first page, last page, and pages around current page
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <Button
                                variant={pageNumber === currentPage ? "default" : "outline"}
                                size="icon"
                                onClick={() => handlePageChange(pageNumber)}
                                className="h-8 w-8"
                              >
                                {pageNumber}
                              </Button>
                            </PaginationItem>
                          )
                        } else if (
                          (pageNumber === 2 && currentPage > 3) ||
                          (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                        ) {
                          return <PaginationEllipsis key={pageNumber} />
                        }
                        return null
                      })}

                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8"
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next page</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
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

