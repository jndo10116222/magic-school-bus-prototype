import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AdminBottomNav } from '@/components/BottomNav'
import { CheckCircle2, User, ShieldCheck, Bell, Clock } from 'lucide-react'

export function ApprovalConfirmed() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">

        {/* Success icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-25" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">Approval confirmed</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Juan dela Cruz is now active.{' '}
            <span className="font-medium text-foreground">Maria dela Cruz</span> has been
            granted legal guardian status and notified by email.
          </p>
        </div>

        {/* What happened summary */}
        <Card className="w-full text-left border-green-200 bg-green-50">
          <CardContent className="pt-4 pb-4 flex flex-col gap-3">
            <p className="text-xs font-medium text-green-900 uppercase tracking-wide">What just happened</p>
            {[
              { icon: User,        text: "Juan dela Cruz's account is now active" },
              { icon: ShieldCheck, text: 'Maria dela Cruz granted legal guardian status' },
              { icon: Bell,        text: 'Email notification sent to Maria dela Cruz' },
              { icon: Clock,       text: '72-hour dispute window opened' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2.5">
                <Icon className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <p className="text-xs text-green-800 leading-relaxed">{text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dispute window note */}
        <Card className="w-full text-left border-amber-200 bg-amber-50">
          <CardContent className="pt-4 pb-4 flex gap-2.5">
            <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-900">72-hour dispute window</p>
              <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                All guardians and the parent have received dispute links. If anyone raises a concern
                within 72 hours, the grant is frozen for super admin review. Your decision is
                reversible — you won't be locked in if something was entered incorrectly.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="w-full flex flex-col gap-3">
          <Button className="w-full" onClick={() => navigate('/admin/children/2')}>
            Review next child
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/admin/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </div>

      <AdminBottomNav />
    </div>
  )
}
