import { businessTypes, frameworkVersion, taskIds, type BusinessType, type TaskId } from './catalog'
import type { Outcome } from './recommend'

export const eventNames = ['landing', 'start', 'recommendation', 'try_attempt', 'result', 'error', 'copy', 'edit', 'feedback_yes', 'feedback_no'] as const
export type EventName = (typeof eventNames)[number]
export const campaignCategories = ['direct', 'pilot', 'newsletter', 'partner', 'social', 'search', 'other'] as const
export type CampaignCategory = (typeof campaignCategories)[number]
export type OperationalEvent = {
  event: EventName
  businessType?: BusinessType
  taskId?: TaskId
  outcome?: Outcome
  campaign?: CampaignCategory
  frameworkVersion?: typeof frameworkVersion
}

const outcomeValues: Outcome[] = ['good-first-task', 'possible-later', 'skip-ai']
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)

export function isOperationalEvent(value: unknown): value is OperationalEvent {
  if (!object(value) || !eventNames.includes(value.event as EventName)) return false
  if (Object.keys(value).some(key => !['event', 'businessType', 'taskId', 'outcome', 'campaign', 'frameworkVersion'].includes(key))) return false
  if (value.businessType !== undefined && !businessTypes.includes(value.businessType as BusinessType)) return false
  if (value.taskId !== undefined && !taskIds.includes(value.taskId as TaskId)) return false
  if (value.outcome !== undefined && !outcomeValues.includes(value.outcome as Outcome)) return false
  if (value.campaign !== undefined && !campaignCategories.includes(value.campaign as CampaignCategory)) return false
  return value.frameworkVersion === undefined || value.frameworkVersion === frameworkVersion
}
