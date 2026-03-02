import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { extractText } from '../../../../../lib/parser'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request, { params }) {
  const { caseId } = params
  const caseRecord = await db.getCase(caseId)
  if (!caseRecord) return NextResponse.json({ error: 'Case not found' }, { status: 404 })

  try {
    const formData = await request.formData()
    const narrative = formData.get('narrative') || ''
    const files = formData.getAll('files')

    if (narrative) {
      await db.updateCase(caseId, { narrative })
    }

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const text = await extractText(buffer, file.name)
      await db.addFile({
        id: uuidv4(),
        case_id: caseId,
        name: file.name,
        size: file.size,
        type: file.type,
        text,
      })
    }

    return NextResponse.json({ ok: true, filesAdded: files.length })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
