import { useState, useEffect } from "react"
import { useTransactions } from "@/contexts/transaction-context"
import { CategoryData } from "@/types/category-breakdown"

export function useCategoryBreakdown() {
  const { transactions } = useTransactions()
  const [expenseData, setExpenseData] = useState<CategoryData[]>([])
  const [incomeData, setIncomeData] = useState<CategoryData[]>([])

  useEffect(() => {
    // Process expenses
    const expenses = transactions.filter((t) => t.type === "expense")
    const expenseCategories: Record<string, number> = {}

    expenses.forEach((expense) => {
      const category = expense.category
      if (expenseCategories[category]) {
        expenseCategories[category] += expense.amount
      } else {
        expenseCategories[category] = expense.amount
      }
    })

    const expenseChartData = Object.entries(expenseCategories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value.toFixed(2)),
    }))

    // Process income
    const incomes = transactions.filter((t) => t.type === "income")
    const incomeCategories: Record<string, number> = {}

    incomes.forEach((income) => {
      const category = income.category
      if (incomeCategories[category]) {
        incomeCategories[category] += income.amount
      } else {
        incomeCategories[category] = income.amount
      }
    })

    const incomeChartData = Object.entries(incomeCategories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value.toFixed(2)),
    }))

    setExpenseData(expenseChartData)
    setIncomeData(incomeChartData)
  }, [transactions])

  return {
    expenseData,
    incomeData,
  }
} 