import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { COURSES, getCourse } from '@/lib/courses'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return COURSES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) return {}
  return {
    title: `${course.title}: Free ${course.level} Course for Business Professionals`,
    description: `${course.description} Free, no signup required. Finish in ${course.totalDuration}.`,
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: course.title,
              description: course.description,
              provider: {
                '@type': 'Person',
                name: 'Anshul Gupta',
                url: 'https://anshul.ai',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              educationalLevel: course.level,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Courses', item: 'https://shortaicourses.com/courses' },
                { '@type': 'ListItem', position: 2, name: course.title, item: `https://shortaicourses.com/courses/${slug}` },
              ],
            },
          ]),
        }}
      />
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '28px' }}>
        <a href="/courses" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>
          ← All courses
        </a>
      </nav>

      {/* Course header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '12px' }}>
          {course.category} · {course.level}
        </p>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--text)', marginBottom: '16px' }}>
          {course.title}
        </h1>
        <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '560px' }}>
          {course.description}
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-faint)' }}>📚 {course.lessonCount} lessons</span>
          <span style={{ fontSize: '13px', color: 'var(--text-faint)' }}>⏱ {course.totalDuration} total</span>
          <span style={{ fontSize: '13px', color: 'var(--text-faint)' }}>✓ Free</span>
          <span style={{ fontSize: '13px', color: 'var(--text-faint)' }}>✓ No signup needed</span>
        </div>
      </div>

      {/* Start CTA */}
      <div style={{ marginBottom: '48px' }}>
        <a
          href={`/courses/${slug}/${course.lessons[0].slug}`}
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          Start first lesson →
        </a>
      </div>

      {/* Lessons list */}
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '16px' }}>
          Lessons in this course
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {course.lessons.map((lesson, i) => (
            <a
              key={lesson.slug}
              href={`/courses/${slug}/${lesson.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '10px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              className="hover:opacity-80"
            >
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>
                  {lesson.title}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                  {lesson.summary}
                </p>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-faint)', flexShrink: 0 }}>
                {lesson.duration}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
