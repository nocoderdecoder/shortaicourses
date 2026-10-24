import { COURSES } from '@/lib/courses'
import { siteUrl } from '@/lib/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: siteUrl('/courses'), changeFrequency: 'weekly', priority: 0.9 },
    { url: siteUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: siteUrl('/resources'), changeFrequency: 'monthly', priority: 0.8 },
    { url: siteUrl('/glossary'), changeFrequency: 'monthly', priority: 0.7 },
    { url: siteUrl('/resources/ai-use-cases'), changeFrequency: 'monthly', priority: 0.7 },
    { url: siteUrl('/resources/future-proof-your-career'), changeFrequency: 'monthly', priority: 0.6 },
    { url: siteUrl('/resources/chatgpt-vs-claude'), changeFrequency: 'monthly', priority: 0.6 },
    { url: siteUrl('/tools/gtm-strategy-lab'), changeFrequency: 'monthly', priority: 0.6 },
  ]
  const courseRoutes: MetadataRoute.Sitemap = COURSES.flatMap(course => [
    { url: siteUrl(`/courses/${course.slug}`), changeFrequency: 'weekly', priority: 0.8 },
    ...course.lessons.map(lesson => ({
      url: siteUrl(`/courses/${course.slug}/${lesson.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ])
  return [...staticRoutes, ...courseRoutes]
}
