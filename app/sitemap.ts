import { COURSES } from '@/lib/courses'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const courseRoutes = COURSES.flatMap(course => [
    {
      url: `https://shortaicourses.com/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...course.lessons.map(lesson => ({
      url: `https://shortaicourses.com/courses/${course.slug}/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ])
  return [
    { url: 'https://shortaicourses.com', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://shortaicourses.com/courses', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: 'https://shortaicourses.com/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: 'https://shortaicourses.com/glossary', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://shortaicourses.com/resources/ai-use-cases', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://shortaicourses.com/resources/future-proof-your-career', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: 'https://shortaicourses.com/resources/chatgpt-vs-claude', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    ...courseRoutes,
  ]
}
