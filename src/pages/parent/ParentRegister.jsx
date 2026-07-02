import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Loader2, Bus } from 'lucide-react'

const API = 'http://localhost:8000'

export function ParentRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ full_name: '', email: '', password: '', password_confirm: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function validate() {
    const e = {}
    if (!form.full_name.trim()) e.full_name = 'Full name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.password !== form.password_confirm) e.password_confirm = 'Passwords do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError(null)
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/users/register/parent/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/parent/verify-email', { state: { email: form.email } })
      } else {
        // Flatten DRF error format into a single readable message
        const messages = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join('\n')
        setServerError(messages)
      }
    } catch {
      setServerError('Network error — make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">Create parent account</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Sign up</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Register your account to enroll your child.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="full_name">Full name</Label>
            <Input
              id="full_name"
              placeholder="Maria dela Cruz"
              value={form.full_name}
              onChange={set('full_name')}
              autoComplete="name"
            />
            {errors.full_name && <p className="text-xs text-destructive">{errors.full_name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="maria@email.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set('password')}
              autoComplete="new-password"
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password_confirm">Confirm password</Label>
            <Input
              id="password_confirm"
              type="password"
              placeholder="Repeat password"
              value={form.password_confirm}
              onChange={set('password_confirm')}
              autoComplete="new-password"
            />
            {errors.password_confirm && (
              <p className="text-xs text-destructive">{errors.password_confirm}</p>
            )}
          </div>

          {serverError && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-destructive whitespace-pre-line">{serverError}</p>
              </CardContent>
            </Card>
          )}

          <Button type="submit" className="w-full h-11 mt-1" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Your school must validate your child's enrollment before you can book transport.
        </p>
      </div>
    </div>
  )
}
