"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggleMenu } from "@/components/ui/mode-toggle-menu"
import { ModeToggleProps } from "@/types/mode-toggle"

export function ModeToggle({ className, onThemeChange }: ModeToggleProps) {
  const { setTheme } = useTheme()

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    onThemeChange?.(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <ModeToggleMenu onThemeChange={handleThemeChange} />
    </DropdownMenu>
  )
}

