/* eslint-disable @typescript-eslint/no-require-imports -- Deterministic Node harness compiles local TS only. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const originalLoader = require.extensions['.ts']
require.extensions['.ts'] = (mod, file) => mod._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file)
let quotaCheck = async () => ({ rateLimited: false })
const sdkPath = require.resolve('@vercel/firewall')
require(sdkPath)
require.cache[sdkPath].exports = { checkRateLimit: (...args) => quotaCheck(...args) }
const { POST: generate } = require('../app/api/ai-first-win/route.ts')
const { POST: recordEvent } = require('../app/api/ai-first-win/event/route.ts')
const { recommend, isRecommendationInput, trialTextRisk } = require('../lib/ai-first-win/recommend.ts')
const { isTrialRequest, isSafeModelDraft } = require('../lib/ai-first-win/trial.ts')
const { isOperationalEvent } = require('../lib/ai-first-win/events.ts')
const { frameworkVersion, catalogVersion } = require('../lib/ai-first-win/catalog.ts')
require.extensions['.ts'] = originalLoader
const { NextRequest } = require('next/server')

const context = { businessType: 'home-services', taskId: 'customer-reply', risk: 'ordinary' }
const details = { sourceText: 'Do you repair bathroom taps and when can you visit?', businessFacts: 'We repair bathroom taps in Portland. Ask the owner to confirm scheduling.' }
const trial = { context, details }
const request = (url, body, headers = {}) => new NextRequest(`http://localhost${url}`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) })
const generationRequest = (body = trial, headers = {}) => request('/api/ai-first-win', body, headers)
const eventRequest = (body, headers = {}) => request('/api/ai-first-win/event', body, headers)
const provider = (draft, finish_reason = 'stop') => Response.json({ choices: [{ finish_reason, message: { content: JSON.stringify({ draft }) } }] })
const goodDraft = 'Thanks for asking about bathroom taps. We repair bathroom taps in Portland. Please contact us to discuss your question and confirm a time.'

test('curated decisions cover ordinary, missing, unsupported, and unsafe tasks', () => {
  assert.equal(frameworkVersion, 'afw-framework-v0.1')
  assert.equal(catalogVersion, 'afw-catalog-v0.1')
  for (const [businessType, taskId] of [
    ['home-services', 'customer-reply'],
    ['retail', 'announcement'],
    ['professional-services', 'checklist'],
  ]) {
    const result = recommend({ businessType, taskId, risk: 'ordinary' })
    assert.equal(result.outcome, 'good-first-task')
    assert.equal(result.canTry, true)
    assert.ok(result.checks.length >= 2)
    assert.equal(result.frameworkVersion, frameworkVersion)
    assert.equal(result.catalogVersion, catalogVersion)
  }
  assert.equal(recommend({ ...context, risk: 'sensitive-or-regulated' }).outcome, 'possible-later')
  assert.equal(recommend({ ...context, risk: 'physical-safety' }).outcome, 'skip-ai')
  assert.equal(recommend({ ...context, taskDescription: 'Diagnose a gas leak' }).outcome, 'skip-ai')
  assert.equal(recommend({ ...context, taskId: 'other', taskDescription: 'Find a better way to manage jobs' }).outcome, 'possible-later')
  assert.equal(recommend({ ...context, taskId: 'other', taskDescription: 'Install wiring in a home' }).outcome, 'skip-ai')
  assert.equal(isRecommendationInput({ ...context, taskId: 'other' }), false)
  assert.equal(isRecommendationInput({ ...context, extra: 'untrusted' }), false)
  assert.equal(isTrialRequest({ ...trial, details: { sourceText: 'Customer asks a question' } }), false)
  assert.equal(isTrialRequest({ ...trial, details: { ...details, sourceText: ' ' } }), false)
  assert.equal(isTrialRequest(trial), true)
  assert.equal(trialTextRisk('Please diagnose a gas leak'), 'unsafe')
  assert.equal(trialTextRisk('My email is customer@example.com'), 'sensitive')
  assert.equal(isSafeModelDraft({ draft: 'Our service is guaranteed for 20 years.' }, details.sourceText), false)
  assert.equal(isSafeModelDraft({ draft: goodDraft }, `${details.sourceText}\n${details.businessFacts}`), true)
})

test('server validates and protects paid generation without exposing details', async () => {
  const savedFetch = global.fetch
  const savedNow = Date.now
  const savedEnv = { ...process.env }
  const savedError = console.error
  let clock = savedNow()
  let providerCalls = 0
  try {
    console.error = () => {}
    Date.now = () => clock
    process.env.NODE_ENV = 'test'
    delete process.env.OPENAI_API_KEY
    assert.equal((await generate(generationRequest())).status, 503)
    process.env.OPENAI_API_KEY = 'test-placeholder-not-real'
    process.env.NODE_ENV = 'production'
    delete process.env.AI_FIRST_WIN_ENABLED
    assert.equal((await generate(generationRequest())).status, 503)
    process.env.NODE_ENV = 'test'
    assert.equal((await generate(generationRequest(trial, { origin: 'https://evil.example' }))).status, 403)
    assert.equal((await generate(generationRequest(trial, { 'content-type': 'text/plain' }))).status, 415)
    assert.equal((await generate(generationRequest('{'))).status, 400)
    assert.equal((await generate(generationRequest('x'.repeat(8_001)))).status, 413)
    assert.equal((await generate(generationRequest({ ...trial, details: { sourceText: 'Question only' } }))).status, 400)
    assert.equal((await generate(generationRequest({ ...trial, details: { ...details, businessFacts: ' ' } }))).status, 400)
    assert.equal((await generate(generationRequest({ ...trial, context: { ...context, taskId: 'other', taskDescription: 'Handle payroll' } }))).status, 422)
    assert.equal((await generate(generationRequest({ ...trial, context: { ...context, risk: 'physical-safety' } }))).status, 422)
    assert.equal((await generate(generationRequest({ ...trial, details: { ...details, sourceText: 'Please diagnose a gas leak at my home.' } }))).status, 422)
    assert.equal((await generate(generationRequest({ ...trial, details: { ...details, sourceText: 'Please email me at jane@example.com with details.' } }))).status, 422)
    global.fetch = async (url, options) => {
      providerCalls++
      assert.equal(url, 'https://api.openai.com/v1/chat/completions')
      const body = JSON.parse(options.body)
      assert.equal(body.model, 'gpt-4.1-mini')
      assert.equal(body.store, false)
      assert.equal(body.max_completion_tokens, 700)
      assert.equal(body.response_format.json_schema.strict, true)
      assert.equal(body.messages[2].role, 'user')
      assert.ok(body.messages[0].content.includes('untrusted'))
      return provider(goodDraft)
    }
    const success = await generate(generationRequest())
    assert.equal(success.status, 200)
    assert.equal(success.headers.get('cache-control'), 'no-store')
    const output = await success.json()
    assert.equal(output.result.draft, goodDraft)
    assert.equal(output.result.checks.length, 3)
    assert.equal(output.result.unknowns.length, 1)
    assert.equal(output.frameworkVersion, frameworkVersion)
    assert.equal(providerCalls, 1)
    global.fetch = async () => { providerCalls++; return Response.json({ error: 'provider-private-detail' }, { status: 429 }) }
    const badProvider = await generate(generationRequest())
    assert.equal(badProvider.status, 502)
    assert.ok(!(await badProvider.text()).includes('provider-private-detail'))
    global.fetch = async () => { providerCalls++; return provider(goodDraft, 'length') }
    assert.equal((await generate(generationRequest())).status, 502)
    assert.equal((await generate(generationRequest())).status, 429)
    assert.equal(providerCalls, 3)
    clock += 61_000
    global.fetch = async () => { providerCalls++; return provider('Our service is guaranteed for $99 tomorrow.') }
    assert.equal((await generate(generationRequest())).status, 502)
    global.fetch = async () => { providerCalls++; return Response.json({ choices: [{ finish_reason: 'stop', message: { refusal: 'no' } }] }) }
    assert.equal((await generate(generationRequest())).status, 502)
    global.fetch = async () => { providerCalls++; throw new DOMException('secret timeout detail', 'TimeoutError') }
    assert.equal((await generate(generationRequest())).status, 502)
    clock += 61_000
    let release
    global.fetch = () => new Promise(resolve => { release = resolve })
    const pending = generate(generationRequest())
    await new Promise(resolve => setImmediate(resolve))
    assert.equal((await generate(generationRequest())).status, 429)
    release(provider(goodDraft))
    assert.equal((await pending).status, 200)
    process.env.NODE_ENV = 'production'
    process.env.AI_FIRST_WIN_ENABLED = 'true'
    clock += 61_000
    providerCalls = 0
    global.fetch = async () => { providerCalls++; return provider(goodDraft) }
    delete process.env.RATE_LIMIT_SECRET
    assert.equal((await generate(generationRequest())).status, 503)
    assert.equal(providerCalls, 0)
    process.env.RATE_LIMIT_SECRET = 'test-placeholder'
    for (const [quotaResult, status] of [
      [{ rateLimited: true }, 429],
      [{ rateLimited: false, error: 'not-found' }, 503],
      [{}, 503],
    ]) {
      clock += 61_000
      quotaCheck = async (id, options) => {
        assert.equal(id, 'gtm-generation')
        assert.equal(options.rateLimitKey, 'gtm-lab-shared-v1')
        assert.equal(options.timeout, 3000)
        return quotaResult
      }
      const result = await generate(generationRequest())
      assert.equal(result.status, status)
      if (status === 429) assert.equal(result.headers.get('retry-after'), '600')
      assert.equal(providerCalls, 0)
    }
    clock += 61_000
    quotaCheck = async () => { throw new Error('private quota failure') }
    assert.equal((await generate(generationRequest())).status, 503)
    assert.equal(providerCalls, 0)
    clock += 61_000
    quotaCheck = async () => ({ rateLimited: false })
    assert.equal((await generate(generationRequest())).status, 200)
    assert.equal(providerCalls, 1)
  } finally {
    global.fetch = savedFetch; Date.now = savedNow; process.env = savedEnv; console.error = savedError
  }
})

test('operational events accept categories only and enforce size and rate caps', async () => {
  const savedNow = Date.now
  const savedEnv = { ...process.env }
  const savedInfo = console.info
  const messages = []
  try {
    console.info = (...args) => messages.push(args)
    process.env.NODE_ENV = 'test'
    let clock = savedNow()
    Date.now = () => clock
    const event = { event: 'recommendation', businessType: 'retail', taskId: 'announcement', outcome: 'good-first-task', campaign: 'pilot', frameworkVersion }
    assert.equal(isOperationalEvent(event), true)
    assert.equal(isOperationalEvent({ ...event, prompt: 'secret' }), false)
    assert.equal(isOperationalEvent({ ...event, campaign: 'recipient-123' }), false)
    assert.equal((await recordEvent(eventRequest(event))).status, 200)
    assert.equal(messages.length, 1)
    assert.ok(!JSON.stringify(messages).includes('recipient-123'))
    assert.equal(JSON.parse(messages[0][1]).catalogVersion, catalogVersion)
    assert.equal((await recordEvent(eventRequest({ ...event, prompt: 'secret' }))).status, 400)
    assert.equal((await recordEvent(eventRequest({ ...event, campaign: 'recipient-123' }))).status, 400)
    assert.equal((await recordEvent(eventRequest('x'.repeat(1_025)))).status, 413)
    assert.equal((await recordEvent(eventRequest(event, { origin: 'https://evil.example' }))).status, 403)
    for (let i = 0; i < 56; i++) assert.equal((await recordEvent(eventRequest({ event: 'landing' }))).status, 200)
    assert.equal((await recordEvent(eventRequest({ event: 'landing' }))).status, 429)
    clock += 61_000
    process.env.NODE_ENV = 'production'
    delete process.env.AI_FIRST_WIN_ENABLED
    assert.equal((await recordEvent(eventRequest({ event: 'landing' }))).status, 503)
  } finally { Date.now = savedNow; process.env = savedEnv; console.info = savedInfo }
})
