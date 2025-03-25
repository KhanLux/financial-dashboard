import { Transaction } from "@/types/transaction"

export interface TransactionDates {
  [key: string]: {
    income: boolean
    expense: boolean
  }
}

export interface DayTransaction {
  transaction: Transaction
  index: number
}

export interface TransactionCalendarProps {
  className?: string
} 