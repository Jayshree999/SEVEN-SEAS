'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import PromoBanner from '@/components/PromoBanner'
import FeaturesSection from '@/components/FeaturesSection'
import GalleryPreview from '@/components/GalleryPreview'
import OffersSection from '@/components/OffersSection'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import ParallaxBanner from '@/components/ParallaxBanner'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import BackgroundVideo from '@/components/BackgroundVideo'

// Dynamically import 3D components to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      
      {/* Luxury Video Banner Section */}
      <VideoBanner
        title="Welcome to Luxury"
        subtitle="Experience Dubai's finest hospitality in the heart of the city"
        height="large"
        textPosition="center"
      />

      <PromoBanner />
      
      {/* Video Section */}
      <VideoSection
        title="Experience Seven Seas"
        description="Discover the elegance and sophistication that defines our hotel. From our luxurious accommodations to world-class dining, every moment is crafted to perfection."
        position="center"
      />

      <Scene3D />

      {/* Image Showcase */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              DISCOVER OUR WORLD
            </h2>
            <p className="text-xl text-gray-600">A glimpse into the Seven Seas experience</p>
          </div>
          <ImageGrid
            images={[
              { id: 1, title: 'Luxury Lobby', description: 'Grand entrance with elegant design' },
              { id: 2, title: 'Swimming Pool', description: 'Infinity pool with city views' },
              { id: 3, title: 'Fine Dining', description: 'Award-winning restaurants' },
              { id: 4, title: 'Spa & Wellness', description: 'Rejuvenating treatments' },
              { id: 5, title: 'Executive Lounge', description: 'Exclusive business facilities' },
              { id: 6, title: 'Rooftop Terrace', description: 'Stunning panoramic views' },
            ]}
            columns={3}
          />
        </div>
      </section>

      <FeaturesSection />

      {/* Video Section - Hotel Tour */}
      <VideoSection
        title="Take a Virtual Tour"
        description="Explore our hotel facilities, rooms, and amenities through this immersive video experience. See why Seven Seas is the perfect choice for your Dubai stay."
        position="left"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        title="Unforgettable Experiences Await"
        subtitle="Every moment at Seven Seas is crafted to perfection"
        height={400}
      />

      <GalleryPreview />
      
      {/* Video Section - Dining Experience */}
      <VideoSection
        title="Culinary Excellence"
        description="Watch our chefs create masterpieces in our award-winning restaurants. Experience the art of fine dining at its finest."
        position="right"
      />

      <OffersSection />
      <Testimonials />

      {/* Final Video Banner */}
      <VideoBanner
        title="Book Your Stay Today"
        subtitle="Experience the perfect blend of luxury and comfort"
        height="large"
        textPosition="center"
      />

      <CTA />
      <Footer />
    </main>
  )
}
