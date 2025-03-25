import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useTransactions } from "@/contexts/transaction-context"
import { TransactionFormValues, transactionFormSchema } from "@/types/transaction-form"

export function useTransactionForm(onSuccess?: () => void) {
  const { toast } = useToast()
  const { addTransaction } = useTransactions()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: undefined,
      category: "",
      description: "",
      date: new Date(),
      type: "expense",
    },
  })

  const handleSubmit = async (values: TransactionFormValues) => {
    try {
      setIsSubmitting(true)
      await addTransaction(values)
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        toast({
          title: "Transaction added",
          description: `${values.type === "income" ? "Income" : "Expense"} of $${values.amount} added successfully.`,
        })

        form.reset({
          amount: undefined,
          category: "",
          description: "",
          date: new Date(),
          type: "expense",
        })

        onSuccess?.()
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    isSubmitting,
    showSuccess,
    handleSubmit,
  }
} 