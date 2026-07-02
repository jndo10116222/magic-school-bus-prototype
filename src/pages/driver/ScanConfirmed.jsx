import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DriverBottomNav } from '@/components/BottomNav'
import { CheckCircle2, Clock, User, Bus } from 'lucide-react'

export function ScanConfirmed() {
  const navigate = useNavigate()
  const now = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
        {/* Success icon with ripple */}
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-30" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Boarded!</h1>
          <p className="text-sm text-muted-foreground mt-1">Scan confirmed · {now}</p>
        </div>

        {/* Child details */}
        <Card className="w-full border-green-200 bg-green-50 text-left">
          <CardContent className="pt-4 pb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-sm text-green-900">Juan dela Cruz</p>
                <p className="text-xs text-green-700">Grade 3 · St. Mary's School</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-green-800 border-t border-green-200 pt-3">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>Boarded at {now} · Stop 3 — Brgy. Bucal</span>
              </div>
              <div className="flex items-center gap-2">
                <Bus className="h-3.5 w-3.5" />
                <span>Sampaguita Transport · Unit 7 · AAA 1234</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          Maria dela Cruz has been notified that Juan boarded.
        </p>

        <div className="w-full flex flex-col gap-3">
          <Button className="w-full h-11" onClick={() => navigate('/driver/scan')}>
            Scan next child
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/driver/route')}>
            Back to route
          </Button>
        </div>
      </div>

      <DriverBottomNav />
    </div>
  )
}
