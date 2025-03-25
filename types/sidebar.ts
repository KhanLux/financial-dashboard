import { LucideIcon } from "lucide-react"

export interface SidebarRoute {
  href: string
  icon: LucideIcon
  label: string
}

export interface SidebarProps {
  className?: string
  routes?: SidebarRoute[]
  balance?: number
  title?: string
}

export interface SidebarNavProps {
  routes: SidebarRoute[]
}

export interface SidebarBalanceProps {
  balance: number
} 