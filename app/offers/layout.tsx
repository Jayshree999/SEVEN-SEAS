import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Offers & Packages | Seven Seas Hotel Dubai',
  description: 'Discover special offers, Ramadan packages, and exclusive discounts for your stay at Seven Seas Hotel Dubai.',
}

export default function OffersSecondaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
