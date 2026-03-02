'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Disclaimer from '../../../../components/Disclaimer'
import ResultCard from '../../../../components/ResultCard'
import ProgressBar from '../../../../components/ProgressBar'

const STEPS = ['Case Info', 'Documents', 'Analysis']

const PRIORITY_COLOR = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}

export default function ResultsPage() {
  const { caseId } = useParams()
  const [status, setStatus] = useState('loading')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let stopped = false

    async function poll() {
      try {
        const res = await fetch(`/api/cases/${caseId}/results`)
        if (!res.ok) { setStatus('error'); setError('Could not load results.'); return }
        const data = await res.json()

        if (stopped) return

        if (data.status === 'complete' && data.results) {
          setResults(data.results)
          setStatus('complete')
        } else if (data.status === 'error') {
          setStatus('error')
          setError(data.error || 'Analysis failed.')
        } else {
          setTimeout(poll, 3000)
        }
      } catch {
        if (!stopped) { setStatus('error'); setError('Network error.') }
      }
    }

    poll()
    return () => { stopped = true }
  }, [caseId])

  if (status === 'loading' || status === 'analyzing') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-700 font-medium">Analyzing your case...</p>
          <p className="text-gray-400 text-sm mt-1">This usually takes 30–60 seconds.</p>
        </div>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-red-600 font-semibold mb-2">Analysis Error</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <a href="/start" className="text-blue-700 hover:underline text-sm">Start a new case</a>
        </div>
      </main>
    )
  }

  const { facts, timeline, consistency, preparation, citations } = results

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Case Analysis Results</h1>
          <p className="text-gray-500 text-sm mt-1">
            Generated {new Date(results.generated_at).toLocaleString()}
            {citations && <span className="ml-2 text-gray-400">· Sources: {citations}</span>}
          </p>
        </div>

        <ProgressBar steps={STEPS} current={3} />
        <Disclaimer className="mb-6" />

        <div className="space-y-6">
          {/* Summary */}
          {preparation?.summary && (
            <ResultCard title="Case Summary">
              <p className="text-gray-700 text-sm leading-relaxed">{preparation.summary}</p>
            </ResultCard>
          )}

          {/* People / Places / Actors */}
          {facts && (
            <ResultCard title="Key Entities Identified">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facts.people?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">People</p>
                    <ul className="space-y-1">
                      {facts.people.map((p, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          <span className="font-medium">{p.name}</span>
                          {p.role && <span className="text-gray-400"> · {p.role}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {facts.actors?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Actors / Persecutors</p>
                    <ul className="space-y-1">
                      {facts.actors.map((a, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          <span className="font-medium">{a.name}</span>
                          {a.type && <span className="text-gray-400"> · {a.type}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {facts.places?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Places</p>
                    <ul className="space-y-1">
                      {facts.places.map((p, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          <span className="font-medium">{p.name}</span>
                          {p.context && <span className="text-gray-400"> · {p.context}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ResultCard>
          )}

          {/* Timeline */}
          {timeline?.length > 0 && (
            <ResultCard title="Chronological Timeline">
              <ol className="relative border-l border-gray-200 ml-2 space-y-4">
                {timeline.map((e, i) => (
                  <li key={i} className="pl-5">
                    <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-blue-700 border-2 border-white" />
                    <p className="text-xs text-gray-400 font-medium mb-0.5">
                      {e.date}
                      {e.confidence && e.confidence !== 'high' && (
                        <span className="ml-1 text-yellow-500">({e.confidence} confidence)</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-700">{e.event}</p>
                  </li>
                ))}
              </ol>
            </ResultCard>
          )}

          {/* Consistency */}
          {consistency && (
            <ResultCard title="Consistency Review">
              {consistency.overall_note && (
                <p className="text-sm text-gray-600 mb-4">{consistency.overall_note}</p>
              )}
              {[
                { label: 'Date Conflicts', items: consistency.date_conflicts },
                { label: 'Location Conflicts', items: consistency.location_conflicts },
                { label: 'Name Conflicts', items: consistency.name_conflicts },
                { label: 'Time Gaps', items: consistency.time_gaps },
                { label: 'Ambiguities', items: consistency.ambiguities },
              ].filter(s => s.items?.length > 0).map(section => (
                <div key={section.label} className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{section.label}</p>
                  <ul className="space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-yellow-500 shrink-0">⚠</span>
                        <span>
                          <strong>{item.description}</strong>
                          {(item.details || item.suggestion) && (
                            <> — {item.details || item.suggestion}</>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {!['date_conflicts','location_conflicts','name_conflicts','time_gaps','ambiguities']
                .some(k => consistency[k]?.length > 0) && (
                <p className="text-sm text-green-700">No significant inconsistencies identified.</p>
              )}
            </ResultCard>
          )}

          {/* Missing Info */}
          {preparation?.missing_info?.length > 0 && (
            <ResultCard title="Information That May Be Worth Clarifying">
              <ul className="space-y-3">
                {preparation.missing_info.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full h-fit shrink-0 ${PRIORITY_COLOR[item.priority] || 'bg-gray-100 text-gray-600'}`}>
                      {item.priority}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.item}</p>
                      {item.explanation && <p className="text-xs text-gray-500 mt-0.5">{item.explanation}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </ResultCard>
          )}

          {/* Evidence Checklist */}
          {preparation?.evidence_checklist?.length > 0 && (
            <ResultCard title="Evidence Checklist (Informational)">
              <div className="space-y-4">
                {preparation.evidence_checklist.map((cat, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold text-gray-800 mb-1">{cat.category}</p>
                    {cat.note && <p className="text-xs text-gray-500 mb-2">{cat.note}</p>}
                    <ul className="space-y-1">
                      {cat.examples?.map((ex, j) => (
                        <li key={j} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-gray-300">•</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ResultCard>
          )}

          {/* Interview Questions */}
          {preparation?.interview_questions?.length > 0 && (
            <ResultCard title="Potential Interview Questions to Prepare For">
              <p className="text-xs text-gray-500 mb-3">
                These are common question areas based on your narrative — not a prediction of what will be asked.
              </p>
              <div className="space-y-4">
                {preparation.interview_questions.map((q, i) => (
                  <div key={i} className="border-l-2 border-blue-200 pl-3">
                    <p className="text-sm font-medium text-gray-800">{q.question}</p>
                    {q.tip && <p className="text-xs text-blue-600 mt-0.5">{q.tip}</p>}
                  </div>
                ))}
              </div>
            </ResultCard>
          )}

          {/* Attorney Questions */}
          {preparation?.attorney_questions?.length > 0 && (
            <ResultCard title="Questions to Discuss with an Attorney">
              <ul className="space-y-3">
                {preparation.attorney_questions.map((q, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium text-gray-800">{q.question}</span>
                    {q.reason && <p className="text-xs text-gray-500 mt-0.5">{q.reason}</p>}
                  </li>
                ))}
              </ul>
            </ResultCard>
          )}

          {/* Persecution basis */}
          {preparation?.persecution_basis_options?.length > 0 && (
            <ResultCard title="Possible Persecution Basis Categories Mentioned">
              <p className="text-xs text-gray-500 mb-3">
                These categories appear in your narrative. This is not a legal determination.
              </p>
              <div className="flex flex-wrap gap-2">
                {preparation.persecution_basis_options.map((b, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200">
                    {b}
                  </span>
                ))}
              </div>
            </ResultCard>
          )}

          {/* Disclaimer */}
          {preparation?.disclaimer && (
            <p className="text-xs text-gray-400 text-center">{preparation.disclaimer}</p>
          )}

          <div className="flex justify-center pt-4 pb-8">
            <a
              href="/start"
              className="text-sm text-blue-700 hover:underline"
            >
              Analyze another case
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
