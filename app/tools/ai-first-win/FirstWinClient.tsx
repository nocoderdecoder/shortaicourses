'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { businessOptions, taskCatalog } from '@/lib/ai-first-win/catalog'
import { recommend, type RecommendationInput } from '@/lib/ai-first-win/recommend'
import styles from './FirstWin.module.css'

type Step = 'welcome' | 'business' | 'task' | 'risk' | 'recommendation' | 'trial' | 'result'
type BusinessType = RecommendationInput['businessType']
type TaskId = RecommendationInput['taskId']
type Risk = RecommendationInput['risk']
type Recommendation = ReturnType<typeof recommend>
type TrialResult = { draft: string; checks: string[]; unknowns: string[] }
type EventName = 'landing' | 'start' | 'recommendation' | 'try_attempt' | 'result' | 'error' | 'copy' | 'edit' | 'feedback_yes' | 'feedback_no'

const riskOptions: { id: Risk; label: string; description: string }[] = [
  { id: 'ordinary', label: 'No, this is a routine task', description: 'I can check the result myself before using it.' },
  { id: 'sensitive-or-regulated', label: 'It involves private details or expert advice', description: 'For example, customer data, money, legal or health advice.' },
  { id: 'physical-safety', label: 'A wrong answer could hurt someone', description: 'For example, a repair diagnosis or a safety procedure.' },
]

const examples: Record<Exclude<TaskId, 'other'>, { sourceText: string; businessFacts: string }> = {
  'customer-reply': {
    sourceText: 'Do you repair leaking faucets? Can someone come this Saturday?',
    businessFacts: 'Fictional example: Maple Plumbing repairs leaking faucets in Springfield. Hours are Monday through Friday, 9 a.m. to 5 p.m. Saturday visits are not offered. Availability must be confirmed by phone. A price requires an inspection.',
  },
  announcement: {
    sourceText: 'Fictional example: Our neighborhood bicycle shop will offer free tire-pressure checks this Saturday from 10 a.m. to 2 p.m. at 24 Main Street. No purchase is needed.',
    businessFacts: '',
  },
  checklist: {
    sourceText: 'Fictional example: At closing, count the register, lock the back door, turn off display lights, put the daily sales sheet in the office folder, and set the alarm.',
    businessFacts: '',
  },
}

function validResult(value: unknown): value is TrialResult {
  if (!value || typeof value !== 'object') return false
  const result = value as Record<string, unknown>
  return typeof result.draft === 'string' && result.draft.trim().length > 0 && result.draft.length <= 8000 &&
    Array.isArray(result.checks) && result.checks.length >= 1 && result.checks.length <= 5 &&
    result.checks.every(x => typeof x === 'string' && x.trim().length > 0 && x.length <= 500) &&
    Array.isArray(result.unknowns) && result.unknowns.length <= 5 &&
    result.unknowns.every(x => typeof x === 'string' && x.trim().length > 0 && x.length <= 500)
}

function safeCampaign() {
  const params = new URLSearchParams(window.location.search)
  const candidate = params.get('campaign') ?? params.get('utm_campaign') ?? ''
  const allowed = ['direct', 'pilot', 'newsletter', 'partner', 'social', 'search', 'other']
  return allowed.includes(candidate.toLowerCase()) ? candidate.toLowerCase() : undefined
}

function Choice<T extends string>({ id, label, description, selected, onSelect }: {
  id: T; label: string; description: string; selected: boolean; onSelect: (id: T) => void
}) {
  return <button type="button" aria-pressed={selected} className={`${styles.choice} ${selected ? styles.choiceSelected : ''}`} onClick={() => onSelect(id)}>
    <span className={styles.choiceMark} aria-hidden="true">{selected ? '✓' : ''}</span>
    <span><span className={styles.choiceLabel}>{label}</span><span className={styles.choiceDescription}>{description}</span></span>
  </button>
}

function StepHeader({ step, title, description, headingRef }: { step: number; title: string; description?: string; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  return <>
    <div className={styles.stepTop}>
      <p className={styles.stepCount}>Question {step} of 3</p>
      <div className={styles.stepDots} aria-hidden="true">{[1, 2, 3].map(n => <span key={n} className={`${styles.stepDot} ${n <= step ? styles.stepDotActive : ''}`} />)}</div>
    </div>
    <h2 ref={headingRef} tabIndex={-1} className={styles.title}>{title}</h2>
    {description && <p className={styles.subtext}>{description}</p>}
  </>
}

export default function FirstWinClient() {
  const [step, setStep] = useState<Step>('welcome')
  const [businessType, setBusinessType] = useState<BusinessType | ''>('')
  const [taskId, setTaskId] = useState<TaskId | ''>('')
  const [taskDescription, setTaskDescription] = useState('')
  const [risk, setRisk] = useState<Risk | ''>('')
  const [decision, setDecision] = useState<Recommendation | null>(null)
  const [sourceText, setSourceText] = useState('')
  const [businessFacts, setBusinessFacts] = useState('')
  const [trialResult, setTrialResult] = useState<TrialResult | null>(null)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [rating, setRating] = useState<'yes' | 'no' | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const campaignRef = useRef<string | undefined>(undefined)
  const editedRef = useRef(false)
  const visitedRef = useRef(false)

  function record(event: EventName, extra: Partial<{ outcome: Recommendation['outcome']; frameworkVersion: Recommendation['frameworkVersion'] }> = {}) {
    const payload = {
      event,
      ...(businessType ? { businessType } : {}),
      ...(taskId ? { taskId } : {}),
      ...(campaignRef.current ? { campaign: campaignRef.current } : {}),
      ...extra,
    }
    void fetch('/api/ai-first-win/event', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true,
    }).catch(() => {})
  }

  useEffect(() => {
    if (visitedRef.current) return
    visitedRef.current = true
    campaignRef.current = safeCampaign()
    void fetch('/api/ai-first-win/event', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'landing', ...(campaignRef.current ? { campaign: campaignRef.current } : {}) }), keepalive: true,
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (step === 'welcome') return
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus()
      headingRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [step])

  const selectedTask = taskCatalog.find(item => item.id === taskId)
  const taskIsOther = taskId === 'other'
  const showTaskDetails = taskIsOther && taskDescription.trim().length < 10

  function showRecommendation() {
    if (!businessType || !taskId || !risk || (taskIsOther && showTaskDetails)) return
    const context: RecommendationInput = { businessType, taskId, risk, ...(taskIsOther ? { taskDescription: taskDescription.trim() } : {}) }
    const next = recommend(context)
    setDecision(next)
    setError('')
    setStep('recommendation')
    record('recommendation', { outcome: next.outcome, frameworkVersion: next.frameworkVersion })
  }

  async function generate() {
    if (busy || !decision?.canTry || !businessType || !taskId || !risk) return
    if (sourceText.trim().length < 10 || (taskId === 'customer-reply' && businessFacts.trim().length < 10)) {
      setError('Add a little more detail so the draft has facts to work with.')
      return
    }
    const context: RecommendationInput = { businessType, taskId, risk, ...(taskIsOther ? { taskDescription: taskDescription.trim() } : {}) }
    setBusy(true); setError(''); setTrialResult(null); setDraft('')
    record('try_attempt', { outcome: decision.outcome, frameworkVersion: decision.frameworkVersion })
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 45000)
    try {
      const response = await fetch('/api/ai-first-win', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, details: { sourceText: sourceText.trim(), ...(businessFacts.trim() ? { businessFacts: businessFacts.trim() } : {}) } }),
        signal: controller.signal,
      })
      const data: unknown = await response.json().catch(() => ({}))
      const body = data && typeof data === 'object' ? data as Record<string, unknown> : {}
      if (!response.ok || !validResult(body.result)) {
        const message = typeof body.error === 'string' && body.error.length <= 180 ? body.error : 'We could not make a draft right now. Please try again.'
        throw new Error(message)
      }
      setTrialResult(body.result)
      setDraft(body.result.draft)
      editedRef.current = false
      setRating(null)
      setStep('result')
      record('result', { outcome: decision.outcome, frameworkVersion: decision.frameworkVersion })
    } catch (failure) {
      setError(controller.signal.aborted ? 'That took too long. Please try again.' : failure instanceof Error ? failure.message : 'We could not make a draft right now.')
      record('error', { outcome: decision.outcome, frameworkVersion: decision.frameworkVersion })
    } finally {
      clearTimeout(timeout)
      setBusy(false)
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
      record('copy', { outcome: decision?.outcome, frameworkVersion: decision?.frameworkVersion })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Copy is unavailable in this browser. Select the text in the draft to copy it.')
    }
  }

  const outcomeLabel = decision?.outcome === 'good-first-task' ? 'Good first task' : decision?.outcome === 'possible-later' ? 'Possible later task' : 'Skip AI for this task'
  const recommendationHeading = decision?.outcome === 'good-first-task' ? selectedTask?.label ?? 'One useful task to try' : decision?.outcome === 'possible-later' ? 'This task needs more preparation' : 'A person should handle this task'
  const outcomeStyle = decision?.outcome === 'possible-later' ? styles.outcomeLater : decision?.outcome === 'skip-ai' ? styles.outcomeSkip : ''

  return <div className={styles.shell}>
    <div className={styles.inner}>
      <p className={styles.eyebrow}>Free business tool · AI First Win</p>
      <h1 className={styles.hero}>Could AI make one part of your work easier?</h1>
      <p className={styles.lede}>Tell us what you do. We&apos;ll help you choose one task and, when it makes sense, try it right here.</p>
      <p className={styles.promise}>About 3 minutes to get started · Free to try · No account needed</p>

      {step === 'welcome' && <section className={styles.card} aria-labelledby="first-win-welcome">
        <h2 id="first-win-welcome" className={styles.title}>Start with one small task</h2>
        <p className={styles.subtext}>You&apos;ll get one plain-language suggestion. If the task is a good fit, you can make a first draft and decide whether it&apos;s useful.</p>
        <div className={styles.actions}><button type="button" className={styles.buttonPrimary} onClick={() => { setStep('business'); record('start') }}>Find my first task →</button></div>
        <div className={styles.quietBox}>Your first try on this site is free. AI makes drafts; you check the facts and decide what to use. Please leave out private customer or employee information.</div>
      </section>}

      {step === 'business' && <section className={styles.card} aria-label="Choose your business type">
        <StepHeader step={1} title="What kind of business do you run?" description="Choose the closest option. It does not have to be an exact match." headingRef={headingRef} />
        <fieldset className={styles.choices} aria-label="Business type">{businessOptions.map(option => <Choice key={option.id} {...option} selected={businessType === option.id} onSelect={id => { setBusinessType(id); setDecision(null) }} />)}</fieldset>
        <div className={styles.actions}><button type="button" className={styles.buttonPrimary} disabled={!businessType} onClick={() => setStep('task')}>Continue →</button></div>
      </section>}

      {step === 'task' && <section className={styles.card} aria-label="Choose one task">
        <StepHeader step={2} title="Which task takes your time?" description="Think of one real job you do, rather than a big goal for the whole business." headingRef={headingRef} />
        <fieldset className={styles.choices} aria-label="Business task">{taskCatalog.map(task => <Choice key={task.id} id={task.id} label={task.label} description={task.description} selected={taskId === task.id} onSelect={id => { setTaskId(id); setDecision(null); setSourceText(''); setBusinessFacts('') }} />)}</fieldset>
        {taskIsOther && <label className={styles.field}><span className={styles.fieldLabel}>What task did you have in mind?</span><textarea className={styles.textarea} maxLength={240} value={taskDescription} onChange={event => setTaskDescription(event.target.value)} placeholder="For example, decide what to order for my shop each week" /><span className={styles.fieldHint}>One sentence is enough. Leave out private details.</span></label>}
        <div className={styles.actions}><button type="button" className={styles.buttonPrimary} disabled={!taskId || showTaskDetails} onClick={() => setStep('risk')}>Continue →</button><button type="button" className={styles.buttonText} onClick={() => setStep('business')}>← Back</button></div>
      </section>}

      {step === 'risk' && <section className={styles.card} aria-label="Check the task's risks">
        <StepHeader step={3} title="What could go wrong if the answer is wrong?" description="This helps us decide whether a small AI trial is a sensible place to start." headingRef={headingRef} />
        <fieldset className={styles.choices} aria-label="Task risk">{riskOptions.map(option => <Choice key={option.id} {...option} selected={risk === option.id} onSelect={setRisk} />)}</fieldset>
        <div className={styles.actions}><button type="button" className={styles.buttonPrimary} disabled={!risk} onClick={showRecommendation}>See my suggestion →</button><button type="button" className={styles.buttonText} onClick={() => setStep('task')}>← Back</button></div>
      </section>}

      {step === 'recommendation' && decision && <section className={styles.card} aria-label="Your task recommendation">
        <span className={`${styles.outcome} ${outcomeStyle}`}>{outcomeLabel}</span>
        <h2 ref={headingRef} tabIndex={-1} className={styles.title} style={{ marginTop: 18 }}>{recommendationHeading}</h2>
        <p className={styles.subtext}>{decision.reason}</p>
        {decision.checks.length > 0 && <div className={styles.quietBox}><h3 className={styles.smallTitle}>{decision.canTry ? 'Before you use a draft' : 'What would need to change?'}</h3><ul className={styles.list}>{decision.checks.slice(0, 3).map(check => <li key={check}>{check}</li>)}</ul></div>}
        <div className={styles.actions}>
          {decision.canTry && <button type="button" className={styles.buttonPrimary} onClick={() => setStep('trial')}>Try it now →</button>}
          <button type="button" className={decision.canTry ? styles.buttonText : styles.buttonPrimary} onClick={() => { setTaskId(''); setRisk(''); setDecision(null); setStep('task') }}>Show another idea</button>
          <button type="button" className={styles.buttonText} onClick={() => setStep('risk')}>← Back</button>
        </div>
        {!decision.canTry && <p className={styles.fieldHint}>A saved template, your current process, or a qualified person may be a better next step for this task.</p>}
      </section>}

      {step === 'trial' && decision && decision.canTry && selectedTask && <section className={styles.card} aria-label="Try your task">
        <p className={styles.stepCount}>A small supervised try</p>
        <h2 ref={headingRef} tabIndex={-1} className={styles.title} style={{ marginTop: 9 }}>Let&apos;s make one first draft</h2>
        <p className={styles.subtext}>Add only the information needed for this task. You&apos;ll review and edit the result before using it.</p>
        <label className={styles.field}><span className={styles.fieldLabel}>{selectedTask.sourceLabel}</span><textarea className={styles.textarea} minLength={10} maxLength={1800} value={sourceText} disabled={busy} onChange={event => setSourceText(event.target.value)} placeholder={selectedTask.sourceHint} /><span className={styles.fieldHint}>{selectedTask.sourceHint}</span></label>
        {taskId === 'customer-reply' && <label className={styles.field}><span className={styles.fieldLabel}>What facts can you confirm about your business?</span><textarea className={styles.textarea} minLength={10} maxLength={1200} value={businessFacts} disabled={busy} onChange={event => setBusinessFacts(event.target.value)} placeholder="Services, hours, area, or other facts you know are true" /><span className={styles.fieldHint}>The draft should use your facts, never guess prices, availability, or promises.</span></label>}
        <div className={styles.actions}>
          <button type="button" className={styles.buttonSecondary} disabled={busy || !taskId || taskId === 'other'} onClick={() => { if (taskId && taskId !== 'other') { const example = examples[taskId]; setSourceText(example.sourceText); setBusinessFacts(example.businessFacts); setError('') } }}>Use fictional example</button>
        </div>
        <div className={styles.quietBox}>Please do not paste names, contact details, private customer information, or confidential business information. Your details are sent to OpenAI to make this draft.</div>
        {error && <p className={styles.notice} role="alert">{error}</p>}
        <p role="status" aria-live="polite" className={styles.fieldHint}>{busy ? 'Making your draft. This can take up to 45 seconds.' : ''}</p>
        <div className={styles.actions}><button type="button" className={styles.buttonPrimary} disabled={busy || sourceText.trim().length < 10 || (taskId === 'customer-reply' && businessFacts.trim().length < 10)} onClick={generate}>{busy ? 'Making your draft…' : 'Make my draft →'}</button><button type="button" className={styles.buttonText} disabled={busy} onClick={() => { setError(''); setStep('recommendation') }}>← Back</button></div>
      </section>}

      {step === 'result' && trialResult && <section className={styles.card} aria-label="Your editable draft">
        <span className={styles.outcome}>Your first draft</span>
        <h2 ref={headingRef} tabIndex={-1} className={styles.title} style={{ marginTop: 18 }}>Make it yours before you use it</h2>
        <p className={styles.subtext}>This is a starting point based on what you entered. Read it closely, change anything that sounds wrong, and send or publish it yourself.</p>
        <label className={styles.field}><span className={styles.fieldLabel}>Edit your draft</span><textarea className={`${styles.textarea} ${styles.textareaLarge}`} value={draft} maxLength={8000} onChange={event => { setDraft(event.target.value); if (!editedRef.current) { editedRef.current = true; record('edit', { outcome: decision?.outcome, frameworkVersion: decision?.frameworkVersion }) } }} /><span className={styles.fieldHint}>Your edits stay in this browser tab. Copy the draft to save it.</span></label>
        <div className={styles.actions}><button type="button" className={styles.buttonPrimary} disabled={!draft.trim()} onClick={copyDraft}>{copied ? 'Copied ✓' : 'Copy draft'}</button><button type="button" className={styles.buttonText} onClick={() => { setError(''); setStep('trial') }}>Change my details</button></div>
        {error && <p className={styles.notice} role="alert">{error}</p>}
        <hr className={styles.divider} />
        <h3 className={styles.smallTitle}>Check these before using it</h3>
        <ul className={styles.list}>{trialResult.checks.slice(0, 3).map(check => <li key={check}>{check}</li>)}</ul>
        <div className={styles.quietBox}><h3 className={styles.smallTitle}>What AI cannot know</h3><ul className={styles.list}>{(trialResult.unknowns.length ? trialResult.unknowns : ['Whether your facts are still current and complete.']).map(unknown => <li key={unknown}>{unknown}</li>)}</ul></div>
        <div className={styles.quietBox}><h3 className={styles.smallTitle}>Should you do this again?</h3><p style={{ marginTop: 8 }}>Compare the time spent entering details and checking this draft with your usual method. If a saved reply or checklist is faster, use that instead. Include any tool cost if you try an AI service elsewhere.</p></div>
        <hr className={styles.divider} />
        <h3 className={styles.smallTitle}>Was this useful?</h3>
        <p className={styles.fieldHint}>Optional. Your answer helps us improve the tool; it does not include your draft.</p>
        <div className={styles.actions}><button type="button" className={styles.buttonSecondary} aria-pressed={rating === 'yes'} onClick={() => { if (!rating) { setRating('yes'); record('feedback_yes', { outcome: decision?.outcome, frameworkVersion: decision?.frameworkVersion }) } }}>Yes</button><button type="button" className={styles.buttonSecondary} aria-pressed={rating === 'no'} onClick={() => { if (!rating) { setRating('no'); record('feedback_no', { outcome: decision?.outcome, frameworkVersion: decision?.frameworkVersion }) } }}>Not yet</button>{rating && <span role="status" className={styles.success}>Thanks for telling us.</span>}</div>
        <hr className={styles.divider} />
        <h3 className={styles.smallTitle}>Want to get better at this?</h3>
        <p className={styles.fieldHint}>This short lesson shows how to give AI clear facts and review what it returns.</p>
        <Link className={styles.courseLink} href="/courses/prompting-for-professionals/prompt-templates-for-business">Explore a free lesson →</Link>
      </section>}
    </div>
  </div>
}
