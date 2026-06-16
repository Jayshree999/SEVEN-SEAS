import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Services | Seven Seas Hotel Dubai',
  description: 'Discover the exceptional services at Seven Seas Hotel Dubai. 24/7 room service, luggage storage, smart keys, and comprehensive hospitality.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
