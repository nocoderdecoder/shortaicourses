/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness compiles TS in memory. */
// Compile only our TypeScript modules in memory; no network or API credits.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const ts = require('typescript')
const fs = require('node:fs')
const original = require.extensions['.ts']
require.extensions['.ts'] = (mod, file) => mod._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file)
const { POST } = require('../app/api/gtm-strategy/route.ts')
const { isLabReport } = require('../lib/gtm-strategy.ts')
require.extensions['.ts'] = original
const { NextRequest } = require('next/server')
const input = { product: 'A planning tool', customers: 'Founders', market: 'India', stage: 'Prototype', challenge: 'Find buyers' }
const report = {
  headline: 'Validate a narrow audience', executiveSummary: 'A testable hypothesis', recommendation: 'Interview buyers',
  icps: Array.from({ length: 3 }, () => ({ name: 'Founders', rationale: 'Hypothesis', buyer: 'Owner', risk: 'Demand', priority: 'High' })),
  positioning: Array.from({ length: 3 }, () => ({ segment: 'Founders', headline: 'Save time', message: 'Hypothesis', proofNeeded: 'Interviews' })),
  experiments: Array.from({ length: 4 }, () => ({ name: 'Interviews', action: 'Talk to buyers', successSignal: 'Paid pilot' })),
  plan: Array.from({ length: 4 }, (_, n) => ({ week: n + 1, focus: 'Validate', actions: ['Ask', 'Test', 'Review'], deliverable: 'Evidence' })), assumptions: Array(5).fill('Demand is unverified'),
}
const request = (body = input, headers = {}) => new NextRequest('http://localhost/api/gtm-strategy', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) })
test('backend safeguards and provider contract', async () => {
  const savedFetch = global.fetch
  const savedNow = Date.now
  const saved = { ...process.env }
  try {
    process.env.NODE_ENV = 'test'
    delete process.env.OPENAI_API_KEY
    assert.equal((await POST(request())).status, 503)
    process.env.OPENAI_API_KEY = 'test-placeholder-not-a-real-key'
    process.env.NODE_ENV = 'production'
    delete process.env.GTM_LAB_ENABLED
    assert.equal((await POST(request())).status, 503)
    process.env.NODE_ENV = 'test'
    assert.equal((await POST(request(input, { origin: 'https://evil.example' }))).status, 403)
    assert.equal((await POST(request(input, { 'content-type': 'text/plain' }))).status, 415)
    assert.equal((await POST(request('{'))).status, 400)
    assert.equal((await POST(request({ ...input, product: ' ' }))).status, 400)
    assert.equal((await POST(request({ ...input, extra: 'unexpected' }))).status, 400)
    assert.equal((await POST(request('x'.repeat(32001)))).status, 413)
    assert.equal((await POST(request({ ...input, product: 'x'.repeat(1201) }))).status, 400)
    assert.equal(isLabReport(report), true)
    assert.equal(isLabReport({ ...report, assumptions: [] }), false)
    assert.equal(isLabReport({ ...report, plan: [...report.plan].reverse() }), false)
    assert.equal(isLabReport({ ...report, icps: report.icps.map(i => ({ ...i, priority: 'Invalid' })) }), false)
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://api.openai.com/v1/chat/completions')
      const body = JSON.parse(options.body)
      assert.equal(body.store, false)
      assert.equal(body.max_completion_tokens, 2800)
      return Response.json({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(report) } }] })
    }
    const success = await POST(request())
    assert.equal(success.status, 200)
    assert.equal(success.headers.get('cache-control'), 'no-store')
    assert.deepEqual((await success.json()).report, report)
    global.fetch = async () => Response.json({ error: 'private provider detail' }, { status: 429 })
    const failed = await POST(request())
    assert.equal(failed.status, 502)
    assert.ok(!(await failed.text()).includes('private provider detail'))
    global.fetch = async () => Response.json({ choices: [{ finish_reason: 'length', message: { content: JSON.stringify(report) } }] })
    assert.equal((await POST(request())).status, 502)
    const limited = await POST(request(input, { 'x-forwarded-for': 'different-ip' }))
    assert.equal(limited.status, 429)
    assert.equal(limited.headers.get('retry-after'), '60')
    let clock = savedNow()
    Date.now = () => clock += 61000
    for (const response of [
      { choices: [{ finish_reason: 'stop', message: { content: '{}' } }] },
      { choices: [{ finish_reason: 'stop', message: { content: 'invalid-json' } }] },
      { choices: [{ finish_reason: 'stop', message: { refusal: 'refused' } }] },
    ]) {
      global.fetch = async () => Response.json(response)
      assert.equal((await POST(request())).status, 502)
    }
    global.fetch = async () => { throw new DOMException('secret detail', 'TimeoutError') }
    assert.equal((await POST(request())).status, 502)
    let release
    global.fetch = () => new Promise(resolve => { release = resolve })
    const pending = POST(request())
    await new Promise(resolve => setImmediate(resolve))
    assert.equal((await POST(request())).status, 429)
    release(Response.json({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(report) } }] }))
    assert.equal((await pending).status, 200)
  } finally { global.fetch = savedFetch; Date.now = savedNow; process.env = saved }
})
