import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@vercel/firewall'
import { isLabInput, isLabReport, reportSchema } from '../../../lib/gtm-strategy'

export const runtime = 'nodejs'
export const maxDuration = 60

const SYSTEM = `You are an experienced startup GTM advisor. Generate a concise, actionable and differentiated strategy for the supplied founder context. Respond ONLY as a JSON object with exactly these fields:
headline:string, executiveSummary:string,
icps:array of 3 objects {name,rationale,buyer,risk,priority} (priority High/Medium/Low),
positioning:array of 3 objects {segment,headline,message,proofNeeded},
experiments:array of 4 objects {name,action,successSignal},
plan:array of 4 objects {week:number 1-4,focus,actions:array of 3 strings,deliverable},
assumptions:array of 5 strings,
recommendation:string.
Prioritize hypotheses, practical validation and falsifiable experiments. Never invent market data, competitor facts, regulations, certifications, product test results or customer demand. Label speculative claims as hypotheses. For safety-related products explicitly demand independent verification of performance, compliance, compatibility and safety claims. Do not recommend making unverified safety claims. Be specific to the input; avoid generic marketing filler. No markdown fences.`

// Deliberately shared across clients: spoofed forwarding headers cannot bypass
// these conservative limits. Per-process only; see docs/gtm-strategy-lab.md.
let windowStart = 0
let calls = 0
let active = 0
const json = (body: unknown, status = 200, headers = {}) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (origin && origin !== req.nextUrl.origin) return json({ error: 'Request origin not allowed.' }, 403)
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({ error: 'Send JSON input.' }, 415)
  if (process.env.NODE_ENV === 'production' && process.env.GTM_LAB_ENABLED !== 'true') return json({ error: 'The strategy lab is not available yet.' }, 503)
  const key = process.env.OPENAI_API_KEY
  if (!key) return json({ error: 'AI service not configured. Please try again later.' }, 503)
  // Enforce bytes actually read, including chunked requests without Content-Length.
  let input: unknown
  const reader = req.body?.getReader()
  if (!reader) return json({ error: 'Input is required.' }, 400)
  try {
    let bytes = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > 32000) {
        await reader.cancel()
        return json({ error: 'Input too large.' }, 413)
      }
      chunks.push(value)
    }
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch { return json({ error: 'Invalid JSON.' }, 400) }
  finally { reader.releaseLock() }
  if (!isLabInput(input)) return json({ error: 'Complete all five fields (maximum 1200 characters each).' }, 400)
  const now = Date.now()
  if (now - windowStart >= 60_000) { windowStart = now; calls = 0 }
  if (calls >= 3 || active >= 1) return json({ error: 'The lab is busy. Please try again in a minute.' }, 429, { 'Retry-After': '60' })
  calls++
  active++
  try {
    if (process.env.NODE_ENV === 'production') {
      // Shared across server instances, not keyed by spoofable client headers.
      // Vercel counters are regional; pin compute in vercel.json and retain a kill switch.
      if (!process.env.RATE_LIMIT_SECRET) return json({ error: 'Usage protection is not configured.' }, 503)
      try {
        const result = await checkRateLimit('gtm-generation', {
          request: req,
          rateLimitKey: 'gtm-lab-shared-v1',
          timeout: 3000,
        })
        if (result.error || typeof result.rateLimited !== 'boolean') return json({ error: 'Usage protection is temporarily unavailable. Please retry later.' }, 503)
        if (result.rateLimited) return json({ error: 'The lab has reached its shared usage limit. Please try again in 10 minutes.' }, 429, { 'Retry-After': '600' })
      } catch {
        return json({ error: 'Usage protection is temporarily unavailable. Please retry later.' }, 503)
      }
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        temperature: 0.4,
        store: false,
        response_format: { type: 'json_schema', json_schema: { name: 'gtm_strategy', strict: true, schema: reportSchema } },
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: JSON.stringify(input) }],
        max_completion_tokens: 2800,
      }),
      signal: AbortSignal.timeout(35000),
      cache: 'no-store',
    })
    if (!response.ok) {
      console.error('GTM AI provider status', response.status)
      return json({ error: 'AI generation temporarily unavailable. Please try again later.' }, 502)
    }
    const payload = await response.json()
    const content = payload?.choices?.[0]?.message?.content
    if (payload?.choices?.[0]?.finish_reason !== 'stop' || payload?.choices?.[0]?.message?.refusal || typeof content !== 'string') throw new Error('Empty model response')
    const report: unknown = JSON.parse(content)
    if (!isLabReport(report)) throw new Error('Invalid model response shape')
    return NextResponse.json({ report }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('GTM generation failed', err instanceof Error ? err.name : 'Unknown error')
    return json({ error: 'Could not generate a report. Please retry.' }, 502)
  } finally { active-- }
}
