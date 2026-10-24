import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site'
import LabClient from './LabClient'
export const metadata: Metadata = {
  title: 'AI GTM Strategy Lab',
  description: 'Explore customer segments, positioning, growth experiments, and a 30-day go-to-market plan for your startup.',
  alternates: { canonical: siteUrl('/tools/gtm-strategy-lab') },
}
export default function Page() { return <LabClient /> }
