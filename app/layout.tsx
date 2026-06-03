import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollToTop from '@/components/ScrollToTop'
import FloatingGoldParticles from '@/components/FloatingGoldParticles'
import { AuthProvider } from '@/contexts/AuthContext'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import PromotionPopup from '@/components/PromotionPopup'
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
  title: 'Seven Seas Hotel Dubai | Luxury 4-Star Hotel Near Airport | Premium Accommodations',
  description: 'Experience luxury at Seven Seas Hotel Dubai - Premier 4-star hotel near Dubai Airport with rooftop pool, spa, fitness center, halal dining, and world-class amenities. Book your stay today!',
  keywords: [
    'Seven Seas Hotel Dubai',
    'luxury hotel Dubai',
    '4 star hotel Dubai',
    'hotel near Dubai Airport',
    'Dubai hotel with spa',
    'Dubai hotel rooftop pool',
    'halal hotel Dubai',
    'business hotel Dubai',
    'family hotel Dubai',
    'Dubai hotel meeting facilities',
    'accessible hotel Dubai',
    'hotel with Indian restaurant Dubai',
    'Dubai International Airport hotel',
    'Al Qiyadah Dubai hotel',
    'Sharjah border hotel'
  ].join(', '),
  authors: [{ name: 'Seven Seas Hotel Dubai' }],
  metadataBase: new URL('https://sevenseashotel.ae'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Seven Seas Hotel Dubai - Luxury 4-Star Experience Near Airport',
    description: 'Premier luxury hotel in Dubai featuring rooftop pool, world-class spa, halal dining, fitness center, and exceptional service. 2.1 km from Dubai International Airport.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sevenseashotel.ae',
    siteName: 'Seven Seas Hotel Dubai',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Seven Seas Hotel Dubai - Luxury Accommodations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seven Seas Hotel Dubai | Luxury 4-Star Hotel',
    description: 'Experience Dubai luxury at Seven Seas Hotel - Rooftop pool, spa, halal dining & premium amenities near airport',
    images: ['/hero2.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo2.jpg',
    apple: '/logo2.jpg',
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: 'your-google-verification-code',
  },
  category: 'Hospitality',
  other: {
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai',
    'geo.position': '25.2795;55.3745', // Precise Al Nahda 1 coordinates
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD Structured Data for Hotel
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Seven Seas Hotel Dubai",
    "description": "Premier luxury hotel in Dubai featuring rooftop pool, world-class spa, halal dining, fitness center, and exceptional service near Dubai International Airport",
    "image": "https://sevenseashotel.ae/hero2.jpg",
    "url": "https://sevenseashotel.ae",
    "telephone": "+971 55 100 9152",
    "email": "info@sevenseashotel.ae",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "231 Al Ittihad Road, Al Qusais, Al Nahda 1",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2795",
      "longitude": "55.3745"
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "priceRange": "$$",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Rooftop Swimming Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Spa & Wellness Center",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Fitness Center",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Restaurant",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "24-hour Front Desk",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Business Center",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking",
        "value": true
      }
    ],
    "checkinTime": "15:00",
    "checkoutTime": "11:30",
    "petsAllowed": false,
    "smokingAllowed": false,
    "availableLanguage": ["en", "ar", "hi", "ur", "ru", "fr"]
  }

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KTTBKCGT');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1346903720826914');
fbq('track', 'PageView');`
          }}
        />
        {/* End Meta Pixel Code */}
  
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTTBKCGT"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        {/* End Google Tag Manager (noscript) */}

        {/* Meta Pixel Code (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1346903720826914&ev=PageView&noscript=1"
/>`
          }}
        />
        {/* End Meta Pixel Code (noscript) */}
        <Providers>
          <CurrencyProvider>
            <AuthProvider>
              <LoadingScreen />
              {children}
              <ScrollToTop />
              <WhatsAppWidget />
              <PromotionPopup />
              <Toaster position="top-right" richColors />
            </AuthProvider>
          </CurrencyProvider>
        </Providers>
      </body>
    </html>
  )
}

