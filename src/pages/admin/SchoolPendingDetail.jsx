import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AdminBottomNav } from '@/components/BottomNav'
import {
  ArrowLeft, School, MapPin, User, Phone, Mail,
  CheckCircle2, AlertTriangle,
} from 'lucide-react'

export function SchoolPendingDetail() {
  const navigate = useNavigate()
  const [activated, setActivated] = useState(false)
  const [lat, setLat]             = useState('')
  const [lng, setLng]             = useState('')

  const coordsMissing = lat.trim() === '' || lng.trim() === ''

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
            <h1 className="text-xl font-bold">School activated</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Maliwanag Elementary School is now active. The school admin has been
              notified and can begin validating children.
            </p>
          </div>
          <Card className="w-full border-green-200 bg-green-50 text-left">
            <CardContent className="pt-4 pb-4 flex flex-col gap-2">
              {[
                'School account activated',
                'Email notification sent to school admin',
                coordsMissing
                  ? 'Route coordinates: not set — add later via Django admin'
                  : `Route coordinates set: ${lat}, ${lng}`,
              ].map((line) => (
                <div key={line} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  <p className="text-xs text-green-800">{line}</p>
                </div>
              ))}
              {coordsMissing && (
                <div className="flex items-start gap-2 mt-1 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Route generation will not work for this school until coordinates are added.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="w-full">
            <Button className="w-full" onClick={() => navigate('/admin/super')}>
              Back to dashboard
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
          <p className="text-xs text-muted-foreground">School review</p>
          <span className="font-semibold text-sm">Maliwanag Elementary School</span>
        </div>
        <Badge variant="warning" className="text-xs">Pending</Badge>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto">

        {/* School identity */}
        <Card>
          <CardContent className="pt-4 pb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <School className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-base">Maliwanag Elementary School</p>
                <p className="text-xs text-muted-foreground">DepEd ID · 300175</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Location
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium text-xs mt-0.5">
                    123 Kalayaan Avenue, Quezon City, Metro Manila
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Region IV-A (CALABARZON) · Quezon City
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registering admin */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Registering admin
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <User className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium text-xs mt-0.5">Maria Santos</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-xs mt-0.5">m.santos@maliwanag.edu.ph</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-xs mt-0.5">+63 917 555 0192</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route coordinates — optional, with warning if empty */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Route coordinates
          </p>
          <Card>
            <CardContent className="pt-4 pb-4 flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label htmlFor="lat" className="text-xs">Latitude</Label>
                  <Input
                    id="lat"
                    inputMode="decimal"
                    placeholder="e.g. 14.6760"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="text-sm h-9"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label htmlFor="lng" className="text-xs">Longitude</Label>
                  <Input
                    id="lng"
                    inputMode="decimal"
                    placeholder="e.g. 121.0437"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="text-sm h-9"
                  />
                </div>
              </div>

              {/* Amber warning — shown when either field is empty */}
              {coordsMissing && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Route generation will not work for this school until coordinates are added.
                    You can activate now and add them later via the admin panel.
                  </p>
                </div>
              )}

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                WGS 84 decimal degrees. Use Google Maps or a geocoding tool to find the
                school's exact coordinates. Must be within the Philippines (lat 4.5–21.0,
                lng 116.0–127.0).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-1">
          <Button className="w-full h-11" onClick={() => setActivated(true)}>
            Activate school
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
