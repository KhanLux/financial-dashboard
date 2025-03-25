export function EmptyExpense() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <h3 className="mt-2 text-lg font-semibold">No expense data</h3>
      <p className="mt-1 text-sm text-muted-foreground">Add expenses to see your spending breakdown.</p>
    </div>
  )
} 