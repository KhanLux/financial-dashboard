"use client"

import { useEffect, useState } from "react"
import { format, isSameDay } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Transaction } from "@/lib/transactions"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function TransactionCalendar() {
  const { transactions } = useTransactions()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDayTransactions, setSelectedDayTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransactionsLoaded, setIsTransactionsLoaded] = useState(false)

  useEffect(() => {
    // Trigger initial load animation
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  useEffect(() => {
    if (selectedDate) {
      // Reset transaction animations when date changes
      setIsTransactionsLoaded(false)

      const dayTransactions = transactions.filter((transaction) => isSameDay(new Date(transaction.date), selectedDate))
      setSelectedDayTransactions(dayTransactions)

      // Trigger transaction load animation
      setTimeout(() => {
        setIsTransactionsLoaded(true)
      }, 300)
    } else {
      setSelectedDayTransactions([])
    }
  }, [selectedDate, transactions])

  // Function to get transaction dates for highlighting in calendar
  const getTransactionDates = () => {
    const dates: Record<string, { income: boolean; expense: boolean }> = {}

    transactions.forEach((transaction) => {
      const dateStr = format(new Date(transaction.date), "yyyy-MM-dd")

      if (!dates[dateStr]) {
        dates[dateStr] = { income: false, expense: false }
      }

      if (transaction.type === "income") {
        dates[dateStr].income = true
      } else {
        dates[dateStr].expense = true
      }
    })

    return dates
  }

  const transactionDates = getTransactionDates()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AnimatedContainer animation="slide" direction="left" show={isLoaded}>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Calendar</CardTitle>
            <CardDescription>View your transactions by date</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="rounded-md border bg-card p-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  row: "flex w-full mt-2",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  table: "w-full border-collapse space-y-1",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  cell: "text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
                }}
                components={{
                  DayContent: (props) => {
                    const dateStr = format(props.date, "yyyy-MM-dd")
                    const hasTransactions = transactionDates[dateStr]

                    return (
                      <div className="relative flex h-9 w-9 items-center justify-center p-0">
                        <span className="z-10">{props.day}</span>
                        {hasTransactions && (
                          <div className="absolute bottom-1 flex gap-1 z-0">
                            {hasTransactions.expense && <div className="h-1.5 w-1.5 rounded-full bg-destructive" />}
                            {hasTransactions.income && <div className="h-1.5 w-1.5 rounded-full bg-green-500" />}
                          </div>
                        )}
                      </div>
                    )
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer animation="slide" direction="right" show={isLoaded}>
        <Card>
          <CardHeader>
            <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}</CardTitle>
            <CardDescription>Transactions for this date</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDayTransactions.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <h3 className="mt-2 text-lg font-semibold">No transactions</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedDate ? "There are no transactions for this date." : "Select a date to view transactions."}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {selectedDayTransactions.map((transaction, index) => (
                    <AnimatedContainer
                      key={transaction.id}
                      animation="slide"
                      direction="right"
                      delay={index === 0 ? "none" : index === 1 ? "short" : "medium"}
                      show={isTransactionsLoaded}
                    >
                      <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div
                            className={`rounded-full p-2.5 ${
                              transaction.type === "income"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <ArrowUpIcon className="h-5 w-5" />
                            ) : (
                              <ArrowDownIcon className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{transaction.category}</p>
                            {transaction.description && (
                              <p className="text-sm text-muted-foreground">{transaction.description}</p>
                            )}
                          </div>
                        </div>
                        <div
                          className={`text-lg font-semibold ${
                            transaction.type === "income"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    </AnimatedContainer>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}

