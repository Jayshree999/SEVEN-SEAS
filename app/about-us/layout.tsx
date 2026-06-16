import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Seven Seas Hotel | Our Story & Vision in Dubai',
  description: 'Learn about the Seven Seas Hotel Dubai, our core values, and Chairman Jitender Kumar Singla\'s vision for world-class hospitality in Al Nahda 1.',
  openGraph: {
    title: 'About Us | Seven Seas Hotel Dubai',
    description: 'Discover the epitome of comfort and elegance at Seven Seas Hotel. A destination where world-class service matches our guests\' high standards.',
    url: 'https://sevenseashotel.ae/about-us',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'About Seven Seas Hotel',
      },
    ],
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Hotel",
      "name": "Seven Seas Hotel",
      "description": "Global hospitality icon offering world-class service and elegance in Al Nahda 1, Dubai.",
      "founder": {
        "@type": "Person",
        "name": "Jitender Kumar Singla",
        "jobTitle": "Chairman"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Al Nahda 1",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  )
}
