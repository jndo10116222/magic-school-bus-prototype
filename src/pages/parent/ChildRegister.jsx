import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

const SCHOOLS = [
  "St. Mary's School, Calamba",
  'Calamba Elementary School',
  'San Pedro National High School',
]

const GRADES = ['Kinder', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6']

export function ChildRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ first_name: '', last_name: '', school: SCHOOLS[0], grade: GRADES[0] })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Simulate API call — hardcoded demo
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1000)
  }

  if (done) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-32px)] items-center justify-center px-6 gap-5 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Registration submitted</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {form.first_name} {form.last_name}'s enrollment has been sent to{' '}
            {form.school} for validation.
          </p>
        </div>
        <Button className="w-full max-w-xs" onClick={() => navigate('/parent/dashboard')}>
          Back to dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-32px)]">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <button onClick={() => navigate('/parent/dashboard')} className="p-1 -ml-1 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm">Register a child</span>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Child details</h1>
          <p className="text-sm text-muted-foreground mt-1">
            This information is sent to the school for validation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="first_name">First name</Label>
              <Input
                id="first_name"
                placeholder="Juan"
                value={form.first_name}
                onChange={set('first_name')}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                id="last_name"
                placeholder="dela Cruz"
                value={form.last_name}
                onChange={set('last_name')}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="school">School</Label>
            <select
              id="school"
              value={form.school}
              onChange={set('school')}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {SCHOOLS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="grade">Grade level</Label>
            <select
              id="grade"
              value={form.grade}
              onChange={set('grade')}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {GRADES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit for validation'}
          </Button>
        </form>
      </div>
    </div>
  )
}
