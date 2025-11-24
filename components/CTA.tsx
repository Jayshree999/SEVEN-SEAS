'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      {/* CTA Banner */}
      <ImageBanner
        title="Ready for an Unforgettable Stay?"
        subtitle="Book your luxury experience today and discover the magic of Dubai"
        height="large"
        textPosition="center"
      />
      <section
        ref={ref}
        className="relative py-20 px-6 overflow-hidden bg-white text-black"
        id="contact"
      >
        <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, type: 'spring' }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            READY FOR AN UNFORGETTABLE STAY?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Book your luxury experience today and discover the magic of Dubai
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/rooms">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-black text-white font-bold text-xl uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                BOOK NOW
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  borderColor: '#000',
                  backgroundColor: '#f5f5f5',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 border-2 border-black text-black font-bold text-xl uppercase tracking-wider bg-white hover:bg-black hover:text-white transition-colors"
              >
                CONTACT US
              </motion.button>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm">Dubai, UAE</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📞</div>
              <p className="text-sm">+971 4 XXX XXXX</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✉️</div>
              <p className="text-sm">info@sevenseasdubai.com</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  )
}
