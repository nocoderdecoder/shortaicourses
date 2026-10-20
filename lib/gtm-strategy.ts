export type LabInput = { product: string; customers: string; market: string; stage: string; challenge: string }
export type LabReport = {
  headline: string
  executiveSummary: string
  icps: { name: string; rationale: string; buyer: string; risk: string; priority: 'High' | 'Medium' | 'Low' }[]
  positioning: { segment: string; headline: string; message: string; proofNeeded: string }[]
  experiments: { name: string; action: string; successSignal: string }[]
  plan: { week: number; focus: string; actions: string[]; deliverable: string }[]
  assumptions: string[]
  recommendation: string
}
const inputKeys = ['product', 'customers', 'market', 'stage', 'challenge'] as const
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
const text = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= 2400
const texts = (v: unknown, count: number) => Array.isArray(v) && v.length === count && v.every(text)
const rows = (v: unknown, count: number, keys: string[]) => Array.isArray(v) && v.length === count && v.every(i => object(i) && keys.every(k => text(i[k])))
export function isLabInput(value: unknown): value is LabInput {
  return object(value) && Object.keys(value).length === inputKeys.length && inputKeys.every(k => text(value[k]) && (value[k] as string).length <= 1200)
}
export function isLabReport(v: unknown): v is LabReport {
  if (!object(v)) return false
  return text(v.headline) && text(v.executiveSummary) && text(v.recommendation)
    && rows(v.icps, 3, ['name', 'rationale', 'buyer', 'risk'])
    && (v.icps as Record<string, unknown>[]).every(i => ['High', 'Medium', 'Low'].includes(i.priority as string))
    && rows(v.positioning, 3, ['segment', 'headline', 'message', 'proofNeeded'])
    && rows(v.experiments, 4, ['name', 'action', 'successSignal'])
    && rows(v.plan, 4, ['focus', 'deliverable'])
    && (v.plan as Record<string, unknown>[]).every((i, n) => i.week === n + 1 && texts(i.actions, 3))
    && texts(v.assumptions, 5)
}

// Structured Outputs constrains provider JSON; runtime validation remains the
// boundary for refusals, truncation, and unexpected provider responses.
const stringSchema = { type: 'string' }
const objectSchema = (properties: Record<string, unknown>) => ({ type: 'object', properties, required: Object.keys(properties), additionalProperties: false })
const textProperties = (keys: string[]) => Object.fromEntries(keys.map(k => [k, stringSchema]))
const arraySchema = (items: unknown, count: number) => ({ type: 'array', items, minItems: count, maxItems: count })
export const reportSchema = objectSchema({
  ...textProperties(['headline', 'executiveSummary', 'recommendation']),
  icps: arraySchema(objectSchema({ ...textProperties(['name', 'rationale', 'buyer', 'risk']), priority: { type: 'string', enum: ['High', 'Medium', 'Low'] } }), 3),
  positioning: arraySchema(objectSchema(textProperties(['segment', 'headline', 'message', 'proofNeeded'])), 3),
  experiments: arraySchema(objectSchema(textProperties(['name', 'action', 'successSignal'])), 4),
  plan: arraySchema(objectSchema({ ...textProperties(['focus', 'deliverable']), week: { type: 'integer', enum: [1, 2, 3, 4] }, actions: arraySchema(stringSchema, 3) }), 4),
  assumptions: arraySchema(stringSchema, 5),
})
