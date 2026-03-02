'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ProgressBar from '../../../../components/ProgressBar'
import Disclaimer from '../../../../components/Disclaimer'
import FileUpload from '../../../../components/FileUpload'

const STEPS = ['Case Info', 'Documents', 'Analysis']

export default function UploadPage() {
  const { caseId } = useParams()
  const router = useRouter()
  const [narrative, setNarrative] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!narrative.trim() && files.length === 0) {
      setError('Please enter a narrative or upload at least one document.')
      return
    }
    setError('')
    setLoading(true)

    try {
      // Step 1: Upload files and narrative
      setProgress('Uploading documents...')
      const formData = new FormData()
      formData.append('narrative', narrative)
      files.forEach(f => formData.append('files', f))

      const uploadRes = await fetch(`/api/cases/${caseId}/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!uploadRes.ok) {
        const d = await uploadRes.json()
        throw new Error(d.error || 'Upload failed')
      }

      // Step 2: Run analysis
      setProgress('Running AI analysis — this may take 30–60 seconds...')
      const analyzeRes = await fetch(`/api/cases/${caseId}/analyze`, {
        method: 'POST',
      })
      if (!analyzeRes.ok) {
        const d = await analyzeRes.json()
        throw new Error(d.error || 'Analysis failed')
      }

      router.push(`/case/${caseId}/results`)
    } catch (err) {
      setError(err.message)
      setLoading(false)
      setProgress('')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/start" className="text-blue-700 text-sm hover:underline">← Back</a>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Upload Your Documents</h1>
          <p className="text-gray-500 text-sm mt-1">
            Add your personal narrative and any supporting documents. The more detail you provide, the more thorough the analysis.
          </p>
        </div>

        <ProgressBar steps={STEPS} current={2} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Narrative */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Personal Narrative
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Describe what happened to you — who, what, when, where. Include as much detail as you can remember.
              You may write in any language.
            </p>
            <textarea
              value={narrative}
              onChange={e => setNarrative(e.target.value)}
              rows={10}
              placeholder="Write your story here..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{narrative.length} characters</p>
          </div>

          {/* File upload */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Supporting Documents <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload police reports, medical records, letters, country condition reports, or any other relevant documents.
              Accepted: PDF, DOCX, TXT.
            </p>
            <FileUpload files={files} onFiles={setFiles} />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700 flex items-center gap-3">
              <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {progress}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Analyzing...' : 'Run Analysis →'}
          </button>
        </form>

        <Disclaimer className="mt-6" />
      </div>
    </main>
  )
}
