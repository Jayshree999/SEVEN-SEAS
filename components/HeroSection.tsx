'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import Link from 'next/link'
import BackgroundVideo from './BackgroundVideo'
import LuxuryParticles from './LuxuryParticles'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

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
    <motion.section
      ref={heroRef}
      style={{ y, opacity }}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Video */}
      <BackgroundVideo opacity={0.15} />
      
      {/* Luxury Particles */}
      <LuxuryParticles />
      
      {/* Clean Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.h1
          className="hero-title text-7xl md:text-9xl font-bold mb-6 text-black relative"
          style={{
            fontFamily: 'var(--font-playfair)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="relative z-10">SEVEN SEAS</span>
          <span className="absolute inset-0 luxury-shimmer opacity-30"></span>
        </motion.h1>
        
        <motion.p
          className="hero-subtitle text-2xl md:text-4xl text-gray-700 mb-4 font-light tracking-wider"
        >
          LUXURY REDEFINED IN THE HEART OF DUBAI
        </motion.p>

        <motion.p
          className="hero-subtitle text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Experience unparalleled comfort and world-class service at Dubai's premier 4-star destination
        </motion.p>

        <motion.div
          className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/rooms">
            <motion.button
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-black text-white font-bold text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 relative overflow-hidden premium-border luxury-glow group"
            >
              <span className="relative z-10">BOOK YOUR STAY</span>
              <span className="absolute inset-0 luxury-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: '#000',
                backgroundColor: '#f5f5f5',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 border-2 border-black text-black font-bold text-lg uppercase tracking-wider bg-white hover:bg-black hover:text-white transition-colors"
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
            <span className="text-gray-400 text-sm mb-2 tracking-wider">SCROLL</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
