import fs from 'fs'
import path from 'path'

// ── Upstash Redis REST client (no SDK needed) ────────────────────────────────
async function redis(...args) {
  const res = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  const data = await res.json()
  return data.result
}

const useRedis = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

// ── JSON file fallback (local dev without Redis) ─────────────────────────────
const DB_PATH = path.join(process.cwd(), 'data.json')

function readFile() {
  if (!fs.existsSync(DB_PATH)) return { cases: [], files: [], results: [] }
  try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) } catch { return { cases: [], files: [], results: [] } }
}

function writeFile(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// ── Database interface ────────────────────────────────────────────────────────
export const db = {
  async createCase(c) {
    const record = { ...c, created_at: new Date().toISOString() }
    if (useRedis()) {
      await redis('SET', `case:${c.id}`, JSON.stringify(record))
    } else {
      const data = readFile()
      data.cases.push(record)
      writeFile(data)
    }
  },

  async getCase(id) {
    if (useRedis()) {
      const val = await redis('GET', `case:${id}`)
      return val ? JSON.parse(val) : null
    }
    return readFile().cases.find(c => c.id === id) || null
  },

  async updateCase(id, updates) {
    if (useRedis()) {
      const existing = await this.getCase(id)
      if (existing) await redis('SET', `case:${id}`, JSON.stringify({ ...existing, ...updates }))
    } else {
      const data = readFile()
      const idx = data.cases.findIndex(c => c.id === id)
      if (idx !== -1) data.cases[idx] = { ...data.cases[idx], ...updates }
      writeFile(data)
    }
  },

  async addFile(f) {
    const record = { ...f, created_at: new Date().toISOString() }
    if (useRedis()) {
      await redis('RPUSH', `files:${f.case_id}`, JSON.stringify(record))
    } else {
      const data = readFile()
      data.files.push(record)
      writeFile(data)
    }
  },

  async getFiles(caseId) {
    if (useRedis()) {
      const items = await redis('LRANGE', `files:${caseId}`, 0, -1)
      return (items || []).map(i => JSON.parse(i))
    }
    return readFile().files.filter(f => f.case_id === caseId)
  },

  async saveResults(r) {
    const record = { ...r, updated_at: new Date().toISOString() }
    if (useRedis()) {
      await redis('SET', `results:${r.case_id}`, JSON.stringify(record))
    } else {
      const data = readFile()
      const idx = data.results.findIndex(x => x.case_id === r.case_id)
      if (idx !== -1) data.results[idx] = record
      else data.results.push({ ...record, created_at: new Date().toISOString() })
      writeFile(data)
    }
  },

  async getResults(caseId) {
    if (useRedis()) {
      const val = await redis('GET', `results:${caseId}`)
      return val ? JSON.parse(val) : null
    }
    return readFile().results.find(r => r.case_id === caseId) || null
  },

  async deleteCase(id) {
    if (useRedis()) {
      await redis('DEL', `case:${id}`, `files:${id}`, `results:${id}`)
    } else {
      const data = readFile()
      data.cases = data.cases.filter(c => c.id !== id)
      data.files = data.files.filter(f => f.case_id !== id)
      data.results = data.results.filter(r => r.case_id !== id)
      writeFile(data)
    }
  },
}
