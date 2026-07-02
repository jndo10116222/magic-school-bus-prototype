import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ParentBottomNav } from '@/components/BottomNav'
import { Clock, Plus, User, School } from 'lucide-react'

export function ParentDashboardPending() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <p className="text-xs text-muted-foreground">Good morning,</p>
        <h1 className="text-xl font-bold tracking-tight">Maria dela Cruz</h1>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        {/* Status notice */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4 pb-4 flex gap-3">
            <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">Pending school validation</p>
              <p className="text-xs text-amber-700 mt-0.5">
                St. Mary's School is reviewing Juan's enrollment. You'll be notified once approved.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Child card */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            My children
          </p>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm">Juan dela Cruz</p>
                    <Badge variant="warning">Pending</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <School className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Grade 3 · St. Mary's School, Calamba
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted for validation — no transport booking available yet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add another child */}
        <Button
          variant="outline"
          className="w-full gap-2 border-dashed text-muted-foreground"
          onClick={() => navigate('/parent/register-child')}
        >
          <Plus className="h-4 w-4" />
          Add another child
        </Button>

        {/* Demo shortcut */}
        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
            onClick={() => navigate('/parent/dashboard-active')}
          >
            Demo: skip to active dashboard →
          </Button>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  )
}
