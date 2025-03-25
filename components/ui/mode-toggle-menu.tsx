import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ModeToggleMenuProps } from "@/types/mode-toggle"

export function ModeToggleMenu({ onThemeChange }: ModeToggleMenuProps) {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => onThemeChange("light")}>Light</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onThemeChange("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onThemeChange("system")}>System</DropdownMenuItem>
    </DropdownMenuContent>
  )
} 