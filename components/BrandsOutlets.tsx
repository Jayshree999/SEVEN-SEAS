'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { Sparkles, Store, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const brands = [
  { name: 'Salt', image: '/partners/Salt.png', category: 'Restaurant', link: '/dining' },
  { name: 'Rovee', image: '/partners/Rovee.jpeg', category: 'Restaurant', link: '/restaurant' },
  { name: 'Behnah Wellness', image: '/partners/Vibenation.jpeg', category: 'Wellness', link: '/wellness' },
  { name: "Geoffrey's", image: '/partners/Geoffreys.png', category: 'Sports Bar', link: '/entertainment' },
  { name: 'Vibe Nation', image: '/partners/Behnah.png', category: 'Nightlife', link: '/entertainment' },
  { name: 'Thamburu', image: '/partners/Thamburu.jpeg', category: 'Restaurant', link: '/dining' },
  { name: 'Naughty Restobar', image: '/partners/Naughty.jpeg', category: 'Restobar', link: '/entertainment' },
]

export default function BrandsOutlets() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const itemsPerView = 4 // Show 4 cards at a time on desktop

  // Auto-play carousel
  useEffect(() => {
    const maxIndex = Math.max(0, brands.length - itemsPerView)
    if (maxIndex <= 0) return // Don't auto-play if all items fit on screen

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => {
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [brands.length, itemsPerView])

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, brands.length - itemsPerView)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, brands.length - itemsPerView)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const visibleBrands = brands.slice(currentIndex, currentIndex + itemsPerView)
  const maxIndex = Math.max(0, brands.length - itemsPerView)

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Enhanced Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-400/40 via-amber-300/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-yellow-400/40 via-amber-300/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-300/15 via-amber-200/8 to-amber-300/15 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {/* Animated pattern overlay */}
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zM16.667 37.5c0-5.75-4.75-10.5-10.5-10.5S-4.833 31.75-4.833 37.5.083 48 5.833 48s10.834-4.75 10.834-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5S-8.167 29.492-8.167 37.5-1.675 52 6.333 52s14.5-6.492 14.5-14.5zM56.667 37.5c0-5.75-4.75-10.5-10.5-10.5s-10.5 4.75-10.5 10.5 4.75 10.5 10.5 10.5 10.5-4.75 10.5-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated border lines */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="flex-shrink-0 flex items-center gap-4"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"></div>
                <Store className="relative w-10 h-10 md:w-12 md:h-12 text-amber-600" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400" />
                </motion.div>
              </motion.div>
              <div>
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-gray-900 via-amber-700 to-gray-900 bg-clip-text text-transparent">
                    BRANDS &
                    <br />
                    OUTLETS
                  </span>
                </motion.h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
              className="flex-1 max-w-2xl"
            >
              <motion.p
                className="text-base md:text-lg text-gray-700 leading-relaxed font-semibold mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Dubai's Best Restaurant & Nightlife Experiences Across 10 Venues in Hotel
              </motion.p>
              <motion.p
                className="text-sm md:text-base text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Seven Seas Hotel is home to a variety of renowned brands and vibrant outlets that cater to all your needs under one roof. From exclusive dining experiences at our specialty restaurants to chic cafes and lively lounges, we offer something for everyone.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Brands Carousel - 4 Cards Per Row */}
        <div ref={ref} className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7"
            >
              {visibleBrands.map((brand, idx) => {
                const actualIndex = currentIndex + idx
                return (
                  <BrandCard key={`${brand.name}-${currentIndex}-${idx}`} brand={brand} index={actualIndex} inView={inView} />
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {brands.length > itemsPerView && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-none bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
                aria-label="Previous brands"
              >
                <ChevronLeft className="w-5 h-5 text-gray-900 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-none bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
                aria-label="Next brands"
              >
                <ChevronRight className="w-5 h-5 text-gray-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {brands.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-[1px] transition-all duration-300 ${currentIndex === index
                    ? 'bg-amber-600 w-8'
                    : 'bg-gray-300 hover:bg-amber-200'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-20 relative max-w-5xl mx-auto"
        >
          {/* Glass Container */}
          <div className="relative bg-black/90 backdrop-blur-md rounded-none p-10 md:p-14 overflow-hidden border border-white/5 shadow-lg">

            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-800/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <h3 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent mb-4 drop-shadow-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
                  10+ Venues
                </h3>
              </motion.div>

              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6" />

              <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide mb-2 uppercase">
                Under One Roof
              </p>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base text-gray-400">
                <span>Restaurants</span>
                <span className="text-amber-500">•</span>
                <span>Bars</span>
                <span className="text-amber-500">•</span>
                <span>Nightlife</span>
                <span className="text-amber-500">•</span>
                <span>Wellness</span>
                <span className="text-amber-500">•</span>
                <span>Entertainment</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BrandCard({
  brand,
  index,
  inView
}: {
  brand: typeof brands[0]
  index: number
  inView: boolean
}) {
  return (
    <Link href={brand.link}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
        }}
        whileHover={{
          y: -15,
          scale: 1.05,
        }}
        className="group relative aspect-square overflow-hidden rounded-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-[#f8f6f0] border border-transparent"
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/0 via-amber-300/10 to-yellow-400/0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
        />

        {/* Card border */}
        <div className="absolute inset-0 border border-transparent group-hover:border-amber-600/30 transition-all duration-500 pointer-events-none z-10"></div>

        {/* Image Container */}
        <div className="absolute inset-4 overflow-hidden">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 20vw, 16vw"
          />

          {/* Gradient Overlay - Better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.5,
              ease: 'linear',
            }}
          />
        </div>

        {/* Content Badge - Redesigned */}
        <div className="absolute bottom-4 left-4 right-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center">
          <h3
            className="text-lg font-bold text-white tracking-widest mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {brand.name}
          </h3>
          <div className="w-8 h-[1px] bg-amber-400 mx-auto mb-2"></div>
        </div>

        {/* Top corner badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.05 + 0.4 }}
          className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-2 h-2 bg-amber-400 rounded-none animate-pulse"></div>
        </motion.div>
      </motion.div>
    </Link>
  )
}

