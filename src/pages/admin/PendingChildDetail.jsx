import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminBottomNav } from '@/components/BottomNav'
import { ArrowLeft, User, School, Calendar, Mail, CheckCircle2, AlertTriangle, X } from 'lucide-react'

const CHILDREN = {
  '1': { name: 'Juan dela Cruz',   grade: 'Grade 3', dob: 'March 12, 2016', submitted: 'July 3, 2026 · 8:14 AM', parent: 'Maria dela Cruz', email: 'maria.delacruz@gmail.com' },
  '2': { name: 'Sofia Reyes',      grade: 'Grade 1', dob: 'June 4, 2018',   submitted: 'July 3, 2026 · 5:30 AM', parent: 'Liza Reyes',       email: 'liza.reyes@gmail.com' },
  '3': { name: 'Marco Villanueva', grade: 'Grade 5', dob: 'Jan 22, 2014',   submitted: 'July 2, 2026 · 3:00 PM', parent: 'Ramon Villanueva', email: 'ramon.v@gmail.com' },
}

export function PendingChildDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const child = CHILDREN[id] ?? CHILDREN['1']

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  function handleApprove() {
    setConfirmOpen(false)
    navigate(`/admin/children/${id}/approved`)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/admin/dashboard')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Pending validation</p>
          <span className="font-semibold text-sm">Child detail</span>
        </div>
        <Badge variant="warning" className="text-xs">Pending</Badge>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto">

        {/* Child info */}
        <Card>
          <CardContent className="pt-4 pb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-base">{child.name}</p>
                <p className="text-xs text-muted-foreground">St. Mary's School, Calamba</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{child.grade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Born {child.dob}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">Submitted {child.submitted}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registering parent */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Registering parent
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{child.parent}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{child.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-green-900">Email verified</p>
                  <p className="text-[11px] text-green-700">Confirmed before this record appeared in your queue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-1">
          <Button className="w-full h-11" onClick={() => setConfirmOpen(true)}>
            Approve and assign legal guardian
          </Button>
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/5"
            onClick={() => setRejectOpen(true)}
          >
            Reject registration
          </Button>
        </div>
      </div>

      <AdminBottomNav />

      {/* Approve confirmation modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ maxWidth: 430, margin: '0 auto' }}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmOpen(false)} />
          <Card className="relative w-full shadow-2xl">
            <CardContent className="pt-5 pb-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Confirm approval</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    This will activate {child.name}'s account, grant {child.parent} legal guardian status,
                    and send an email notification. A 72-hour dispute window will open.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleApprove}>
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reject sheet */}
      {rejectOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setRejectOpen(false)} />
          <div className="relative w-full bg-card rounded-t-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Reject registration</p>
              <button onClick={() => setRejectOpen(false)} className="p-1 text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rejection is permanent — the parent must re-register the child from scratch.
              This clears any duplicate block so the correct guardian can register them.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setRejectOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => { setRejectOpen(false); navigate('/admin/dashboard') }}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
