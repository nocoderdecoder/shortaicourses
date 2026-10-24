import type { Metadata } from 'next'
import FirstWinClient from './FirstWinClient'

export const metadata: Metadata = {
  title: 'AI First Win — Try one useful business task',
  description: 'Find out whether AI could help with one business task, try a small supervised example, and get a draft you can review and edit. Free, with no signup.',
}

export default function Page() {
  return <FirstWinClient />
}
