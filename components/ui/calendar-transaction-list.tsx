import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { Transaction } from "@/types/transaction"

interface CalendarTransactionListProps {
  transactions: Transaction[]
  isLoaded: boolean
  selectedDate: Date | undefined
}

export function CalendarTransactionList({ transactions, isLoaded, selectedDate }: CalendarTransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
        <h3 className="mt-2 text-lg font-semibold">No transactions</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {selectedDate ? "There are no transactions for this date." : "Select a date to view transactions."}
        </p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <AnimatedContainer
            key={transaction.id}
            animation="slide"
            direction="right"
            delay={index === 0 ? "none" : index === 1 ? "short" : "medium"}
            show={isLoaded}
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
  )
} 