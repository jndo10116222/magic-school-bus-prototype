import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Users, Truck, ShieldCheck, X, ArrowLeftRight } from 'lucide-react'

export function FlowSwitcher() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function go(path) {
    navigate(path)
    setOpen(false)
  }

  return (
    <div className="fixed bottom-24 right-3 z-50">
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute bottom-12 right-0 bg-white rounded-2xl shadow-xl border p-3 flex flex-col gap-1 min-w-[175px] z-50">
            <div className="flex items-center justify-between px-1 mb-1">
              <p className="text-xs text-muted-foreground font-medium">Switch demo flow</p>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <Button size="sm" variant="ghost" className="justify-start gap-2.5 h-9" onClick={() => go('/')}>
              <Users className="h-4 w-4 text-primary" />
              <div className="text-left">
                <p className="text-xs font-medium">Parent flow</p>
              </div>
            </Button>
            <Button size="sm" variant="ghost" className="justify-start gap-2.5 h-9" onClick={() => go('/parent/dashboard-active')}>
              <Users className="h-4 w-4 text-green-600" />
              <div className="text-left">
                <p className="text-xs font-medium">Parent (active)</p>
              </div>
            </Button>
            <div className="h-px bg-border my-1" />
            <Button size="sm" variant="ghost" className="justify-start gap-2.5 h-9" onClick={() => go('/driver')}>
              <Truck className="h-4 w-4 text-blue-600" />
              <div className="text-left">
                <p className="text-xs font-medium">Driver flow</p>
              </div>
            </Button>
            <div className="h-px bg-border my-1" />
            <Button size="sm" variant="ghost" className="justify-start gap-2.5 h-9" onClick={() => go('/admin/dashboard')}>
              <ShieldCheck className="h-4 w-4 text-violet-600" />
              <div className="text-left">
                <p className="text-xs font-medium">School admin</p>
              </div>
            </Button>
            <Button size="sm" variant="ghost" className="justify-start gap-2.5 h-9" onClick={() => go('/admin/super')}>
              <ShieldCheck className="h-4 w-4 text-orange-600" />
              <div className="text-left">
                <p className="text-xs font-medium">Super admin</p>
              </div>
            </Button>
          </div>
        </>
      )}

      <Button
        size="sm"
        className="rounded-full shadow-lg h-10 w-10 p-0"
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch demo flow"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
