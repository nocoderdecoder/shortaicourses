import Link from 'next/link'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SITE_ORIGIN } from '@/lib/site'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Short AI Courses — Free Practical AI for Business Professionals',
    template: '%s | Short AI Courses',
  },
  description: 'Free, short AI courses for business professionals. Finish a full course in your lunch break. No jargon, no coding required. No signup needed.',
  metadataBase: new URL(SITE_ORIGIN),
  openGraph: {
    siteName: 'Short AI Courses',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Nav() {
  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }} className="sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 min-h-14 py-3 flex flex-wrap gap-3 items-center justify-between">
        <Link href="/" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
          Short AI Courses
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-3 sm:gap-6">
          <Link href="/courses" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:opacity-70 transition-opacity">
            All Courses
          </Link>
          <Link href="/tools/ai-first-win" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>AI First Win</Link>
          <Link href="/tools/gtm-strategy-lab" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>GTM Lab</Link>
          <Link href="/about" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:opacity-70 transition-opacity">
            About
          </Link>
          <Link
            href="/courses"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: '6px',
              background: 'var(--accent)',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            Start Learning
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 24px' }}>
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>Short AI Courses</p>
          <p style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
            Free AI education for business professionals — by{' '}
            <a href="https://anshul.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Anshul Gupta
            </a>
          </p>
        </div>
        <div className="flex gap-5">
          <Link href="/courses" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>Courses</Link>
          <Link href="/about" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
          <a href="https://anshul.ai" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>anshul.ai</a>
        </div>
      </div>
    </footer>
  )
}
