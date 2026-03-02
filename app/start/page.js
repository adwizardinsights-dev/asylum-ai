'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProgressBar from '../../components/ProgressBar'
import Disclaimer from '../../components/Disclaimer'

const STEPS = ['Case Info', 'Documents', 'Analysis']

const CASE_STATUSES = [
  'Not yet filed',
  'Filed with USCIS – awaiting interview',
  'In removal proceedings',
  'Appeal pending',
  'Other',
]

export default function StartPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    country: '',
    current_location: '',
    entry_date: '',
    incident_date: '',
    case_status: '',
  })

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.country.trim()) { setError('Country of origin is required.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create case')
      router.push(`/case/${data.id}/upload`)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-blue-700 text-sm hover:underline">← Back to home</a>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Start Your Case Analysis</h1>
          <p className="text-gray-500 text-sm mt-1">
            Provide some basic information to get started. All information stays on this server.
          </p>
        </div>

        <ProgressBar steps={STEPS} current={1} />

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country of origin <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.country}
              onChange={e => set('country', e.target.value)}
              placeholder="e.g. Guatemala"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current location in the U.S. <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.current_location}
              onChange={e => set('current_location', e.target.value)}
              placeholder="e.g. Houston, TX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              U.S. entry date <span className="text-gray-400 font-normal">(approximate is fine)</span>
            </label>
            <input
              type="text"
              value={form.entry_date}
              onChange={e => set('entry_date', e.target.value)}
              placeholder="e.g. March 2023"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Incident / event date range <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.incident_date}
              onChange={e => set('incident_date', e.target.value)}
              placeholder="e.g. 2020–2023"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current case status <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <select
              value={form.case_status}
              onChange={e => set('case_status', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select status...</option>
              {CASE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Creating case...' : 'Continue to Upload Documents →'}
          </button>
        </form>

        <Disclaimer className="mt-6" />
      </div>
    </main>
  )
}
