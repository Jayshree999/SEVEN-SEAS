import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurants & Dining | Seven Seas Hotel Dubai',
  description: 'Explore the diverse restaurants at Seven Seas Hotel Dubai. Enjoy international cuisines, fine dining, and refreshing drinks.',
}

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
