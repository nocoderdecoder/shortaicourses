import { COURSES } from '@/lib/courses'
import { EmailForm } from './components/EmailForm'

const STATS = [
  { value: '4', label: 'Free courses' },
  { value: '15', label: 'Lessons' },
  { value: '< 40 min', label: 'Per course' },
  { value: '0', label: 'Coding required' },
]

const LEVEL_COLOR: Record<string, string> = {
  Beginner: '#059669',
  Intermediate: '#2563EB',
  Advanced: '#7C3AED',
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            background: 'var(--accent-light)',
            padding: '4px 12px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}>
            Free · No signup required · Business-focused
          </p>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text)',
            marginBottom: '20px',
          }}>
            AI courses you can finish<br />in your lunch break.
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '520px',
            margin: '0 auto 36px',
          }}>
            Short, practical AI courses for business professionals. No jargon. No coding. Just the skills that help you work faster and think sharper.
          </p>

          <a
            href="/courses"
            style={{
              display: 'inline-block',
              padding: '13px 28px',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Browse all courses →
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid var(--border)' }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ padding: '20px 28px', borderRight: '1px solid var(--border)' }}>
                <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: '2px' }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Start here
          </h2>
          <a href="/courses" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            All courses →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {COURSES.map((course) => (
            <a
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="card-lift"
              style={{
                display: 'block',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>
                  {course.category}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: LEVEL_COLOR[course.level] ?? 'var(--text-faint)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                }}>
                  {course.level}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '8px', lineHeight: 1.3 }}>
                {course.title}
              </h3>

              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '18px' }}>
                {course.tagline}
              </p>

              <div style={{ display: 'flex', gap: '14px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{course.lessonCount} lessons</span>
                <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{course.totalDuration}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '16px' }}>
            Why this exists
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '20px' }}>
            I'm a GTM strategist at Google and a Kellogg MBA. I built these courses because every AI resource I found was either for engineers or 40 hours long. Business professionals deserve something short, practical, and immediately useful.
          </p>
          <a href="/about" style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            More about this project →
          </a>
        </div>
      </section>

      {/* Email capture */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px' }}>
          New courses every month
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
          Get notified when new courses drop. One email per course, no spam.
        </p>
        <EmailForm />
      </section>
    </>
  )
}
