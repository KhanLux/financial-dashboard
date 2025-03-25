export interface UserNavProps {
  className?: string
  user?: {
    name: string
    email: string
    avatarUrl?: string
    avatarFallback?: string
  }
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onLogoutClick?: () => void
}

export interface UserNavMenuProps {
  user: {
    name: string
    email: string
  }
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onLogoutClick?: () => void
} 