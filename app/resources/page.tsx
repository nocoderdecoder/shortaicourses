import Link from 'next/link'
import type { Metadata } from 'next'
import { RESOURCES } from '@/lib/resources'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Practical AI Resources for Business Professionals',
  description: 'Explore free AI workflow ideas, tool guides, career advice, and plain-English definitions alongside our short courses.',
  alternates: { canonical: siteUrl('/resources') },
}

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14 sm:py-16">
      <nav className="mb-8">
        <Link href="/" className="text-sm font-semibold no-underline" style={{ color: 'var(--accent)' }}>← Home</Link>
      </nav>
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Free guides</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: 'var(--text)' }}>
        Practical AI resources for work
      </h1>
      <p className="text-base sm:text-lg leading-relaxed max-w-2xl mb-10" style={{ color: 'var(--text-muted)' }}>
        Start with a task you want to improve, compare the tools that can help, or look up an unfamiliar term. Each guide connects back to a course you can try for free.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {RESOURCES.map(resource => (
          <Link
            key={resource.href}
            href={resource.href}
            className="card-lift block min-w-0 rounded-xl border p-5 sm:p-6 no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', outlineColor: 'var(--accent)' }}
          >
            <span className="block text-xs font-bold mb-3" style={{ color: 'var(--accent)' }}>{resource.category}</span>
            <h2 className="text-lg font-bold leading-snug mb-2" style={{ color: 'var(--text)' }}>{resource.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{resource.description}</p>
            <span className="inline-block text-sm font-semibold mt-4" style={{ color: 'var(--accent)' }}>Read guide →</span>
          </Link>
        ))}
      </div>
      <p className="mt-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        Prefer to learn step by step? <Link href="/courses" className="font-semibold" style={{ color: 'var(--accent)' }}>Browse the free courses</Link>.
      </p>
    </div>
  )
}
