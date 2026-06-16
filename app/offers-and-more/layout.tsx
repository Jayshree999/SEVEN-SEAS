import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Special Hotel Offers & Packages in Dubai | Seven Seas Hotel',
  description: 'Unlock special rates and enjoy premium benefits. Explore our Ramadan Offers, Breakfast Inclusive Rates, and long-stay discounts at Seven Seas Hotel Dubai.',
  openGraph: {
    title: 'Hotel Offers & Promotions | Seven Seas Hotel Dubai',
    description: 'Save up to 20% on your stay, enjoy exclusive member rates, and unlock luxury experiences with our loyalty program.',
    url: 'https://sevenseashotel.ae/offers-and-more',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Offers at Seven Seas Hotel',
      },
    ],
  },
}

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Seven Seas Hotel Special Offers",
    "description": "Exclusive promotions, long stay discounts, and Ramadan offers.",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ramadan Stay with Iftar and Suhoor"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Stay Longer & Save up to 20%"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Breakfast Inclusive Rates"
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      {children}
    </>
  )
}
