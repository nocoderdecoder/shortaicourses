import { businessTypes, catalogVersion, frameworkVersion, supportedTask, taskIds, type BusinessType, type TaskId } from './catalog'

export type RiskChoice = 'ordinary' | 'sensitive-or-regulated' | 'physical-safety'
export type RecommendationInput = {
  businessType: BusinessType
  taskId: TaskId
  taskDescription?: string
  risk: RiskChoice
}
export type Outcome = 'good-first-task' | 'possible-later' | 'skip-ai'
export type Recommendation = {
  outcome: Outcome
  taskId: TaskId
  title: string
  reason: string
  checks: string[]
  canTry: boolean
  frameworkVersion: typeof frameworkVersion
  catalogVersion: typeof catalogVersion
}

const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
const riskChoices: RiskChoice[] = ['ordinary', 'sensitive-or-regulated', 'physical-safety']
const allowedKeys = ['businessType', 'taskId', 'taskDescription', 'risk']
// These are deliberate, conservative gates, not an attempt to classify every
// risky request. A visitor's explicit risk answer remains the primary screen.
const dangerous = /\b(gas leak|carbon monoxide|electrocution|electrical fire|fire hazard|live wire|medical emergency|poisoning|suicid(?:e|al)|self[- ]harm|explosive|weapon|unsafe wiring)\b/i
const regulated = /\b(medical advice|diagnos(?:e|is)|treatment plan|legal advice|tax advice|investment advice|credit decision|loan approval|insurance claim|prescription|employment termination)\b/i
const physicalWork = /^(?:please\s+)?(?:repair|install|inspect|wire|drive|clean|cook|operate|build|fix)\b/i

export function isRecommendationInput(value: unknown): value is RecommendationInput {
  if (!object(value) || Object.keys(value).some(key => !allowedKeys.includes(key))) return false
  if (!businessTypes.includes(value.businessType as BusinessType) || !taskIds.includes(value.taskId as TaskId)) return false
  if (!riskChoices.includes(value.risk as RiskChoice)) return false
  if (value.taskDescription !== undefined && (typeof value.taskDescription !== 'string' || value.taskDescription.length > 240)) return false
  return value.taskId !== 'other' || typeof value.taskDescription === 'string' && value.taskDescription.trim().length >= 5
}

export function recommend(input: RecommendationInput): Recommendation {
  const task = supportedTask(input.taskId)
  const description = input.taskDescription?.trim() || ''
  const base = { taskId: input.taskId, frameworkVersion, catalogVersion }
  if (input.risk === 'physical-safety' || dangerous.test(description)) {
    return {
      ...base, outcome: 'skip-ai', title: 'Skip AI for this task',
      reason: 'A mistake here could affect someone’s safety. Use a qualified person or the established emergency process. AI can help with an ordinary follow-up draft after the urgent issue is handled.',
      checks: ['Do not use an AI draft to diagnose or handle an urgent safety issue.'], canTry: false,
    }
  }
  if (input.taskId === 'other' && physicalWork.test(description)) {
    return {
      ...base, outcome: 'skip-ai', title: 'Skip AI for this task',
      reason: 'This task needs physical work or direct inspection. A checklist for ordinary office work may be a better first trial.',
      checks: ['Use the right person, tools, and process for the physical task.'], canTry: false,
    }
  }
  if (input.risk === 'sensitive-or-regulated' || regulated.test(description)) {
    return {
      ...base, outcome: 'possible-later', title: 'Possible later task',
      reason: 'This may need private information or expert judgment. Try it only after you can remove sensitive details and arrange an appropriate review.',
      checks: ['Do not paste private customer or employee details.', 'Have a qualified person check any regulated advice.'], canTry: false,
    }
  }
  if (!task) {
    return {
      ...base, outcome: 'possible-later', title: 'Possible later task',
      reason: 'We have not tested this kind of task here yet. Choose a supported drafting or organizing task if you want to try a small example now.',
      checks: ['Compare a simple template or your current method before choosing AI.'], canTry: false,
    }
  }
  return {
    ...base, outcome: 'good-first-task', title: 'Good first task',
    reason: `A draft for “${task.label.toLowerCase()}” can start with information you provide. Check it yourself before you use it; a simple template may be quicker if you repeat exactly the same answer.`,
    checks: [...task.checks], canTry: true,
  }
}

export function trialTextRisk(text: string): 'unsafe' | 'sensitive' | null {
  if (dangerous.test(text)) return 'unsafe'
  if (regulated.test(text) || /\b(?:\d[ -]*?){13,19}\b/.test(text) || /\b\d{3}-\d{2}-\d{4}\b/.test(text) || /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(text)) return 'sensitive'
  return null
}
