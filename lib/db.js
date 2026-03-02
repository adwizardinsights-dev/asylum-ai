import fs from 'fs'
import path from 'path'

const DB_PATH = process.env.VERCEL ? '/tmp/data.json' : path.join(process.cwd(), 'data.json')

function read() {
  if (!fs.existsSync(DB_PATH)) return { cases: [], files: [], results: [] }
  try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) } catch { return { cases: [], files: [], results: [] } }
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export const db = {
  createCase(c) {
    const data = read()
    data.cases.push({ ...c, created_at: new Date().toISOString() })
    write(data)
  },

  getCase(id) {
    return read().cases.find(c => c.id === id) || null
  },

  updateCase(id, updates) {
    const data = read()
    const idx = data.cases.findIndex(c => c.id === id)
    if (idx !== -1) data.cases[idx] = { ...data.cases[idx], ...updates }
    write(data)
  },

  addFile(f) {
    const data = read()
    data.files.push({ ...f, created_at: new Date().toISOString() })
    write(data)
  },

  getFiles(caseId) {
    return read().files.filter(f => f.case_id === caseId)
  },

  saveResults(r) {
    const data = read()
    const idx = data.results.findIndex(x => x.case_id === r.case_id)
    if (idx !== -1) data.results[idx] = { ...r, updated_at: new Date().toISOString() }
    else data.results.push({ ...r, created_at: new Date().toISOString() })
    write(data)
  },

  getResults(caseId) {
    return read().results.find(r => r.case_id === caseId) || null
  },

  deleteCase(id) {
    const data = read()
    data.cases  = data.cases.filter(c => c.id !== id)
    data.files  = data.files.filter(f => f.case_id !== id)
    data.results = data.results.filter(r => r.case_id !== id)
    write(data)
  },
}
