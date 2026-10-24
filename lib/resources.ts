export const RESOURCES = [
  {
    href: '/courses/prompting-for-professionals/prompt-templates-for-business',
    title: 'Business prompt templates',
    description: 'Copy five task-ready prompts and review worked examples before using the output.',
    category: 'Template library',
  },
  {
    href: '/courses/ai-for-productivity/ai-for-meetings',
    title: 'AI meeting notes and action items',
    description: 'Plan a meeting, turn notes into follow-ups, and verify every commitment before sharing.',
    category: 'Workflow template',
  },
  {
    href: '/resources/ai-use-cases',
    title: 'AI use cases for business',
    description: 'Find practical ways to use AI across common work tasks.',
    category: 'Workflows',
  },
  {
    href: '/resources/chatgpt-vs-claude',
    title: 'ChatGPT vs Claude for business',
    description: 'Choose a tool by the task, then check the output yourself.',
    category: 'Tool guide',
  },
  {
    href: '/resources/future-proof-your-career',
    title: 'Build AI skills for your career',
    description: 'Identify work you can improve and make a practical learning plan.',
    category: 'Career guide',
  },
  {
    href: '/glossary',
    title: 'AI glossary',
    description: 'Understand the terms that come up in these courses and tools.',
    category: 'Reference',
  },
] as const

export const RELATED_RESOURCE_BY_COURSE: Record<string, (typeof RESOURCES)[number]['href']> = {
  'ai-foundations-for-business': '/glossary',
  'prompting-for-professionals': '/courses/prompting-for-professionals/prompt-templates-for-business',
  'ai-for-marketing-and-gtm': '/resources/ai-use-cases',
  'chatgpt-for-work': '/resources/chatgpt-vs-claude',
  'ai-for-sales': '/resources/ai-use-cases',
  'ai-for-productivity': '/courses/ai-for-productivity/ai-for-meetings',
}

export function getRelatedResource(courseSlug: string) {
  return RESOURCES.find(resource => resource.href === RELATED_RESOURCE_BY_COURSE[courseSlug])
}
