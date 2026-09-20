import type { Metadata } from 'next'
import { COURSES } from '@/lib/courses'

export const metadata: Metadata = {
  title: 'All Courses',
  description: 'Browse all free AI courses for business professionals. Short, practical, and jargon-free.',
}

const LEVEL_COLOR: Record<string, string> = {
  Beginner: '#059669',
  Intermediate: '#2563EB',
  Advanced: '#7C3AED',
}

export default function CoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '10px' }}>
          All Courses
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '10px' }}>
          Free AI courses for business professionals
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '560px' }}>
          Every course is designed to be finished in under 40 minutes. No prerequisites, no coding, no jargon.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {COURSES.map((course) => (
          <a
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="card-lift"
            style={{
              display: 'flex',
              flexDirection: 'column',
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

            <h2 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '8px', lineHeight: 1.3 }}>
              {course.title}
            </h2>

            <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '16px', flex: 1 }}>
              {course.tagline}
            </p>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>📚 {course.lessonCount} lessons</span>
              <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>⏱ {course.totalDuration}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
