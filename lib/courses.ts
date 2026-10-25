// WRITING STYLE RULES — enforce across all lesson content:
// 1. No em dashes (—). Use commas, colons, or rewrite the sentence.
// 2. No AI footprint phrases: "It's worth noting", "At its core", "In essence",
//    "Ultimately", "This is exactly the kind of", "It's a fundamental property",
//    "leveraging", "delve", "It's important to understand".
// 3. No vague statistics without a real source. Use personal framing instead
//    ("In my experience...") or drop the stat entirely.
// 4. No short contrasted sentences used for effect ("X. This is Y. That is Z.").
// 5. Personal voice: where Anshul's real experience is relevant, use it.
// 6. Write like a sharp colleague explaining something, not like a textbook.

export type Lesson = {
  slug: string
  title: string
  duration: string
  summary: string
  body: string // HTML string
}

export type Course = {
  slug: string
  title: string
  tagline: string
  description: string
  totalDuration: string
  lessonCount: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  outcomes?: string[]
  lessons: Lesson[]
}

export const COURSES: Course[] = [
  {
    slug: 'ai-foundations-for-business',
    title: 'AI Foundations for Business',
    tagline: 'Cut through the hype. Learn what AI actually is and where it fits in your work.',
    description: 'A no-jargon introduction to AI for business professionals. By the end you\'ll know how to evaluate AI tools, what they can and can\'t do, and how to think about AI in your company.',
    totalDuration: '35 min',
    lessonCount: 4,
    level: 'Beginner',
    category: 'Foundations',
    lessons: [
      {
        slug: 'what-ai-actually-is',
        title: 'What AI Actually Is (and Isn\'t)',
        duration: '8 min',
        summary: 'A clear mental model of AI, no PhD required.',
        body: `
<h2>The one-sentence definition that actually helps</h2>
<p>AI is software that learns patterns from data and uses those patterns to make predictions or generate outputs. Everything else, large language models, neural networks, generative AI, is just different ways of doing that one thing.</p>
<p>Most AI explanations confuse business professionals because they start with the technology. Start instead with what it does and work backwards to how it does it.</p>

<h2>Three types of AI you'll encounter at work</h2>
<p><strong>Generative AI</strong> creates new content: text, images, code, audio. ChatGPT, Claude, Gemini. This is what most people mean when they say "AI" today.</p>
<p><strong>Predictive AI</strong> forecasts outcomes based on historical patterns: churn models, demand forecasting, credit scoring. This has existed in enterprise software for over a decade. Your CRM probably uses it already.</p>
<p><strong>Agentic AI</strong> takes sequences of actions autonomously, using tools, browsing the web, running code, and making decisions to complete a goal. This is the fastest-moving category and the one that will change white-collar work most significantly over the next few years.</p>

<h2>What AI cannot do</h2>
<p>This is more useful than knowing what it can do. AI cannot:</p>
<ul>
  <li>Know things that weren't in its training data</li>
  <li>Reliably access real-time information (unless given a specific tool to do so)</li>
  <li>Reason with certainty: it generates plausible outputs, not guaranteed correct ones</li>
  <li>Understand context the way a human colleague does</li>
  <li>Take actions in the world without explicit permission and tooling</li>
</ul>

<h2>The mental model that changes how you use it</h2>
<p>Think of AI as an extremely well-read, very fast intern who has read almost everything ever published but has never held a job. Brilliant at synthesizing information, drafting, and generating options. Needs your direction, your judgment, and your context to be useful.</p>
<blockquote>The professionals who get the most from AI know exactly when to trust it and when to verify. That judgment is a skill, and it develops with practice.</blockquote>
        `,
      },
      {
        slug: 'how-llms-work-in-plain-english',
        title: 'How LLMs Work, in Plain English',
        duration: '9 min',
        summary: 'What\'s actually happening when you type into ChatGPT.',
        body: `
<h2>Predicting the next word, at massive scale</h2>
<p>A large language model is trained to predict what comes next in a sequence of text. Given millions of examples of human-written text, the model learns which words tend to follow which other words, and in what contexts.</p>
<p>When you type a prompt, the model generates a response one token at a time, each time predicting the most useful next piece of text given everything that came before.</p>

<h2>Why they sound confident even when wrong</h2>
<p>The model is optimized to generate fluent, coherent text, not to be accurate. Confident-sounding language appears more in well-written training data, so the model learns to produce confident-sounding language. This is why LLMs "hallucinate": they generate plausible-sounding text that happens to be factually wrong.</p>
<p>Hallucination is not a bug about to be patched. It is built into how these systems work. The solution is not to wait for a better model. Design your use of AI to catch errors.</p>

<h2>Context windows: the AI's working memory</h2>
<p>A context window is how much text the model can "see" at once. Early models could handle a few thousand words. Current models can handle hundreds of thousands. This matters because:</p>
<ul>
  <li>The more context you give, the better the response</li>
  <li>Long conversations eventually push early content out of the window</li>
  <li>For complex tasks, how you structure your prompt matters enormously</li>
</ul>

<h2>The practical implication</h2>
<p>LLMs are not databases. They store patterns, not facts. That makes them excellent at tasks requiring language, structure, synthesis, and style. They are unreliable for tasks requiring precision, recency, or calculation.</p>
<p>Use AI for drafting, rewriting, summarizing, brainstorming, and structuring. Use traditional tools, search, databases, calculators, for facts, numbers, and current information.</p>
        `,
      },
      {
        slug: 'the-ai-tool-landscape',
        title: 'The AI Tool Landscape',
        duration: '10 min',
        summary: 'The tools worth knowing and how to choose between them.',
        body: `
<h2>The four tools every business professional should know</h2>
<p>Start with one general-purpose assistant and learn its limits. These four tools are useful options to compare when a specific workflow calls for something different.</p>
<p><strong>ChatGPT (OpenAI)</strong>: A general-purpose assistant for drafting, search, file analysis, and images. A useful starting point; available tools and limits depend on your account and workspace.</p>
<p><strong>Claude (Anthropic)</strong>: An option for writing, document analysis, and coding. It can also execute code and create files. Check document limits and review answers against the original source rather than assuming a long upload was read perfectly.</p>
<p><strong>Gemini (Google)</strong>: Worth evaluating if you work in Google Docs, Gmail, and Sheets. Check which Workspace features your organization has enabled and what data you are allowed to share.</p>
<p><strong>Perplexity</strong>: A search-oriented assistant that presents answers with source links. Citations make claims easier to check, but do not guarantee accuracy. Open the underlying sources and verify important facts, whichever assistant you use.</p>
<p>Capability references: <a href="https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq">ChatGPT Free Tier FAQ</a> and <a href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude">Claude code execution and file creation</a>. Features and limits can change.</p>

<h2>Specialist tools worth knowing</h2>
<p>Beyond the big four, specific categories are maturing fast:</p>
<ul>
  <li><strong>NotebookLM</strong> (Google): Use it to ask questions about provided documents and inspect source references. Check summaries against the originals, especially when reading large reports or analyzing transcripts.</li>
  <li><strong>Image-generation tools</strong>: Options such as ChatGPT images and Midjourney can help with presentation concepts and visual ideation. Review outputs and usage terms before publishing.</li>
  <li><strong>ElevenLabs</strong>: Voice cloning and text-to-speech at production quality.</li>
  <li><strong>Otter.ai / Fireflies</strong>: Meeting transcription and AI summaries.</li>
</ul>

<h2>How to choose</h2>
<p>Try the same representative task in the tools available to you. Compare accuracy, time spent editing, source quality, data controls, and cost. Add a tool only when it improves a workflow enough to justify the extra setup.</p>
<blockquote>The best AI stack is not one tool used for everything. It is the right tool for each job, used with skill.</blockquote>
        `,
      },
      {
        slug: 'where-ai-fits-in-your-workday',
        title: 'Where AI Fits in Your Workday',
        duration: '8 min',
        summary: 'A practical map of which tasks AI handles well vs. where humans stay essential.',
        body: `
<h2>A framework for deciding what to hand off</h2>
<p>Not all work is equal for AI delegation. Sort your tasks into three buckets:</p>
<p><strong>High AI leverage</strong>: First drafts, research synthesis, editing, formatting, summarizing, generating options, translating between formats (bullet points to paragraph, for example). Hand these off immediately.</p>
<p><strong>AI-assisted</strong>: Analysis, strategic thinking, planning, complex decisions. Use AI to generate inputs and surface considerations, but keep your judgment at the center.</p>
<p><strong>Human-only</strong>: Relationship management, final decisions with real stakes, anything requiring institutional knowledge the AI does not have, anything where a wrong answer causes harm.</p>

<h2>The tasks most professionals underestimate</h2>
<p>Business professionals tend to use AI for obvious tasks like writing emails and miss the higher-leverage ones:</p>
<ul>
  <li>Pre-meeting prep: feed AI the person's LinkedIn, recent news about their company, your agenda, and ask for talking points and likely objections</li>
  <li>Post-meeting synthesis: paste your notes and ask for a structured summary, action items, and what you committed to follow up on</li>
  <li>Report reading: paste a 40-page report and ask for the three things most relevant to your specific situation</li>
  <li>Thinking out loud: describe a problem you are stuck on and ask the AI to help you structure it, push back on your assumptions, or generate alternatives you have not considered</li>
</ul>

<h2>Building the habit</h2>
<p>The biggest barrier is not capability, it is habit. Professionals who say "AI doesn't save me much time" are usually using it reactively, for the task in front of them, rather than proactively, as a thinking partner throughout their day.</p>
<p>Pick one recurring task this week and run it through AI every single time, no exceptions. In two weeks, that delegation will be automatic, and you will be ready to add the next one.</p>
        `,
      },
    ],
  },
  {
    slug: 'prompting-for-professionals',
    title: 'Prompting for Professionals',
    tagline: 'Write prompts that get work done, not ones that need five rounds of back-and-forth.',
    description: 'Most people use AI like a search engine and get mediocre results. This course teaches the mental models and techniques that make the difference between a useful tool and a productivity multiplier.',
    totalDuration: '36 min',
    lessonCount: 4,
    level: 'Beginner',
    category: 'Skills',
    lessons: [
      {
        slug: 'why-most-prompts-fail',
        title: 'Why Most Prompts Fail',
        duration: '8 min',
        summary: 'Two common prompting mistakes and how to avoid them.',
        body: `
<h2>You did not tell it enough</h2>
<p>The most common reason AI outputs disappoint is the same reason a new employee produces disappointing work: not enough direction. "Write me a summary of this report" is like telling a new hire "do something with this" and walking away.</p>
<p>AI needs the same things a good employee needs: context, format, audience, constraints, and examples. The more precisely you define what done looks like, the more likely you are to get it.</p>

<h2>The two failure modes</h2>
<p><strong>Too vague</strong>: "Write a LinkedIn post about AI." The model has no idea what tone you use, who your audience is, what point you want to make, or how long it should be. You will get something generic.</p>
<p><strong>Too prescriptive</strong>: "Write exactly 247 words, use these three headers, include a statistic about productivity in paragraph two, end with a question." You have constrained the model so tightly it cannot apply any judgment. You will get something technically correct and creatively dead.</p>
<p>The sweet spot is clear direction with room to execute: "a confident senior employee who knows your preferences" level of guidance.</p>

<h2>A before and after</h2>
<p>Here is the same request, written badly then written well:</p>
<p><strong>Before:</strong> <code>Write an email to my client about the project delay.</code></p>
<p><strong>After:</strong> <code>Write a professional email to Sarah, the VP of Marketing at Acme Corp, informing her that our project delivery will be delayed by 10 days due to a data integration issue on our end. Tone: direct and accountable, not defensive. Lead with the new timeline, then explain briefly. End with two things we are doing to prevent this happening again. Keep it under 150 words.</code></p>
<p>The second prompt takes 30 extra seconds to write. The output takes zero rounds of editing. That trade-off is always worth it.</p>

<h2>The test for a good prompt</h2>
<p>Before sending your prompt, ask: if I handed this to a smart person who had never met me and asked them to do this task, would they have enough information to produce what I actually want?</p>
<p>If the answer is no, add the missing pieces: who is the audience, what format do I want, what is the most important constraint, and what does a good output look like?</p>
        `,
      },
      {
        slug: 'the-four-part-prompt-structure',
        title: 'The Four-Part Prompt Structure',
        duration: '9 min',
        summary: 'A repeatable structure that works for almost any task.',
        body: `
<h2>Role, Task, Context, Format</h2>
<p>Every effective prompt contains four elements. You do not always need all four, but knowing them helps you diagnose when a prompt is not working.</p>

<h2>Role: who should the AI be?</h2>
<p>Setting a role activates different knowledge and tone from the model. "You are a senior marketing strategist with 15 years of experience in B2B SaaS" produces very different output than an unframed prompt asking the same question.</p>
<p>Be specific about the expertise, not just the job title. "You are a financial analyst who specializes in evaluating early-stage startup unit economics" is more useful than "You are a financial analyst."</p>

<h2>Task: what exactly do I want?</h2>
<p>State the task as a verb plus object. Not "something about the sales deck" but "rewrite the executive summary of this sales deck to emphasize ROI over features, for a CFO audience."</p>
<p>Include the action (rewrite, summarize, generate, analyze, evaluate, suggest), the object (what the action applies to), and the purpose (why, or for whom).</p>

<h2>Context: what does the AI need to know?</h2>
<p>This is where most people underinvest. Context includes:</p>
<ul>
  <li>The audience: who will read or hear this?</li>
  <li>The existing situation: what is already true, what has happened so far?</li>
  <li>Your constraints: time, tone, things to avoid</li>
  <li>Examples: "like this" is often more powerful than a long description</li>
</ul>

<h2>Format: what should the output look like?</h2>
<p>Do not leave format to chance. Specify: number of words or paragraphs, headers or no headers, bullet points or prose, tone (formal, conversational, direct), and what to exclude. A well-formatted output usually needs minimal editing.</p>

<h2>Putting it together</h2>
<p>Example: "You are a senior B2B copywriter [Role]. Rewrite the following email subject line to improve open rates [Task]. The audience is mid-market CFOs who are skeptical of vendor marketing, and we have been in a 3-month sales cycle [Context]. Give me five variations, no more than 8 words each, with one word that conveys urgency [Format]."</p>
        `,
      },
      {
        slug: 'advanced-prompting-techniques',
        title: 'Advanced Techniques That Actually Work',
        duration: '9 min',
        summary: 'Chain-of-thought, few-shot examples, and when to use each.',
        body: `
<h2>Chain-of-thought: make the AI show its work</h2>
<p>Adding "think step by step" or "reason through this before giving your answer" to a prompt dramatically improves output quality for complex tasks. This forces the model to process the problem before generating a conclusion, which catches errors early.</p>
<p>Use this for: analysis, decisions with trade-offs, math or logic problems, evaluating options.</p>
<p>Skip it for: simple drafting tasks, formatting, translation. It just adds unnecessary length.</p>

<h2>Few-shot prompting: show, do not just tell</h2>
<p>The fastest way to get consistent style or format is to give the model examples before asking it to do the task. This is called few-shot prompting.</p>
<p>Instead of describing the format you want in words, include 2-3 examples of what you want, then ask for one more. The model pattern-matches to your examples with remarkable precision.</p>
<p>Particularly useful for: LinkedIn posts in your voice, email templates, report sections that need to match existing documents.</p>

<h2>Iterating: the conversation as the tool</h2>
<p>Most people use AI like a vending machine: one prompt in, one output out, done. The professionals who get the most from it treat it as a conversation. The first output is raw material, not the final product.</p>
<ul>
  <li>"This is good, but make it 30% shorter and remove the second point"</li>
  <li>"The tone is too formal. I want it to sound more like how I would speak to a colleague, not a board."</li>
  <li>"Keep everything, but restructure so the most important finding comes first"</li>
</ul>
<p>Each iteration gets you closer. Budget for 2-3 rounds on anything important.</p>

<h2>System prompts: your personal AI configuration</h2>
<p>Most major AI tools let you set a "system prompt" or custom instructions: a persistent context that applies to every conversation. This is where you put things you would otherwise repeat every time: your role, your preferences, your audience, your style.</p>
<p>Invest 20 minutes in writing a good system prompt. You will recoup it in the first week.</p>
        `,
      },
      {
        slug: 'prompt-templates-for-business',
        title: 'Prompt Templates for Common Business Tasks',
        duration: '10 min',
        summary: 'Five copyable business prompts, with worked examples and checks before you use the output.',
        body: `
<p>Use these business prompt templates when you have a real source, a clear audience, and a decision to make. Replace every bracketed field before you copy a prompt. If a field is unknown, say so. Treat the output as a draft to inspect, not as evidence that the model checked facts.</p>
<p><strong>Protect your data first:</strong> Use only an AI tool approved by your organization. Remove names, email addresses, deal terms, customer details, and other confidential information unless your policy permits sharing them with that tool. The fictional examples below contain no real customer data.</p>

<h2>1. Prepare for a meeting from a short brief</h2>
<p>Give the model only facts you can verify. Ask for questions, not invented research about the person you are meeting.</p>
<p><code>I am [your role] preparing for a [meeting type] with [role, not a private name]. My goal is [specific decision or next step]. Here are the verified facts I can share: [facts and source dates]. Known constraints: [time, budget, or scope]. Draft a one-page brief with: (1) two opening questions, (2) three talking points tied to the facts, (3) two possible concerns phrased as hypotheses, and (4) one proposed next step. Label anything that needs verification. Do not invent facts about the other person or company.</code></p>
<p><strong>Synthetic input example:</strong> You sell scheduling software to a fictional five-person clinic. The clinic says appointment reminders are sent manually, the meeting is 20 minutes, and your goal is to learn whether an automated reminder pilot is useful.</p>
<p><strong>Illustrative expected output, not an actual model run:</strong> Opening question: "How much staff time goes into reminders each week?" Talking point: "A small pilot could test automated reminders with one appointment type." Verification needed: "We do not yet know the clinic's cancellation rate." The brief should not claim that reminders will reduce cancellations.</p>
<p><strong>Review check:</strong> Can you trace each factual statement to the supplied brief? Remove any assumed company history or fabricated metric before the meeting.</p>

<h2>2. Summarize a document for a decision</h2>
<p>Paste an approved excerpt or public document. A useful summary distinguishes what the source says from what the model infers.</p>
<p><code>I need to decide [decision] by [date]. I am [role] and the source below is [document type and date]. Using only the supplied text, give me: (1) three decision-relevant findings, each with a short quote or section reference, (2) one action the source supports, (3) unanswered questions, and (4) any numbers that require checking against the original. Separate source facts from your interpretation. If the text does not answer a question, write "not stated." Source: [approved excerpt]</code></p>
<p><strong>Synthetic input example:</strong> A fictional supplier memo says delivery takes six weeks, an expedited option takes four weeks, and expedited pricing is not included. You need to decide whether to request a quote.</p>
<p><strong>Illustrative expected output, not an actual model run:</strong> Source fact: "The memo lists six weeks for standard delivery and four weeks for expedited delivery." Unanswered question: "Expedited price is not stated." Suggested action: "Request the price before comparing options." A summary that makes up a surcharge fails the check.</p>
<p><strong>Review check:</strong> Open the source and verify each quote, number, date, and suggested action. Do not use the summary as a substitute for reading high-stakes terms.</p>

<h2>3. Draft a customer update</h2>
<p>Use this when you already know what happened and what you can promise. Leave an unknown delivery date as an unknown.</p>
<p><code>Draft a [email or message] to [audience role] about [situation]. Verified facts: [facts]. What we have done: [actions]. What remains unknown: [unknowns]. Next update we can commit to: [date or time]. Tone: direct, accountable, and calm. Keep it under [word limit] words. Lead with the impact, explain the next step, and include a clear contact option. Do not invent a resolution date, compensation, cause, or promise.</code></p>
<p><strong>Illustrative expected output, not an actual model run:</strong> For a fictional delayed report with an unknown completion date, the message should say the report is delayed, explain the confirmed issue in plain language, and promise only the next update time supplied in the prompt.</p>
<p><strong>Review check:</strong> Confirm the recipient, factual cause, promised action, and any date with the owner before sending. Remove language that sounds certain when the team is still investigating.</p>

<h2>4. Compare two options without false precision</h2>
<p>The model can organize trade-offs, but it cannot supply missing prices or decide your risk tolerance for you.</p>
<p><code>Compare [option A] and [option B] for [business goal]. Use only these known facts: [facts with sources]. Criteria, in priority order: [criteria]. Constraints: [budget, deadline, policy]. Make a table with criterion, evidence for each option, and unknowns. Then give a conditional recommendation and the smallest next test that would reduce uncertainty. Do not assign numerical scores or estimate costs unless I supplied the numbers.</code></p>
<p><strong>Synthetic input example:</strong> A fictional team can either run a two-week manual onboarding pilot or buy a tool. The pilot fits the current budget; the tool price and integration effort are unknown.</p>
<p><strong>Illustrative expected output, not an actual model run:</strong> "Run the manual pilot first if learning about drop-off is the immediate goal. Request tool pricing and integration details before committing to the purchase." The output should not declare the tool cheaper without a quote.</p>
<p><strong>Review check:</strong> Ask whether the recommendation changes if an unknown turns out differently. If it does, get that fact before deciding.</p>

<h2>5. Review a draft from the reader's point of view</h2>
<p>Share a draft you are allowed to put into the tool. Ask for specific edits, then decide which ones fit your voice and facts.</p>
<p><code>You are reviewing this [document type] for [reader role]. The reader needs to [reader goal]. My intended action is [desired next step]. Identify: (1) the clearest sentence, (2) the two places where the reader may hesitate or misunderstand, and (3) the single highest-impact edit. Rewrite only those passages in a [tone] voice, keeping every factual claim and number unchanged. Flag any claim that lacks support; do not add new evidence. Draft: [approved text]</code></p>
<p><strong>Review check:</strong> Compare the rewrite against the original line by line. Make sure it did not change a number, create a new promise, or erase a necessary caveat.</p>

<h2>Make the template your own</h2>
<p>Start with one recurring task. Save the prompt, the source you gave it, the draft output, and the corrections you made. If the same mistake recurs, tighten the instruction or provide a better example. For a deeper explanation of role, task, context, and format, read <a href="/courses/prompting-for-professionals/the-four-part-prompt-structure">the four-part prompt structure</a>. For more tasks to practice on, browse <a href="/resources/ai-use-cases">AI use cases by role</a>.</p>
        `,
      },
    ],
  },
  {
    slug: 'ai-for-marketing-and-gtm',
    title: 'AI for Marketing and GTM',
    tagline: 'Practical AI applications across the full go-to-market stack.',
    description: 'From competitive research to campaign briefs to customer insight: how to use AI across every major marketing and GTM function without replacing the judgment that makes strategy work.',
    totalDuration: '38 min',
    lessonCount: 4,
    level: 'Intermediate',
    category: 'Business Functions',
    lessons: [
      {
        slug: 'ai-for-competitive-intelligence',
        title: 'AI for Competitive Intelligence',
        duration: '10 min',
        summary: 'Build a competitive monitoring system that runs while you sleep.',
        body: `
<h2>Why traditional comp intel breaks down</h2>
<p>Most competitive intelligence is manual, intermittent, and siloed. Someone checks a competitor's website once a quarter. Someone else reads their press releases. Nobody synthesizes it. By the time insight reaches decision-makers, it is stale.</p>
<p>AI does not fix this by being smarter. It fixes it by being tireless. Automated pipelines can monitor dozens of competitor signals daily and surface only what changed.</p>

<h2>What to monitor and how</h2>
<p><strong>Pricing and packaging:</strong> Set up a simple scraper (no code required with Zapier and browser automation) that checks competitor pricing pages weekly and logs changes. Feed the differences to an LLM and ask it to explain what changed and what it signals about strategy.</p>
<p><strong>Job postings:</strong> Competitor job posts are a leading indicator of strategic direction. A company suddenly hiring 10 machine learning engineers is building something. Use Perplexity or a job aggregator API to pull this data, then summarize it with an LLM weekly.</p>
<p><strong>Content and messaging:</strong> Use AI to analyze competitor blog posts, case studies, and LinkedIn content. Ask: "What themes are they emphasizing? What customer problems are they highlighting? What is missing from their narrative that I could own?"</p>

<h2>Synthesizing into action</h2>
<p>Raw intel is not strategy. The step most teams skip is synthesis. Once a week, paste your collected signals into an LLM with this prompt: "Here are this week's signals about [competitor]. Based on this, what do you think they are trying to do? What does that mean for us? What should we do differently?"</p>
<p>The output will not be perfect, but it forces structured thinking that most teams never do at all.</p>
        `,
      },
      {
        slug: 'ai-for-content-and-campaigns',
        title: 'AI for Content and Campaign Briefs',
        duration: '9 min',
        summary: 'Cut brief-writing time by 70% without sacrificing strategic depth.',
        body: `
<h2>Where AI fits in the content workflow</h2>
<p>AI is not your content strategist. It does not know your brand, your audience nuances, or what is actually resonating in your market. What it can do is remove the mechanical work that buries your judgment under hours of blank-page anxiety and formatting.</p>
<p>Use AI for: first drafts, brief templates, headline variations, content repurposing, and format transformation (blog to social to email).</p>
<p>Keep humans for: strategy, original research, genuine insight, and final creative decisions.</p>

<h2>Brief-writing with AI</h2>
<p>A good campaign brief has five elements: objective, audience, message hierarchy, proof points, and success metrics. AI can draft all five in under two minutes if you give it the inputs.</p>
<p>The prompt: "Create a campaign brief for [campaign objective]. Target audience: [description]. Our product does [X] for them. Key differentiators: [list]. Business goal: [metric]. Format as a one-page brief with objective, audience, core message, supporting messages, and KPIs."</p>
<p>Review, edit for truth and strategy, then use it as the creative anchor for the whole campaign.</p>

<h2>Content repurposing at scale</h2>
<p>Every piece of original content you create should generate 5-10 derivative assets. AI makes this frictionless:</p>
<ul>
  <li>Long blog post to 5 LinkedIn posts, one per key insight</li>
  <li>Webinar transcript to email recap, blog post, and social quotes</li>
  <li>Customer case study to sales one-pager, deck slide, and testimonial pull-quote</li>
</ul>
<p>Build templates for each transformation and run them as a standard step after every piece of original content is published.</p>
        `,
      },
      {
        slug: 'ai-for-customer-insight',
        title: 'AI for Customer Insight',
        duration: '10 min',
        summary: 'Extract strategic signal from customer conversations, reviews, and feedback.',
        body: `
<h2>The data is already there</h2>
<p>Most companies have more customer insight than they can process. Call recordings, support tickets, NPS verbatims, review sites, sales call notes. The data exists. The bottleneck is synthesis: there are not enough humans to read all of it and extract the patterns.</p>
<p>Feed large volumes of text to an LLM, ask for patterns, and get structured insight back in seconds.</p>

<h2>Analyzing customer reviews at scale</h2>
<p>Pull 50-100 reviews from G2, Capterra, or the App Store, yours and your competitors'. Paste them (or a sample) and ask:</p>
<ul>
  <li>"What are the top 5 reasons customers love this product? Quote the specific phrases they use."</li>
  <li>"What are the top 5 frustrations? What language do they use to describe the problem?"</li>
  <li>"Compare the language in positive reviews vs. negative reviews. What does this suggest about the gap between promise and delivery?"</li>
</ul>
<p>The resulting language is gold for your own messaging. You are using words your customers already use to describe the problem you solve.</p>

<h2>Sales call analysis</h2>
<p>If you use Gong, Chorus, or Otter, you have transcripts of every sales call. Feed a sample to an LLM weekly and ask: "What objections came up most often? What questions did prospects ask that our materials do not answer? What competitor names came up and in what context?"</p>
<p>Your sales team is generating this market research every day. Most companies never harvest it.</p>
        `,
      },
      {
        slug: 'building-your-ai-gtm-stack',
        title: 'Building Your AI GTM Stack',
        duration: '9 min',
        summary: 'The tools and workflows that high-performing GTM teams are using right now.',
        body: `
<h2>Augment judgment, do not replace it</h2>
<p>The best GTM teams using AI are not the ones that have automated the most. They are the ones that have freed up the most human capacity for judgment: strategy, relationships, and creative decisions that AI genuinely cannot make.</p>
<p>Build your stack around this principle. Every tool you add should either remove mechanical work from humans or give humans better information to make decisions with.</p>

<h2>The core GTM AI stack</h2>
<p><strong>Research layer:</strong> Perplexity for real-time market and competitor research. NotebookLM for analyzing large documents such as analyst reports, competitor content, and customer transcripts.</p>
<p><strong>Creation layer:</strong> Claude or ChatGPT for drafting, briefs, and content. Midjourney or DALL-E for visual assets. ElevenLabs for audio if you produce podcast or video content.</p>
<p><strong>Automation layer:</strong> n8n or Zapier for connecting tools and running recurring pipelines. This is where you build the "while you sleep" workflows: daily competitor monitoring, weekly synthesis reports, automated content repurposing.</p>
<p><strong>Analytics layer:</strong> Standard BI tools, but with AI used to interpret and narrate the data. "Here is what the numbers mean and what I would do about it" rather than just the numbers themselves.</p>

<h2>Where to start</h2>
<p>Do not build the whole stack at once. Start with one high-friction, recurring task that takes 2+ hours per week. Automate that. Measure the time saved. Then move to the next one. In 90 days you will have a stack that runs the mechanical parts of GTM almost entirely on its own, leaving your team for the work that actually requires them.</p>
        `,
      },
    ],
  },
  {
    slug: 'chatgpt-for-work',
    title: 'ChatGPT for Work',
    tagline: 'Go from occasional user to someone who gets real work done with it every day.',
    description: 'A practical, task-by-task guide to using ChatGPT for the work you actually do: writing, research, analysis, communication, and thinking. No fluff, no theory — just the patterns that consistently produce good output.',
    totalDuration: '36 min',
    lessonCount: 4,
    level: 'Beginner',
    category: 'Tools',
    lessons: [
      {
        slug: 'setting-up-chatgpt-for-your-work',
        title: 'Setting Up ChatGPT for Your Work',
        duration: '8 min',
        summary: 'Custom instructions, memory, and the settings most people never touch.',
        body: `
<h2>Why setup matters</h2>
<p>Most people open ChatGPT, type something, and get a generic response. The professionals who consistently get useful output have spent 20 minutes configuring it to know who they are and how they work. You do this once, and every conversation benefits.</p>

<h2>Custom instructions</h2>
<p>Use custom instructions to describe your role and response preferences. Look in your personalization settings; labels and controls can vary by app and workspace. Useful information to include:</p>
<p><strong>"What would you like ChatGPT to know about you?"</strong> — Put your role, your industry, your audience, and what you actually do. Example: "I'm a VP of Marketing at a 200-person B2B SaaS company. My audience is mid-market CFOs and IT buyers. I manage a team of 6 and report to the CEO."</p>
<p><strong>"How would you like ChatGPT to respond?"</strong> — Put your style preferences. Example: "Be direct and concise. No bullet points unless I ask for them. No filler phrases. If you're uncertain, say so. Recommend an approach rather than listing options."</p>
<p>This alone makes ChatGPT dramatically more useful for your specific situation.</p>

<h2>Memory</h2>
<p>If memory is available and enabled, ChatGPT can carry information between conversations. Review your memory settings and saved information periodically. Save only details you are comfortable retaining, and check your organization's rules before including work information.</p>

<h2>Start with the free plan</h2>
<p>ChatGPT offers web search, file uploads, data analysis, and image creation on the free tier with usage limits. Paid plans may offer higher limits or additional capabilities. Model names, features, and pricing change: check the <a href="https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq">Free Tier FAQ</a> and the current plan comparison in your account. Upgrade only if a limit is blocking a workflow you have already found useful.</p>

<h2>Projects</h2>
<p>ChatGPT Projects let you create persistent contexts: a project for a specific client, a project for your team's communications, a project for a running research thread. Each project has its own instructions and file uploads. Use Projects to keep context organized instead of relying on a single long conversation thread.</p>
        `,
      },
      {
        slug: 'chatgpt-for-writing-and-editing',
        title: 'ChatGPT for Writing and Editing',
        duration: '9 min',
        summary: 'First drafts, editing, rewriting, and finding your voice with AI.',
        body: `
<h2>The right way to use ChatGPT for writing</h2>
<p>ChatGPT is not a ghostwriter. It does not know your opinions, your experience, or your voice. What it does well is remove the blank-page problem: it gets you to a draft fast, and you shape that draft into something worth reading.</p>
<p>The workflow: give ChatGPT the structure and the key points, get a draft, then rewrite the parts that don't sound like you. The final product should be yours. ChatGPT handles the scaffolding.</p>

<h2>The prompts that work</h2>
<p><strong>First draft:</strong> "Write a first draft of [document type] for [audience]. The main point is [core message]. Supporting points: [list]. Tone: [how you want to sound]. Length: approximately [X] words."</p>
<p><strong>Editing existing writing:</strong> "Edit this for clarity and concision. Keep my voice. Flag any sentences that are hard to follow." — Paste your draft.</p>
<p><strong>Tone adjustment:</strong> "This sounds too formal. Rewrite it so it sounds like I'm talking to a smart colleague, not presenting to a board."</p>
<p><strong>Finding a stronger opening:</strong> "The opening paragraph of this is weak. Give me 3 alternative ways to start that pull the reader in faster." — Paste your draft.</p>

<h2>Getting ChatGPT to match your voice</h2>
<p>Paste 3-5 samples of your own writing and say: "Read these and learn my writing style. Then write [new piece] in the same voice." The model pattern-matches remarkably well to concrete examples, much better than it responds to descriptions like "write conversationally."</p>

<h2>What to always rewrite yourself</h2>
<p>Personal stories, opinions, specific data points, and anything where your credibility is on the line. ChatGPT will make things up to fill gaps. Review every factual claim it generates. The structure is a gift; the facts are your responsibility.</p>
        `,
      },
      {
        slug: 'chatgpt-for-research-and-analysis',
        title: 'ChatGPT for Research and Analysis',
        duration: '10 min',
        summary: 'How to use ChatGPT for research without getting burned by hallucinations.',
        body: `
<h2>The one rule for research with ChatGPT</h2>
<p>Use ChatGPT to structure your research, generate questions, and synthesize information you give it. Do not use it as a primary source of facts. It will confidently provide wrong information, outdated figures, and fabricated citations. Treat its factual outputs as hypotheses to verify, not conclusions to use.</p>
<p>For current facts, use a search-enabled tool such as ChatGPT search or Perplexity, then open the cited primary sources. For document analysis, ChatGPT and tools such as NotebookLM can help organize your reading. Search and synthesis are useful starting points, not substitutes for checking the evidence.</p>

<h2>Where ChatGPT genuinely helps in research</h2>
<p><strong>Framing a research question:</strong> "I need to understand [topic] for [purpose]. What are the most important questions I should be trying to answer? What frameworks exist for thinking about this?"</p>
<p><strong>Synthesizing content you paste:</strong> "Here are notes from 5 articles on [topic]. Synthesize the key themes, where sources agree, and where they conflict." — Paste your notes. The model is excellent at this.</p>
<p><strong>Identifying what you don't know:</strong> "Based on this analysis, what am I missing? What would a skeptic push back on? What should I research further?"</p>
<p><strong>Building a research plan:</strong> "I need to make a decision about [topic] by [date]. What information do I need, in what order should I gather it, and where would I find it?"</p>

<h2>Analysis workflows that work</h2>
<p><strong>Competitor analysis:</strong> Paste competitor website copy, job postings, or press releases and ask: "What does this tell me about their strategy? What are they prioritizing? What are they not saying?"</p>
<p><strong>Survey or feedback analysis:</strong> Paste raw responses and ask: "Identify the top 5 themes. Quote specific language customers use for each theme. What do they want that they're not getting?"</p>
<p><strong>Decision analysis:</strong> "I'm deciding between [A] and [B]. Here is my situation: [context]. Act as a skeptical advisor. What are the three strongest arguments for each option? What am I not considering?"</p>

<h2>Data analysis with code</h2>
<p>ChatGPT can analyze uploaded spreadsheets and run Python for calculations, transformations, and charts. Availability and limits depend on your account, model, and workspace. Ask it to show the code and assumptions, then reconcile totals and spot-check rows against the original. See <a href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt">OpenAI's data analysis guide</a>.</p>
        `,
      },
      {
        slug: 'chatgpt-advanced-workflows',
        title: 'Advanced ChatGPT Workflows',
        duration: '9 min',
        summary: 'Image generation, web search, file uploads, and reusable workflows.',
        body: `
<h2>Web search: when to use it</h2>
<p>ChatGPT web search is available on free and paid plans, subject to usage limits and workspace controls. Ask it to search for current information and inspect the linked sources. See <a href="https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt">OpenAI's search guide</a> for current access and controls.</p>
<p>A quick search answer is not a complete literature review or market assessment. For deeper research, define the question, seek multiple independent sources, check publication dates, and record gaps or conflicting evidence. Source links alone do not establish that a conclusion is correct.</p>

<h2>File uploads: the most underused feature</h2>
<p>You can upload PDFs, Word documents, Excel files, images, and more. ChatGPT reads them and can answer questions, summarize, compare, or extract specific information. Useful patterns:</p>
<ul>
  <li>Upload a contract and ask: "What are the key obligations on our side? What are the termination clauses? Are there any non-standard terms I should flag?"</li>
  <li>Upload a competitor's annual report and ask: "What are their stated priorities for next year? What risks do they cite? What does this tell me about where they're investing?"</li>
  <li>Upload meeting notes and ask: "What decisions were made? Who owns what? What questions are still open?"</li>
</ul>

<h2>Image generation for professional use</h2>
<p>ChatGPT includes image-generation tools, with availability and limits that vary by account. Practical uses to try:</p>
<ul>
  <li>Presentation mockups: "Generate a simple illustration of [concept] suitable for a business presentation, clean lines, white background."</li>
  <li>Social media visuals: "Create a professional-looking graphic that shows [data/concept], minimal style."</li>
  <li>Concept visualization: show a stakeholder what you have in mind before you spend design budget on it.</li>
</ul>
<p>Inspect generated images for misspelled text, misleading details, and layout problems. For charts, use verified data and a charting tool rather than asking image generation to invent the numbers.</p>

<h2>Building reusable workflows</h2>
<p>If you run the same type of task repeatedly, write it as a reusable prompt template and save it somewhere you can copy from. Candidates: weekly status report, meeting prep, competitor scan, customer email response. Each should include Role, Task, Context placeholders, and Format — fill in the variables each time and paste. Two minutes of setup saves the same two minutes every single week.</p>
        `,
      },
    ],
  },
  {
    slug: 'ai-for-sales',
    title: 'AI for Sales Professionals',
    tagline: 'Practice source-checked prospecting, careful outreach, deal reviews, and CRM pipeline checks.',
    description: 'Four short, free lessons for sales professionals: research an account, draft outreach from verified facts, review objections, and check the evidence behind a CRM forecast. No signup required.',
    totalDuration: '34 min',
    lessonCount: 4,
    level: 'Intermediate',
    category: 'Business Functions',
    outcomes: [
      'Build a prospect brief from dated public facts and open questions.',
      'Draft outreach from verified evidence, then check claims before sending.',
      'Review deal risks and identify missing CRM evidence without inventing a forecast.',
    ],
    lessons: [
      {
        slug: 'ai-for-prospect-research',
        title: 'Build a Source-Checked Prospect Brief with AI',
        duration: '8 min',
        summary: 'Turn dated public company facts into discovery questions without inventing buyer intent.',
        body: `
<h2>Collect a small set of dated public facts</h2>
<p>Start with the decision you are preparing for: an introductory call, account review, or follow-up. Open the company's own public pages and save the URL, capture date, and exact relevant line. A press release or product page may tell you what the company announced; it cannot tell you a buyer's budget, priorities, or private problems. Keep those as questions. Use a company-approved AI workspace, and do not paste personal contact details or private CRM notes unless your organization permits it.</p>

<h2>Worked example: one fictional update</h2>
<p>Blue Harbor Software and QueueBrief are fictional. On 20 October 2026, Blue Harbor's invented public update says, “We expanded customer support coverage to the EU region.” QueueBrief's invented seller brief says it turns approved support handoff notes into shift summaries. The update establishes a coverage expansion. It does not establish a handoff problem or interest in QueueBrief.</p>
<p>A useful pre-call question would be, “How do teams coordinate handoffs across coverage regions today?” An unsupported claim would be, “Your EU expansion is creating handoff delays.” The source contains no delay data.</p>

<h2>Copy the account-brief prompt</h2>
<p><code>Create a short pre-call brief using only the source material below. Return (1) observed company facts with exact quotations and capture dates, (2) possible relevance to our product labeled as hypotheses, (3) facts still unknown, and (4) three open discovery questions. Do not invent a buyer's priorities, budget, technology stack, or problems. If there is too little evidence, say so. Fictional public source, captured 20 October 2026: Blue Harbor Software said, “We expanded customer support coverage to the EU region.” Fictional product fact: QueueBrief turns approved support handoff notes into shift summaries.</code></p>
<p><strong>Check the draft:</strong> It may repeat the coverage expansion as an observed fact and ask how handoffs are coordinated. It must not assert that handoffs are failing, that EU support is understaffed, or that a purchase is planned. Remove unsupported claims before the brief goes into a CRM or call plan.</p>

<h2>Keep the source ledger with the brief</h2>
<p><code>Research question: [decision or call to prepare]
Public source URL and capture date: [link and date]
Exact source quotation: [text]
Observed fact: [what this proves]
Possible relevance: [hypothesis to test]
Unknowns: [what the source cannot tell us]
Discovery question: [open question for the buyer]
Human reviewer and date: [name and date]</code></p>
<p>Reopen the source before using the brief; public pages can change. A funding announcement, hiring post, or leadership change may suggest a question to ask, but it does not prove a buying event. When you have a verified fact and a product statement, the next lesson shows how to turn them into <a href="/courses/ai-for-sales/ai-for-outreach-and-prospecting">evidence-based outreach</a> without pretending to know the buyer's needs.</p>
        `,
      },
      {
        slug: 'ai-for-outreach-and-prospecting',
        title: 'Write Evidence-Based Sales Outreach with AI',
        duration: '9 min',
        summary: 'Turn one verified public fact into a careful draft, then check every claim before sending.',
        body: `
<h2>Start with a source, not a guess about the buyer</h2>
<p>A useful first-touch message can begin with one relevant, verifiable fact. Save the public page URL, date, and exact line you intend to reference. Separately record a fact about your own product that you can substantiate. Do not turn a company announcement into a claim about a person's priorities, budget, or pain. If you cannot verify a meaningful connection, skip the personalized opening rather than invent one.</p>
<p>Use an AI workspace approved by your organization. Keep personal contact details, private account notes, and confidential deal information out of the prompt unless your policy permits them. A draft is a starting point for a human seller, not permission to send or automate a sequence.</p>

<h2>Worked example: a fictional account and product</h2>
<p>Everything in this example is invented for practice. A fictional company, Blue Harbor Software, published this dated line on 20 October 2026: “We expanded customer support coverage to the EU region.” The fictional seller's product, QueueBrief, turns approved support handoff notes into shift summaries. Those are the only source and product facts available.</p>
<p><strong>Observed:</strong> Blue Harbor says it expanded EU support coverage. <strong>Possible relevance:</strong> a team with more coverage may need to review handoffs, but this has not been established. <strong>Unknown:</strong> whether Blue Harbor has any handoff problem, uses an existing tool, or wants to hear from this seller. The draft must not claim those things.</p>

<h2>Copy the source-led outreach prompt</h2>
<p><code>Draft a first-touch B2B email of no more than 90 words. Use only the verified public fact and the seller product fact below. Label any connection between them as a question or possibility, not a proven problem. Do not invent a relationship, metric, budget, urgency, customer outcome, or personal detail. Offer one small, optional next step. Return the draft, then list every factual claim with the source that supports it and any claim that still needs verification. Public fact (fictional): Blue Harbor Software said on 20 October 2026, “We expanded customer support coverage to the EU region.” Product fact (fictional): QueueBrief turns approved support handoff notes into shift summaries. Recipient name and contact details are intentionally omitted.</code></p>
<p><strong>A checked sample draft:</strong> “Hello, I saw Blue Harbor's update about expanding EU support coverage. QueueBrief turns approved support handoff notes into shift summaries. If reviewing handoffs across coverage areas is a priority, would a one-page example be useful? If not, no need to respond.” The first sentence is supported by the fictional public update; the second by the fictional seller brief. The question does not assert that Blue Harbor has a handoff problem. Do not reuse this example as a real claim.</p>

<h2>Copy the evidence and review worksheet</h2>
<p><code>Company and public source URL: [link]
Source capture date and exact quotation: [date and text]
What the quotation actually establishes: [observed fact]
Why it might be relevant: [hypothesis, not a fact]
Seller product claim and source: [approved, verifiable statement]
Draft claim to remove or verify: [unsupported wording]
Recipient and channel permitted by our policy: [yes/no/unknown]
Required opt-out or other review: [status]
Human review decision: [send, revise, or do not send]</code></p>
<p>Before any real message, open the source again, check the product statement against current approved material, and remove wording that outruns the evidence. Follow your organization's outreach rules and applicable requirements for the recipient and channel. If permission or an opt-out requirement is unclear, pause the send and ask the responsible team. For a broader account brief, start with <a href="/courses/ai-for-sales/ai-for-prospect-research">prospect research</a>; for a later-stage deal, use the <a href="/courses/ai-for-sales/ai-for-pipeline-and-forecasting">CRM pipeline review</a>.</p>
        `,
      },
      {
        slug: 'ai-for-objection-handling',
        title: 'AI for Objection Handling and Deal Reviews',
        duration: '9 min',
        summary: 'Prepare for every objection before it comes up and get sharper deal coaching.',
        body: `
<h2>Preparing for objections before the call</h2>
<p>Every sales role has the same 8-12 objections that come up repeatedly. Most salespeople encounter them reactively and handle them with varying quality depending on how they feel that day. AI lets you prepare structured responses to every known objection so you are never caught off guard.</p>
<p>Prompt: "I sell [product] to [buyer type]. The most common objections I face are [list your actual objections]. For each one, give me: (1) what the prospect really means when they say this (the underlying concern), (2) the most effective response that addresses the real concern, (3) a follow-up question that moves the conversation forward."</p>
<p>Review and refine this document quarterly. Add new objections as they emerge. Brief your whole team on it.</p>

<h2>Deal reviews with AI</h2>
<p>When a deal is stalled, use a company-approved AI workspace and a redacted deal summary. Leave out customer names, contact details, contract terms, and other confidential information unless your organization permits sharing them. Then ask: "Act as a skeptical sales manager reviewing this deal. What are the red flags? What information am I missing? What could prevent it from closing, and what should my next move be?"</p>
<p>The model pushes back on optimistic assumptions in ways that a busy manager often cannot take time to do. It is particularly good at identifying what you do not know — which is usually what kills deals.</p>

<h2>Call analysis from transcripts</h2>
<p>If your organization permits recording and AI analysis, use an approved tool and remove personal or confidential details before analyzing a transcript. Ask: "What did the prospect care about most? What should I have asked? What next steps did I commit to? Which objections need a clearer response?" Check the answer against the recording or notes before updating your CRM.</p>
        `,
      },
      {
        slug: 'ai-for-pipeline-and-forecasting',
        title: 'Review a CRM Pipeline Forecast with AI',
        duration: '8 min',
        summary: 'Use a safe CRM export to find missing deal evidence before you submit a forecast.',
        body: `
<h2>Start with evidence, not an AI-generated number</h2>
<p>A CRM export can show deal amounts and close dates without showing whether a buyer has agreed to the next step. AI is useful for spotting missing evidence and drafting review questions. It cannot turn an incomplete pipeline into a reliable revenue forecast.</p>
<p>Use an approved AI workspace and only data your organization permits you to share. For a first attempt, use the fictional example below. For a real review, remove names, contact details, private notes, and any other restricted fields. Keep the source CRM as the record you check before making a decision.</p>

<h2>A three-deal example you can check by hand</h2>
<p>Assume this fictional pipeline was reviewed on 24 October 2026. All three deals have a 30 November target close date:</p>
<ul>
  <li><strong>Deal A — $40,000, proposal:</strong> 9 days in stage; buyer interaction 2 days ago; a review call is agreed for 28 October.</li>
  <li><strong>Deal B — $30,000, negotiation:</strong> 45 days in stage; last buyer interaction 31 days ago; no agreed next-step date is recorded.</li>
  <li><strong>Deal C — $20,000, discovery:</strong> 3 days in stage; buyer interaction yesterday; the economic buyer is not yet identified.</li>
</ul>
<p>The gross pipeline is <strong>$90,000</strong> ($40,000 + $30,000 + $20,000). That is a sum of open opportunities, <strong>not</strong> a $90,000 forecast. The data does not include calibrated win rates or enough buyer evidence to estimate expected revenue or which deals will close in November.</p>

<h2>Copy the pipeline-review prompt</h2>
<p><code>You are helping me review a fictional CRM pipeline, not predict revenue. Review date: 24 October 2026. Target close date for every deal: 30 November 2026. Deal A: $40,000, proposal, 9 days in stage, buyer interaction 2 days ago, review call agreed for 28 October. Deal B: $30,000, negotiation, 45 days in stage, buyer interaction 31 days ago, no agreed next-step date recorded. Deal C: $20,000, discovery, 3 days in stage, buyer interaction yesterday, economic buyer not identified. Return: (1) the gross pipeline total with arithmetic, (2) one evidence gap and one question for the owner of each deal, and (3) which records to check in the CRM. Distinguish recorded facts from hypotheses. Do not invent buyer intent, win probabilities, close confidence, or a revenue forecast. If a field is missing, write "not recorded."</code></p>
<p><strong>What a useful draft should flag:</strong> A has a review call scheduled, so check the result and purchase step afterward; B needs a fresh buyer-confirmed next action before its November close date is trusted; C needs an identified decision process. The model should calculate $90,000 correctly and stop there. A longer answer with made-up probabilities is worse.</p>

<h2>Turn the draft into a forecast review</h2>
<ol>
  <li>Open each CRM record and verify the amount, stage, target date, last buyer interaction, and agreed next step. Fix stale or missing fields with the deal owner.</li>
  <li>Ask the owner of B whether the buyer has confirmed any next action. Ask C who approves the purchase. For A, check the result of the scheduled review call when it occurs.</li>
  <li>Apply your team's documented forecast categories and historical calibration, if available. Do not treat stage labels or an AI confidence score as a substitute for that evidence.</li>
  <li>Record what changed, who verified it, and what remains uncertain before you submit the forecast.</li>
</ol>
<p>For another reusable business task, try the <a href="/courses/prompting-for-professionals/prompt-templates-for-business">business prompt templates</a>. If you use meeting notes to update CRM records, the <a href="/courses/ai-for-productivity/ai-for-meetings">meeting follow-up workflow</a> shows how to check decisions and owners before sharing them.</p>
        `,
      },
    ],
  },
  {
    slug: 'ai-for-productivity',
    title: 'AI Productivity Stack',
    tagline: 'Build daily AI habits that actually compound.',
    description: 'The AI tools and daily workflows that consistently free up time for professionals. No hype, no hypotheticals: just the practices that actually work.',
    totalDuration: '37 min',
    lessonCount: 4,
    level: 'Beginner',
    category: 'Productivity',
    lessons: [
      {
        slug: 'the-morning-briefing-workflow',
        title: 'The Morning Briefing Workflow',
        duration: '9 min',
        summary: 'Start every day knowing exactly what matters, in under 10 minutes.',
        body: `
<h2>The problem with how most professionals start their day</h2>
<p>Most professionals open email, Slack, LinkedIn, and three news tabs simultaneously. An hour later they have read a lot but processed little. They are reactive rather than prepared.</p>
<p>AI makes a different pattern possible: a structured morning briefing that pulls the signal from the noise, in less time than it takes to scroll a social feed.</p>

<h2>Building your daily briefing</h2>
<p>The goal is a 5-10 minute document that tells you everything you need to know for the day. It has three sections:</p>
<p><strong>Your priorities:</strong> What are the 3 most important things you need to accomplish today? This is your input, but AI can help you review yesterday's notes, outstanding items, and calendar to surface what matters most.</p>
<p><strong>External signals:</strong> What happened in your industry, with your competitors, and in the world overnight that is relevant to your work? Perplexity is excellent for this: set up saved searches for your key topics and review the overnight results.</p>
<p><strong>Meeting prep:</strong> For each meeting on your calendar, a 2-3 line brief: what is the goal, what do you need to bring, what outcome would make it successful?</p>

<h2>Automating it</h2>
<p>The fully automated version uses n8n or Zapier to pull your calendar, run Perplexity searches on predefined topics, and compile everything into a document emailed to you at 7am. It takes a few hours to set up and runs every day thereafter without input.</p>
<p>The manual version, opening Perplexity and running your standard searches, then pasting your calendar into ChatGPT, takes 10 minutes. Start there and automate when the habit is solid.</p>
        `,
      },
      {
        slug: 'email-and-communication-at-speed',
        title: 'Email and Communication at Speed',
        duration: '10 min',
        summary: 'Draft, refine, and respond to communication in a fraction of the time.',
        body: `
<h2>Where the time actually goes</h2>
<p>A disproportionate share of every professional's day goes to email. Much of that time is spent on mechanical work: drafting responses, figuring out the right framing, editing for tone. These are exactly the tasks AI handles best.</p>

<h2>The draft-then-refine workflow</h2>
<p>Stop writing emails from scratch. For any email that takes more than 2 minutes to write, use this workflow:</p>
<ol>
  <li>Paste the email you received (or describe the situation)</li>
  <li>Tell the AI: what you want to communicate, the outcome you are going for, and any constraints (keep it short, do not sound defensive, be direct)</li>
  <li>Get a draft in 10 seconds</li>
  <li>Edit it to sound like you, usually 2 minutes at most</li>
</ol>
<p>You are not outsourcing the thinking. You are outsourcing the typing. You still decide what to say. The AI figures out how to say it clearly.</p>

<h2>Tone calibration</h2>
<p>One of the most underused AI capabilities is tone adjustment. Paste a draft you have written and ask: "Make this more direct without sounding aggressive." Or "Soften this, it sounds too blunt." Or "This is too long, cut it in half without losing the key ask."</p>
<p>These micro-edits take 30 seconds with AI. At 20 emails a day, that adds up quickly.</p>

<h2>Meeting follow-ups</h2>
<p>After every meeting, paste your notes and ask the AI to generate the follow-up email: what was decided, who is doing what, next steps, and timeline. Customize and send. What used to take 15 minutes takes 2.</p>
        `,
      },
      {
        slug: 'ai-for-meetings',
        title: 'AI for Meetings: Before, During, and After',
        duration: '9 min',
        summary: 'Turn permitted meeting notes into checked decisions, action items, and a useful follow-up.',
        body: `
<p>A good meeting follow-up makes the decisions, owners, and unresolved questions easy to check. AI can organize a rough note, but it cannot know what someone meant unless your source says so. Keep a human in charge of the final record.</p>

<h2>Before: write down the purpose</h2>
<p>Prepare one intended decision, the context attendees need, and two questions worth answering. If you use AI to draft an agenda, supply only verified context and ask it to flag assumptions. Keep private names or sensitive details out of an unapproved tool.</p>
<p><code>I am preparing a [meeting type] for [roles]. The decision we need is [decision]. Verified context: [approved facts]. Constraints: [time and scope]. Draft a three-item agenda and two open questions. Do not invent facts about attendees or claim a decision has already been made. Mark any assumption as a question.</code></p>

<h2>During: capture the minimum useful record</h2>
<p>Note decisions in the words used, proposed actions, named owners, stated deadlines, and open questions. Distinguish a suggestion from an agreement. A recording or transcript is optional: obtain any required consent and follow your organization's policy and applicable rules. If recording is not appropriate, take brief notes instead. Share notes with an AI tool only if your organization permits that data in that tool; otherwise use a de-identified version or keep the review manual.</p>

<h2>After: extract actions without guessing</h2>
<p>Use this prompt with notes you are permitted to share. The source line beside each item makes checking much easier than a fluent but unsupported summary.</p>
<p><code>Turn these approved meeting notes into a review draft. Return four sections: (1) decisions explicitly agreed, (2) action items with task, owner, due date, and the exact supporting note, (3) proposals that were not decided, and (4) open questions. Write "not stated" for any missing owner or deadline. Do not turn a proposal into a decision, infer a commitment, or invent a date. Then draft a short follow-up message asking attendees to correct the record. Notes: [paste permitted notes]</code></p>
<p><strong>Synthetic input, with fictional people and project:</strong> "Project Cedar kickoff. Team agreed to run a pilot with five volunteer teammates next week. Amira agreed to draft the checklist by Friday. Leo will ask security whether test data is permitted; no date agreed. Budget for a wider rollout is undecided."</p>
<p><strong>Illustrative expected output, not an actual model run:</strong> Decision: run a five-person pilot next week. Action: Amira, draft the checklist, Friday; supporting note: "Amira agreed to draft the checklist by Friday." Action: Leo, ask security about test data, due date not stated. Open question: budget for a wider rollout. The output must not claim that security approved the data or that rollout was agreed.</p>

<h2>Check before you send</h2>
<ul>
  <li>Compare every decision and action with your original notes. Ask attendees to confirm anything ambiguous.</li>
  <li>Check each name, deadline, number, and quoted line. Replace "not stated" only after an owner confirms it.</li>
  <li>Remove private details from the follow-up if the recipients should not see them.</li>
  <li>Send the revised record to the appropriate attendees and invite corrections. Treat the AI draft as a starting point, not the meeting's official account.</li>
</ul>
<p>For more reusable prompts, use the <a href="/courses/prompting-for-professionals/prompt-templates-for-business">business prompt templates</a>. If you want to build this into a daily routine, the <a href="/courses/ai-for-productivity/the-morning-briefing-workflow">morning briefing workflow</a> shows how to review outstanding actions.</p>
        `,
      },
      {
        slug: 'building-personal-ai-systems',
        title: 'Building Personal AI Systems That Compound',
        duration: '9 min',
        summary: 'Move from ad-hoc AI use to a system that keeps delivering without extra work.',
        body: `
<h2>Using AI vs. having AI systems</h2>
<p>Most professionals use AI reactively: they have a task, they open ChatGPT, they get a result, they close the tab. This saves some time. It does not compound.</p>
<p>AI systems work differently. They run continuously, they improve over time as you refine them, and they generate output whether or not you are actively working. The morning briefing is one example. A weekly competitive intelligence report is another. A content repurposing pipeline is a third.</p>

<h2>The anatomy of a personal AI system</h2>
<p>Every effective AI system has four components:</p>
<ul>
  <li><strong>Trigger:</strong> What kicks it off? (A scheduled time, a new piece of content, a calendar event)</li>
  <li><strong>Input:</strong> What data does it pull? (Your email, competitor websites, news, your notes)</li>
  <li><strong>AI step:</strong> What does the LLM do with that data? (Summarize, analyze, draft, extract)</li>
  <li><strong>Output:</strong> Where does the result go? (Email to you, Slack message, document, database)</li>
</ul>

<h2>Where to start building</h2>
<p>The best first system is the one that solves your biggest weekly pain point. Which recurring task takes the most time and requires the least human judgment? That is your first automation target.</p>
<p>Tools: n8n (free, open-source, most capable), Zapier (easier, more expensive), Make (middle ground). None require engineering skills to use for basic workflows.</p>

<h2>The compounding effect</h2>
<p>Each system you build frees up time to build the next one. Start with one workflow. Get it working reliably. Then add the next. After a few months of doing this, the mechanical parts of your job largely run themselves, and your time goes to the work that actually requires you.</p>
        `,
      },
    ],
  },
]

export function getCourse(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug)
}

export function getLesson(courseSlug: string, lessonSlug: string): { course: Course; lesson: Lesson; index: number } | undefined {
  const course = getCourse(courseSlug)
  if (!course) return undefined
  const index = course.lessons.findIndex(l => l.slug === lessonSlug)
  if (index === -1) return undefined
  return { course, lesson: course.lessons[index], index }
}
