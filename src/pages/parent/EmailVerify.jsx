import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'

const API = 'http://localhost:8000'

export function EmailVerify() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email ?? 'your email'
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)
  const [error, setError] = useState(null)

  async function handleResend() {
    setResending(true)
    setError(null)
    try {
      await fetch(`${API}/api/auth/email/resend/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setResent(true)
    } catch {
      setError('Network error — please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)]">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/parent/register')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm">Verify your email</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="h-9 w-9 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            We sent a verification link to
          </p>
          <p className="text-sm font-medium mt-0.5">{email}</p>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Click the link in the email to activate your account. It expires in 24 hours.
          </p>
        </div>

        {resent && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 w-full">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            New link sent — check your inbox again.
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}

        <div className="w-full flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={resending || resent}
          >
            {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Resend verification email'}
          </Button>
          {/* Demo shortcut — simulates email verified → active parent */}
          <Button
            variant="ghost"
            className="w-full text-muted-foreground text-xs"
            onClick={() => navigate('/parent/dashboard')}
          >
            Demo: skip to dashboard →
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Wrong email?{' '}
          <button className="underline" onClick={() => navigate('/parent/register')}>
            Go back and correct it
          </button>
        </p>
      </div>
    </div>
  )
}
