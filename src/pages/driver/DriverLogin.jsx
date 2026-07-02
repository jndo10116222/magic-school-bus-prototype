import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bus, Loader2, ShieldAlert } from 'lucide-react'

export function DriverLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (form.email === 'pedro@sampaguita.ph' && form.password === 'password') {
        navigate('/driver/route')
      } else {
        setError('Invalid credentials. Demo: use pedro@sampaguita.ph / password')
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)]">
      <div className="flex flex-col items-center gap-3 px-4 pt-12 pb-8">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow">
          <Bus className="h-7 w-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Driver login</h1>
          <p className="text-sm text-muted-foreground mt-1">Sampaguita Transport · Unit 7</p>
        </div>
      </div>

      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="pedro@sampaguita.ph"
              value={form.email}
              onChange={set('email')}
              autoComplete="username"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set('password')}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2.5">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Demo credentials: pedro@sampaguita.ph / password
        </p>
      </div>
    </div>
  )
}
