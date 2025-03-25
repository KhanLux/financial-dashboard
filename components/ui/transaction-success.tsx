import { CheckCircle } from "lucide-react"
import { AnimatedContainer } from "@/components/ui/animated-container"

export function TransactionSuccess() {
  return (
    <AnimatedContainer animation="scale" className="flex h-[350px] flex-col items-center justify-center">
      <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="mt-4 text-xl font-semibold">Transaction Added!</h3>
      <p className="mt-2 text-center text-muted-foreground">Your transaction has been successfully recorded.</p>
    </AnimatedContainer>
  )
} 