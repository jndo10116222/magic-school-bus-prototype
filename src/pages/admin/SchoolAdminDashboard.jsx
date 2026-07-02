import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminBottomNav } from '@/components/BottomNav'
import { Users, CheckCircle2, ShieldCheck, ChevronRight, Clock, AlertTriangle } from 'lucide-react'

const PENDING_CHILDREN = [
  { id: '1', name: 'Juan dela Cruz',   grade: 'Grade 3', parent: 'Maria dela Cruz',   submitted: '2 hours ago' },
  { id: '2', name: 'Sofia Reyes',      grade: 'Grade 1', parent: 'Liza Reyes',        submitted: '5 hours ago' },
  { id: '3', name: 'Marco Villanueva', grade: 'Grade 5', parent: 'Ramon Villanueva',  submitted: 'Yesterday' },
]

export function SchoolAdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <p className="text-xs text-muted-foreground">School admin</p>
        <h1 className="text-xl font-bold tracking-tight">St. Mary's School</h1>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-5">

        {/* ── PRIMARY: Pending validation ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Pending validation
            </p>
            <Badge variant="destructive" className="text-xs">3 awaiting review</Badge>
          </div>

          <Card className="border-red-200 shadow-sm">
            <CardContent className="pt-0 pb-0 divide-y divide-border">
              {PENDING_CHILDREN.map((child) => (
                <button
                  key={child.id}
                  className="w-full flex items-center gap-3 py-3.5 text-left hover:bg-muted/40 transition-colors px-1 -mx-1 rounded"
                  onClick={() => navigate(`/admin/children/${child.id}`)}
                >
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{child.name}</p>
                    <p className="text-xs text-muted-foreground">{child.grade} · {child.parent} · {child.submitted}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Button
            className="w-full mt-2"
            onClick={() => navigate('/admin/children/1')}
          >
            Review next child
          </Button>
        </div>

        {/* ── Active children ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Active children
            </p>
            <Badge variant="success" className="text-xs">12 active</Badge>
          </div>
          <Card>
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">12 enrolled children</p>
                <p className="text-xs text-muted-foreground">All active with confirmed legal guardians</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Guardian grants ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Guardian grants
            </p>
            <Badge variant="warning" className="text-xs">1 pending window</Badge>
          </div>
          <Card className="border-amber-200">
            <CardContent className="pt-4 pb-4">
              <button
                className="w-full flex items-center gap-3 text-left"
                onClick={() => navigate('/admin/guardian-grants/grant-1')}
              >
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Juan dela Cruz</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3 text-amber-600" />
                    <p className="text-xs text-amber-700">71 hrs 23 min remaining · No disputes</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            </CardContent>
          </Card>
        </div>

      </div>

      <AdminBottomNav />
    </div>
  )
}
