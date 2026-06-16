import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Location & Map | Seven Seas Hotel Dubai',
  description: 'Conveniently located in Al Nahda 1, Dubai. Get directions and explore nearby attractions like Dubai International Airport and the Stadium.',
}

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
