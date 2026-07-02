import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ParentBottomNav } from '@/components/BottomNav'
import { ArrowLeft, Bus, Bell, MapPin, Clock } from 'lucide-react'

const STOPS_REMAINING = [4, 3, 2, 1, 0]
const STOP_MESSAGES = [
  'Bus is 4 stops away · Estimated arrival 6:42 AM',
  'Bus is 3 stops away · Estimated arrival 6:45 AM',
  'Bus is 2 stops away · Estimated arrival 6:47 AM',
  'Next stop is Juan\'s pickup · Arriving ~6:49 AM',
  '✓ Juan boarded at 6:47 AM',
]

// Static OpenStreetMap tile — Calamba, Laguna
const MAP_URL =
  'https://staticmap.openstreetmap.de/staticmap.php?center=14.2118,121.1653&zoom=14&size=400x200&markers=14.2118,121.1653,red'

export function LiveTracking() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const boarded = step === STOPS_REMAINING.length - 1

  // Auto-advance every 4 seconds to simulate bus moving
  useEffect(() => {
    if (boarded) return
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, STOPS_REMAINING.length - 1)), 4000)
    return () => clearTimeout(t)
  }, [step, boarded])

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/parent/dashboard-active')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm">Live tracking</span>
        <Badge variant={boarded ? 'success' : 'secondary'} className="ml-auto text-xs">
          {boarded ? 'Boarded' : 'En route'}
        </Badge>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Map */}
        <div className="relative w-full bg-slate-100 overflow-hidden" style={{ height: 200 }}>
          <img
            src={MAP_URL}
            alt="Map of Calamba, Laguna showing bus route area"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if static map is unavailable
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback placeholder */}
          <div
            className="absolute inset-0 bg-slate-200 items-center justify-center flex-col gap-1 text-slate-500 text-xs"
            style={{ display: 'none' }}
          >
            <MapPin className="h-6 w-6" />
            <span>Calamba, Laguna</span>
          </div>

          {/* Bus marker — 5 discrete positions matching stop index */}
          {(() => {
            const positions = [
              { top: 120, left: 30 },   // step 0: 4 stops away, far left
              { top: 100, left: 90 },   // step 1: 3 stops away
              { top: 75,  left: 155 },  // step 2: 2 stops away, mid
              { top: 55,  left: 220 },  // step 3: next stop is Juan's
              { top: 40,  left: 290 },  // step 4: boarded, near school
            ]
            const pos = positions[step]
            return (
              <div
                className="absolute flex items-center justify-center transition-all duration-700"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className="bg-primary text-white rounded-full p-1.5 shadow-lg">
                  <Bus className="h-4 w-4" />
                </div>
              </div>
            )
          })()}
        </div>

        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Status card */}
          <Card className={boarded ? 'border-green-200 bg-green-50' : 'border-primary/20 bg-primary/5'}>
            <CardContent className="pt-4 pb-4 flex gap-3">
              <div className={`h-5 w-5 shrink-0 mt-0.5 ${boarded ? 'text-green-600' : 'text-primary'}`}>
                {boarded ? <Bell className="h-5 w-5" /> : <Bus className="h-5 w-5" />}
              </div>
              <div>
                <p className={`text-sm font-medium ${boarded ? 'text-green-900' : 'text-foreground'}`}>
                  {STOP_MESSAGES[step]}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pedro Santos · Blue Toyota Hi-Ace · AAA 1234
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stop progress */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Route progress
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Brgy. Real, Calamba', time: '6:30 AM', done: true },
                { label: 'Brgy. Parian, Calamba', time: '6:35 AM', done: step >= 1 },
                { label: 'Brgy. Mayapa, Calamba', time: '6:40 AM', done: step >= 2 },
                { label: "Juan's pickup — Brgy. Bucal", time: '6:47 AM', done: boarded, current: step === 3 },
                { label: "St. Mary's School", time: '7:10 AM', done: false },
              ].map(({ label, time, done, current }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full shrink-0 border-2 transition-colors ${
                      done
                        ? 'bg-green-500 border-green-500'
                        : current
                        ? 'bg-primary border-primary animate-pulse'
                        : 'bg-white border-muted-foreground/30'
                    }`}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <p className={`text-xs ${done || current ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {label}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  )
}
