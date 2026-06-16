import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meetings & Events | Seven Seas Hotel Dubai',
  description: 'Plan your next corporate event, meeting, or celebration at Seven Seas Hotel Dubai. We offer state-of-the-art facilities and personalized services.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
