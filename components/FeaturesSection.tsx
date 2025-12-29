'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'
import BackgroundVideo from './BackgroundVideo'

const features = [
  {
    title: 'LUXURIOUS ROOMS',
    description: 'Spacious suites with panoramic views of Dubai, featuring modern amenities and elegant design',
    icon: '🏨',
    link: '/rooms',
  },
  {
    title: 'WORLD-CLASS DINING',
    description: 'Award-winning restaurants offering international cuisine and authentic local flavors',
    icon: '🍽️',
    link: '/dining',
  },
  {
    title: 'SPA & WELLNESS',
    description: 'Rejuvenate at our state-of-the-art spa facility with expert therapists',
    icon: '💆',
    link: '/wellness',
  },
  {
    title: 'EVENT SPACES',
    description: 'Elegant venues for your special occasions, meetings, and celebrations',
    icon: '🎉',
    link: '/mehfil-ballroom',
  },
]

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden bg-white"
      id="features"
    >
      <BackgroundVideo opacity={0.05} />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            UNFORGETTABLE EXPERIENCES
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes Seven Seas Hotel the perfect choice for your Dubai stay
          </p>
        </motion.div>

        {/* Features Banner */}
        <div className="mb-12 max-w-6xl mx-auto">
          <ImageBanner
            imageUrl="/hero2.jpg"
            title="Unparalleled Experiences"
            subtitle="Every detail crafted for your comfort"
            height="small"
            textPosition="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.link}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="bg-white border-2 border-transparent group-hover:border-amber-400 rounded-lg p-8 relative overflow-hidden group cursor-pointer h-full transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-6"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-black mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <motion.div
                    className="mt-6 text-black font-semibold text-sm uppercase tracking-wider inline-flex items-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 5 }}
                  >
                    Learn More →
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
