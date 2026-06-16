import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Venues & Wedding Halls in Dubai | Seven Seas Hotel',
  description: 'Celebrate your love in the heart of luxury. From breathtaking venues like the Mehfil Ballroom to impeccable details, we craft unforgettable weddings.',
  openGraph: {
    title: 'Weddings & Events | Seven Seas Hotel Dubai',
    description: 'Host your destination wedding or iconic city wedding at Seven Seas Hotel Dubai with world-class catering and majestic venues.',
    url: 'https://sevenseashotel.ae/weddings',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Weddings at Seven Seas Hotel',
      },
    ],
  },
}

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const eventVenueSchema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "name": "Mehfil Ballroom at Seven Seas Hotel",
    "description": "Luxurious wedding and event venue located in Seven Seas Hotel Dubai, ideal for parties, conferences, and seminars.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Seven Seas Hotel, Al Nahda 1",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "telephone": "+971 4 276 5555"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventVenueSchema) }}
      />
      {children}
    </>
  )
}
