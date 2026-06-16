import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Seven Seas Hotel Dubai',
  description: 'Review the terms and conditions for booking and staying at Seven Seas Hotel Dubai. Important information regarding your reservation.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
