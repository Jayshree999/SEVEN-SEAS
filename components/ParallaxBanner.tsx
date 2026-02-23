'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import FloatingGoldParticles from './FloatingGoldParticles'

interface ParallaxBannerProps {
  imageUrl?: string
  title: string
  subtitle?: string
  height?: number
  ctaLink?: string
}

export default function ParallaxBanner({ imageUrl, title, subtitle, height = 500, ctaLink }: ParallaxBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Optimized: Removed parallax scroll effect for better performance
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start end', 'end start'],
  // })
  // const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  // const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  return (
    <div ref={ref} className={`relative h-[${height}px] overflow-hidden`} style={{ height: `${height}px` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-9xl font-bold">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {/* Removed particles for performance */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl"
          >
            {subtitle}
          </motion.p>
        )}
        {ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link href={ctaLink} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-amber-600 text-white font-bold rounded-lg shadow-xl hover:bg-amber-700 transition-all duration-300 uppercase tracking-wider"
              >
                Book Now
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

