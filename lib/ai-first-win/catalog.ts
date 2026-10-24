export const frameworkVersion = 'afw-framework-v0.1' as const
export const catalogVersion = 'afw-catalog-v0.1' as const

export const businessOptions = [
  { id: 'home-services', label: 'Home or local services', description: 'For example, plumbing, cleaning, or repairs' },
  { id: 'retail', label: 'Shop or retail', description: 'A store selling products online or in person' },
  { id: 'professional-services', label: 'Professional services', description: 'For example, consulting, bookkeeping, or design' },
  { id: 'food-hospitality', label: 'Food or hospitality', description: 'For example, a cafe, restaurant, or guesthouse' },
  { id: 'other', label: 'Something else', description: 'Any other kind of small business' },
] as const

export const taskCatalog = [
  {
    id: 'customer-reply',
    label: 'Reply to a customer question',
    description: 'Make a first draft you can check and send yourself.',
    sourceLabel: 'What did the customer ask?',
    sourceHint: 'Leave out names, phone numbers, addresses, and other private details.',
    ownerProblem: 'Repeated customer questions take time to answer clearly.',
    aiFit: 'Drafting can turn a question and owner-verified facts into a useful starting point.',
    simplerAlternative: 'A saved reply template is better when the answer rarely changes.',
    minimumInformation: ['The customer question with private details removed', 'The facts the owner can confirm'],
    commonErrors: ['Invented availability or service area', 'Invented price, qualifications, or guarantee'],
    checks: ['Check every fact, especially price, availability, and service area.', 'Remove any promise you cannot personally confirm.', 'You decide whether and when to send the reply.'],
    unknowns: ['AI cannot confirm your price, availability, service area, or qualifications.'],
    goodCondition: 'A routine question, verified owner facts, and time to review before sending.',
    laterCondition: 'Sensitive or regulated advice, or facts that cannot yet be checked.',
    skipCondition: 'An emergency or dangerous diagnosis that needs a qualified person.',
    trial: 'Draft one reply to an anonymized customer question.',
  },
  {
    id: 'announcement',
    label: 'Write a short announcement',
    description: 'Turn facts you provide into a short public draft.',
    sourceLabel: 'What facts would you like to announce?',
    sourceHint: 'Include only details you have confirmed, such as what is changing and when.',
    ownerProblem: 'A small update can take longer to write than it should.',
    aiFit: 'Drafting can organize supplied facts into plain language.',
    simplerAlternative: 'A short existing notice or reusable template may be quicker.',
    minimumInformation: ['The exact facts to announce'],
    commonErrors: ['Invented dates or offers', 'Unverified claims about benefits or performance'],
    checks: ['Check dates, offers, and every public claim.', 'Make sure the message says only what you can verify.', 'You decide where and when to publish it.'],
    unknowns: ['AI cannot verify dates, offers, or claims about your business.'],
    goodCondition: 'A routine update with verified facts and owner review before publishing.',
    laterCondition: 'Claims or dates are still unconfirmed, or the topic needs expert review.',
    skipCondition: 'The update would require invented claims or conceal important safety facts.',
    trial: 'Draft a short announcement from owner-supplied facts.',
  },
  {
    id: 'checklist',
    label: 'Turn rough notes into a checklist',
    description: 'Organize your own notes into steps you can review.',
    sourceLabel: 'Paste your rough notes',
    sourceHint: 'Use ordinary business notes without customer or employee private details.',
    ownerProblem: 'Scattered notes make routine work hard to follow.',
    aiFit: 'Organizing can turn existing notes into a clearer list without making decisions for the owner.',
    simplerAlternative: 'A simple reusable checklist is better if the process is already stable.',
    minimumInformation: ['The rough notes or steps to organize'],
    commonErrors: ['Missing an important step', 'Inventing a required step or sequence'],
    checks: ['Compare every item with your original notes.', 'Add any missing step and remove anything that does not apply.', 'Have a qualified person review any regulated or safety-critical process.'],
    unknowns: ['AI cannot tell whether your notes include every step you need.'],
    goodCondition: 'Ordinary administrative notes and owner review before use.',
    laterCondition: 'The steps have financial, legal, privacy, or safety consequences.',
    skipCondition: 'A dangerous or regulated procedure requiring expert instructions.',
    trial: 'Organize one set of rough notes into an editable checklist.',
  },
  {
    id: 'other',
    label: 'Something else',
    description: 'Tell us about another task.',
    sourceLabel: '', sourceHint: '', ownerProblem: '', aiFit: '', simplerAlternative: '',
    minimumInformation: [], commonErrors: [], checks: [], unknowns: [], goodCondition: '', laterCondition: '', skipCondition: '', trial: '',
  },
] as const

export type BusinessType = (typeof businessOptions)[number]['id']
export type TaskId = (typeof taskCatalog)[number]['id']
export type SupportedTaskId = Exclude<TaskId, 'other'>
export const businessTypes = businessOptions.map(option => option.id)
export const taskIds = taskCatalog.map(task => task.id)
export const supportedTask = (id: TaskId) => id === 'other' ? undefined : taskCatalog.find(task => task.id === id)
