'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'
import LuxuryBadge from './LuxuryBadge'
import FloatingGoldParticles from './FloatingGoldParticles'

export default function PromoBanner() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      <ImageBanner
        title="WELCOME TO SEVEN SEAS"
        subtitle="Experience the perfect blend of luxury, comfort, and authentic Arabian hospitality in the heart of Dubai"
        height="large"
        textPosition="center"
      />
      <section
        ref={ref}
        className="relative py-12 px-6 bg-white text-black overflow-hidden"
      >
        {/* Removed particles for performance */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <LuxuryBadge text="Premium Location" variant="black" size="md" />
              <LuxuryBadge text="World-Class Service" variant="black" size="md" />
              <LuxuryBadge text="Modern Amenities" variant="black" size="md" />
              <LuxuryBadge text="Award-Winning Dining" variant="black" size="md" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-base text-gray-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>Premium Location</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>World-Class Service</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>Modern Amenities</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>Award-Winning Dining</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

