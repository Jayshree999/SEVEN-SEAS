import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Seven Seas Hotel Dubai',
  description: 'Read the privacy policy of Seven Seas Hotel Dubai to understand how we collect, use, and protect your personal information.',
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
