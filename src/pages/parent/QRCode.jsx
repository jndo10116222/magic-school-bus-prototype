import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { ParentBottomNav } from '@/components/BottomNav'
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react'

// Minimal inline QR-like SVG — a 7×7 grid that looks like a real QR code
// without needing an external library for a demo
function DemoQR() {
  // Simplified QR pattern (finder squares + random data modules)
  const size = 280
  const modules = 21
  const cell = size / modules

  // Hardcoded pattern that resembles a QR code visually
  const dark = new Set([
    // Top-left finder
    ...[0,1,2,3,4,5,6].flatMap(r => [0,1,2,3,4,5,6].map(c => `${r},${c}`)),
    // Top-right finder
    ...[0,1,2,3,4,5,6].flatMap(r => [14,15,16,17,18,19,20].map(c => `${r},${c}`)),
    // Bottom-left finder
    ...[14,15,16,17,18,19,20].flatMap(r => [0,1,2,3,4,5,6].map(c => `${r},${c}`)),
    // Clear inner of finders (white)
  ])

  // Remove inner white squares from finders
  ;[1,2,3,4,5].forEach(r => [1,2,3,4,5].forEach(c => dark.delete(`${r},${c}`)))
  ;[2,3,4].forEach(r => [2,3,4].forEach(c => dark.add(`${r},${c}`)))
  ;[1,2,3,4,5].forEach(r => [15,16,17,18,19].forEach(c => dark.delete(`${r},${c}`)))
  ;[2,3,4].forEach(r => [16,17,18].forEach(c => dark.add(`${r},${c}`)))
  ;[15,16,17,18,19].forEach(r => [1,2,3,4,5].forEach(c => dark.delete(`${r},${c}`)))
  ;[16,17,18].forEach(r => [2,3,4].forEach(c => dark.add(`${r},${c}`)))

  // Fake data modules for visual appearance
  const dataPattern = [
    '8,0','8,2','8,4','8,6','9,1','9,3','10,0','10,5','11,2','11,4','12,1','12,3',
    '0,8','2,8','4,8','6,8','8,9','8,11','8,13','9,10','9,12','10,9','10,11',
    '8,8','9,9','10,10','11,11','12,12','13,13','11,8','11,9','12,9','13,8',
    '8,14','8,16','8,18','8,20','9,15','9,17','10,14','10,19','11,16','12,15',
    '14,8','16,8','18,8','20,8','15,9','17,9','14,10','19,10','16,11','15,12',
    '14,14','15,15','16,16','17,17','18,18','19,19','20,20','14,16','16,14',
    '14,18','18,14','15,20','20,15','16,19','19,16','17,20','20,17',
  ]
  dataPattern.forEach(k => dark.add(k))

  const rects = []
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (dark.has(`${r},${c}`)) {
        rects.push(
          <rect
            key={`${r},${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            fill="#1e293b"
          />
        )
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl">
      <rect width={size} height={size} fill="white" />
      {rects}
    </svg>
  )
}

export function QRCode() {
  const navigate = useNavigate()

  // Simulated expiry — midnight tonight
  const midnight = new Date()
  midnight.setHours(23, 59, 0, 0)
  const timeStr = midnight.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
  const today = new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] pb-16">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/parent/dashboard-active')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm">Boarding QR code</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
        {/* Validity banner */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 text-xs text-amber-800">
          <Clock className="h-3.5 w-3.5" />
          Valid until midnight tonight · {timeStr}
        </div>

        {/* QR code */}
        <div className="p-4 bg-white rounded-2xl shadow-lg border">
          <DemoQR />
        </div>

        {/* Child identity */}
        <div className="text-center">
          <p className="text-xl font-bold">Juan dela Cruz</p>
          <p className="text-sm text-muted-foreground">Grade 3 · St. Mary's School, Calamba</p>
          <p className="text-xs text-muted-foreground mt-1">{today}</p>
          <p className="text-[11px] text-muted-foreground/60 mt-2 italic">
            Demo only — codes in the live product are scannable and rotate daily.
          </p>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 w-full">
          <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
          This code is unique to today. A new code generates each day at midnight.
        </div>

        <Badge variant="secondary" className="text-xs">
          Sampaguita Transport · Tomorrow 6:45 AM
        </Badge>
      </div>

      <ParentBottomNav />
    </div>
  )
}
