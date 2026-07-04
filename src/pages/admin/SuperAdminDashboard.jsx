import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminBottomNav } from '@/components/BottomNav'
import { Bus, ChevronRight, AlertTriangle, CheckCircle2, Clock, School } from 'lucide-react'

const SCHOOLS = [
  {
    id: 'school-1',
    name: 'Maliwanag Elementary School',
    depedId: '300175',
    city: 'Quezon City',
    status: 'pending',
    submitted: 'Jul 4, 2026',
  },
]

const OPERATORS = [
  {
    id: 'op-1',
    name: 'Sampaguita Transport',
    cpc: 'LTFRB-CPC-2024-00421',
    status: 'pending',
    detail: 'Awaiting super admin review',
    submitted: 'Jul 3, 2026',
  },
  {
    id: 'op-2',
    name: 'Mabuhay Shuttle Services',
    cpc: 'LTFRB-CPC-2023-00187',
    status: 'active',
    detail: '4 active drivers · 3 schools served',
    submitted: null,
  },
  {
    id: 'op-3',
    name: 'Metro Kids Transport',
    cpc: 'LTFRB-CPC-2022-00093',
    status: 'expiring',
    detail: 'CPC expires in 14 days · Action required',
    submitted: null,
  },
]

function statusBadge(status) {
  if (status === 'pending')  return <Badge variant="warning" className="text-xs">Pending</Badge>
  if (status === 'active')   return <Badge variant="success" className="text-xs">Active</Badge>
  if (status === 'expiring') return <Badge className="text-xs bg-amber-500 hover:bg-amber-500">CPC expiring</Badge>
  return null
}

function statusIcon(status) {
  if (status === 'pending')  return <Clock className="h-5 w-5 text-amber-600" />
  if (status === 'active')   return <CheckCircle2 className="h-5 w-5 text-green-600" />
  if (status === 'expiring') return <AlertTriangle className="h-5 w-5 text-amber-500" />
  return <Bus className="h-5 w-5 text-muted-foreground" />
}

function cardBorder(status) {
  if (status === 'pending')  return 'border-amber-200'
  if (status === 'expiring') return 'border-amber-300 bg-amber-50/50'
  return ''
}

export function SuperAdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="px-4 py-4 border-b">
        <p className="text-xs text-muted-foreground">Super admin</p>
        <h1 className="text-xl font-bold tracking-tight">Operator management</h1>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Schools section */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Schools
          </p>
          <div className="flex flex-col gap-3">
            {SCHOOLS.map((school) => (
              <Card key={school.id} className="border-amber-200">
                <CardContent className="pt-4 pb-4">
                  <button
                    className="w-full flex items-start gap-3 text-left"
                    onClick={() => navigate(`/admin/schools/${school.id}`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{school.name}</p>
                        <Badge variant="warning" className="text-xs shrink-0">Pending</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        DepEd ID · {school.depedId} · {school.city}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Submitted {school.submitted}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Operators section */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Operators
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: '1 pending', sub: 'awaiting review', color: 'text-amber-600' },
            { label: '1 active',  sub: 'verified LTFRB',  color: 'text-green-600' },
            { label: '1 expiring', sub: 'CPC < 30 days',  color: 'text-amber-500' },
          ].map(({ label, sub, color }) => (
            <Card key={label}>
              <CardContent className="pt-3 pb-3">
                <p className={`text-xs font-bold ${color}`}>{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Operator cards */}
        <div className="flex flex-col gap-3">
          {OPERATORS.map((op) => (
            <Card key={op.id} className={cardBorder(op.status)}>
              <CardContent className="pt-4 pb-4">
                <button
                  className="w-full flex items-start gap-3 text-left"
                  onClick={() => op.status === 'pending' && navigate(`/admin/operators/${op.id}`)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    op.status === 'active' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {statusIcon(op.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-tight">{op.name}</p>
                      {statusBadge(op.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{op.cpc}</p>
                    <p className={`text-xs mt-1 ${op.status === 'expiring' ? 'text-amber-700 font-medium' : 'text-muted-foreground'}`}>
                      {op.detail}
                    </p>
                    {op.status === 'expiring' && (
                      <div className="flex items-center gap-1.5 mt-1.5 bg-amber-100 rounded px-2 py-1 w-fit">
                        <AlertTriangle className="h-3 w-3 text-amber-600" />
                        <span className="text-[11px] text-amber-800 font-medium">Manual review required</span>
                      </div>
                    )}
                  </div>
                  {op.status === 'pending' && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  )}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full" onClick={() => navigate('/admin/operators/op-1')}>
          Review pending operator
        </Button>
      </div>

      <AdminBottomNav />
    </div>
  )
}
