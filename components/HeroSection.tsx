'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Link from 'next/link'
import BackgroundVideo from './BackgroundVideo'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  // Optimized: Removed parallax scroll for better performance

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-buttons', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3')
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Video */}
      <BackgroundVideo videoUrl="https://sevenseashotel.ae/wp-content/uploads/2025/11/Seven-Seas-Hotel-Intro-for-event.mp4" opacity={1.0} />
      
      {/* Subtle overlay only for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[5]" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.h1
          className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-4 sm:mb-6 text-white relative drop-shadow-2xl"
          style={{
            fontFamily: 'var(--font-playfair)',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', // Reduced shadow for cleaner look
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="relative z-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">SEVEN SEAS</span>
        </motion.h1>
        
        <motion.p
          className="hero-subtitle text-base sm:text-xl md:text-2xl lg:text-4xl text-gray-100 mb-3 sm:mb-4 font-light tracking-[0.2em] px-2"
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          LUXURY REDEFINED IN THE HEART OF DUBAI
        </motion.p>

        <motion.p
          className="hero-subtitle text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto px-2 font-light"
          style={{
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          Experience unparalleled comfort and world-class service at Dubai's premier 4-star destination
        </motion.p>

        <motion.div
          className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2"
        >
          <Link href="/rooms" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-semibold text-sm sm:text-base tracking-[0.15em] hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]"
            >
              BOOK YOUR STAY
            </motion.button>
          </Link>

          <Link href="/about-us" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 border border-white/30 backdrop-blur-sm text-white font-semibold text-sm sm:text-base tracking-[0.15em] hover:bg-white/10 transition-colors duration-300"
            >
              EXPLORE
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator with Gold */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2 tracking-wider drop-shadow-md" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>SCROLL</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
