import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Luxury Rooms & Suites in Dubai | Seven Seas Hotel',
  description: 'Discover luxury and comfort at Seven Seas Hotel Dubai. Choose from our Premium King, Executive Suites, and Royal Suites with stunning city and sea views.',
  openGraph: {
    title: 'Luxury Rooms & Suites | Seven Seas Hotel Dubai',
    description: 'Experience unparalleled comfort in our luxurious rooms and suites, featuring modern amenities and breathtaking views.',
    url: 'https://sevenseashotel.ae/rooms',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Rooms at Seven Seas Hotel Dubai',
      },
    ],
  },
}

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const roomsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "LodgingBusiness",
          "name": "Premium King Room",
          "description": "A luxurious king bed room featuring a spacious layout."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "LodgingBusiness",
          "name": "Executive Suite",
          "description": "Perfect blend of luxury and comfort, featuring a spacious living area and stunning skyline views."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "LodgingBusiness",
          "name": "Royal Suite",
          "description": "The Presidential Suite is the hotel's largest and most luxurious room."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomsSchema) }}
      />
      {children}
    </>
  )
}
