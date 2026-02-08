'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'
import BackgroundVideo from './BackgroundVideo'

import { Bed, Utensils, Sparkles, Calendar } from 'lucide-react'

const features = [
  {
    title: 'LUXURIOUS ROOMS',
    description: 'Spacious suites with panoramic views of Dubai, featuring modern amenities and elegant design',
    icon: Bed,
    link: '/rooms',
  },
  {
    title: 'WORLD-CLASS DINING',
    description: 'Award-winning restaurants offering international cuisine and authentic local flavors',
    icon: Utensils,
    link: '/dining',
  },
  {
    title: 'SPA & WELLNESS',
    description: 'Rejuvenate at our state-of-the-art spa facility with expert therapists',
    icon: Sparkles,
    link: '/wellness',
  },
  {
    title: 'EVENT SPACES',
    description: 'Elegant venues for your special occasions, meetings, and celebrations',
    icon: Calendar,
    link: '/mehfil-ballroom',
  },
]

const luxuryEasing = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: luxuryEasing,
    }
  }
}

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900"
      id="features"
    >
      {/* Enhanced Background with Light */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Premium Ambient Lighting - Much Brighter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-amber-400/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-yellow-400/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-300/10 rounded-full blur-[120px]" />
      </div>

      {/* Elegant Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: luxuryEasing }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Sparkle Accent */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, ease: luxuryEasing, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/50"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>

          {/* Main Title - High Contrast */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: luxuryEasing, delay: 0.3 }}
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-[0_0_40px_rgba(251,191,36,0.5)]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              UNFORGETTABLE EXPERIENCES
            </h2>

            {/* Premium Underline */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </motion.div>

          {/* Description - Brighter Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Discover what makes Seven Seas Hotel the perfect choice for your Dubai stay
          </motion.p>
        </motion.div>

        {/* Features Banner - Enhanced Visibility */}
        <motion.div
          className="mb-16 md:mb-20 max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/30 shadow-2xl shadow-amber-500/20">
            <ImageBanner
              imageUrl="/hero2.jpg"
              title="Unparalleled Experiences"
              subtitle="Every detail crafted for your comfort"
              height="small"
              textPosition="center"
            />
            {/* Enhanced Border Glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-amber-400/20 pointer-events-none" />
          </div>
        </motion.div>

        {/* Feature Cards - High Contrast Design */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.link}>
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -20,
                  scale: 1.05,
                  transition: { duration: 0.4, ease: luxuryEasing }
                }}
                className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 hover:border-amber-400 rounded-2xl p-8 relative overflow-hidden group cursor-pointer h-full transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20"
              >
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                  <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent skew-x-12" />
                </div>

                {/* Ambient Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-100/70 to-yellow-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="mb-6 text-amber-600"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-amber-500/40 transition-all duration-300 border-2 border-amber-200 group-hover:border-amber-400">
                      <feature.icon className="w-10 h-10 stroke-[1.5] text-amber-600 group-hover:text-amber-700" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {feature.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6 font-normal text-base">
                    {feature.description}
                  </p>

                  <motion.div
                    className="text-amber-600 group-hover:text-amber-700 font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, x: 5 }}
                  >
                    Learn More
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-lg"
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>

                {/* Bottom Gold Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
    </section>
  )
}
