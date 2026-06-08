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
import WeddingsSection from '@/components/WeddingsSection'
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
import InstagramSection from '@/components/InstagramSection'

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

      <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: luxuryEasing }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Enjoy a luxury experience
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Discover the epitome of comfort and elegance at Seven Seas Hotel, where luxury meets impeccable hospitality. Nestled in the bustling neighborhood of Al Nahda 1, Dubai, our hotel offers a serene escape with world-class amenities and personalized services.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <BrandsOutlets />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <AccommodationSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <OffersSection />
      </motion.div>

      {/* Weddings */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <WeddingsSection />
      </motion.div>

      {/* Explore More - Wellness */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ExploreMore />
      </motion.div>

      {/* Dining */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <SignatureDining />
      </motion.div>

      {/* Events & Conferences / Weddings */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <EventsConferences />
      </motion.div>

      {/* Smart Features */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <SmartFeatures />
      </motion.div>

      {/* Nightlife */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <NightlifeSection />
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

      <Footer />
    </main>
  )
}
