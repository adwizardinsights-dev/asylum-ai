import fs from 'fs'
import path from 'path'

const REF_DIR = path.join(process.cwd(), 'references')

// Load all reference documents into memory
export function loadReferences() {
  if (!fs.existsSync(REF_DIR)) return []
  return fs.readdirSync(REF_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      name: f.replace('.md', ''),
      content: fs.readFileSync(path.join(REF_DIR, f), 'utf8'),
    }))
}

// Simple keyword-based retrieval (no embeddings needed for MVP)
export function retrieveRelevant(query, refs, maxRefs = 3) {
  const q = query.toLowerCase()
  const scored = refs.map(ref => {
    const words = q.split(/\s+/)
    const score = words.filter(w => ref.content.toLowerCase().includes(w)).length
    return { ...ref, score }
  })
  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxRefs)
}

export function formatCitations(refs) {
  return refs.map(r => `[Ref: ${r.name}]`).join(', ')
}
