'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
      },
    },
    tap: { scale: 0.95 },
  }

  const contactVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  }

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-6 overflow-hidden bg-[#111111] text-white"
      id="contact"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          {/* Title */}
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-5xl lg:text-[7rem] font-bold mb-6 text-white uppercase tracking-tighter leading-[0.9]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              READY FOR AN
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              UNFORGETTABLE STAY?
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Book your luxury experience today and discover the magic of Dubai's premier destination.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link href={EXTERNAL_BOOKING_URL}>
                <motion.button
                  className="relative px-12 py-6 bg-white text-black font-bold text-lg uppercase tracking-[0.2em] rounded-none overflow-hidden group shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    BOOK NOW
                    <motion.svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link href="/contact">
                <motion.button
                  className="relative px-12 py-6 bg-transparent text-white font-bold text-lg uppercase tracking-[0.2em] rounded-none border border-white/30 overflow-hidden group hover:border-white transition-all duration-500"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    CONTACT US
                    <motion.svg
                      className="w-5 h-5 transition-transform group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-gray-600"
          >
            <motion.div
              custom={0}
              variants={contactVariants}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <motion.div
                className="p-2 bg-white/5 rounded-none border border-white/10 group-hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <MapPin className="w-4 h-4 text-amber-400" />
              </motion.div>
              <span className="text-sm md:text-base font-medium">Dubai, UAE</span>
            </motion.div>

            <motion.div
              custom={1}
              variants={contactVariants}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <motion.div
                className="p-2 bg-white/5 rounded-none border border-white/10 group-hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Phone className="w-4 h-4 text-amber-400" />
              </motion.div>
              <a
                href="tel:+971551009152"
                className="text-sm md:text-base font-medium hover:text-amber-600 transition-colors"
              >
                +971 55 100 9152
              </a>
            </motion.div>

            <motion.div
              custom={2}
              variants={contactVariants}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <motion.div
                className="p-2 bg-white/5 rounded-none border border-white/10 group-hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Mail className="w-4 h-4 text-amber-400" />
              </motion.div>
              <a
                href="mailto:reservation@sevenseashotel.ae"
                className="text-sm md:text-base font-medium hover:text-amber-600 transition-colors"
              >
                reservation@sevenseashotel.ae
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
