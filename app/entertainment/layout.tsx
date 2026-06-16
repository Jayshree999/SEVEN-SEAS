import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top Nightclubs & Bars in Dubai | Baazigar & Vibe Nation',
  description: 'Discover Dubai\'s best nightlife at Seven Seas Hotel. Experience Baazigar, Vibe Nation, and Geoffrey\'s Resto Bar with premium drinks and electrifying music.',
  openGraph: {
    title: 'Entertainment & Nightlife | Seven Seas Hotel',
    description: 'Step into a world of excitement where sports, music, and premium drinks come together for an unforgettable time.',
    url: 'https://sevenseashotel.ae/entertainment',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Nightlife at Seven Seas Hotel',
      },
    ],
  },
}

export default function EntertainmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const entertainmentSchema = [
    {
      "@context": "https://schema.org",
      "@type": "NightClub",
      "name": "Vibe Nation",
      "description": "The ultimate destination for Afrobeats, Amapiano, Dancehall, and urban hits in Dubai.",
      "telephone": "+971 52 609 0739",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Seven Seas Hotel, Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "NightClub",
      "name": "Baazigar",
      "description": "Premier Indian nightlife destination featuring rhythm, luxury, and unforgettable memories.",
      "telephone": "+971 52 609 0739",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Seven Seas Hotel, Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BarOrPub",
      "name": "Geoffrey's Resto Bar",
      "description": "Your ultimate hangout spot blending live music, shisha, and refreshing drinks.",
      "telephone": "+971 52 609 0739",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Seven Seas Hotel, Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entertainmentSchema) }}
      />
      {children}
    </>
  )
}
