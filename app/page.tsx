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

// Luxury animation variants with premium easing
const luxuryEasing = [0.22, 1, 0.36, 1] // Custom ease-out curve for luxury feel

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEasing,
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <ParticleBackground />
      <Navigation />
      <HeroSection />

      {/* Excellence in Numbers - Premium Stats Banner */}
      <motion.section
        className="relative py-16 md:py-24 px-4 sm:px-6 -mt-20 z-30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* Ambient Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: luxuryEasing }}
              className="text-center mb-10 md:mb-14 relative z-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-md" style={{ fontFamily: 'var(--font-playfair)' }}>
                EXCELLENCE IN NUMBERS
              </h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-4" />
              <p className="text-gray-200 text-sm md:text-base tracking-wider uppercase">Our commitment to luxury and service</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: 150, suffix: '+', label: 'Luxury Rooms', delay: 0 },
                { value: 10, suffix: '+', label: 'Years Excellence', delay: 0.1 },
                { value: 50, suffix: 'K+', label: 'Happy Guests', delay: 0.2 },
                { value: 4.8, suffix: '', label: 'Average Rating', delay: 0.3 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.6, ease: luxuryEasing }
                    }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Accommodation Section - Luxury Rooms Showcase */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <AccommodationSection />
      </motion.div>

      {/* Smart Features - Modern Conveniences */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <SmartFeatures />
      </motion.div>

      {/* Virtual Tour Video - Early Engagement */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-0"
      >
        <VideoSection
          videoUrl="https://sevenseashotel.ae/wp-content/uploads/2025/01/Lobby-video-converter.com_.mp4"
          title="Take a Virtual Tour"
          description="Explore our hotel facilities, rooms, and amenities through this immersive video experience. See why Seven Seas is the perfect choice for your Dubai stay."
          position="left"
        />
      </motion.div>

      {/* Discover Our World - Image Carousel */}
      <motion.section
        className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-100 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: luxuryEasing }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              DISCOVER OUR WORLD
            </motion.h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-6" />
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 px-2"
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

      {/* Unparalleled Experiences - Features */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <FeaturesSection />
      </motion.div>

      {/* Ultimate Playground - Nightlife */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <NightlifeSection />
      </motion.div>

      {/* Dining Experiences - Consolidated */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <SignatureDining />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <RoveeArabicCuisine />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <EventsConferences />
      </motion.div>

      {/* Brands & Outlets */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <BrandsOutlets />
      </motion.div>

      {/* Wellness & Experiences */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ExploreMore />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <OasisRooftopPoolbar />
      </motion.div>

      {/* Luxury Video Banner */}
      <motion.div
        className="my-16 md:my-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <VideoBanner
          title="Welcome to Luxury"
          subtitle="Experience Dubai's finest hospitality in the heart of the city"
          height="large"
          textPosition="center"
        />
      </motion.div>

      {/* Parallax Banner */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ParallaxBanner
          imageUrl="/DSC02655-scaled.jpg"
          title="Unforgettable Experiences Await"
          subtitle="Every moment at Seven Seas is crafted to perfection"
          height={400}
        />
      </motion.div>

      {/* Culinary Excellence Video */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-0"
      >
        <VideoSection
          videoUrl="https://sevenseashotel.ae/wp-content/uploads/2022/04/hotel-video.mp4"
          title="Culinary Excellence"
          description="Watch our chefs create masterpieces in our award-winning restaurants. Experience the art of fine dining at its finest."
          position="right"
        />
      </motion.div>

      {/* Special Offers */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <OffersSection />
      </motion.div>

      {/* News & Events */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <NewsEvents />
      </motion.div>

      {/* Hotel Policies */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <HotelPolicies />
      </motion.div>

      {/* Final Video Banner + CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="mb-0"
      >
        <VideoBanner
          title="Book Your Stay Today"
          subtitle="Experience the perfect blend of luxury and comfort"
          height="medium"
          textPosition="center"
        />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="-mt-16 md:-mt-20"
      >
        <CTA />
      </motion.div>

      <Footer />
    </main>
  )
}
