import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <h1 className="text-xl font-bold md:text-2xl">Financial Dashboard</h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

