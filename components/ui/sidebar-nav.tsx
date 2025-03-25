import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SidebarNavProps } from "@/types/sidebar"

export function SidebarNav({ routes }: SidebarNavProps) {
  const pathname = usePathname()

  return (
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
  )
} 