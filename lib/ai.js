// AI provider abstraction — swap OpenAI for Anthropic by changing this file only
import OpenAI from 'openai'

let client = null
function getClient() {
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return client
}

export async function complete(systemPrompt, userContent, { json = false } = {}) {
  const response = await getClient().chat.completions.create({
    model: process.env.AI_MODEL || 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    response_format: json ? { type: 'json_object' } : undefined,
    temperature: 0.2,
    max_tokens: 4000,
  })
  const text = response.choices[0].message.content
  if (json) {
    try { return JSON.parse(text) } catch { return { raw: text } }
  }
  return text
}
