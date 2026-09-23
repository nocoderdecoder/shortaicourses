import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '50 AI Use Cases for Business Professionals',
  description: 'Practical ways to use AI in the work you actually do. Organized by function, with tool recommendations for each.',
}

export default function AIUseCasesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <nav style={{ marginBottom: '32px' }}>
        <a href="/" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>← Home</a>
      </nav>

      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '14px' }}>
        AI Resources
      </p>

      <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.2 }}>
        50 AI Use Cases for Business Professionals
      </h1>

      <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '48px' }}>
        Practical ways to use AI in the work you actually do. Organized by function, with tool recommendations for each.
      </p>

      <Section title="Communication and Email">
        <UseCase
          title="First-draft emails"
          description="Describe what you need to say and to whom; get a draft that you edit into your voice."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Inbox triage and summarization"
          description="Paste a long email thread and ask for the key decision, current status, and any action items on your end."
          tool="Claude (handles long threads well)"
        />
        <UseCase
          title="Difficult message drafts"
          description="Feedback, rejection letters, negotiation responses — describe the situation and ask for a draft that is direct but not harsh."
          tool="Claude"
        />
        <UseCase
          title="Meeting agendas"
          description="Give the meeting goal and attendees; get a tight agenda with time allocations."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Slack and chat message polish"
          description="Paste a rough message; ask for a version that is clearer or more appropriate for the audience."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Email subject line variants"
          description="Give the body of the email; ask for 5 subject line options at different levels of formality."
          tool="ChatGPT"
        />
        <UseCase
          title="Internal announcement drafts"
          description="Policy changes, org updates, product launches — describe what changed and why; get a first draft."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Response to customer complaints"
          description="Paste the complaint; get a response that acknowledges the issue, addresses the concern, and closes cleanly."
          tool="Claude"
        />
        <UseCase
          title="Translating technical content for executives"
          description="Paste a technical document; ask for a version a non-technical executive can act on in under 2 minutes."
          tool="Claude"
        />
      </Section>

      <Section title="Research and Analysis">
        <UseCase
          title="Competitive research"
          description="Search for recent news, product updates, and positioning on a competitor; get a structured briefing."
          tool="Perplexity"
        />
        <UseCase
          title="Industry news digests"
          description="Ask for a summary of the past week's most relevant developments in your industry."
          tool="Perplexity"
        />
        <UseCase
          title="Document Q&A"
          description="Upload a report, contract, or policy; ask specific questions rather than reading the whole thing."
          tool="Claude or ChatGPT"
        />
        <UseCase
          title="Synthesizing multiple sources"
          description="Paste notes or excerpts from several articles; ask for the key themes, disagreements, and what remains unclear."
          tool="Claude (longer context)"
        />
        <UseCase
          title="Survey and feedback analysis"
          description="Paste raw open-text responses; ask for the top themes, with representative quotes for each."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Data analysis in browser"
          description="Upload a spreadsheet; ask for pivot tables, trend identification, or anomaly detection without writing code."
          tool="ChatGPT (Code Interpreter)"
        />
        <UseCase
          title="Decision frameworks"
          description="Describe a decision you face; ask for the key tradeoffs, what information you are missing, and what a skeptic would say."
          tool="Claude"
        />
        <UseCase
          title="Research plan creation"
          description="Describe what you need to decide and by when; ask for a structured research plan with sources and priority order."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Annual report analysis"
          description="Upload a competitor's annual report; ask what their stated priorities are, where they're investing, and what risks they acknowledge."
          tool="Claude"
        />
        <UseCase
          title="Interview prep research"
          description="Give a company name and role; get a briefing on the company, the function, and likely discussion topics."
          tool="Perplexity + ChatGPT"
        />
      </Section>

      <Section title="Content Creation">
        <UseCase
          title="Blog post first drafts"
          description="Give the thesis, intended audience, and 3-5 key points; get a draft that you rewrite into your voice."
          tool="Claude or ChatGPT"
        />
        <UseCase
          title="LinkedIn posts"
          description="Describe an insight, experience, or lesson; ask for a post that is direct and specific, not generic."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Presentation outlines"
          description="Give the goal, audience, and time; get a structured outline with recommended slide count per section."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Executive summaries"
          description="Paste a long document; ask for a one-page summary with the key finding, the supporting evidence, and the recommended action."
          tool="Claude"
        />
        <UseCase
          title="Case study drafts"
          description="Give the situation, what you did, and the outcome; ask for a structured draft in the standard problem-solution-result format."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Job descriptions"
          description="Give the role, team context, and what success looks like; get a draft JD that is specific rather than generic."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Social media image generation"
          description="Describe a concept or visual; get a clean illustration suitable for professional use."
          tool="DALL-E via ChatGPT"
        />
        <UseCase
          title="Editing for clarity"
          description="Paste any document; ask for edits that improve clarity and cut unnecessary words without changing the meaning."
          tool="Claude"
        />
        <UseCase
          title="Repurposing content across formats"
          description="Take a long article and ask for a LinkedIn post, a Twitter thread, and a one-paragraph summary from the same material."
          tool="ChatGPT or Claude"
        />
      </Section>

      <Section title="Meetings and Collaboration">
        <UseCase
          title="Meeting notes to action items"
          description="Paste rough notes; ask for a clean summary of decisions made and action items with owners."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Transcript summarization"
          description="Upload or paste a call transcript; ask for the key points, what each party committed to, and any open questions."
          tool="Claude or NotebookLM"
        />
        <UseCase
          title="Pre-meeting briefings"
          description="Give attendee names, companies, and the meeting goal; ask for relevant context and 3 questions worth asking."
          tool="Perplexity + ChatGPT"
        />
        <UseCase
          title="Workshop facilitation design"
          description="Give the goal, time, and number of participants; ask for a structured workshop agenda with activities and timing."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Retrospective analysis"
          description="Paste team retrospective notes; ask for patterns across the feedback and what the top 3 priorities should be."
          tool="Claude"
        />
        <UseCase
          title="Project status update drafts"
          description="Give bullet points on progress, risks, and next steps; ask for a clean status update in the format your organization uses."
          tool="ChatGPT or Claude"
        />
      </Section>

      <Section title="Sales and Business Development">
        <UseCase
          title="Pre-call prospect research"
          description="Give a name, title, and company; ask for what they likely care about, good questions to ask, and likely objections."
          tool="Perplexity + ChatGPT"
        />
        <UseCase
          title="Cold outreach drafts"
          description="Give specific context on the prospect and the problem you solve; ask for a 3-sentence email with subject line options."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Follow-up sequences"
          description="Ask for a 5-email sequence that adds new value at each touch rather than just following up."
          tool="ChatGPT"
        />
        <UseCase
          title="Objection responses"
          description="List your most common sales objections; ask for the underlying concern behind each and a response that addresses it directly."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Deal review and coaching"
          description="Describe the deal situation; ask a skeptical AI sales manager what the risks are and what the next move should be."
          tool="Claude"
        />
        <UseCase
          title="Proposal drafts"
          description="Give the client situation, what you are proposing, and why; ask for a structured proposal outline and draft."
          tool="Claude"
        />
        <UseCase
          title="CRM note generation"
          description="Paste rough call notes; ask for a clean CRM entry with situation, next steps, and risks."
          tool="ChatGPT or Claude"
        />
      </Section>

      <Section title="Operations and Planning">
        <UseCase
          title="Process documentation"
          description="Describe a process verbally; ask for a clean, step-by-step document a new hire could follow."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Job posting analysis"
          description="Paste competitor job postings; ask what they reveal about organizational structure, priorities, and where they are investing."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Budget narrative drafts"
          description="Give budget numbers and business context; ask for a narrative that explains the allocation and its rationale."
          tool="Claude"
        />
        <UseCase
          title="Project plan creation"
          description="Give the goal, deadline, and team; ask for a phased project plan with milestones and dependencies."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Risk identification"
          description="Describe a plan or initiative; ask for the top risks, what would cause it to fail, and what you can do about each."
          tool="Claude"
        />
        <UseCase
          title="Vendor evaluation frameworks"
          description="Give the use case and what matters most; ask for an evaluation framework with criteria and how to weight them."
          tool="ChatGPT or Claude"
        />
        <UseCase
          title="Forecast sanity checks"
          description="Describe your committed pipeline; ask for the reasons each deal might not close on time."
          tool="ChatGPT or Claude"
        />
      </Section>

      <div style={{ marginTop: '64px', padding: '28px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
          Go deeper on the tools behind these use cases
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          The ChatGPT for Work course covers the prompts and workflows behind many of these use cases in detail.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <a
            href="/courses/chatgpt-for-work"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            ChatGPT for Work →
          </a>
          <a
            href="/courses/ai-for-sales"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            AI for Sales →
          </a>
          <a
            href="/courses"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            All courses
          </a>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '20px', letterSpacing: '-0.02em', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </div>
  )
}

function UseCase({ title, description, tool }: { title: string; description: string; tool: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '15px' }}>{title}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}> — {description}</span>
        <span style={{ fontSize: '13px', color: 'var(--text-faint)', marginLeft: '6px' }}>({tool})</span>
      </div>
    </div>
  )
}
