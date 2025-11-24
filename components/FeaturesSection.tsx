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
    link: '/restaurant',
  },
  {
    title: 'SPA & WELLNESS',
    description: 'Rejuvenate at our state-of-the-art spa facility with expert therapists',
    icon: '💆',
    link: '/services',
  },
  {
    title: 'EVENT SPACES',
    description: 'Elegant venues for your special occasions, meetings, and celebrations',
    icon: '🎉',
    link: '/services',
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
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.08,
                  y: -15,
                  rotateY: 5,
                }}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 relative overflow-hidden group cursor-pointer h-full hover:border-gray-400 transition-all duration-300 premium-border"
              >
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-6"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
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
