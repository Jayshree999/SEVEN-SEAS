import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Seven Seas Hotel Dubai',
  description: 'View the stunning photo gallery of Seven Seas Hotel Dubai. Explore our luxury rooms, rooftop pool, event venues, and fine dining restaurants.',
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
