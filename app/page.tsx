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
      <motion.section 
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Image
              src="/hero2.jpg"
              alt="Seven Seas Hotel Lobby"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </motion.div>
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"
            animate={{
              opacity: [0.7, 0.8, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 px-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              EXCELLENCE IN NUMBERS
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 px-2">Our commitment to luxury and service</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -15 }}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-transparent hover:border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                <AnimatedCounter value={150} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-wider font-semibold">Luxury Rooms</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -15 }}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-transparent hover:border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                <AnimatedCounter value={10} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-wider font-semibold">Years Excellence</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -15 }}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-transparent hover:border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                <AnimatedCounter value={50} suffix="K+" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-wider font-semibold">Happy Guests</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -15 }}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-transparent hover:border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                <AnimatedCounter value={4.8} suffix="" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-wider font-semibold">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Brands & Outlets Section */}
      <BrandsOutlets />
      
      {/* Accommodation Section - Now with Carousel */}
      <AccommodationSection />
      
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

      <div style={{ marginTop: '-200px' }}>
        <Scene3D />
      </div>

      {/* Image Showcase - Enhanced with Carousel */}
      <motion.section 
        className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-amber-200/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-3 md:mb-4"
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
