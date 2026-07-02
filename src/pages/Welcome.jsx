import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Bus } from 'lucide-react'

export function Welcome() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)] px-6 pb-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Bus className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Magic School Bus</h1>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            Safe, tracked school transportation for Filipino families. Know exactly when your child boards and arrives.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 max-w-xs">
          <Button className="w-full h-12 text-base" onClick={() => navigate('/parent/register')}>
            I'm a Parent
          </Button>
          <Button variant="outline" className="w-full h-12 text-base" onClick={() => navigate('/driver')}>
            I'm a Driver
          </Button>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground" onClick={() => navigate('/admin/dashboard')}>
            School / Admin login →
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        LTFRB-licensed operators only · Philippines
      </p>
    </div>
  )
}
