import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Seven Seas Hotel Dubai',
  description: 'Learn about Seven Seas Hotel Dubai, our vision, and our commitment to luxury hospitality.',
}

export default function AboutSecondaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
