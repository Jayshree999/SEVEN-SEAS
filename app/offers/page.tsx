'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import ParallaxBanner from '@/components/ParallaxBanner'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const offers = [
  {
    id: 1,
    title: 'Early Bird Special',
    discount: '20% OFF',
    description: 'Book your stay 30 days in advance and enjoy a 20% discount on our best available rates. Perfect for planning ahead!',
    validUntil: 'December 31, 2024',
    terms: ['Minimum 2 nights stay', 'Non-refundable', 'Subject to availability'],
    link: '/rooms',
  },
  {
    id: 2,
    title: 'Weekend Getaway',
    discount: '15% OFF',
    description: 'Escape for the weekend and enjoy a 15% discount plus complimentary breakfast for two. Relax and recharge!',
    validUntil: 'December 31, 2024',
    terms: ['Friday & Saturday nights', 'Includes breakfast', 'Minimum 2 nights'],
    link: '/rooms',
  },
  {
    id: 3,
    title: 'Extended Stay',
    discount: '25% OFF',
    description: 'Stay 5 nights or more and receive a 25% discount plus exclusive benefits including late checkout and spa credit.',
    validUntil: 'December 31, 2024',
    terms: ['Minimum 5 nights', 'Includes spa credit', 'Late checkout available'],
    link: '/rooms',
  },
  {
    id: 4,
    title: 'Honeymoon Package',
    discount: 'Special Package',
    description: 'Celebrate your special occasion with our romantic honeymoon package including room upgrade, champagne, and spa treatment.',
    validUntil: 'December 31, 2024',
    terms: ['Minimum 3 nights', 'Room upgrade subject to availability', 'Includes champagne'],
    link: '/rooms',
  },
  {
    id: 5,
    title: 'Business Traveler',
    discount: 'Corporate Rate',
    description: 'Special rates for business travelers with complimentary WiFi, access to business center, and express checkout.',
    validUntil: 'Ongoing',
    terms: ['Corporate ID required', 'Complimentary WiFi', 'Business center access'],
    link: '/rooms',
  },
  {
    id: 6,
    title: 'Family Package',
    discount: 'Family Special',
    description: 'Perfect for families! Kids stay free, complimentary breakfast for children, and access to family-friendly facilities.',
    validUntil: 'December 31, 2024',
    terms: ['Kids under 12 stay free', 'Family room available', 'Includes kids breakfast'],
    link: '/rooms',
  },
]

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="SPECIAL OFFERS"
        subtitle="Exclusive Deals and Promotions"
        height="large"
        textPosition="center"
      />

      {/* Offers Banner Showcase */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Early Bird Special', description: 'Save 20% on advance bookings' },
              { id: 2, title: 'Weekend Getaway', description: 'Perfect weekend escape' },
              { id: 3, title: 'Extended Stay', description: 'Stay longer, save more' },
            ]}
            columns={3}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        title="Why Choose Our Offers"
        description="Discover the value and benefits of our special packages. From romantic getaways to business stays, find the perfect offer for your needs."
        position="center"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        title="Limited Time Offers"
        subtitle="Book now and enjoy exclusive benefits"
        height={300}
      />

      {/* Offers Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function OfferCard({ offer, index }: { offer: typeof offers[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-white border-2 border-black rounded-lg overflow-hidden group cursor-pointer h-full flex flex-col"
    >
      {/* Discount Badge */}
      <div className="bg-black text-white px-6 py-4 text-center">
        <div className="text-3xl font-bold mb-1">{offer.discount}</div>
        <div className="text-sm uppercase tracking-wider">{offer.title}</div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
          {offer.description}
        </p>

        <div className="mb-6">
          <div className="text-sm font-semibold text-black mb-2">Valid Until:</div>
          <div className="text-gray-600 text-sm">{offer.validUntil}</div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-semibold text-black mb-2">Terms & Conditions:</div>
          <ul className="space-y-1">
            {offer.terms.map((term, i) => (
              <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                <span className="text-black mt-1">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href={offer.link}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Book Now
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

