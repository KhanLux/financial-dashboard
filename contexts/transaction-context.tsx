"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type Transaction,
  getTransactions,
  addTransaction as addTransactionToStore,
  deleteTransaction as deleteTransactionFromStore,
  updateTransaction as updateTransactionInStore,
} from "@/lib/transactions"

type TransactionContextType = {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id">) => Transaction
  deleteTransaction: (id: string) => boolean
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, "id">>) => Transaction | null
  isLoading: boolean
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load transactions on initial render
    setTransactions(getTransactions())
    setIsLoading(false)
  }, [])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = addTransactionToStore(transaction)
    setTransactions(getTransactions()) // Refresh the transactions list
    return newTransaction
  }

  const deleteTransaction = (id: string) => {
    const result = deleteTransactionFromStore(id)
    if (result) {
      setTransactions(getTransactions()) // Refresh the transactions list
    }
    return result
  }

  const updateTransaction = (id: string, updates: Partial<Omit<Transaction, "id">>) => {
    const result = updateTransactionInStore(id, updates)
    if (result) {
      setTransactions(getTransactions()) // Refresh the transactions list
    }
    return result
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider")
  }
  return context
}

