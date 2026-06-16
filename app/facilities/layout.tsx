import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Facilities & Amenities | Seven Seas Hotel Dubai',
  description: 'Explore the world-class facilities at Seven Seas Hotel Dubai, including a rooftop pool, luxury spa, 24/7 gym, and fine dining restaurants.',
}

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
