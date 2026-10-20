'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { isLabReport, type LabInput, type LabReport } from '@/lib/gtm-strategy'

const example: LabInput = {
  product: 'A shock-resistant electrical plug designed to improve consumer safety. Technical claims have not yet been independently verified.',
  customers: 'Households, electrical retailers, residential builders',
  market: 'India',
  stage: 'Early product validation',
  challenge: 'Identify the first attractive customer segment and distribution channel',
}
const blank: LabInput = { product: '', customers: '', market: '', stage: '', challenge: '' }
const fields: { key: keyof LabInput; label: string; hint: string }[] = [
  { key: 'product', label: 'What are you building?', hint: 'Describe your product and its proposed value.' },
  { key: 'customers', label: 'Who might buy it?', hint: 'List possible customer groups.' },
  { key: 'market', label: 'Target geography', hint: 'e.g. India, US, Southeast Asia' },
  { key: 'stage', label: 'Business stage', hint: 'e.g. Prototype, pre-launch, early revenue' },
  { key: 'challenge', label: 'Biggest GTM question', hint: 'e.g. Who should we sell to first?' },
]
function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
    <div className="mb-5 flex items-center gap-3"><span className="rounded-md px-2 py-1 text-xs font-bold" style={{ background: 'var(--accent-light)', color: 'var(--lab-ink)' }}>{number}</span><h2 className="text-lg font-bold tracking-normal">{title}</h2></div>
    {children}
  </section>
}
function exportText(r: LabReport) {
  return [r.headline, r.executiveSummary, '\nCUSTOMER SEGMENTS', ...r.icps.map(x => `${x.name} (${x.priority})\nBuyer: ${x.buyer}\nWhy: ${x.rationale}\nRisk: ${x.risk}`), '\nPOSITIONING', ...r.positioning.map(x => `${x.segment}: ${x.headline}\n${x.message}\nEvidence needed: ${x.proofNeeded}`), '\nEXPERIMENTS', ...r.experiments.map(x => `${x.name}: ${x.action}\nSuccess signal: ${x.successSignal}`), '\n30-DAY PLAN', ...r.plan.map(x => `Week ${x.week}: ${x.focus}\n${x.actions.join('\n')}\nDeliverable: ${x.deliverable}`), '\nASSUMPTIONS', ...r.assumptions, '\nRECOMMENDATION', r.recommendation, '\nAI-generated hypotheses, not verified market research.'].join('\n\n')
}
export default function LabClient() {
  const [input, setInput] = useState<LabInput>(blank)
  const [report, setReport] = useState<LabReport | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return
    setBusy(true); setError(''); setReport(null)
    try {
      const res = await fetch('/api/gtm-strategy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input), signal: AbortSignal.timeout(45000) })
      const data = await res.json()
      if (!res.ok || !isLabReport(data.report)) throw new Error(data.error || 'Generation failed')
      setReport(data.report)
      setTimeout(() => document.getElementById('lab-results')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }), 100)
    } catch (err) { setError(err instanceof Error ? err.message : 'Please retry.') }
    finally { setBusy(false) }
  }
  return <div className="gtm-lab min-h-screen" style={{ background: 'var(--surface)' }}>
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em]" style={{ color: 'var(--lab-ink)' }}>Founder tools · Strategy workspace</p>
        <h1 className="text-3xl font-extrabold tracking-normal sm:text-4xl">Go from product idea to<br /><span style={{ color: 'var(--lab-ink)' }}>go-to-market hypotheses.</span></h1>
        <p className="mt-5 max-w-2xl text-base leading-7" style={{ color: 'var(--text-muted)' }}>A practical AI strategy lab for founders. Explore who to target, how to position your product, and what to validate in the next 30 days.</p>
      </div>
      <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={submit} className="rounded-2xl border p-6 shadow-sm sm:p-8" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
          <div className="mb-6 flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Tell us about your startup</h2><button type="button" disabled={busy} onClick={() => { setInput(example); setReport(null); setError('') }} className="text-xs font-semibold hover:underline" style={{ color: 'var(--lab-ink)' }}>Load example</button></div>
          <fieldset disabled={busy} className="space-y-5">{fields.map(f => <label className="block" key={f.key}><span className="mb-2 block text-sm font-semibold">{f.label}</span>{f.key === 'product' ? <textarea required maxLength={1200} rows={3} value={input[f.key]} onChange={e => setInput({ ...input, [f.key]: e.target.value })} placeholder={f.hint} className="w-full rounded-lg border px-3 py-3 text-sm outline-offset-2" style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }} /> : <input required maxLength={1200} value={input[f.key]} onChange={e => setInput({ ...input, [f.key]: e.target.value })} placeholder={f.hint} className="w-full rounded-lg border px-3 py-3 text-sm outline-offset-2" style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />}</label>)}</fieldset>
          <p role="status" aria-live="polite" className="mt-4 text-sm">{busy ? 'Building your strategy. This may take up to 45 seconds.' : ''}</p>
          {error && <p role="alert" className="mt-5 rounded-lg p-3 text-sm" style={{ background: '#FEE2E2', color: '#991B1B' }}>{error}</p>}
          <button disabled={busy} type="submit" className="mt-7 w-full rounded-lg px-5 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60" style={{ background: 'var(--accent)' }}>{busy ? 'Building your strategy…' : 'Generate my GTM strategy →'}</button>
          <p className="mt-3 text-center text-xs leading-5" style={{ color: 'var(--text-muted)' }}>AI-generated recommendations are hypotheses, not verified research. Your inputs are sent to OpenAI to generate this report. Do not enter confidential information.</p>
        </form>
        <aside className="flex flex-col justify-between rounded-2xl border p-7 sm:p-8" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
          <div><div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl" style={{ background: 'var(--accent-light)', color: 'var(--lab-ink)' }}>✦</div><h2 className="text-2xl font-bold tracking-normal">A founder-ready plan, not another generic AI answer.</h2><p className="mt-4 text-sm leading-7" style={{ color: 'var(--text-muted)' }}>Your report connects target customers, positioning, channel experiments, and concrete validation steps.</p><div className="mt-7 space-y-4">{['Three prioritized customer profiles', 'Positioning for each audience', 'Four measurable channel experiments', 'A practical 30-day action plan', 'Risks and assumptions to verify'].map((x, i) => <div key={x} className="flex gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: 'var(--accent-light)', color: 'var(--lab-ink)' }}>{i + 1}</span><span>{x}</span></div>)}</div></div>
          <button type="button" className="mt-8 self-start text-xs font-semibold underline underline-offset-4" style={{ color: 'var(--text-muted)' }} disabled={busy} onClick={() => { setInput(blank); setReport(null); setError('') }}>Start with a blank form</button>
        </aside>
      </div>
      {report && <div id="lab-results" aria-live="polite" className="mt-12 space-y-5 scroll-mt-32">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.18em]" style={{ color: 'var(--lab-ink)' }}>Your strategy report</p><h2 className="max-w-3xl text-3xl font-extrabold tracking-normal">{report.headline}</h2></div><button onClick={async () => { try { await navigator.clipboard.writeText(exportText(report)); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setError('Copy unavailable in this browser.') } }} className="rounded-lg border px-4 py-2 text-sm font-semibold" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>{copied ? 'Copied ✓' : 'Copy full report'}</button></div>
        <div className="rounded-xl border-l-4 p-5 text-sm leading-7" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>{report.executiveSummary}</div>
        <Section number="01" title="Who to target first"><div className="grid gap-3 md:grid-cols-3">{report.icps.map((x, i) => <div key={i} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}><div className="mb-3 flex items-center justify-between gap-2"><span className="text-xs font-bold" style={{ color: 'var(--lab-ink)' }}>#{i + 1}</span><span className="rounded-full border px-2 py-1 text-[10px] font-bold" style={{ borderColor: 'var(--border)' }}>{x.priority} priority</span></div><h3 className="font-bold">{x.name}</h3><p className="mt-2 text-xs leading-6" style={{ color: 'var(--text-muted)' }}>{x.rationale}</p><p className="mt-4 text-xs"><strong>Buyer:</strong> {x.buyer}</p><p className="mt-2 text-xs"><strong>Risk:</strong> {x.risk}</p></div>)}</div></Section>
        <Section number="02" title="How to position it"><div className="grid gap-4 md:grid-cols-3">{report.positioning.map((x,i) => <div key={i}><p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--lab-ink)' }}>{x.segment}</p><h3 className="mt-2 font-bold">{x.headline}</h3><p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-muted)' }}>{x.message}</p><p className="mt-3 text-xs"><strong>Proof needed:</strong> {x.proofNeeded}</p></div>)}</div></Section>
        <Section number="03" title="Channel experiments"><div className="grid gap-3 md:grid-cols-2">{report.experiments.map((x,i) => <div key={i} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}><h3 className="font-bold">{x.name}</h3><p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-muted)' }}>{x.action}</p><p className="mt-3 text-xs"><strong>Success signal:</strong> {x.successSignal}</p></div>)}</div></Section>
        <Section number="04" title="Your first 30 days"><div className="grid gap-4 md:grid-cols-4">{report.plan.map((x,i) => <div key={i}><span className="text-xs font-bold" style={{ color: 'var(--lab-ink)' }}>WEEK {x.week}</span><h3 className="mt-2 font-bold">{x.focus}</h3><ul className="mt-3 list-disc space-y-2 pl-4 text-xs leading-5" style={{ color: 'var(--text-muted)' }}>{x.actions.map((a,j) => <li key={j}>{a}</li>)}</ul><p className="mt-3 text-xs"><strong>Deliverable:</strong> {x.deliverable}</p></div>)}</div></Section>
        <Section number="05" title="What must be verified"><ul className="space-y-3">{report.assumptions.map((x,i) => <li key={i} className="flex gap-3 text-sm"><span style={{ color: 'var(--lab-ink)' }}>○</span>{x}</li>)}</ul></Section>
        <div className="rounded-2xl p-7 text-white" style={{ background: '#172554' }}><p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-200">Founder decision</p><p className="text-lg font-semibold leading-8">{report.recommendation}</p><p className="mt-5 text-xs leading-5 text-blue-200">AI-generated strategic hypotheses. Verify product claims, market demand, compliance, and financial assumptions before acting.</p></div>
      </div>}
    </div>
  </div>
}
