export const SITE_ORIGIN = 'https://www.shortaicourses.com'

export function siteUrl(path = '/'): string {
  return new URL(path, SITE_ORIGIN).toString()
}
