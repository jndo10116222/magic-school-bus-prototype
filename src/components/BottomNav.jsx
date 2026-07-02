import { useNavigate, useLocation } from 'react-router-dom'
import { Home, QrCode, MapPin, User, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

// Bottom nav is fixed-position but must respect the 430px container.
// We achieve this by constraining left/right via max-w and mx-auto.
const navClass =
  'fixed bottom-0 inset-x-0 max-w-[430px] mx-auto bg-white border-t flex justify-around py-2 z-40'

export function ParentBottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    { label: 'Home',    icon: Home,    path: '/parent/dashboard-active' },
    { label: 'Track',   icon: MapPin,  path: '/parent/tracking' },
    { label: 'QR Code', icon: QrCode,  path: '/parent/qr' },
  ]

  return (
    <nav className={navClass}>
      {items.map(({ label, icon: Icon, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-1 text-xs',
            pathname.startsWith(path.split('/').slice(0, 3).join('/')) && pathname === path
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  )
}

export function DriverBottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    { label: 'Route', icon: MapPin, path: '/driver/route' },
    { label: 'Scan',  icon: QrCode, path: '/driver/scan' },
  ]

  return (
    <nav className={navClass}>
      {items.map(({ label, icon: Icon, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-1 text-xs',
            pathname.startsWith(path) ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  )
}

export function AdminBottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    { label: 'School',    icon: Home,   path: '/admin/dashboard' },
    { label: 'Children',  icon: User,   path: '/admin/children/1' },
    { label: 'Super',     icon: Shield, path: '/admin/super' },
  ]

  return (
    <nav className={navClass}>
      {items.map(({ label, icon: Icon, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-1 text-xs',
            pathname.startsWith(path.split('/').slice(0, 3).join('/')) && label === 'Children'
              ? pathname.includes('/children') ? 'text-primary' : 'text-muted-foreground'
              : pathname === path ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  )
}
