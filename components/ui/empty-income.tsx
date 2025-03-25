export function EmptyIncome() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <h3 className="mt-2 text-lg font-semibold">No income data</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Add income transactions to see your sources breakdown.
      </p>
    </div>
  )
} 