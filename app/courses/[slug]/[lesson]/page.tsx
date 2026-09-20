import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { COURSES, getLesson } from '@/lib/courses'

type Props = { params: Promise<{ slug: string; lesson: string }> }

export async function generateStaticParams() {
  return COURSES.flatMap(c =>
    c.lessons.map(l => ({ slug: c.slug, lesson: l.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lesson: lessonSlug } = await params
  const found = getLesson(slug, lessonSlug)
  if (!found) return {}
  return {
    title: `${found.lesson.title} — ${found.course.title}`,
    description: found.lesson.summary,
  }
}

export default async function LessonPage({ params }: Props) {
  const { slug, lesson: lessonSlug } = await params
  const found = getLesson(slug, lessonSlug)
  if (!found) notFound()

  const { course, lesson, index } = found
  const prev = index > 0 ? course.lessons[index - 1] : null
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr min(700px, 100%) 1fr', minHeight: '80vh' }}>
      <div /> {/* left gutter */}
      <article style={{ padding: '48px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/courses" style={{ fontSize: '13px', color: 'var(--text-faint)', textDecoration: 'none' }}>Courses</a>
          <span style={{ color: 'var(--border)' }}>/</span>
          <a href={`/courses/${slug}`} style={{ fontSize: '13px', color: 'var(--text-faint)', textDecoration: 'none' }}>{course.title}</a>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Lesson {index + 1}</span>
        </nav>

        {/* Lesson header */}
        <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '10px' }}>
            Lesson {index + 1} of {course.lessonCount} · {lesson.duration}
          </p>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, color: 'var(--text)', marginBottom: '12px' }}>
            {lesson.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {lesson.summary}
          </p>
        </div>

        {/* Lesson content */}
        <div
          className="lesson-body"
          dangerouslySetInnerHTML={{ __html: lesson.body }}
        />

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: '56px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          <div>
            {prev && (
              <a
                href={`/courses/${slug}/${prev.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  padding: '14px 18px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '9px',
                  textDecoration: 'none',
                  maxWidth: '260px',
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: 600 }}>← Previous</span>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 600 }}>{prev.title}</span>
              </a>
            )}
          </div>
          <div>
            {next ? (
              <a
                href={`/courses/${slug}/${next.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  padding: '14px 18px',
                  background: 'var(--accent)',
                  borderRadius: '9px',
                  textDecoration: 'none',
                  maxWidth: '260px',
                  textAlign: 'right',
                }}
              >
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Next →</span>
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{next.title}</span>
              </a>
            ) : (
              <a
                href={`/courses/${slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  padding: '14px 18px',
                  background: 'var(--green)',
                  borderRadius: '9px',
                  textDecoration: 'none',
                  maxWidth: '260px',
                  textAlign: 'right',
                }}
              >
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Course complete!</span>
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>Back to course →</span>
              </a>
            )}
          </div>
        </nav>

        {/* Course sidebar teaser */}
        <aside style={{
          marginTop: '48px',
          padding: '20px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
        }}>
          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '12px' }}>
            {course.title}
          </p>
          {course.lessons.map((l, i) => (
            <a
              key={l.slug}
              href={`/courses/${slug}/${l.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                borderBottom: i < course.lessons.length - 1 ? '1px solid var(--border)' : 'none',
                textDecoration: 'none',
              }}
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: l.slug === lessonSlug ? 'var(--accent)' : 'var(--accent-light)',
                color: l.slug === lessonSlug ? '#fff' : 'var(--accent)',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <span style={{
                fontSize: '13px',
                color: l.slug === lessonSlug ? 'var(--text)' : 'var(--text-muted)',
                fontWeight: l.slug === lessonSlug ? 600 : 400,
              }}>
                {l.title}
              </span>
            </a>
          ))}
        </aside>

      </article>
      <div /> {/* right gutter */}
    </div>
  )
}
