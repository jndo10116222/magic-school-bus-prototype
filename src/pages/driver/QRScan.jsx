import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'

export function QRScan() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [linePos, setLinePos] = useState(0)

  function handleScan() {
    if (scanning) return
    setScanning(true)
    let pos = 0
    const interval = setInterval(() => {
      pos += 4
      setLinePos(pos)
      if (pos >= 100) {
        clearInterval(interval)
        setTimeout(() => navigate('/driver/confirmed'), 300)
      }
    }, 20)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] bg-black text-white">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <button onClick={() => navigate('/driver/approaching')} className="p-1 -ml-1 text-white/70">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm">Scan boarding QR</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <p className="text-sm text-white/60 text-center">
          Point at parent's QR code to confirm boarding
        </p>

        {/* Viewfinder */}
        <div className="relative w-full max-w-[280px] aspect-square">
          {/* Simulated camera background */}
          <div className="absolute inset-0 bg-zinc-900 rounded-sm overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />
          </div>

          {/* Dark overlay regions around the scan square */}
          <div className="absolute top-0 left-0 right-0 h-[15%] bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-black/60" />
          <div className="absolute top-[15%] bottom-[15%] left-0 w-[15%] bg-black/60" />
          <div className="absolute top-[15%] bottom-[15%] right-0 w-[15%] bg-black/60" />

          {/* Animated scan line */}
          {scanning && (
            <div
              className="absolute left-[15%] right-[15%] h-0.5 bg-primary shadow-[0_0_8px_2px_hsl(var(--primary))]"
              style={{ top: `calc(15% + ${linePos * 0.7}%)` }}
            />
          )}

          {/* Corner brackets */}
          {[
            'top-[14%] left-[14%] border-t-2 border-l-2 rounded-tl',
            'top-[14%] right-[14%] border-t-2 border-r-2 rounded-tr',
            'bottom-[14%] left-[14%] border-b-2 border-l-2 rounded-bl',
            'bottom-[14%] right-[14%] border-b-2 border-r-2 rounded-br',
          ].map((cls) => (
            <div key={cls} className={`absolute w-6 h-6 border-white ${cls}`} />
          ))}

          {/* Tap-to-scan trigger */}
          {!scanning && (
            <button
              onClick={handleScan}
              className="absolute inset-[15%] flex flex-col items-center justify-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xs text-center leading-tight">
                Tap to<br />simulate scan
              </span>
            </button>
          )}

          {scanning && (
            <div className="absolute inset-[15%] flex items-center justify-center">
              <p className="text-xs text-white/60">Scanning…</p>
            </div>
          )}
        </div>

        <p className="text-xs text-white/40 text-center max-w-[220px]">
          The QR code is unique to each child and expires daily at midnight.
        </p>
      </div>
    </div>
  )
}
