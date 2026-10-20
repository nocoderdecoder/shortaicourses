import type { Metadata } from 'next'
import LabClient from './LabClient'
export const metadata: Metadata = {
  title: 'AI GTM Strategy Lab',
  description: 'Explore customer segments, positioning, growth experiments, and a 30-day go-to-market plan for your startup.',
}
export default function Page() { return <LabClient /> }
