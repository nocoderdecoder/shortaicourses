import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Anshul Gupta, GTM Strategy at Google',
  description: 'Anshul Gupta is a GTM strategist at Google and Kellogg MBA who built Short AI Courses to give business professionals practical AI education that fits in a lunch break.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Anshul Gupta',
            jobTitle: 'GTM Strategy',
            worksFor: { '@type': 'Organization', name: 'Google' },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Kellogg School of Management' },
            url: 'https://anshul.ai',
            sameAs: ['https://www.linkedin.com/in/anshul-gupta1/', 'https://anshul.ai'],
          }),
        }}
      />
      <nav style={{ marginBottom: '32px' }}>
        <a href="/" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>← Home</a>
      </nav>

      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '14px' }}>
        About this project
      </p>

      <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '28px', lineHeight: 1.2 }}>
        Free AI courses for business professionals, by Anshul Gupta.
      </h1>

      <div style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '20px' }}>
          I'm Anshul Gupta — GTM Strategy at Google, Kellogg MBA, and someone who has spent the past few years building AI products without a traditional engineering degree.
        </p>

        <p style={{ marginBottom: '20px' }}>
          When I started learning about AI, almost every resource I found was built for engineers. The ones built for business professionals were either surface-level blog posts or 40-hour certification programs that nobody actually finishes.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Short AI Courses is my attempt to fix that. Each course is designed to be finished in a single sitting — under 40 minutes — with content that is immediately applicable to your actual job. No prerequisites. No jargon. No coding.
        </p>

        <p style={{ marginBottom: '20px' }}>
          I've personally used everything I teach here in my own work at Google and in the AI products I've built. This isn't theory. It's what actually works for business professionals who want to use AI effectively without becoming engineers.
        </p>

        <p style={{ marginBottom: '40px' }}>
          Everything here is free. I believe AI literacy is quickly becoming a fundamental professional skill, and it should be accessible to everyone.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <a
          href="https://anshul.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '9px',
            textDecoration: 'none',
            fontSize: '14px',
            color: 'var(--text)',
            fontWeight: 500,
            width: 'fit-content',
          }}
        >
          Visit anshul.ai — my portfolio →
        </a>
        <a
          href="https://www.linkedin.com/in/anshul-gupta1/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '9px',
            textDecoration: 'none',
            fontSize: '14px',
            color: 'var(--text)',
            fontWeight: 500,
            width: 'fit-content',
          }}
        >
          Connect on LinkedIn →
        </a>
      </div>
    </div>
  )
}
