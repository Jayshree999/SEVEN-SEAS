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
              className="w-12 h-12 rounded-none bg-gray-900 flex items-center justify-center shadow-2xl border border-white/10"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
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
              Enjoy a luxury experience
            </h2>

            {/* Premium Underline */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
              <div className="h-[1px] w-24 bg-amber-500/50" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>
          </motion.div>

          {/* Description - Brighter Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Discover the epitome of comfort and elegance at Seven Seas Hotel, where luxury meets impeccable hospitality. Nestled in the bustling neighborhood of Al Nahda 1, Dubai, our hotel offers a serene escape with world-class amenities and personalized services.
          </motion.p>
        </motion.div>

        {/* Features Banner - Enhanced Visibility */}
        <motion.div
          className="mb-16 md:mb-20 max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.6 }}
        >
          <div className="relative rounded-none overflow-hidden border border-gray-800 shadow-xl shadow-amber-900/10">
            <ImageBanner
              imageUrl="/hero2.jpg"
              title="Unparalleled Experiences"
              subtitle="Every detail crafted for your comfort"
              height="small"
              textPosition="center"
            />
            {/* Enhanced Border Glow */}
            <div className="absolute inset-0 ring-1 ring-amber-400/20 pointer-events-none" />
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
                className="bg-[#f8f6f0] border border-transparent hover:border-amber-200/50 rounded-none p-10 relative overflow-hidden group cursor-pointer h-full transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col items-center text-center"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    className="mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 mx-auto bg-white border border-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 rounded-none shadow-sm">
                      <feature.icon className="w-8 h-8 stroke-1 text-amber-700 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {feature.title}
                  </h3>

                  <div className="w-8 h-[1px] bg-amber-600/50 mb-6 transition-all duration-500 group-hover:w-16"></div>

                  <p className="text-gray-500 leading-relaxed mb-8 font-light text-sm">
                    {feature.description}
                  </p>

                  <motion.div
                    className="text-amber-700 font-medium text-xs uppercase tracking-widest inline-flex items-center gap-2 mt-auto"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, x: 5 }}
                  >
                    Learn More
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-sm"
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
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
