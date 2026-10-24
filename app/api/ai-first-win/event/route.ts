import { NextRequest, NextResponse } from 'next/server'
import { catalogVersion, frameworkVersion } from '../../../../lib/ai-first-win/catalog'
import { isOperationalEvent } from '../../../../lib/ai-first-win/events'
import { readLimitedJson } from '../../../../lib/ai-first-win/http'

export const runtime = 'nodejs'

let windowStart = 0
let events = 0
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (origin && origin !== req.nextUrl.origin) return json({ error: 'Request origin not allowed.' }, 403)
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({ error: 'Send JSON input.' }, 415)
  if (process.env.NODE_ENV === 'production' && process.env.AI_FIRST_WIN_ENABLED !== 'true') return json({ error: 'AI First Win is not available yet.' }, 503)
  const now = Date.now()
  if (now - windowStart >= 60_000) { windowStart = now; events = 0 }
  if (events >= 60) return json({ error: 'Too many events.' }, 429)
  events++
  const body = await readLimitedJson(req, 1_024)
  if (body.kind === 'large') return json({ error: 'Event too large.' }, 413)
  if (body.kind === 'invalid' || !isOperationalEvent(body.value)) return json({ error: 'Invalid event.' }, 400)
  // Only known categories are logged. Never log request text, generated output,
  // IP, user agent, cookies, or an arbitrary campaign/visitor identifier.
  console.info('AI First Win event', JSON.stringify({ ...body.value, frameworkVersion, catalogVersion }))
  return json({ ok: true })
}
