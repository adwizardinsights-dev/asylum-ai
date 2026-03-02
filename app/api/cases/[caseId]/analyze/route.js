import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { runPipeline } from '../../../../../lib/pipeline'

export async function POST(request, { params }) {
  const { caseId } = params
  const caseRecord = await db.getCase(caseId)
  if (!caseRecord) return NextResponse.json({ error: 'Case not found' }, { status: 404 })

  try {
    await db.updateCase(caseId, { status: 'analyzing' })

    const files = await db.getFiles(caseId)
    const documentTexts = files.map(f => f.text).filter(Boolean)

    const result = await runPipeline({
      narrative: caseRecord.narrative || '',
      documentTexts,
      metadata: {
        country: caseRecord.country,
        current_location: caseRecord.current_location,
        entry_date: caseRecord.entry_date,
        incident_date: caseRecord.incident_date,
        case_status: caseRecord.case_status,
      },
    })

    await db.saveResults({ case_id: caseId, ...result })
    await db.updateCase(caseId, { status: 'complete' })

    return NextResponse.json({ ok: true })
  } catch (err) {
    await db.updateCase(caseId, { status: 'error', error: err.message })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
