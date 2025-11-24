'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="SERVICES"
        subtitle="Comprehensive amenities for your comfort"
        height="large"
        textPosition="center"
      />

      {/* Services Showcase */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Spa & Wellness', description: 'Rejuvenating treatments' },
              { id: 2, title: 'Business Center', description: 'Professional facilities' },
              { id: 3, title: 'Fitness Center', description: 'State-of-the-art equipment' },
              { id: 4, title: 'Concierge', description: '24/7 assistance' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        title="Our Premium Services"
        description="Experience our comprehensive range of services designed to make your stay exceptional. From 24/7 concierge to world-class spa treatments, we cater to your every need."
        position="center"
      />

      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-xl text-gray-600 mb-8">
            For detailed services information, please visit our{' '}
            <Link href="/restaurant" className="underline font-semibold hover:text-black">
              Restaurant & Services
            </Link>{' '}
            page.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

