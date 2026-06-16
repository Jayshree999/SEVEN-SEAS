import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Luxury Spa & Fitness Center in Dubai | Behnah Spa',
  description: 'Rejuvenate your mind and body at Seven Seas Hotel Dubai. Our wellness services include Behnah Spa, a state-of-the-art gym, and Seven Unisex Salon.',
  openGraph: {
    title: 'Wellness & Spa | Seven Seas Hotel Dubai',
    description: 'A luxurious spa experience in the heart of Dubai, offering rejuvenating treatments that blend traditional techniques with modern wellness.',
    url: 'https://sevenseashotel.ae/wellness',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Wellness & Spa at Seven Seas Hotel',
      },
    ],
  },
}

export default function WellnessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const wellnessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Behnah Spa & Wellness Center",
    "description": "Luxurious spa and wellness center located inside Seven Seas Hotel offering massages, fitness facilities, and salon services.",
    "telephone": "+971 4 276 5555",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "231 Al Ittihad Road, Al Nahda 1",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wellness Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Behnah Spa Treatments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gym & Fitness"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Seven Unisex Salon"
          }
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wellnessSchema) }}
      />
      {children}
    </>
  )
}
