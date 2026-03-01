import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FILE = process.env.VERCEL ? '/tmp/asylum-leads.json' : path.join(process.cwd(), 'leads.json')

function readLeads() {
  if (!fs.existsSync(FILE)) return []
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')) } catch { return [] }
}

export async function POST(req) {
  const body = await req.json()
  const leads = readLeads()
  leads.push({ ...body, id: Date.now(), created_at: new Date().toISOString() })
  fs.writeFileSync(FILE, JSON.stringify(leads, null, 2))
  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
  return NextResponse.json(readLeads())
}
