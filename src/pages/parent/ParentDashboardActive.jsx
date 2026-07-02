import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ParentBottomNav } from '@/components/BottomNav'
import { QrCode, MapPin, Clock, User, School, Bus, Bell } from 'lucide-react'

export function ParentDashboardActive() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <p className="text-xs text-muted-foreground">Good morning,</p>
        <h1 className="text-xl font-bold tracking-tight">Maria dela Cruz</h1>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        {/* Boarding notification */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4 pb-4 flex gap-3">
            <Bell className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Juan boarded at 6:47 AM</p>
              <p className="text-xs text-green-700 mt-0.5">
                Scanned by Pedro Santos · Blue Toyota Hi-Ace AAA 1234
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tomorrow's booking */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Tomorrow's trip
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Sampaguita Transport</span>
                </div>
                <Badge variant="success">Confirmed</Badge>
              </div>
              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Pickup 6:45 AM · Drop-off ~7:30 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" />
                  <span>Pedro Santos · Blue Toyota Hi-Ace</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <School className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Grade 3 · St. Mary's School, Calamba
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 flex-col gap-1.5 text-xs"
            onClick={() => navigate('/parent/qr')}
          >
            <QrCode className="h-5 w-5 text-primary" />
            Show QR code
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col gap-1.5 text-xs"
            onClick={() => navigate('/parent/tracking')}
          >
            <MapPin className="h-5 w-5 text-primary" />
            Track bus
          </Button>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  )
}
