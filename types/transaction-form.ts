import { z } from "zod"

export const transactionFormSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  date: z.date(),
  type: z.enum(["income", "expense"]),
})

export type TransactionFormValues = z.infer<typeof transactionFormSchema>

export interface TransactionFormProps {
  onSuccess?: () => void
}

export const EXPENSE_CATEGORIES = [
  "Food",
  "Housing",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Education",
  "Shopping",
  "Other",
] as const

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Investments", "Gifts", "Other"] as const

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]
export type IncomeCategory = typeof INCOME_CATEGORIES[number] 