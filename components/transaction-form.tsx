"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Plus, CheckCircle } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useTransactions } from "@/contexts/transaction-context"
import { AnimatedContainer } from "@/components/ui/animated-container"

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  date: z.date(),
  type: z.enum(["income", "expense"]),
})

export function TransactionForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addTransaction } = useTransactions()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      category: "",
      description: "",
      date: new Date(),
      type: "expense",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Use the context to add the transaction
    addTransaction(values)

    // Show success animation
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      setIsSubmitting(false)

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
    }, 1500)
  }

  const expenseCategories = [
    "Food",
    "Housing",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Education",
    "Shopping",
    "Other",
  ]

  const incomeCategories = ["Salary", "Freelance", "Investments", "Gifts", "Other"]

  const transactionType = form.watch("type")
  const categories = transactionType === "income" ? incomeCategories : expenseCategories

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>Record your income or expenses</CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess ? (
          <AnimatedContainer animation="scale" className="flex h-[350px] flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Transaction Added!</h3>
            <p className="mt-2 text-center text-muted-foreground">Your transaction has been successfully recorded.</p>
          </AnimatedContainer>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AnimatedContainer animation="fade" delay="none">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="expense">Expense</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedContainer>

              <AnimatedContainer animation="fade" delay="short">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <Input placeholder="0.00" {...field} className="pl-8" type="number" step="0.01" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedContainer>

              <AnimatedContainer animation="fade" delay="medium">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedContainer>

              <AnimatedContainer animation="fade" delay="long">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Transaction description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedContainer>

              <AnimatedContainer animation="fade" delay="long">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedContainer>

              <AnimatedContainer animation="slide" direction="up" delay="long">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Adding..."
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Transaction
                    </>
                  )}
                </Button>
              </AnimatedContainer>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

