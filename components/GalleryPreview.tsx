'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'

const galleryItems = [
  { id: 1, title: 'Luxury Suite', category: 'Rooms', gradient: 'from-gray-900 to-black' },
  { id: 2, title: 'Infinity Pool', category: 'Facilities', gradient: 'from-gray-800 to-gray-900' },
  { id: 3, title: 'Fine Dining', category: 'Restaurant', gradient: 'from-black to-gray-900' },
  { id: 4, title: 'Spa Retreat', category: 'Wellness', gradient: 'from-gray-900 to-black' },
]

export default function GalleryPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden bg-white"
      id="gallery"
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            GALLERY
          </h2>
          <p className="text-xl text-gray-600">
            A Glimpse Into Our World of Luxury
          </p>
        </motion.div>

        {/* Featured Banner */}
        <div className="mb-12">
          <ImageBanner
            title="Luxury Captured"
            subtitle="Experience our hotel through stunning visuals"
            height="medium"
            textPosition="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, index) => (
            <Link key={item.id} href="/gallery">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                }}
                className="relative h-96 rounded-lg overflow-hidden group cursor-pointer bg-black premium-border"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <span className="text-white/60 text-sm uppercase tracking-wider mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <motion.div
                      className="text-white/80 text-sm uppercase tracking-wider"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      View Gallery →
                    </motion.div>
                  </motion.div>
                </div>

                {/* Border on Hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-black text-black font-semibold uppercase tracking-wider bg-white hover:bg-black hover:text-white transition-colors"
            >
              View Full Gallery
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
