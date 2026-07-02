import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminBottomNav } from '@/components/BottomNav'
import { ArrowLeft, Bus, FileText, Calendar, Info, CheckCircle2 } from 'lucide-react'

export function OperatorPendingDetail() {
  const navigate = useNavigate()
  const [activated, setActivated] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  if (activated) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-25" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Operator activated</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Sampaguita Transport is now active. The operator has been notified by email
              and can begin onboarding drivers and accepting route assignments.
            </p>
          </div>
          <Card className="w-full border-green-200 bg-green-50 text-left">
            <CardContent className="pt-4 pb-4 flex flex-col gap-2">
              {[
                'Operator account activated',
                'Email notification sent to operator',
                'LTFRB CPC status: verified',
                'Available for route assignment',
              ].map((line) => (
                <div key={line} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  <p className="text-xs text-green-800">{line}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="w-full flex flex-col gap-3">
            <Button className="w-full" onClick={() => navigate('/admin/super')}>
              Back to operator list
            </Button>
          </div>
        </div>
        <AdminBottomNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/admin/super')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Operator review</p>
          <span className="font-semibold text-sm">Sampaguita Transport</span>
        </div>
        <Badge variant="warning" className="text-xs">Pending</Badge>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto">

        {/* Operator profile */}
        <Card>
          <CardContent className="pt-4 pb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-base">Sampaguita Transport</p>
                <p className="text-xs text-muted-foreground">Registered July 3, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LTFRB details */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            LTFRB certification
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">CPC Number</p>
                  <p className="font-medium font-mono text-xs mt-0.5">LTFRB-CPC-2024-00421</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">CPC Expiry</p>
                  <p className="font-medium text-xs mt-0.5">December 31, 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Self-reported info */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Operator-provided information
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-4">
              {/* Years in operation */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="text-xs font-medium">Years in operation</p>
                  <button
                    className="text-muted-foreground relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip((v) => !v)}
                  >
                    <Info className="h-3.5 w-3.5" />
                    {showTooltip && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-44 bg-foreground text-background text-[11px] rounded-lg px-2.5 py-1.5 shadow-lg z-10 leading-relaxed text-left">
                        Self-reported — not independently verified by the platform.
                      </div>
                    )}
                  </button>
                </div>
                <p className="text-sm">8 years</p>
              </div>

              {/* Fleet description */}
              <div>
                <p className="text-xs font-medium mb-1">Fleet description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We operate 6 Toyota Hi-Ace units, all 2020 or newer, equipped with GPS tracking
                  and air conditioning. All drivers hold valid professional driver's licenses.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-1">
          <Button className="w-full h-11" onClick={() => setActivated(true)}>
            Activate operator
          </Button>
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/5"
            onClick={() => navigate('/admin/super')}
          >
            Reject application
          </Button>
        </div>
      </div>

      <AdminBottomNav />
    </div>
  )
}
