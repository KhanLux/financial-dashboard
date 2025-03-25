"use client"

import { DollarSign, Home, PieChart, CalendarDays, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { SidebarBalance } from "@/components/ui/sidebar-balance"
import { SidebarProps, SidebarRoute } from "@/types/sidebar"

const defaultRoutes: SidebarRoute[] = [
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

export function Sidebar({ className, routes = defaultRoutes, balance = 4550.0, title = "FinTrack" }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-screen w-16 flex-col border-r bg-card transition-all duration-300 ease-in-out hover:w-64 md:w-64",
        className,
      )}
    >
      <div className="flex h-16 items-center justify-center border-b md:justify-start md:px-6">
        <DollarSign className="h-6 w-6 text-primary md:mr-2" />
        <span className="hidden text-lg font-bold md:inline-block">{title}</span>
      </div>
      <SidebarNav routes={routes} />
      <SidebarBalance balance={balance} />
    </aside>
  )
}

