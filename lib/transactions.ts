// This is a client-side mock data store
// In a real application, this would be replaced with a database

import { v4 as uuidv4 } from "uuid"

export interface Transaction {
  id: string
  amount: number
  category: string
  description?: string
  date: string | Date
  type: "income" | "expense"
}

// Initialize with some sample data
const INITIAL_DATA: Transaction[] = [
  {
    id: uuidv4(),
    amount: 2500,
    category: "salary",
    description: "Monthly salary",
    date: new Date(2023, 5, 1),
    type: "income",
  },
  {
    id: uuidv4(),
    amount: 500,
    category: "freelance",
    description: "Website project",
    date: new Date(2023, 5, 15),
    type: "income",
  },
  {
    id: uuidv4(),
    amount: 800,
    category: "housing",
    description: "Rent payment",
    date: new Date(2023, 5, 5),
    type: "expense",
  },
  {
    id: uuidv4(),
    amount: 120,
    category: "food",
    description: "Grocery shopping",
    date: new Date(2023, 5, 10),
    type: "expense",
  },
  {
    id: uuidv4(),
    amount: 50,
    category: "entertainment",
    description: "Movie tickets",
    date: new Date(2023, 5, 20),
    type: "expense",
  },
  {
    id: uuidv4(),
    amount: 2500,
    category: "salary",
    description: "Monthly salary",
    date: new Date(2023, 6, 1),
    type: "income",
  },
  {
    id: uuidv4(),
    amount: 800,
    category: "housing",
    description: "Rent payment",
    date: new Date(2023, 6, 5),
    type: "expense",
  },
  {
    id: uuidv4(),
    amount: 120,
    category: "food",
    description: "Grocery shopping",
    date: new Date(2023, 6, 10),
    type: "expense",
  },
  {
    id: uuidv4(),
    amount: 50,
    category: "entertainment",
    description: "Movie tickets",
    date: new Date(2023, 6, 20),
    type: "expense",
  },
  {
    id: uuidv4(),
    amount: 2500, 
    category: "salary",
    description: "Monthly salary",
    date: new Date(2023, 7, 1),
    type: "income",
  },
]

// Use localStorage to persist data
const STORAGE_KEY = "financial-dashboard-transactions"

// Helper to initialize the store
const initializeStore = (): Transaction[] => {
  if (typeof window === "undefined") {
    return INITIAL_DATA
  }

  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    return storedData ? JSON.parse(storedData) : INITIAL_DATA
  } catch (error) {
    console.error("Failed to parse stored transactions", error)
    return INITIAL_DATA
  }
}

// Helper to save to localStorage
const saveToStorage = (transactions: Transaction[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }
}

// Get all transactions
export const getTransactions = (): Transaction[] => {
  return initializeStore()
}

// Add a new transaction
export const addTransaction = (transaction: Omit<Transaction, "id">): Transaction => {
  const transactions = getTransactions()

  const newTransaction: Transaction = {
    ...transaction,
    id: uuidv4(),
    date: transaction.date instanceof Date ? transaction.date : new Date(transaction.date),
  }

  const updatedTransactions = [...transactions, newTransaction]
  saveToStorage(updatedTransactions)

  return newTransaction
}

// Delete a transaction
export const deleteTransaction = (id: string): boolean => {
  const transactions = getTransactions()
  const updatedTransactions = transactions.filter((t) => t.id !== id)

  if (updatedTransactions.length !== transactions.length) {
    saveToStorage(updatedTransactions)
    return true
  }

  return false
}

// Update a transaction
export const updateTransaction = (id: string, updates: Partial<Omit<Transaction, "id">>): Transaction | null => {
  const transactions = getTransactions()
  const index = transactions.findIndex((t) => t.id === id)

  if (index !== -1) {
    const updatedTransaction = {
      ...transactions[index],
      ...updates,
    }

    const updatedTransactions = [...transactions]
    updatedTransactions[index] = updatedTransaction

    saveToStorage(updatedTransactions)
    return updatedTransaction
  }

  return null
}

