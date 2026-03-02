import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'

export async function GET(request, { params }) {
  const { caseId } = params
  const caseRecord = await db.getCase(caseId)
  if (!caseRecord) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const results = await db.getResults(caseId)
  return NextResponse.json({
    status: caseRecord.status,
    error: caseRecord.error || null,
    results: results || null,
  })
}
