import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function GET(request, { params }) {
  const { caseId } = params
  const caseRecord = db.getCase(caseId)
  if (!caseRecord) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(caseRecord)
}

export async function DELETE(request, { params }) {
  const { caseId } = params
  const caseRecord = db.getCase(caseId)
  if (!caseRecord) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  db.deleteCase(caseId)
  return NextResponse.json({ ok: true })
}
