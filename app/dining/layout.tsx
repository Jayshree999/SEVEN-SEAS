import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Restaurants & Fine Dining in Dubai | Seven Seas Hotel',
  description: 'Experience exquisite culinary delights at Seven Seas Hotel Dubai. Enjoy international cuisines, fine dining at Salt All Day Dining, and refreshing drinks at Geoffrey\'s Resto Bar.',
  openGraph: {
    title: 'Fine Dining & Restaurants | Seven Seas Hotel Dubai',
    description: 'A culinary legacy in Dubai. Taste expertly prepared seafood, international specialties, and authentic Kerala cuisine at Thamburuu.',
    url: 'https://sevenseashotel.ae/dining',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Fine Dining at Seven Seas Hotel',
      },
    ],
  },
}

export default function DiningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const restaurantsSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Salt All Day Dining",
      "description": "Exquisite fine dining offering an array of international dishes.",
      "telephone": "+971 4 276 5555",
      "servesCuisine": "International",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "231 Al Ittihad Road, Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Thamburuu Kerala Restaurant & Bar",
      "description": "Experience the true taste of Kerala with expertly prepared specialties.",
      "telephone": "+971 4 276 5555",
      "servesCuisine": "Indian, Kerala",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "231 Al Ittihad Road, Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantsSchema) }}
      />
      {children}
    </>
  )
}
