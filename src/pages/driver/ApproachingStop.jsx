import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DriverBottomNav } from '@/components/BottomNav'
import { ArrowLeft, MapPin, Users, Eye, EyeOff, ChevronRight } from 'lucide-react'

const CHILDREN = [
  { name: 'Juan dela Cruz', grade: 'Grade 3' },
  { name: 'Ana Reyes',      grade: 'Grade 2' },
  { name: 'Carlo Santos',   grade: 'Grade 4' },
]

export function ApproachingStop() {
  const navigate = useNavigate()
  const [revealed, setRevealed] = useState(false)
  const [revealing, setRevealing] = useState(false)

  function handleReveal() {
    setRevealing(true)
    setTimeout(() => {
      setRevealing(false)
      setRevealed(true)
    }, 600)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/driver/route')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Stop 3 of 4</p>
          <span className="font-semibold text-sm">Approaching stop</span>
        </div>
        <Badge variant="secondary" className="text-xs">6:40 AM</Badge>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-5">
        {/* Address reveal card */}
        <Card className={`border-2 transition-colors duration-300 ${revealed ? 'border-green-400 bg-green-50' : 'border-primary/30 bg-primary/5'}`}>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full shrink-0 ${revealed ? 'bg-green-100' : 'bg-primary/10'}`}>
                <MapPin className={`h-5 w-5 ${revealed ? 'text-green-600' : 'text-primary'}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Pickup address
                </p>

                {/* Address with reveal transition */}
                <div className="relative min-h-[28px]">
                  <p
                    className={`text-lg font-bold absolute inset-0 transition-opacity duration-400 ${
                      revealed || revealing ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <span className="tracking-widest text-muted-foreground select-none">•••</span>
                    <span className="text-foreground"> Calamba, Laguna</span>
                  </p>
                  <p
                    className={`text-lg font-bold transition-opacity duration-500 ${
                      revealed ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    123 Maharlika St., Brgy. Bucal, Calamba, Laguna
                  </p>
                </div>

                {!revealed && (
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                    <EyeOff className="h-3 w-3" />
                    Hidden until you arrive at this stop
                  </p>
                )}
                {revealed && (
                  <p className="text-xs text-green-700 mt-1.5 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Address revealed at arrival
                  </p>
                )}
              </div>
            </div>

            {!revealed && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 gap-2"
                onClick={handleReveal}
                disabled={revealing}
              >
                {revealing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
                    Unlocking address…
                  </span>
                ) : (
                  <>
                    <MapPin className="h-3.5 w-3.5" />
                    I'm at this stop — reveal address
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Privacy explainer — only while hidden */}
        {!revealed && (
          <Card className="border-dashed border-amber-300 bg-amber-50">
            <CardContent className="pt-4 pb-4 flex gap-2">
              <EyeOff className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-semibold">Privacy protection:</span> Full home addresses are only
                shown at the moment of pickup — never before. This protects families if a device is lost
                while the route is in progress.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Children at this stop */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Children at this stop
          </p>
          <div className="flex flex-col gap-2">
            {CHILDREN.map((child) => (
              <div key={child.name} className="flex items-center gap-3 py-2.5 px-3 border rounded-xl bg-card">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{child.name}</p>
                  <p className="text-xs text-muted-foreground">{child.grade}</p>
                </div>
                <Badge variant="warning" className="text-xs">Awaiting</Badge>
              </div>
            ))}
          </div>
        </div>

        {revealed && (
          <Button className="w-full h-11 gap-2" onClick={() => navigate('/driver/scan')}>
            Scan boarding QR codes
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <DriverBottomNav />
    </div>
  )
}
