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
<p>There are hundreds of AI tools. You need to deeply understand four, and be aware of the rest.</p>
<p><strong>ChatGPT (OpenAI)</strong>: The most widely used. Strong across general tasks, has a vast plugin ecosystem, and has the largest user community, which means you can find answers to almost any workflow question. Good starting point for anyone new to AI.</p>
<p><strong>Claude (Anthropic)</strong>: Strongest for long documents, nuanced writing, and tasks that require careful reasoning. Handles very large context windows exceptionally well. Preferred by many writers and analysts.</p>
<p><strong>Gemini (Google)</strong>: Best Google Workspace integration. Useful if you live in Google Docs, Gmail, and Sheets. The only major model with deep, native access to your Google data.</p>
<p><strong>Perplexity</strong>: The only major AI tool designed from the ground up for research. Cites sources, searches the web in real-time, and is dramatically more reliable than the others for factual questions.</p>

<h2>Specialist tools worth knowing</h2>
<p>Beyond the big four, specific categories are maturing fast:</p>
<ul>
  <li><strong>NotebookLM</strong> (Google): Feed it documents and it becomes an expert on them. Excellent for competitive research, reading large reports, or analyzing transcripts.</li>
  <li><strong>Midjourney / DALL-E</strong>: Image generation. Useful for presentations, marketing assets, and ideation.</li>
  <li><strong>ElevenLabs</strong>: Voice cloning and text-to-speech at production quality.</li>
  <li><strong>Otter.ai / Fireflies</strong>: Meeting transcription and AI summaries.</li>
</ul>

<h2>How to choose</h2>
<p>Do not pick one and stick with it. Use different tools for different tasks, the same way you use different apps on your phone. Professionals who try to do everything in one AI tool consistently get worse results than those who match the tool to the job.</p>
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
    totalDuration: '32 min',
    lessonCount: 4,
    level: 'Beginner',
    category: 'Skills',
    lessons: [
      {
        slug: 'why-most-prompts-fail',
        title: 'Why Most Prompts Fail',
        duration: '8 min',
        summary: 'The two mistakes that cause 80% of bad AI outputs.',
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
        duration: '7 min',
        summary: 'Copy-paste templates for the tasks you do every week.',
        body: `
<p>These templates are starting points, not scripts. Fill in the brackets with your specifics, and adjust the tone and length to match your situation. The structure is what matters: role, task, context, format, all in one place.</p>

<h2>Before a meeting</h2>
<p><code>I have a meeting with [name/role] from [company] in [X] days. The purpose is [goal]. Here is what I know about them: [LinkedIn summary, recent news, prior conversations]. Give me: (1) 3 talking points that position me well for my goal, (2) 3 questions that show I have done my homework, (3) 2 likely objections and how to handle them.</code></p>

<h2>Summarizing a long document</h2>
<p><code>Here is a [report/transcript/article]. I am [your role] and I need to understand [what matters to you specifically]. Give me: (1) the three most important points for someone in my position, (2) one thing I should act on, (3) one risk or concern I should be aware of.</code></p>

<h2>Writing a first draft</h2>
<p><code>Write a first draft of [document type] for [audience]. The purpose is to [goal]. Key points to include: [bullet list]. Tone: [professional/conversational/persuasive]. Length: approximately [X] words. Do not include: [anything to avoid].</code></p>

<h2>Evaluating a decision</h2>
<p><code>I am considering [decision]. My goal is [goal]. Constraints: [list constraints]. Act as a thoughtful advisor who is skeptical of my instincts. Give me: (1) the three strongest reasons to proceed, (2) the three strongest reasons not to, (3) what additional information you would want before deciding, (4) your overall recommendation.</code></p>

<h2>Giving feedback on writing</h2>
<p><code>Review the following [document type] and give feedback from the perspective of [target audience]. Be direct. Tell me: (1) what is working, (2) what is unclear or weak, (3) the single most important change I should make.</code></p>
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
<p>Custom instructions are a persistent system prompt that applies to every conversation. Go to Settings &gt; Personalization &gt; Custom instructions. There are two fields:</p>
<p><strong>"What would you like ChatGPT to know about you?"</strong> — Put your role, your industry, your audience, and what you actually do. Example: "I'm a VP of Marketing at a 200-person B2B SaaS company. My audience is mid-market CFOs and IT buyers. I manage a team of 6 and report to the CEO."</p>
<p><strong>"How would you like ChatGPT to respond?"</strong> — Put your style preferences. Example: "Be direct and concise. No bullet points unless I ask for them. No filler phrases. If you're uncertain, say so. Recommend an approach rather than listing options."</p>
<p>This alone makes ChatGPT dramatically more useful for your specific situation.</p>

<h2>Memory</h2>
<p>ChatGPT can remember things across conversations. Go to Settings &gt; Personalization &gt; Memory and turn it on. Then in any conversation, you can say "remember that I prefer..." or "remember that my company does X." Check what it has saved periodically under Settings &gt; Manage memory — it sometimes saves things you did not intend.</p>

<h2>GPT-4o vs the default</h2>
<p>The free plan uses a capped version of the model. The paid plan (ChatGPT Plus, $20/month) gives you full GPT-4o access, DALL-E image generation, code execution, and web search. For professional use, the paid plan pays for itself on the first day.</p>

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
<p>For real-time facts, use Perplexity. For document analysis, use NotebookLM. ChatGPT's research value is in synthesis and structuring, not in retrieval.</p>

<h2>Where ChatGPT genuinely helps in research</h2>
<p><strong>Framing a research question:</strong> "I need to understand [topic] for [purpose]. What are the most important questions I should be trying to answer? What frameworks exist for thinking about this?"</p>
<p><strong>Synthesizing content you paste:</strong> "Here are notes from 5 articles on [topic]. Synthesize the key themes, where sources agree, and where they conflict." — Paste your notes. The model is excellent at this.</p>
<p><strong>Identifying what you don't know:</strong> "Based on this analysis, what am I missing? What would a skeptic push back on? What should I research further?"</p>
<p><strong>Building a research plan:</strong> "I need to make a decision about [topic] by [date]. What information do I need, in what order should I gather it, and where would I find it?"</p>

<h2>Analysis workflows that work</h2>
<p><strong>Competitor analysis:</strong> Paste competitor website copy, job postings, or press releases and ask: "What does this tell me about their strategy? What are they prioritizing? What are they not saying?"</p>
<p><strong>Survey or feedback analysis:</strong> Paste raw responses and ask: "Identify the top 5 themes. Quote specific language customers use for each theme. What do they want that they're not getting?"</p>
<p><strong>Decision analysis:</strong> "I'm deciding between [A] and [B]. Here is my situation: [context]. Act as a skeptical advisor. What are the three strongest arguments for each option? What am I not considering?"</p>

<h2>Code interpreter for data</h2>
<p>ChatGPT Plus users can upload spreadsheets and let the model run Python on your data. This is useful for: quick pivot tables, visualizing trends, finding patterns in survey data, and cleaning messy datasets. It is not a replacement for a data analyst, but it handles a surprising range of one-off analysis tasks.</p>
        `,
      },
      {
        slug: 'chatgpt-advanced-workflows',
        title: 'Advanced ChatGPT Workflows',
        duration: '9 min',
        summary: 'DALL-E, web search, file uploads, and building workflows that run repeatedly.',
        body: `
<h2>Web search: when to use it</h2>
<p>ChatGPT can search the web in real-time (in the paid plan). Enable it by clicking the search icon or asking ChatGPT to "search for" something. Use this for: current events, recent news about a company, today's prices or statistics, anything where recency matters.</p>
<p>Do not use web search for deep research. It retrieves a few sources quickly, not a comprehensive view. For serious research, Perplexity is purpose-built for this and does it better.</p>

<h2>File uploads: the most underused feature</h2>
<p>You can upload PDFs, Word documents, Excel files, images, and more. ChatGPT reads them and can answer questions, summarize, compare, or extract specific information. Useful patterns:</p>
<ul>
  <li>Upload a contract and ask: "What are the key obligations on our side? What are the termination clauses? Are there any non-standard terms I should flag?"</li>
  <li>Upload a competitor's annual report and ask: "What are their stated priorities for next year? What risks do they cite? What does this tell me about where they're investing?"</li>
  <li>Upload meeting notes and ask: "What decisions were made? Who owns what? What questions are still open?"</li>
</ul>

<h2>DALL-E for professional use</h2>
<p>ChatGPT Plus includes DALL-E image generation. Practical uses that save real time:</p>
<ul>
  <li>Presentation mockups: "Generate a simple illustration of [concept] suitable for a business presentation, clean lines, white background."</li>
  <li>Social media visuals: "Create a professional-looking graphic that shows [data/concept], minimal style."</li>
  <li>Concept visualization: show a stakeholder what you have in mind before you spend design budget on it.</li>
</ul>
<p>DALL-E is not good at text in images, complex layouts, or realistic photographs. Use it for conceptual and illustrative work.</p>

<h2>Building reusable workflows</h2>
<p>If you run the same type of task repeatedly, write it as a reusable prompt template and save it somewhere you can copy from. Candidates: weekly status report, meeting prep, competitor scan, customer email response. Each should include Role, Task, Context placeholders, and Format — fill in the variables each time and paste. Two minutes of setup saves the same two minutes every single week.</p>
        `,
      },
    ],
  },
  {
    slug: 'ai-for-sales',
    title: 'AI for Sales Professionals',
    tagline: 'Use AI across the full sales cycle without losing the human element that closes deals.',
    description: 'A practical guide to using AI in prospecting, research, outreach, objection handling, and pipeline management — without turning your sales process into something that feels automated and impersonal.',
    totalDuration: '34 min',
    lessonCount: 4,
    level: 'Intermediate',
    category: 'Business Functions',
    lessons: [
      {
        slug: 'ai-for-prospect-research',
        title: 'AI for Prospect Research',
        duration: '8 min',
        summary: 'Build a complete picture of any prospect in 5 minutes instead of 45.',
        body: `
<h2>The research problem in sales</h2>
<p>Good sales conversations require context: who you're talking to, what their company is doing, what pressures they're under, and what they care about. Gathering that context manually takes 30-45 minutes per prospect and often still misses things. AI compresses that to 5 minutes and often surfaces angles you would not have found.</p>

<h2>The pre-call research prompt</h2>
<p>Before any significant sales call, run this: "I'm meeting [name], [title] at [company] in [X] days. Here's what I know about them: [paste LinkedIn bio or brief description]. My product does [X]. Give me: (1) what they likely care about most in their role, (2) 3 intelligent questions I can ask that show I understand their business, (3) the business pressures their company is probably under right now, (4) any likely objections to [your product category]."</p>
<p>Use Perplexity for the company context first — recent news, earnings calls if public, any press releases. Paste that into ChatGPT along with the LinkedIn profile. The combination of recent news plus role context produces prep that used to take an hour.</p>

<h2>Researching the account, not just the contact</h2>
<p>One person rarely buys. Ask ChatGPT: "For a [company size] company in [industry] buying [your product category], who are typically the stakeholders involved in the decision? What does each one care about most?" Then research each stakeholder separately. Walking into a deal knowing what the CFO, the IT lead, and the end user each want — before they're in the room — is a significant edge.</p>

<h2>Monitoring accounts for trigger events</h2>
<p>Use Perplexity to set up ongoing searches for key accounts. Leadership changes, funding rounds, new product launches, regulatory changes in their industry — these are trigger events that create buying opportunities. A company that just raised a Series B is actively spending. A company that just appointed a new CTO is reassessing its tech stack. Know before you call.</p>
        `,
      },
      {
        slug: 'ai-for-outreach-and-prospecting',
        title: 'AI for Outreach and Prospecting',
        duration: '9 min',
        summary: 'Write outreach that gets responses, at scale, without sounding like a template.',
        body: `
<h2>Why most AI-generated outreach fails</h2>
<p>The promise of AI-generated outreach is personalization at scale. The reality, for most teams, is generic messages that feel like templates because the AI had no real information about the recipient. "I noticed your company is growing fast" is not personalization. It is the illusion of it.</p>
<p>AI generates good outreach when you give it real, specific information. The input quality determines the output quality. Garbage in, garbage out is never more true than in sales emails.</p>

<h2>The right input for outreach generation</h2>
<p>For each prospect, gather at minimum: their recent LinkedIn activity or posts, one piece of recent company news, and the specific business problem you believe they have. Then prompt: "Write a 3-sentence cold email to [name] at [company]. Context: [what you know about them]. The email should reference [specific thing] and connect it to [the problem we solve]. End with a low-friction ask — a 15-minute call, not a demo. No subject line yet."</p>
<p>Then ask: "Now write 3 subject line options. Short, specific, no hype."</p>

<h2>Follow-up sequences</h2>
<p>Most sales require 5-8 touches before a response. AI makes it easy to write a full sequence at once: "Write a 5-email follow-up sequence for someone who received the first email but did not respond. Each email should: add new value (don't just follow up for the sake of it), be shorter than the previous, and shift the framing slightly. Emails 3 and 4 should approach from a different angle than emails 1 and 2."</p>

<h2>A/B testing your messages</h2>
<p>Give ChatGPT your best-performing message and ask: "Generate 3 variants that test different opening hooks, while keeping the core value proposition the same." Run the variants in your sequencing tool and let performance data tell you what's working. Iterate from results, not from opinions.</p>
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
<p>When a deal is stalled or you are trying to figure out your next move, paste everything you know about the deal into ChatGPT: the company, the contacts, what's been said, where it stands, and what you have tried. Then ask: "Act as a skeptical sales manager reviewing this deal. What are the red flags? What information am I missing that I should have by now? What's the most likely reason this deal doesn't close, and what should my next move be?"</p>
<p>The model pushes back on optimistic assumptions in ways that a busy manager often cannot take time to do. It is particularly good at identifying what you do not know — which is usually what kills deals.</p>

<h2>Call analysis from transcripts</h2>
<p>If you record and transcribe sales calls (Otter, Gong, Fireflies), paste the transcript and ask: "What did the prospect care about most based on this conversation? What did they not say that I should have asked about? What are the key next steps I committed to? What objections came up that I didn't fully handle?" Run this after every call you want to improve on. It is better than a manager listening to your calls because it has no agenda.</p>
        `,
      },
      {
        slug: 'ai-for-pipeline-and-forecasting',
        title: 'AI for Pipeline Management and Forecasting',
        duration: '8 min',
        summary: 'Keep your CRM cleaner and your forecasts more honest with less manual work.',
        body: `
<h2>The CRM problem AI solves</h2>
<p>CRMs are only as good as the data in them, and sales reps do not like entering data. The result: stale records, missing context, and forecasts built on incomplete information. AI does not solve the willingness problem, but it reduces the friction enough that more data actually gets captured.</p>

<h2>CRM updates from call notes</h2>
<p>After a call, paste your rough notes and ask: "Summarize this as a CRM note. Include: (1) what was discussed, (2) what the prospect's current situation is, (3) what they said about timing and budget, (4) agreed next steps with owners and dates, (5) any risks or concerns." Copy the output directly into your CRM. What used to take 10 minutes of formatting takes 2.</p>

<h2>Pipeline review prompts</h2>
<p>Export your pipeline to a spreadsheet, paste the key fields into ChatGPT, and ask: "Based on this pipeline, which deals look most at risk? Which have been in the current stage too long? What does the overall mix tell me about where I should focus this week?" The model identifies patterns across many deals that are easy to miss when you review them one at a time.</p>

<h2>Forecast sanity checks</h2>
<p>Before submitting your forecast, describe your committed deals to ChatGPT — stage, value, close date, what you know about the buyer — and ask: "What are the reasons each of these deals might not close when I think they will? What information would I need to be more confident?" Use the pushback to stress-test your number before it goes up the chain. Forecasting accuracy improves when you argue against your own optimism before you report it.</p>
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
        summary: 'Use AI across the full meeting lifecycle to show up prepared and follow through faster.',
        body: `
<h2>Why meetings are such a good target</h2>
<p>Meetings are high-stakes and time-consuming, but much of the surrounding work, prep, note-taking, and follow-up, is mechanical. AI can handle the mechanical parts without touching the parts that actually require you: the conversation, the judgment, the relationship.</p>

<h2>Before: preparation that used to take an hour</h2>
<p>Good pre-meeting prep has a predictable structure: understand who you are meeting, know what they care about, prepare your key points, and anticipate what they will push back on. AI can do most of that work in 2 minutes.</p>
<p>The prompt: "I am meeting [name/role] from [company] to discuss [topic]. Here is what I know about them: [paste LinkedIn bio, recent posts, or a short description]. My goal for the meeting is [goal]. Give me: the 3 things they are most likely to care about, 3 questions I can ask that show I have done my homework, and 2 objections I should be ready for."</p>
<p>Run this before every significant meeting. The quality of your conversations will visibly improve within a week.</p>

<h2>During: note-taking without distraction</h2>
<p>Use a transcription tool such as Otter.ai or Fireflies to record the conversation (with permission). Let the tool handle the verbatim capture. Your job during the meeting is to be present, ask good questions, and notice things a transcript will miss.</p>
<p>Do not try to take comprehensive notes manually and also be engaged at the same time. You will do both poorly.</p>

<h2>After: follow-up in 5 minutes</h2>
<p>Paste your transcript or rough notes and run this prompt: "Here are my notes from a meeting with [who] about [topic]. Summarize: (1) what was decided, (2) who is doing what and by when, (3) what I said I would follow up on, (4) any open questions or risks that came up. Format as a short email I can send to the attendees."</p>
<p>Edit for accuracy, add anything the transcript missed, and send. The meeting follow-up that used to take 20 minutes now takes 3.</p>
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
