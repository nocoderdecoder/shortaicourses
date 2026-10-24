import type { RecommendationInput } from './recommend'
import { isRecommendationInput } from './recommend'

export type TrialDetails = { sourceText: string; businessFacts?: string }
export type TrialRequest = { context: RecommendationInput; details: TrialDetails }
export type TrialResult = { draft: string; checks: string[]; unknowns: string[] }

const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
const exactKeys = (v: Record<string, unknown>, required: string[], optional: string[] = []) => required.every(k => Object.hasOwn(v, k)) && Object.keys(v).every(k => [...required, ...optional].includes(k))
const nonblank = (v: unknown, min: number, max: number): v is string => typeof v === 'string' && v.trim().length >= min && v.length <= max

export function isTrialRequest(value: unknown): value is TrialRequest {
  if (!object(value) || !exactKeys(value, ['context', 'details'])) return false
  if (!isRecommendationInput(value.context) || !object(value.details)) return false
  const details = value.details
  if (!exactKeys(details, ['sourceText'], ['businessFacts'])) return false
  if (!nonblank(details.sourceText, 10, 1800)) return false
  if (details.businessFacts !== undefined && !nonblank(details.businessFacts, 1, 1200)) return false
  return value.context.taskId !== 'customer-reply' || nonblank(details.businessFacts, 10, 1200)
}

export const draftSchema = {
  type: 'object',
  properties: { draft: { type: 'string' } },
  required: ['draft'],
  additionalProperties: false,
} as const

export function isSafeModelDraft(value: unknown, source: string): value is { draft: string } {
  if (!object(value) || !exactKeys(value, ['draft']) || !nonblank(value.draft, 10, 1800)) return false
  const draft = value.draft
  // Structured output checks shape; these additional checks catch common
  // invented commercial claims. They do not replace owner review.
  const riskyClaim = /\b(guarantee(?:d|s)?|certifi(?:ed|cation)|licen[cs]ed|insured|award[- ]winning|24\/7|same[- ]day|free (?:shipping|delivery|consultation|service|trial)|100%)\b/gi
  for (const match of draft.matchAll(riskyClaim)) if (!source.toLowerCase().includes(match[0].toLowerCase())) return false
  const currency = /(?:[$£€₹]\s?\d[\d.,]*|\b\d[\d.,]*\s?(?:dollars?|rupees?|euros?|pounds?)\b)/gi
  for (const match of draft.matchAll(currency)) if (!source.includes(match[0])) return false
  const timeClaims = /\b(today|tomorrow|next week|this week|immediately)\b/gi
  for (const match of draft.matchAll(timeClaims)) if (!source.toLowerCase().includes(match[0].toLowerCase())) return false
  const sourceNumbers = new Set(source.match(/\d+/g) || [])
  for (const number of draft.match(/\d+/g) || []) if (Number(number) > 9 && !sourceNumbers.has(number)) return false
  return true
}
