import { Wallet } from "lucide-react"
import { SidebarBalanceProps } from "@/types/sidebar"
import { useTransactions } from "@/contexts/transaction-context"

export function SidebarBalance() {
  const { transactions } = useTransactions()
  
  const balance = transactions.reduce((total, transaction) => {
    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount)
  }, 0)

  return (
    <div className="mt-auto border-t p-4">
      <div className="flex items-center gap-3 rounded-md bg-muted p-3">
        <Wallet className="h-5 w-5 text-primary" />
        <div className="hidden md:block">
          <p className="text-xs font-medium">Total Balance</p>
          <p className="text-sm font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
} 