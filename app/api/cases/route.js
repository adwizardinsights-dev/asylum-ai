import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
  try {
    const body = await request.json()
    const id = uuidv4()

    db.createCase({
      id,
      country: body.country || '',
      current_location: body.current_location || '',
      entry_date: body.entry_date || '',
      incident_date: body.incident_date || '',
      case_status: body.case_status || '',
      narrative: '',
      status: 'draft',
    })

    return NextResponse.json({ id })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
