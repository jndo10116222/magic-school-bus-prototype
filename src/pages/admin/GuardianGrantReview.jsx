import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminBottomNav } from '@/components/BottomNav'
import { ArrowLeft, ShieldCheck, User, School, Clock, CheckCircle2, Flag, X } from 'lucide-react'

// Grant was made 47 minutes ago — 72h window expires in 71h 13m from now
const WINDOW_SECONDS = 71 * 3600 + 13 * 60

function formatCountdown(secs) {
  if (secs <= 0) return '0h 0m 0s'
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return `${h}h ${m}m ${s}s`
}

export function GuardianGrantReview() {
  const navigate = useNavigate()
  const [remaining, setRemaining] = useState(WINDOW_SECONDS)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [flagOpen, setFlagOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  if (confirmed) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Grant confirmed</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Maria dela Cruz's legal guardian status for Juan dela Cruz has been confirmed.
              The dispute window is now closed.
            </p>
          </div>
          <Button className="w-full max-w-xs" onClick={() => navigate('/admin/dashboard')}>
            Back to dashboard
          </Button>
        </div>
        <AdminBottomNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/admin/dashboard')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Guardian grant review</p>
          <span className="font-semibold text-sm">Grant detail</span>
        </div>
        <Badge variant="warning" className="text-xs">Pending</Badge>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto">

        {/* Countdown */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">Dispute window</p>
              <p className="text-xl font-bold text-amber-800 tabular-nums">{formatCountdown(remaining)}</p>
              <p className="text-[11px] text-amber-700 mt-0.5">remaining · auto-confirms when window closes</p>
            </div>
          </CardContent>
        </Card>

        {/* Grant details */}
        <Card>
          <CardContent className="pt-4 pb-4 flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grant details</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="font-medium">Juan dela Cruz</span>
                  <span className="text-muted-foreground"> · child</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="font-medium">Maria dela Cruz</span>
                  <span className="text-muted-foreground"> · granted legal guardian</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <School className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Granted by St. Mary's School admin</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">July 3, 2026 · 8:47 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dispute status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4 pb-4 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-900">No disputes raised yet</p>
              <p className="text-xs text-green-700 mt-0.5">
                All notified parties have received email dispute links. No one has raised a concern.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-1">
          <Button className="w-full h-11" onClick={() => setConfirmOpen(true)}>
            Confirm grant now
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={() => setFlagOpen(true)}
          >
            <Flag className="h-4 w-4" />
            Flag for review
          </Button>
        </div>
      </div>

      <AdminBottomNav />

      {/* Confirm modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ maxWidth: 430, margin: '0 auto' }}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmOpen(false)} />
          <Card className="relative w-full shadow-2xl">
            <CardContent className="pt-5 pb-5 flex flex-col gap-4">
              <p className="font-semibold text-sm">Confirm grant early?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This closes the dispute window immediately. Maria dela Cruz's legal guardian
                status is confirmed and no further disputes can be raised through the automated
                system.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => { setConfirmOpen(false); setConfirmed(true) }}>
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Flag sheet */}
      {flagOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setFlagOpen(false)} />
          <div className="relative w-full bg-card rounded-t-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Flag for manual review</p>
              <button onClick={() => setFlagOpen(false)} className="p-1 text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The grant will be frozen and the school admin notified. The dispute window
              continues counting down. You can reverse or confirm the grant at any time.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setFlagOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-amber-500 hover:bg-amber-600"
                onClick={() => { setFlagOpen(false); navigate('/admin/dashboard') }}
              >
                Flag grant
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
