import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Seven Seas Hotel Dubai | Location & Support',
  description: 'Get in touch with Seven Seas Hotel in Al Nahda 1, Dubai. Find our contact details, map location, and easily reach out for reservations and inquiries.',
  openGraph: {
    title: 'Contact Us | Seven Seas Hotel Dubai',
    description: 'We are here to assist you. Contact Seven Seas Hotel for bookings, event inquiries, and more.',
    url: 'https://sevenseashotel.ae/contact',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Seven Seas Hotel',
      },
    ],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Hotel",
      "name": "Seven Seas Hotel",
      "telephone": "+971 55 100 9152",
      "email": "info@sevenseashotel.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "231 Al Ittihad Road, Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+971 55 100 9152",
          "contactType": "customer service",
          "email": "info@sevenseashotel.ae",
          "availableLanguage": ["English", "Arabic", "Hindi"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+971 55 100 9152",
          "contactType": "reservations",
          "email": "reservation@sevenseashotel.ae"
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  )
}
