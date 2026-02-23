'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

interface Room {
  title: string
  description: string
  image: string
  features: string[]
}

interface FeaturedRoomsCarouselProps {
  rooms: Room[]
}

export default function FeaturedRoomsCarousel({ rooms }: FeaturedRoomsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % rooms.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (rooms.length === 0) return null

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            FEATURED ACCOMMODATIONS
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our most luxurious rooms and suites
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {rooms.slice(currentIndex, currentIndex + 3).map((room, idx) => {
                const actualIndex = (currentIndex + idx) % rooms.length
                return (
                  <RoomCard key={room.title} room={rooms[actualIndex]} index={idx} />
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {rooms.length > 3 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-amber-200 flex items-center justify-center hover:bg-amber-50 transition-all duration-300 group"
                aria-label="Previous rooms"
              >
                <ChevronLeft className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-amber-200 flex items-center justify-center hover:bg-amber-50 transition-all duration-300 group"
                aria-label="Next rooms"
              >
                <ChevronRight className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {rooms.length > 3 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(rooms.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * 3)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / 3) === index
                      ? 'bg-amber-600 w-8'
                      : 'bg-gray-300 hover:bg-amber-300'
                    }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-amber-300 bg-white"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-amber-200/50">
            <h3 className="text-sm md:text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              {room.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {room.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {room.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-200">
              {feature}
            </span>
          ))}
        </div>
        <Link href={EXTERNAL_BOOKING_URL} target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book a Stay
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

