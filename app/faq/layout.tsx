import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Seven Seas Hotel Dubai',
  description: 'Find answers to commonly asked questions about check-in times, amenities, booking policies, and more at Seven Seas Hotel Dubai.',
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
