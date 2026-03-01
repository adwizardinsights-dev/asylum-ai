'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COUNTRIES = ['Afghanistan','Colombia','Cuba','El Salvador','Eritrea','Ethiopia','Guatemala','Haiti','Honduras','Iran','Iraq','Myanmar','Nicaragua','Russia','Somalia','Sudan','Syria','Ukraine','Venezuela','Yemen','Other']
const STATUSES = ['Considering filing for asylum','Asylum application pending','Recently denied — exploring options','Already have an attorney','Just researching']

export default function LeadForm({ onClose }) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', country: '', status: '', description: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('start') // 'start' | 'waitlist'

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.country) e.country = 'Please select a country'
    if (!form.status) e.status = 'Please select your current status'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: mode }),
      })
      router.push('/thank-you')
    } catch {
      setLoading(false)
    }
  }

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-extrabold text-slate-900 text-xl">Start Your Case Review</h2>
            <p className="text-slate-500 text-xs mt-0.5">Informational only — not legal advice</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg text-sm font-semibold">
            {[['start','Start Analysis'],['waitlist','Join Waitlist']].map(([m, label]) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-md transition-all ${mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
                {label}
              </button>
            ))}
          </div>

          {[
            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
              <input type={type} placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${errors[key] ? 'border-red-400' : 'border-slate-200'}`} />
              {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Country of Origin</label>
            <select value={form.country} onChange={e => set('country', e.target.value)}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.country ? 'border-red-400' : 'border-slate-200'}`}>
              <option value="">Select country…</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Current Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.status ? 'border-red-400' : 'border-slate-200'}`}>
              <option value="">Select status…</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Brief Description (optional)</label>
            <textarea rows={3} placeholder="Briefly describe your situation..." value={form.description} onChange={e => set('description', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-700 leading-relaxed">
            ⚠️ <strong>Disclaimer:</strong> This tool provides informational support only. It does not constitute legal advice and does not replace consultation with a qualified immigration attorney. Do not upload documents you are not comfortable sharing.
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-base transition-all">
            {loading ? 'Submitting…' : mode === 'start' ? 'Start My Analysis →' : 'Join the Waitlist →'}
          </button>
        </form>
      </div>
    </div>
  )
}
