import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollToTop from '@/components/ScrollToTop'
import FloatingGoldParticles from '@/components/FloatingGoldParticles'
import { AuthProvider } from '@/contexts/AuthContext'
import { LuxuryChatbot } from '@/components/LuxuryChatbot'
import { Toaster } from 'sonner'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Seven Seas Hotel Dubai | Luxury 4 Star Hotel | Book Now',
  description: 'Experience luxury at Seven Seas Hotel Dubai. Premium rooms, world-class dining, spa facilities, and exceptional service in the heart of Dubai. Book your stay today.',
  keywords: 'Dubai hotel, luxury hotel Dubai, 4 star hotel Dubai, hotel booking Dubai, Seven Seas Hotel',
  authors: [{ name: 'Seven Seas Hotel Dubai' }],
  metadataBase: new URL('https://sevenseashotel.ae'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Seven Seas Hotel Dubai - Luxury 4 Star Experience',
    description: 'Experience luxury and elegance at Seven Seas Hotel Dubai',
    type: 'website',
    locale: 'en_US',
    url: 'https://sevenseashotel.ae',
    siteName: 'Seven Seas Hotel Dubai',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/logo2.jpg',
    apple: '/logo2.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <LoadingScreen />
            {/* Optimized: Only show particles on home page, removed from global layout */}
            {children}
            <ScrollToTop />
            <LuxuryChatbot />
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

