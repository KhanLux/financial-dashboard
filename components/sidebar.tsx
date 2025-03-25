"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, DollarSign, Home, PieChart, Settings, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/statistics",
      icon: PieChart,
      label: "Statistics",
    },
    {
      href: "/calendar",
      icon: CalendarDays,
      label: "Calendar",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-screen w-16 flex-col border-r bg-card transition-all duration-300 ease-in-out hover:w-64 md:w-64">
      <div className="flex h-16 items-center justify-center border-b md:justify-start md:px-6">
        <DollarSign className="h-6 w-6 text-primary md:mr-2" />
        <span className="hidden text-lg font-bold md:inline-block">FinTrack</span>
      </div>
      <nav className="flex flex-1 flex-col gap-2 p-4">
        {routes.map((route) => {
          const isActive = pathname === route.href

          return (
            <Button
              key={route.href}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "relative flex h-10 w-full justify-start",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                "transition-all duration-200 ease-in-out",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5 md:mr-2" />
                <span className="absolute left-12 whitespace-nowrap opacity-0 transition-all duration-200 md:static md:opacity-100">
                  {route.label}
                </span>
                {isActive && <span className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full md:w-1" />}
              </Link>
            </Button>
          )
        })}
      </nav>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-md bg-muted p-3">
          <Wallet className="h-5 w-5 text-primary" />
          <div className="hidden md:block">
            <p className="text-xs font-medium">Total Balance</p>
            <p className="text-sm font-bold">$4,550.00</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

