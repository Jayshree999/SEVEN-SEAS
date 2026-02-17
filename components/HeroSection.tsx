'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BackgroundVideo from './BackgroundVideo'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <BackgroundVideo videoUrl="/hero.mp4" opacity={1.0} isMuted={isMuted} />

      {/* Sound Toggle Button */}
      <div className="absolute top-24 right-6 z-30">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all border border-white/20 hover:border-white/50 group"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.75-4.75 4.5 4.5m-4.5-4.5v12m-4.5-4.5-4.75 4.75A9 9 0 0 1 3 12a9 9 0 0 1 9-9Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.75-4.75 4.5 4.5m-4.5-4.5v12m-4.5-4.5-4.75 4.75A9 9 0 0 1 3 12a9 9 0 0 1 9-9Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Cinematic Gradient Overlay - Removed for clearer view as per request */}
      <div className="absolute inset-0 bg-black/20 z-[5]" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold text-white relative leading-none tracking-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            SEVEN SEAS
          </motion.h1>
        </div>

        <motion.div
          className="w-24 h-1 bg-amber-500 mb-8 mx-auto rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-50 mb-4 font-light tracking-[0.3em] uppercase drop-shadow-md"
        >
          Luxury Redefined
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-base sm:text-lg text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm"
        >
          Experience unparalleled comfort and world-class service at the city's premier destination
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center items-center w-full"
        >
          <Link href="/rooms">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] min-w-[200px]"
            >
              Book Your Stay
            </motion.button>
          </Link>

          <Link href="/about-us">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-white text-white font-semibold text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[200px]"
            >
              Explore
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Scroll</span>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
