'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Bed, Sparkles, ChevronLeft, ChevronRight, User, Maximize, ArrowRight } from 'lucide-react'

const roomTypes = [
  {
    title: 'Executive Suites',
    description: 'The Executive Suite offers a perfect blend of luxury and comfort, featuring a spacious living area, a king-sized bed, and a fully equipped kitchen. Enjoy stunning views of the Burj Khalifa and Dubai skyline from your private balcony.',
    image: '/accomodation/executive suites.jpg',
    features: ['Spacious Living Area', 'King-Sized Bed', 'Private Balcony'],
    size: '85 m²',
    guests: '3 Adults',
  },
  {
    title: 'Premium King',
    description: 'A luxurious king bed room featuring a spacious layout with a large, comfortable king-sized bed, designed to offer the perfect blend of relaxation and sophistication.',
    image: '/accomodation/premium king.jpg',
    features: ['King-Sized Bed', 'Modern Amenities', 'Luxury Design'],
    size: '45 m²',
    guests: '2 Adults',
  },
  {
    title: 'Premium Twin',
    description: 'A stylish twin room, elegantly furnished with two single beds, providing a serene and comfortable retreat for guests seeking both relaxation and convenience.',
    image: '/accomodation/premium twin.jpg',
    features: ['Two Single Beds', 'Elegant Furnishings', 'Comfortable Retreat'],
    size: '45 m²',
    guests: '2 Adults',
  },
  {
    title: 'Premium City King',
    description: 'A luxurious king bed room with stunning city views, featuring a spacious layout and a comfortable king-sized bed, complemented by sophisticated decor.',
    image: '/accomodation/premium city king.jpg',
    features: ['City Views', 'King-Sized Bed', 'Sophisticated Decor'],
    size: '50 m²',
    guests: '2 Adults',
  },
  {
    title: 'Premium City Twin',
    description: 'Featuring two single beds, offering more spacious accommodations with breathtaking city views, complemented by elegant furnishings.',
    image: '/accomodation/premium city twin.jpeg',
    features: ['Two Single Beds', 'City Views', 'Elegant Furnishings'],
    size: '50 m²',
    guests: '2 Adults',
  },
  {
    title: 'Premium Sea View King',
    description: 'Wake up to refreshing views of the serene sea from your king-sized bed, where you can relax and unwind while enjoying the peaceful, scenic beauty.',
    image: '/accomodation/premium sea view king.jpg',
    features: ['Sea Views', 'King-Sized Bed', 'Serene Atmosphere'],
    size: '50 m²',
    guests: '2 Adults',
  },
  {
    title: 'Deluxe Family 2 Queen',
    description: 'Our Deluxe Family Room features two spacious queen-sized beds, perfect for a restful stay. Ideal for families, this room offers plenty of space.',
    image: '/accomodation/delux family 2 queen bed.jpg',
    features: ['Two Queen Beds', 'Family-Friendly', 'Spacious'],
    size: '60 m²',
    guests: '2 Adults, 2 Kids',
  },
  {
    title: 'Deluxe Balcony King',
    description: 'A luxurious balcony room with a king-sized bed, offering a private outdoor space with stunning city and stadium views.',
    image: '/accomodation/delux balcony king.jpg',
    features: ['Private Balcony', 'King-Sized Bed', 'City Views'],
    size: '55 m²',
    guests: '2 Adults',
  },
  {
    title: 'Royal Suite',
    description: 'The Presidential Suite is the hotel\'s largest and most luxurious room, featuring expansive living areas, a private balcony with stunning views of the Burj Khalifa.',
    image: '/accomodation/royal suit.jpg',
    features: ['Largest Suite', 'Expansive Living Areas', 'Panormaic Views'],
    size: '120 m²',
    guests: '4 Adults',
  },
]

export default function AccommodationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, roomTypes.length - itemsPerView)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, roomTypes.length - itemsPerView)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const visibleRooms = roomTypes.slice(currentIndex, currentIndex + itemsPerView)
  const maxIndex = Math.max(0, roomTypes.length - itemsPerView)

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0a0a0a] relative overflow-hidden text-white">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-amber-500" />
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">Sanctuary of Comfort</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Exquisite <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Living</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4"
          >
            <button
              onClick={goToPrevious}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
              aria-label="Previous rooms"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
              aria-label="Next rooms"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Rooms Carousel */}
        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode='wait'>
              {visibleRooms.map((room, idx) => {
                const actualIndex = currentIndex + idx
                return (
                  <RoomCard key={`${room.title}-${actualIndex}`} room={room} index={idx} />
                )
              })}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          {roomTypes.length > itemsPerView && (
            <div className="flex items-center gap-4 mt-12 md:mt-16">
              <div className="h-px bg-white/10 flex-grow" />
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 transition-all duration-500 rounded-full ${currentIndex === index
                        ? 'bg-amber-500 w-12'
                        : 'bg-white/20 w-4 hover:bg-white/40'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function RoomCard({
  room,
  index,
}: {
  room: typeof roomTypes[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.610, 0.355, 1.000] }}
      className="group relative h-[500px] w-full cursor-pointer overflow-hidden rounded-sm"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:bg-gradient-to-t group-hover:from-black/95 group-hover:via-black/60 group-hover:to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Top Badge */}
        <div className="absolute top-6 left-6 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <span className="px-3 py-1 bg-amber-600 text-white text-xs tracking-widest uppercase font-bold">Premium</span>
        </div>

        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {room.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4 opacity-80">
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4" />
              <span>{room.size}</span>
            </div>
            <div className="w-px h-3 bg-gray-500" />
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{room.guests}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-700 ease-in-out overflow-hidden">
            {room.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
            <div className="flex gap-2">
              {room.features.slice(0, 2).map((feat, i) => (
                <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-white/20 rounded-full text-white/80">{feat}</span>
              ))}
            </div>

            <Link href="/rooms">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

