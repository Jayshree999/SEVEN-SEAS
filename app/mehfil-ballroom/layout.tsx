import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mehfil Ballroom - Corporate Events & Weddings | Seven Seas Hotel',
  description: 'Book the Mehfil Ballroom for parties, celebrations, conferences, seminars, and weddings. Contemporary venue with customizable floor plans.',
}

export default function MehfilBallroomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
