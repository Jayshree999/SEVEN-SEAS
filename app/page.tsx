'use client'

import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import GalleryPreview from '@/components/GalleryPreview'
import OffersSection from '@/components/OffersSection'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import ParallaxBanner from '@/components/ParallaxBanner'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import BackgroundVideo from '@/components/BackgroundVideo'
import LuxuryBadge from '@/components/LuxuryBadge'
import AnimatedCounter from '@/components/AnimatedCounter'
import ExploreMore from '@/components/ExploreMore'
import SignatureDining from '@/components/SignatureDining'
import EventsConferences from '@/components/EventsConferences'
import AmenitiesGallery from '@/components/AmenitiesGallery'
import RoveeArabicCuisine from '@/components/RoveeArabicCuisine'
import NightlifeSection from '@/components/NightlifeSection'
import OasisRooftopPoolbar from '@/components/OasisRooftopPoolbar'
import BrandsOutlets from '@/components/BrandsOutlets'
import AccommodationSection from '@/components/AccommodationSection'
import NewsEvents from '@/components/NewsEvents'
import HotelPolicies from '@/components/HotelPolicies'
import SmartFeatures from '@/components/SmartFeatures'
import ImageCarousel from '@/components/ImageCarousel'

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

      {/* Luxury Stats Banner - Enhanced with better animations */}
      {/* Luxury Stats Banner - Enhanced with Glassmorphism */}
      <motion.section
        className="relative py-16 md:py-24 px-4 sm:px-6 -mt-20 z-30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-7xl">
          {/* Dark Glass Card for better text contrast/visibility on all backgrounds */}
          <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-14 relative z-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-md" style={{ fontFamily: 'var(--font-playfair)' }}>
                EXCELLENCE IN NUMBERS
              </h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-4" />
              <p className="text-gray-200 text-sm md:text-base tracking-wider uppercase">Our commitment to luxury and service</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {[
                { value: 150, suffix: '+', label: 'Luxury Rooms', delay: 0 },
                { value: 10, suffix: '+', label: 'Years Excellence', delay: 0.1 },
                { value: 50, suffix: 'K+', label: 'Happy Guests', delay: 0.2 },
                { value: 4.8, suffix: '', label: 'Average Rating', delay: 0.3 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group relative text-center p-6"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10" />

                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-light text-amber-400 mb-2 font-serif group-hover:scale-110 transition-transform duration-500" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="h-px w-12 bg-white/20 mx-auto mb-3 group-hover:w-20 transition-all duration-500" />
                    <div className="text-xs md:text-sm text-gray-300 uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>


      {/* Accommodation Section - Now with Carousel */}
      <AccommodationSection />

      {/* Brands & Outlets Section */}
      <BrandsOutlets />

      {/* Smart Features Section - New from website */}
      <SmartFeatures />

      {/* Explore More Section */}
      <ExploreMore />

      {/* Signature Dining Section */}
      <SignatureDining />

      {/* Events & Conferences Section */}
      <EventsConferences />

      {/* Rovee Arabic Cuisine Section */}
      <RoveeArabicCuisine />

      {/* Amenities Gallery Section - Commented out */}
      {/* <AmenitiesGallery /> */}

      {/* Nightlife Section */}
      <NightlifeSection />

      {/* Oasis Rooftop Poolbar Section */}
      <OasisRooftopPoolbar />

      {/* Luxury Video Banner Section */}
      <div style={{ marginTop: '-200px', marginBottom: '-200px' }}>
        <VideoBanner
          title="Welcome to Luxury"
          subtitle="Experience Dubai's finest hospitality in the heart of the city"
          height="large"
          textPosition="center"
        />
      </div>



      {/* Image Showcase - Enhanced with Carousel */}
      <motion.section
        className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background decorative elements - clean and minimal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gray-100 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 md:mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              DISCOVER OUR WORLD
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A glimpse into the Seven Seas experience
            </motion.p>
          </motion.div>
          <ImageCarousel
            items={[
              {
                id: 1,
                image: '/hero2.jpg',
                title: 'Luxury Lobby',
                description: 'Grand entrance with elegant design and world-class hospitality'
              },
              {
                id: 2,
                image: '/DSC02661-2048x1365.jpg',
                title: 'Swimming Pool',
                description: 'Infinity pool with breathtaking city views and premium amenities'
              },
              {
                id: 3,
                image: '/019A3962-Enhanced-NR-1-scaled.jpg',
                title: 'Fine Dining',
                description: 'Award-winning restaurants serving exquisite international cuisine'
              },
              {
                id: 4,
                image: '/SPA.png',
                title: 'Spa & Wellness',
                description: 'Rejuvenating treatments and state-of-the-art wellness facilities'
              },
              {
                id: 5,
                image: '/Meeting-Room.png',
                title: 'Executive Lounge',
                description: 'Exclusive business facilities for corporate travelers'
              },
              {
                id: 6,
                image: '/DSC02661-2048x1365.jpg',
                title: 'Rooftop Terrace',
                description: 'Stunning panoramic views of Dubai skyline'
              },
            ]}
            autoPlay={true}
            interval={4000}
            showDots={true}
            showArrows={true}
            className="max-w-6xl mx-auto"
          />
        </div>
      </motion.section>

      <FeaturesSection />

      {/* Video Section - Hotel Tour */}
      <VideoSection
        videoUrl="https://sevenseashotel.ae/wp-content/uploads/2025/01/Lobby-video-converter.com_.mp4"
        title="Take a Virtual Tour"
        description="Explore our hotel facilities, rooms, and amenities through this immersive video experience. See why Seven Seas is the perfect choice for your Dubai stay."
        position="left"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        imageUrl="/DSC02655-scaled.jpg"
        title="Unforgettable Experiences Await"
        subtitle="Every moment at Seven Seas is crafted to perfection"
        height={400}
      />

      {/* Gallery Preview Section - Commented out */}
      {/* <GalleryPreview /> */}

      {/* Video Section - Dining Experience */}
      <VideoSection
        videoUrl="https://sevenseashotel.ae/wp-content/uploads/2022/04/hotel-video.mp4"
        title="Culinary Excellence"
        description="Watch our chefs create masterpieces in our award-winning restaurants. Experience the art of fine dining at its finest."
        position="right"
      />

      <OffersSection />

      {/* News & Events Section */}
      <NewsEvents />

      {/* Hotel Policies Section */}
      <HotelPolicies />

      {/* Final Video Banner - Enhanced - Reduced height */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-0 -mt-8 md:-mt-12"
      >
        <VideoBanner
          title="Book Your Stay Today"
          subtitle="Experience the perfect blend of luxury and comfort"
          height="medium"
          textPosition="center"
        />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="-mt-16 md:-mt-20"
      >
        <CTA />
      </motion.div>

      <Footer />

      {/* ============================================
          ADDITIONAL SECTIONS (COMMENTED - Can be added if needed)
          ============================================ */}

      {/* Testimonials Section - Uncomment to add customer reviews */}
      {/* <Testimonials /> */}

      {/* Virtual Tour Section - Uncomment to add 360° hotel tour */}
      {/* <VirtualTourSection /> */}

      {/* Location Map Section - Uncomment to add interactive map */}
      {/* <LocationMapSection /> */}

      {/* Awards & Recognition Section - Uncomment to showcase awards */}
      {/* <AwardsSection /> */}

      {/* Sustainability Section - Uncomment to add eco-friendly initiatives */}
      {/* <SustainabilitySection /> */}

      {/* Partnership Section - Uncomment to add partner logos */}
      {/* <PartnershipSection /> */}
    </main>
  )
}
