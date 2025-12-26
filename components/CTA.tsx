'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'
import RichButton from './RichButton'
import FloatingGoldParticles from './FloatingGoldParticles'

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
        {/* Removed particles for performance */}
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
              <RichButton variant="filled" className="px-12 py-5 text-xl">
                BOOK NOW
              </RichButton>
            </Link>

            <Link href="/contact">
              <RichButton variant="outline" className="px-12 py-5 text-xl">
                CONTACT US
              </RichButton>
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
              <a href="tel:+971551009152" className="text-sm hover:text-amber-400 transition-colors">+971 55 100 9152</a>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✉️</div>
              <a href="mailto:reservation@sevenseashotel.ae" className="text-sm hover:text-amber-400 transition-colors">reservation@sevenseashotel.ae</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  )
}
