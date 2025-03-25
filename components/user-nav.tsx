import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserNavMenu } from "@/components/ui/user-nav-menu"
import { UserNavProps } from "@/types/user-nav"

const defaultUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "/placeholder.svg",
  avatarFallback: "JD",
}

export function UserNav({
  className,
  user = defaultUser,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`relative h-8 w-8 rounded-full ${className}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={`${user.name}'s avatar`} />
            <AvatarFallback>{user.avatarFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <UserNavMenu
        user={user}
        onProfileClick={onProfileClick}
        onSettingsClick={onSettingsClick}
        onLogoutClick={onLogoutClick}
      />
    </DropdownMenu>
  )
}

