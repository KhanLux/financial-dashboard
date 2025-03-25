import { useState, useEffect } from "react"
import { format, isSameDay } from "date-fns"
import { useTransactions } from "@/contexts/transaction-context"
import { TransactionDates } from "@/types/transaction-calendar"

export function useTransactionCalendar() {
  const { transactions } = useTransactions()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDayTransactions, setSelectedDayTransactions] = useState(transactions)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransactionsLoaded, setIsTransactionsLoaded] = useState(false)

  useEffect(() => {
    // Trigger initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selectedDate) {
      // Reset transaction animations when date changes
      setIsTransactionsLoaded(false)

      const dayTransactions = transactions.filter((transaction) => isSameDay(new Date(transaction.date), selectedDate))
      setSelectedDayTransactions(dayTransactions)

      // Trigger transaction load animation
      const timer = setTimeout(() => {
        setIsTransactionsLoaded(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSelectedDayTransactions([])
    }
  }, [selectedDate, transactions])

  // Function to get transaction dates for highlighting in calendar
  const getTransactionDates = (): TransactionDates => {
    const dates: TransactionDates = {}

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

  return {
    selectedDate,
    setSelectedDate,
    selectedDayTransactions,
    isLoaded,
    isTransactionsLoaded,
    transactionDates: getTransactionDates(),
  }
} 