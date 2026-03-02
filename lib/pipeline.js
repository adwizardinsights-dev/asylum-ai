import { complete } from './ai.js'
import { loadReferences, retrieveRelevant, formatCitations } from './references.js'

// ── PROMPTS ─────────────────────────────────────────────────────────────────

const SAFETY_INSTRUCTION = `
CRITICAL: You are an informational tool only. You MUST NOT:
- Provide legal advice or legal determinations
- Say "you qualify", "you should file", "your case is strong/weak"
- Predict approval or denial outcomes
- Make legal recommendations

Instead, use language like:
- "You may want to discuss with a qualified attorney..."
- "Consider clarifying..."
- "Commonly, people prepare documents such as... (non-exhaustive)"
- "Based on what you've shared..."
`

const EXTRACT_FACTS_PROMPT = `${SAFETY_INSTRUCTION}
You are an informational case organization assistant.
Extract structured facts from the immigration case narrative.
Return ONLY valid JSON with this exact structure:
{
  "people": [{"name": "string", "role": "string", "relationship": "string"}],
  "places": [{"name": "string", "type": "country|city|region|other", "context": "string"}],
  "dates": [{"date": "string", "event": "string", "confidence": "exact|approximate|implied"}],
  "threats": [{"description": "string", "actor": "string", "date": "string or unknown"}],
  "harms": [{"description": "string", "date": "string or unknown"}],
  "actors": [{"name": "string", "type": "government|non-state|family|other", "description": "string"}]
}
If information is not present, return empty arrays. Do not invent facts.`

const TIMELINE_PROMPT = `${SAFETY_INSTRUCTION}
Based on the case facts provided, create a chronological timeline of events.
Return ONLY valid JSON array:
[{"date": "string", "event": "string", "confidence": "high|medium|low", "source": "narrative|document|inferred"}]
Sort from earliest to most recent. Include approximate periods when exact dates unknown.`

const CONSISTENCY_PROMPT = `${SAFETY_INSTRUCTION}
Review the case narrative and facts for potential inconsistencies, gaps, or ambiguities.
Return ONLY valid JSON:
{
  "date_conflicts": [{"description": "string", "details": "string"}],
  "location_conflicts": [{"description": "string", "details": "string"}],
  "name_conflicts": [{"description": "string", "details": "string"}],
  "time_gaps": [{"description": "string", "period": "string", "severity": "minor|moderate|notable"}],
  "ambiguities": [{"description": "string", "suggestion": "string"}],
  "overall_note": "string"
}
Be factual and neutral. Only flag actual inconsistencies, not omissions that may be intentional.`

const PREPARATION_PROMPT = `${SAFETY_INSTRUCTION}
Based on the case information, produce an informational preparation guide.
NEVER provide legal advice. NEVER predict outcomes. NEVER say "you qualify."
Return ONLY valid JSON:
{
  "summary": "string — neutral 3-5 sentence factual summary",
  "missing_info": [{"item": "string", "explanation": "string", "priority": "high|medium|low"}],
  "evidence_checklist": [{"category": "string", "examples": ["string"], "note": "string"}],
  "interview_questions": [{"question": "string", "purpose": "string", "tip": "string"}],
  "attorney_questions": [{"question": "string", "reason": "string"}],
  "persecution_basis_options": ["string — list general categories mentioned, not determinations"],
  "disclaimer": "This summary is for informational and organizational purposes only. It does not constitute legal advice."
}`

// ── PIPELINE STEPS ───────────────────────────────────────────────────────────

export async function runPipeline({ narrative, documentTexts, metadata }) {
  const refs = loadReferences()

  // Combine all text
  const allText = [
    narrative ? `=== Personal Narrative ===\n${narrative}` : '',
    ...documentTexts.map((t, i) => `=== Document ${i + 1} ===\n${t}`),
  ].filter(Boolean).join('\n\n')

  if (!allText.trim()) throw new Error('No content to analyze. Please provide a narrative or upload documents.')

  const metaContext = metadata ? `
=== Case Metadata ===
Country of origin: ${metadata.country || 'not specified'}
Current location: ${metadata.current_location || 'not specified'}
Entry date: ${metadata.entry_date || 'not specified'}
Incident date range: ${metadata.incident_date || 'not specified'}
Case status: ${metadata.case_status || 'not specified'}
` : ''

  const input = metaContext + allText

  // Step 1: Extract structured facts
  const facts = await complete(EXTRACT_FACTS_PROMPT, input, { json: true })

  // Step 2: Build timeline
  const factsContext = `Case Facts:\n${JSON.stringify(facts, null, 2)}\n\nOriginal Text:\n${input}`
  const timeline = await complete(TIMELINE_PROMPT, factsContext, { json: true })

  // Step 3: Consistency scan
  const consistency = await complete(CONSISTENCY_PROMPT, factsContext, { json: true })

  // Step 4: Retrieve relevant references
  const relevant = retrieveRelevant(input, refs)
  const refContext = relevant.length
    ? `\nReference context:\n${relevant.map(r => `[${r.name}]: ${r.content.slice(0, 500)}`).join('\n')}`
    : ''
  const citations = relevant.length ? formatCitations(relevant) : ''

  // Step 5: Generate preparation output
  const prepInput = `${factsContext}${refContext}`
  const preparation = await complete(PREPARATION_PROMPT, prepInput, { json: true })

  return {
    facts,
    timeline: Array.isArray(timeline) ? timeline : [],
    consistency,
    preparation,
    citations,
    generated_at: new Date().toISOString(),
  }
}
