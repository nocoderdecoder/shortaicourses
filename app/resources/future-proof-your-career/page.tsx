import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'How to Future-Proof Your Career with AI',
  description: 'A practical plan for evaluating AI in your work, strengthening your judgment, and preparing for changing responsibilities.',
  alternates: { canonical: siteUrl('/resources/future-proof-your-career') },
}

export default function FutureProofCareerPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <nav style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>← Home</Link>
      </nav>

      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '14px' }}>
        AI Resources
      </p>

      <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.2 }}>
        How to Future-Proof Your Career with AI
      </h1>

      <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '40px' }}>
        A practical plan for evaluating AI in your work, strengthening your judgment, and preparing for changing responsibilities.
      </p>

      <div style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)' }}>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Where AI can help with recurring work
        </h2>

        <p style={{ marginBottom: '20px' }}>
          Start by looking at tasks rather than entire job titles. Repetitive parts of knowledge work are useful candidates for a small AI experiment, but their importance and difficulty vary from role to role.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Candidates include drafting, formatting, summarizing, first-pass research, generating options, and translating information between formats and audiences. There is no single time-saving estimate that applies to all of them. Measure a task with and without assistance, including the time spent checking and correcting the result.
        </p>

        <p style={{ marginBottom: '20px' }}>
          The useful question is where AI improves your own work at an acceptable level of quality. A workflow that helps someone else may add review time or introduce errors in your setting. Start with a reversible task and define what a good result looks like.
        </p>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Where your responsibility remains
        </h2>

        <p style={{ marginBottom: '20px' }}>
          Judgment, relationships, organizational context, and accountability deserve deliberate attention. AI can support parts of these activities, but you still need to decide what is appropriate and take responsibility for the result.
        </p>

        <p style={{ marginBottom: '20px' }}>
          AI can draft an email or suggest strategies, but it may be missing the history behind a relationship, an unstated constraint, or a commitment you have already made. Supply the relevant context, challenge its assumptions, and make the final decision yourself.
        </p>

        <p style={{ marginBottom: '20px' }}>
          No checklist can guarantee that a role will be protected from change. Strengthening your domain knowledge, relationships, and ability to evaluate evidence gives you more ways to contribute as tools and responsibilities evolve.
        </p>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Where professional value is shifting
        </h2>

        <p style={{ marginBottom: '20px' }}>
          A useful development plan combines three things: stronger domain judgment, reliable working relationships, and the ability to use AI where it produces a measurable improvement.
        </p>

        <p style={{ marginBottom: '20px' }}>
          If your role includes repetitive data formatting, status reporting, or first drafts, examine what happens before and after those steps. Can you improve the question being asked, find a data-quality problem, or help someone act on the result? Those are concrete ways to broaden your contribution.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Track outcomes beyond speed: fewer errors, clearer decisions, useful customer feedback, or less rework for colleagues. Faster output matters only if it meets the quality required by the task.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Evaluate each workflow on its merits. Keep the steps where assistance helps and retain human review where a mistake would matter.
        </p>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          What to do this week
        </h2>

        <p style={{ marginBottom: '12px' }}>
          Pick one recurring task in your job that takes 2+ hours and is mostly mechanical: drafting, formatting, researching, summarizing. Try doing it with AI assistance. Use the time you save to do one more thing that requires your actual judgment.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Record how long the task took, what you had to fix, and whether the result was useful. Repeat the experiment before deciding to make it a habit.
        </p>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          What to do this month
        </h2>

        <p style={{ marginBottom: '12px' }}>
          Learn one AI tool well enough that you would recommend it to a colleague. Not surface-level familiarity — actual fluency. Take a course. Spend a few hours figuring out what it is good at and what it is bad at for your specific kind of work.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Keep a short log of successful prompts, failures, and situations where manual work was better. Share a useful example with a colleague and compare notes on quality, not just speed.
        </p>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          What to do this quarter
        </h2>

        <p style={{ marginBottom: '12px' }}>
          Map your role. Write down the 10-15 main things you spend time on. For each one, ask: could AI do a meaningful part of this? If yes, are you already using it? If not, why not?
        </p>

        <p style={{ marginBottom: '12px' }}>
          Then identify the responsibilities where your context, relationships, or expertise make the biggest difference. Choose one to strengthen through a project, feedback from a colleague, or more focused practice.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Revisit the map as your tools and job change. Use it to guide a conversation with your manager about where to spend your time and which skills to develop next.
        </p>

        <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '20px', margin: '32px 0', fontStyle: 'normal' }}>
          <p style={{ fontSize: '17px', color: 'var(--text)', fontWeight: 500, lineHeight: 1.6 }}>
            Build a repeatable habit: try a useful task, check the result, measure the outcome, and adjust. Career preparation is an ongoing practice, not a guarantee against change.
          </p>
        </blockquote>

      </div>

      <div style={{ marginTop: '48px', padding: '28px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
          Start building those habits now
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          The AI Foundations and AI Productivity courses are the right starting point if you want practical skills that transfer to your actual job.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            href="/courses/ai-foundations-for-business"
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
            AI Foundations →
          </Link>
          <Link
            href="/courses/ai-for-productivity"
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
            AI Productivity Stack →
          </Link>
          <Link
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
          </Link>
        </div>
      </div>
    </div>
  )
}
