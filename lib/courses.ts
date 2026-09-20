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
        summary: 'A clear mental model of AI — no PhD required.',
        body: `
<h2>The one-sentence definition that actually helps</h2>
<p>AI is software that learns patterns from data and uses those patterns to make predictions or generate outputs. That's it. Everything else — large language models, neural networks, generative AI — is just different ways of doing that one thing.</p>
<p>The reason most AI explanations confuse business professionals is that they start with the technology. That's backwards. Start with what it does and work backwards to how it does it.</p>

<h2>Three types of AI you'll encounter at work</h2>
<p><strong>Generative AI</strong> creates new content — text, images, code, audio. ChatGPT, Claude, Gemini. This is what most people mean when they say "AI" today.</p>
<p><strong>Predictive AI</strong> forecasts outcomes based on historical patterns — churn models, demand forecasting, credit scoring. This has existed in enterprise software for 10+ years. Your CRM probably uses it.</p>
<p><strong>Automation AI</strong> handles rules-based decisions and workflows without human intervention — document processing, customer routing, anomaly detection. Often invisible infrastructure.</p>

<h2>What AI cannot do</h2>
<p>This is more useful than knowing what it can do. AI cannot:</p>
<ul>
  <li>Know things that weren't in its training data</li>
  <li>Reliably access real-time information (unless given a tool to do so)</li>
  <li>Reason with certainty — it generates plausible outputs, not guaranteed correct ones</li>
  <li>Understand context the way a human colleague does</li>
  <li>Take actions in the world without explicit permission and tooling</li>
</ul>

<h2>The mental model that changes how you use it</h2>
<p>Think of AI as an extremely well-read, very fast intern who has read almost everything ever published but has never held a job. They're brilliant at synthesizing information, drafting, and generating options. They need your direction, your judgment, and your context to be useful.</p>
<blockquote>The professionals who get the most out of AI aren't the ones who trust it blindly — they're the ones who know exactly when to trust it and when to verify.</blockquote>
        `,
      },
      {
        slug: 'how-llms-work-in-plain-english',
        title: 'How LLMs Work — in Plain English',
        duration: '9 min',
        summary: 'What\'s actually happening when you type into ChatGPT.',
        body: `
<h2>Predicting the next word, at massive scale</h2>
<p>A large language model is trained to predict what comes next in a sequence of text. That's the core mechanism. Given millions of examples of human-written text, the model learns which words tend to follow which other words — and in what contexts.</p>
<p>When you type a prompt, the model generates a response one token at a time, each time predicting the most useful next piece of text given everything that came before. It's doing this billions of times per second, for millions of users simultaneously.</p>

<h2>Why they sound so confident even when wrong</h2>
<p>The model is optimized to generate fluent, coherent text — not to be accurate. Confident-sounding language appears more in well-written training data, so the model learns to produce confident-sounding language. This is why LLMs "hallucinate" — they generate plausible-sounding text that happens to be factually wrong.</p>
<p>This is not a bug being fixed. It's a fundamental property of how these systems work. The solution isn't to wait for a better model — it's to design your use of AI to catch errors.</p>

<h2>Context windows: the AI's working memory</h2>
<p>A context window is how much text the model can "see" at once. Early models could handle a few thousand words. Current models can handle hundreds of thousands. This matters because:</p>
<ul>
  <li>The more context you give, the better the response</li>
  <li>Long conversations eventually push early content out of the window</li>
  <li>For complex tasks, how you structure your prompt matters enormously</li>
</ul>

<h2>The practical implication for how you work</h2>
<p>LLMs are not databases. They don't store facts — they store patterns. This means they're excellent at tasks that require language, structure, synthesis, and style. They're unreliable for tasks that require precision, recency, or calculation.</p>
<p>Route your work accordingly: use AI for drafting, rewriting, summarizing, brainstorming, and structuring. Use traditional tools (search, databases, calculators) for facts, numbers, and current information.</p>
        `,
      },
      {
        slug: 'the-ai-tool-landscape',
        title: 'The AI Tool Landscape in 2025',
        duration: '10 min',
        summary: 'The tools worth knowing and how to choose between them.',
        body: `
<h2>The four tools every business professional should know</h2>
<p>There are hundreds of AI tools. You need to deeply understand four, and be aware of the rest.</p>
<p><strong>ChatGPT (OpenAI)</strong> — The most widely used. Best-in-class for general tasks, has a vast plugin ecosystem, and has the largest user community meaning you'll find answers to any problem. GPT-4o is the workhorse model.</p>
<p><strong>Claude (Anthropic)</strong> — Strongest for long documents, nuanced writing, and tasks that require careful reasoning. Handles very large context windows exceptionally well. Preferred by many writers and analysts.</p>
<p><strong>Gemini (Google)</strong> — Best Google Workspace integration. Useful if you live in Google Docs, Gmail, and Sheets. The only one with deep, native access to your Google data.</p>
<p><strong>Perplexity</strong> — The only major AI tool designed from the ground up for research. Cites sources, searches the web in real-time, and is dramatically more reliable than ChatGPT for factual questions.</p>

<h2>Specialist tools worth knowing</h2>
<p>Beyond the big four, specific categories of tools are maturing fast:</p>
<ul>
  <li><strong>NotebookLM</strong> (Google) — Feed it documents and it becomes an expert on them. Excellent for competitive research, reading large reports, or analyzing transcripts.</li>
  <li><strong>Midjourney / DALL·E 3</strong> — Image generation. Useful for presentations, marketing assets, and ideation.</li>
  <li><strong>ElevenLabs</strong> — Voice cloning and text-to-speech at production quality.</li>
  <li><strong>Otter.ai / Fireflies</strong> — Meeting transcription and AI summaries.</li>
</ul>

<h2>How to choose</h2>
<p>Don't pick one and stick with it. Use different tools for different tasks — the same way you use different apps on your phone. The professionals who try to do everything in one AI tool are leaving significant value on the table.</p>
<blockquote>The best AI stack is not one tool used for everything. It's the right tool for each job, used with skill.</blockquote>
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
<p><strong>High AI leverage</strong>: First drafts, research synthesis, editing, formatting, summarizing, generating options, translating between formats (e.g. bullet points → paragraph). Hand these off immediately.</p>
<p><strong>AI-assisted</strong>: Analysis, strategic thinking, planning, complex decisions. Use AI to generate inputs and surface considerations, but keep your judgment at the center.</p>
<p><strong>Human-only</strong>: Relationship management, final decisions with real stakes, anything requiring institutional knowledge the AI doesn't have, anything where a wrong answer causes harm.</p>

<h2>The tasks most professionals underestimate</h2>
<p>Business professionals tend to use AI for obvious tasks (writing emails) and miss the high-leverage ones:</p>
<ul>
  <li>Pre-meeting prep — feed AI the person's LinkedIn, recent news about their company, your agenda, and ask for talking points and likely objections</li>
  <li>Post-meeting synthesis — paste your notes and ask for a structured summary, action items, and what you said you'd follow up on</li>
  <li>Report reading — paste a 40-page report and ask for the three things that are most relevant to your specific situation</li>
  <li>Thinking out loud — describe a problem you're stuck on and ask the AI to help you structure it, push back on your assumptions, or generate alternatives you haven't considered</li>
</ul>

<h2>Building the habit</h2>
<p>The biggest barrier isn't capability — it's habit. Most professionals who say "AI doesn't save me much time" are using it reactively, for the task in front of them, rather than proactively, as a thinking partner throughout their day.</p>
<p>Start by picking one recurring task this week and running it through AI every single time — no exceptions. In two weeks, that delegation will be automatic, and you'll be ready to add the next one.</p>
        `,
      },
    ],
  },
  {
    slug: 'prompting-for-professionals',
    title: 'Prompting for Professionals',
    tagline: 'Write prompts that get work done, not ones that need five rounds of back-and-forth.',
    description: 'Most people use AI like a search engine and get mediocre results. This course teaches the mental models and techniques that make the difference between a useful tool and a productivity multiplier.',
    totalDuration: '32 min',
    lessonCount: 4,
    level: 'Beginner',
    category: 'Skills',
    lessons: [
      {
        slug: 'why-most-prompts-fail',
        title: 'Why Most Prompts Fail',
        duration: '7 min',
        summary: 'The two mistakes that cause 80% of bad AI outputs.',
        body: `
<h2>The vague prompt problem</h2>
<p>The most common reason AI outputs disappoint is the same reason a new employee produces disappointing work: you didn't tell them enough. "Write me a summary of this report" is like telling a new hire "do something with this" and walking away.</p>
<p>AI needs the same things a good employee needs: context, format, audience, constraints, and examples. The more precisely you define what done looks like, the more likely you are to get it.</p>

<h2>The two failure modes</h2>
<p><strong>Too vague</strong>: "Write a LinkedIn post about AI." The model has no idea what tone you use, who your audience is, what point you want to make, or how long it should be. You'll get something generic.</p>
<p><strong>Too prescriptive</strong>: "Write exactly 247 words, use these three headers, include a statistic about productivity in paragraph two, end with a question." You've constrained the model so tightly it can't apply any judgment.</p>
<p>The sweet spot is clear direction with room to execute. Think: "a confident senior employee who knows your preferences" level of guidance.</p>

<h2>The test for a good prompt</h2>
<p>Before sending your prompt, ask: if I handed this to a smart person who'd never met me and asked them to do this task, would they have enough information to produce what I actually want?</p>
<p>If the answer is no, add the missing pieces. Usually that means: who is the audience, what format do I want, what's the most important constraint, and what does a good output look like?</p>
        `,
      },
      {
        slug: 'the-four-part-prompt-structure',
        title: 'The Four-Part Prompt Structure',
        duration: '9 min',
        summary: 'A repeatable structure that works for almost any task.',
        body: `
<h2>Role · Task · Context · Format</h2>
<p>Every effective prompt contains four elements. You don't always need all four — but knowing them helps you diagnose when a prompt isn't working.</p>

<h2>Role: who should the AI be?</h2>
<p>Setting a role activates different knowledge and tone from the model. "You are a senior marketing strategist with 15 years of experience in B2B SaaS" produces very different output than an unframed prompt asking the same question.</p>
<p>Be specific about the expertise, not just the job title. "You are a financial analyst who specializes in evaluating early-stage startup unit economics" is more useful than "You are a financial analyst."</p>

<h2>Task: what exactly do I want?</h2>
<p>State the task as a verb + object. Not "something about the sales deck" — "rewrite the executive summary of this sales deck to emphasize ROI over features, for a CFO audience."</p>
<p>Include the action (rewrite, summarize, generate, analyze, evaluate, suggest), the object (what the action applies to), and the purpose (why, or for whom).</p>

<h2>Context: what does the AI need to know?</h2>
<p>This is where most people underinvest. Context includes:</p>
<ul>
  <li>The audience — who will read/hear this?</li>
  <li>The existing situation — what's already true, what's happened so far?</li>
  <li>Your constraints — time, tone, things to avoid</li>
  <li>Examples — "like this" is often more powerful than a long description</li>
</ul>

<h2>Format: what should the output look like?</h2>
<p>Don't leave format to chance. Specify: number of words or paragraphs, headers or no headers, bullet points or prose, tone (formal / conversational / direct), and what to exclude. A well-formatted output usually needs minimal editing.</p>

<h2>Putting it together</h2>
<p>Example: "You are a senior B2B copywriter [Role]. Rewrite the following email subject line to improve open rates [Task]. The audience is mid-market CFOs who are skeptical of vendor marketing, and we've been in a 3-month sales cycle [Context]. Give me five variations, no more than 8 words each, with one word that conveys urgency [Format]."</p>
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
<p>Don't use it for: simple drafting tasks, formatting, translation — it just adds unnecessary length.</p>

<h2>Few-shot prompting: show, don't just tell</h2>
<p>The fastest way to get consistent style or format is to give the model examples before asking it to do the task. This is called few-shot prompting.</p>
<p>Instead of describing the format you want in words, include 2–3 examples of what you want, then ask for one more. The model pattern-matches to your examples with remarkable precision.</p>
<p>Especially useful for: LinkedIn posts in your voice, email templates, report sections that need to match existing documents.</p>

<h2>Iterating: the conversation as the tool</h2>
<p>Most people use AI like a vending machine — one prompt in, one output out, done. The professionals who get the most out of it treat it as a conversation. The first output is raw material, not the final product.</p>
<ul>
  <li>"This is good, but make it 30% shorter and remove the second point"</li>
  <li>"The tone is too formal — I want it to sound more like how I'd speak to a colleague, not a board"</li>
  <li>"Keep everything, but restructure so the most important finding comes first"</li>
</ul>
<p>Each iteration gets you closer. Budget for 2–3 rounds on anything important.</p>

<h2>System prompts: your personal AI configuration</h2>
<p>Most major AI tools let you set a "system prompt" or custom instructions — a persistent context that applies to every conversation. This is where you put things you'd otherwise repeat every time: your role, your preferences, your audience, your style.</p>
<p>Invest 20 minutes in writing a good system prompt. You'll recoup it in the first week.</p>
        `,
      },
      {
        slug: 'prompt-templates-for-business',
        title: 'Prompt Templates for Common Business Tasks',
        duration: '7 min',
        summary: 'Copy-paste templates for the tasks you do every week.',
        body: `
<h2>Before a meeting</h2>
<p>Paste this, fill in the brackets:</p>
<p><code>I have a meeting with [name/role] from [company] in [X] days. The purpose is [goal]. Here's what I know about them: [LinkedIn summary, recent news, prior conversations]. Give me: (1) 3 talking points that position me well for my goal, (2) 3 questions that show I've done my homework, (3) 2 likely objections and how to handle them.</code></p>

<h2>Summarizing a long document</h2>
<p><code>Here is a [report/transcript/article]. I am [your role] and I need to understand [what matters to you specifically]. Give me: (1) the three most important points for someone in my position, (2) one thing I should act on, (3) one risk or concern I should be aware of.</code></p>

<h2>Writing a first draft</h2>
<p><code>Write a first draft of [document type] for [audience]. The purpose is to [goal]. Key points to include: [bullet list]. Tone: [professional/conversational/persuasive]. Length: approximately [X] words. Do not include: [anything to avoid].</code></p>

<h2>Evaluating a decision</h2>
<p><code>I'm considering [decision]. My goal is [goal]. Constraints: [list constraints]. Act as a thoughtful advisor who is skeptical of my instincts. Give me: (1) the three strongest reasons to proceed, (2) the three strongest reasons not to, (3) what additional information you'd want before deciding, (4) your overall recommendation.</code></p>

<h2>Giving feedback on writing</h2>
<p><code>Review the following [document type] and give feedback from the perspective of [target audience]. Be direct. Tell me: (1) what's working, (2) what's unclear or weak, (3) the single most important change I should make.</code></p>
        `,
      },
    ],
  },
  {
    slug: 'ai-for-marketing-and-gtm',
    title: 'AI for Marketing & GTM',
    tagline: 'Practical AI applications across the full go-to-market stack.',
    description: 'From competitive research to campaign briefs to customer insight — how to use AI across every major marketing and GTM function without replacing the judgment that makes strategy work.',
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
<h2>The problem with traditional comp intel</h2>
<p>Most competitive intelligence is manual, intermittent, and siloed. Someone checks a competitor's website once a quarter. Someone else reads their press releases. Nobody synthesizes it. By the time insight reaches decision-makers, it's stale.</p>
<p>AI doesn't fix this by being smarter — it fixes it by being tireless. Automated pipelines can monitor dozens of competitor signals daily and surface only what changed.</p>

<h2>What to monitor and how</h2>
<p><strong>Pricing and packaging</strong>: Set up a simple scraper (no code required — Zapier + browser automation) that checks competitor pricing pages weekly and logs changes. Feed the diffs to an LLM and ask it to explain what changed and what it signals about strategy.</p>
<p><strong>Job postings</strong>: Competitor job posts are a leading indicator of strategic direction. A company suddenly hiring 10 machine learning engineers is building something. Use Perplexity or a job aggregator API to pull this data, then summarize it with an LLM weekly.</p>
<p><strong>Content and messaging</strong>: Use AI to analyze competitor blog posts, case studies, and LinkedIn content. Ask: "What themes are they emphasizing? What customer problems are they highlighting? What's missing from their narrative that I could own?"</p>

<h2>Synthesizing into action</h2>
<p>Raw intel is not strategy. The step most teams skip is synthesis. Once a week, paste your collected signals into an LLM with this prompt: "Here are this week's signals about [competitor]. Based on this, what do you think they're trying to do? What does that mean for us? What should we do differently?"</p>
<p>The output won't be perfect — but it forces structured thinking that most teams don't do at all.</p>
        `,
      },
      {
        slug: 'ai-for-content-and-campaigns',
        title: 'AI for Content and Campaign Briefs',
        duration: '9 min',
        summary: 'Cut brief-writing time by 70% without sacrificing strategic depth.',
        body: `
<h2>Where AI fits in the content workflow</h2>
<p>AI is not your content strategist. It doesn't know your brand, your audience nuances, or what's actually resonating in your market the way you do. What it can do is remove the mechanical work that buries your judgment under hours of blank-page anxiety and formatting.</p>
<p>Use AI for: first drafts, brief templates, headline variations, content repurposing, format transformation (blog → social → email), and QA against your brand voice.</p>
<p>Keep humans for: strategy, original research, genuine insight, final creative decisions.</p>

<h2>Brief-writing with AI</h2>
<p>A good campaign brief has five elements: objective, audience, message hierarchy, proof points, and success metrics. AI can draft all five in under two minutes if you give it the inputs.</p>
<p>The prompt: "Create a campaign brief for [campaign objective]. Target audience: [description]. Our product does [X] for them. Key differentiators: [list]. Business goal: [metric]. Format as a one-page brief with objective, audience, core message, supporting messages, and KPIs."</p>
<p>Review, edit for truth and strategy, then use it as the creative anchor for the whole campaign.</p>

<h2>Content repurposing at scale</h2>
<p>Every piece of original content you create should generate 5–10 derivative assets. AI makes this frictionless:</p>
<ul>
  <li>Long blog post → 5 LinkedIn posts (one per key insight)</li>
  <li>Webinar transcript → email recap + blog post + social quotes</li>
  <li>Customer case study → sales one-pager + deck slide + testimonial pull-quote</li>
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
<h2>The untapped data problem</h2>
<p>Most companies have more customer insight than they can process. Call recordings, support tickets, NPS verbatims, review sites, sales call notes. The data exists. The bottleneck is synthesis — there aren't enough humans to read all of it and extract the patterns.</p>
<p>This is exactly the kind of task LLMs are built for. Feed them large volumes of text, ask for patterns, get structured insight back in seconds.</p>

<h2>Analyzing customer reviews at scale</h2>
<p>Pull 50–100 reviews from G2, Capterra, or the App Store — yours and your competitors'. Paste them (or a sample) and ask:</p>
<ul>
  <li>"What are the top 5 reasons customers love this product? Quote the specific phrases they use."</li>
  <li>"What are the top 5 frustrations? What language do they use to describe the problem?"</li>
  <li>"Compare the language in positive reviews vs. negative reviews. What does this suggest about the gap between promise and delivery?"</li>
</ul>
<p>The resulting language is gold for your own messaging — you're using words your customers already use to describe the problem you solve.</p>

<h2>Sales call analysis</h2>
<p>If you use Gong, Chorus, or Otter, you have transcripts of every sales call. Feed a sample to an LLM weekly and ask: "What objections came up most often? What questions did prospects ask that our materials don't answer? What competitor names came up and in what context?"</p>
<p>This is market research your sales team is generating every day — most companies never harvest it.</p>
        `,
      },
      {
        slug: 'building-your-ai-gtm-stack',
        title: 'Building Your AI GTM Stack',
        duration: '9 min',
        summary: 'The tools and workflows that high-performing GTM teams are using right now.',
        body: `
<h2>The principle: augment judgment, not replace it</h2>
<p>The best GTM teams using AI are not the ones that have automated the most. They're the ones that have freed up the most human capacity for judgment — strategy, relationships, and creative decisions that AI genuinely cannot make.</p>
<p>Build your AI stack around this principle. Every tool you add should either remove mechanical work from humans or give humans better information to make decisions with.</p>

<h2>The core GTM AI stack</h2>
<p><strong>Research layer</strong>: Perplexity for real-time market and competitor research. NotebookLM for analyzing large documents (analyst reports, competitor content, customer transcripts).</p>
<p><strong>Creation layer</strong>: Claude or ChatGPT for drafting, briefs, and content. Midjourney or DALL·E for visual assets. ElevenLabs for audio if you produce podcast or video content.</p>
<p><strong>Automation layer</strong>: n8n or Zapier for connecting tools and running recurring pipelines. This is where you build the "while you sleep" workflows — daily competitor monitoring, weekly synthesis reports, automated content repurposing.</p>
<p><strong>Analytics layer</strong>: Standard BI tools, but with AI used to interpret and narrate the data — "here's what the numbers mean and what I'd do about it" rather than just the numbers themselves.</p>

<h2>Where to start</h2>
<p>Don't build the whole stack at once. Start with one high-friction, recurring task that takes 2+ hours per week. Automate that. Measure the time saved. Then move to the next one. In 90 days you'll have a stack that runs the mechanical parts of GTM almost entirely automatically — leaving your team for the work that actually requires them.</p>
        `,
      },
    ],
  },
  {
    slug: 'ai-for-productivity',
    title: 'AI Productivity Stack',
    tagline: 'Reclaim 5–10 hours a week. The tools and habits that make AI actually save you time.',
    description: 'The AI tools and daily workflows that consistently save professionals 5–10 hours a week. No hype, no hypotheticals — just the practices that actually work.',
    totalDuration: '28 min',
    lessonCount: 3,
    level: 'Beginner',
    category: 'Productivity',
    lessons: [
      {
        slug: 'the-morning-briefing-workflow',
        title: 'The Morning Briefing Workflow',
        duration: '9 min',
        summary: 'Start every day knowing exactly what matters — in under 10 minutes.',
        body: `
<h2>The problem with how we consume information</h2>
<p>Most professionals start their day by opening email, Slack, LinkedIn, and three news tabs simultaneously. An hour later they've read a lot but processed little. They're reactive rather than prepared.</p>
<p>AI makes a different pattern possible: a structured morning briefing that pulls the signal from the noise, in less time than it takes to scroll LinkedIn.</p>

<h2>Building your daily briefing</h2>
<p>The goal is a 5–10 minute document that tells you everything you need to know for the day. It has three sections:</p>
<p><strong>Your priorities</strong>: What are the 3 most important things you need to accomplish today? This is your input — but AI can help you review yesterday's notes, outstanding items, and calendar to surface what matters most.</p>
<p><strong>External signals</strong>: What happened in your industry, with your competitors, and in the world overnight that's relevant to your work? Perplexity is excellent for this — set up saved searches for your key topics and review the overnight results.</p>
<p><strong>Meeting prep</strong>: For each meeting on your calendar, a 2–3 line brief: what's the goal, what do you need to bring, what outcome would make it successful?</p>

<h2>Automating it</h2>
<p>The fully automated version uses n8n or Zapier to pull your calendar, run Perplexity searches on predefined topics, and compile everything into a document emailed to you at 7am. It takes a few hours to set up and runs every day thereafter without input.</p>
<p>The manual version — opening Perplexity, running your standard searches, and pasting your calendar into ChatGPT — takes 10 minutes. Start there, automate when the habit is solid.</p>
        `,
      },
      {
        slug: 'email-and-communication-at-10x-speed',
        title: 'Email and Communication at 10x Speed',
        duration: '10 min',
        summary: 'Draft, refine, and respond to communication in a fraction of the time.',
        body: `
<h2>The email problem</h2>
<p>The average professional spends 2.5 hours per day on email. A significant portion of that time is spent on mechanical tasks — drafting responses, figuring out what to say, editing for tone. These are exactly the tasks AI handles best.</p>

<h2>The draft-then-refine workflow</h2>
<p>Stop writing emails from scratch. For any email that takes more than 2 minutes to write, use this workflow:</p>
<ol>
  <li>Paste the email you received (or describe the situation)</li>
  <li>Tell the AI: what you want to communicate, the outcome you're going for, and any constraints (keep it short, don't sound defensive, be direct)</li>
  <li>Get a draft in 10 seconds</li>
  <li>Edit it to sound like you — usually 2 minutes max</li>
</ol>
<p>You're not outsourcing the thinking — you're outsourcing the typing. You still decide what to say. The AI figures out how to say it clearly.</p>

<h2>Tone calibration</h2>
<p>One of the most underused AI capabilities is tone adjustment. Paste a draft you've written and ask: "Make this more direct without sounding aggressive." Or "Soften this — it sounds too blunt." Or "This is too long — cut it in half without losing the key ask."</p>
<p>These micro-edits take 30 seconds with AI and 5 minutes without. At 20 emails a day, that's a significant difference.</p>

<h2>Meeting follow-ups</h2>
<p>After every meeting, paste your notes and ask the AI to generate the follow-up email: what was decided, who's doing what, next steps, and timeline. Customize and send. What used to take 15 minutes takes 2.</p>
        `,
      },
      {
        slug: 'building-personal-ai-systems',
        title: 'Building Personal AI Systems That Scale',
        duration: '9 min',
        summary: 'Move from ad-hoc AI use to a system that compounds over time.',
        body: `
<h2>The difference between using AI and having AI systems</h2>
<p>Most professionals use AI reactively — they have a task, they open ChatGPT, they get a result, they close the tab. This is the minimum viable use of AI. It saves some time, but it doesn't compound.</p>
<p>AI systems work differently. They run continuously, they improve over time as you refine them, and they generate output whether or not you're actively working. The morning briefing is one example. A weekly competitive intelligence report is another. A content repurposing pipeline is a third.</p>

<h2>The anatomy of a personal AI system</h2>
<p>Every effective AI system has four components:</p>
<ul>
  <li><strong>Trigger</strong>: What kicks it off? (A scheduled time, a new piece of content, a calendar event)</li>
  <li><strong>Input</strong>: What data does it pull? (Your email, competitor websites, news, your notes)</li>
  <li><strong>AI step</strong>: What does the LLM do with that data? (Summarize, analyze, draft, extract)</li>
  <li><strong>Output</strong>: Where does the result go? (Email to you, Slack message, document, database)</li>
</ul>

<h2>Where to start building</h2>
<p>The best first system is the one that solves your biggest weekly pain point. Think about which recurring task takes the most time and requires the least human judgment. That's your first automation target.</p>
<p>Tools: n8n (free, open-source, most powerful), Zapier (easier, more expensive), Make (middle ground). None require engineering skills to use for basic workflows.</p>

<h2>The compounding advantage</h2>
<p>Each system you build frees up time to build the next one. After 90 days of intentional system-building, the professionals who do this work estimate 8–12 hours per week of recovered time. That's more than a full workday — spent on the work only you can do.</p>
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
