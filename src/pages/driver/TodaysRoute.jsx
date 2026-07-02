import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DriverBottomNav } from '@/components/BottomNav'
import { MapPin, Clock, Users, ChevronRight, Bus, Settings, X, RotateCcw } from 'lucide-react'

const INITIAL_STOPS = [
  { id: 1, label: 'Stop 1', sub: 'Brgy. Real, Calamba',   time: '6:30 AM', children: 2, done: true  },
  { id: 2, label: 'Stop 2', sub: 'Brgy. Parian, Calamba', time: '6:35 AM', children: 1, done: true  },
  { id: 3, label: 'Stop 3', sub: 'Brgy. Mayapa, Calamba', time: '6:40 AM', children: 3, done: false, current: true },
  { id: 4, label: 'Stop 4', sub: 'Brgy. Bucal, Calamba',  time: '6:47 AM', children: 1, done: false },
  { id: 5, label: "St. Mary's School", sub: 'Drop-off',   time: '7:10 AM', children: null, done: false, isSchool: true },
]

const RESET_STOPS = [
  { id: 1, label: 'Stop 1', sub: 'Brgy. Real, Calamba',   time: '6:30 AM', children: 2, done: false, current: true },
  { id: 2, label: 'Stop 2', sub: 'Brgy. Parian, Calamba', time: '6:35 AM', children: 1, done: false },
  { id: 3, label: 'Stop 3', sub: 'Brgy. Mayapa, Calamba', time: '6:40 AM', children: 3, done: false },
  { id: 4, label: 'Stop 4', sub: 'Brgy. Bucal, Calamba',  time: '6:47 AM', children: 1, done: false },
  { id: 5, label: "St. Mary's School", sub: 'Drop-off',   time: '7:10 AM', children: null, done: false, isSchool: true },
]

export function TodaysRoute() {
  const navigate = useNavigate()
  const [stops, setStops] = useState(INITIAL_STOPS)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const doneCount = stops.filter((s) => s.done).length
  const remainingChildren = stops.filter((s) => !s.done && !s.isSchool).reduce((sum, s) => sum + (s.children ?? 0), 0)

  function handleReset() {
    setStops(RESET_STOPS)
    setSettingsOpen(false)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Thursday, Jul 3 · Morning run</p>
            <h1 className="text-xl font-bold tracking-tight">Today's route</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs gap-1.5">
              <Bus className="h-3 w-3" />
              On route
            </Badge>
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Demo settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: MapPin, label: '5 stops',    sub: `${5 - doneCount} remaining` },
            { icon: Users, label: '7 children',  sub: `${remainingChildren} remaining` },
            { icon: Clock, label: '7:10 AM',     sub: 'ETA school' },
          ].map(({ icon: Icon, label, sub }) => (
            <Card key={label}>
              <CardContent className="pt-3 pb-3 flex flex-col items-center gap-0.5">
                <Icon className="h-4 w-4 text-primary mb-0.5" />
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-[11px] text-muted-foreground">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stop list */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Stops
          </p>
          <div className="flex flex-col gap-2">
            {stops.map((stop) => (
              <button
                key={stop.id}
                className={`w-full text-left rounded-xl border px-4 py-3 flex items-center gap-3 transition-colors ${
                  stop.current
                    ? 'border-primary bg-primary/5'
                    : stop.done
                    ? 'border-muted bg-muted/30 opacity-60'
                    : 'border-border bg-card'
                }`}
                onClick={() => stop.current && navigate('/driver/approaching')}
                disabled={stop.done || stop.isSchool}
              >
                <div
                  className={`w-3 h-3 rounded-full shrink-0 border-2 ${
                    stop.done
                      ? 'bg-green-500 border-green-500'
                      : stop.current
                      ? 'bg-primary border-primary animate-pulse'
                      : 'bg-white border-muted-foreground/40'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-medium truncate ${stop.done ? 'line-through text-muted-foreground' : ''}`}>
                      {stop.label}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">{stop.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 flex-wrap">
                    {stop.sub}
                    {stop.children != null && (
                      <span className="flex items-center gap-1 ml-1">
                        · <Users className="h-3 w-3" /> {stop.children}
                      </span>
                    )}
                    {stop.current && (
                      <Badge variant="secondary" className="ml-1 text-[10px] py-0 h-4">Current</Badge>
                    )}
                  </p>
                </div>
                {stop.current && <ChevronRight className="h-4 w-4 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full h-11 mt-auto"
          onClick={() => navigate('/driver/approaching')}
        >
          Go to current stop
        </Button>
      </div>

      <DriverBottomNav />

      {/* Demo settings panel */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 430, margin: '0 auto' }}>
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSettingsOpen(false)}
          />
          <div className="relative w-full bg-card rounded-t-2xl p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-base">Demo controls</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Not visible in the live product</p>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-px bg-border" />

            <button
              onClick={handleReset}
              className="flex items-center gap-3 w-full rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-left hover:bg-amber-100 transition-colors"
            >
              <RotateCcw className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-900">Reset demo data</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Clears all completed stops. Stop 1 becomes current.
                </p>
              </div>
            </button>

            <p className="text-[11px] text-muted-foreground text-center">
              This panel only appears because this is a prototype.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
