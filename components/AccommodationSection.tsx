'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Bed, Sparkles, ChevronLeft, ChevronRight, User, Maximize, ArrowRight, Star } from 'lucide-react'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

const roomTypes = [
  {
    title: 'Executive Suites',
    description: 'The Executive Suite offers a perfect blend of luxury and comfort, featuring a spacious living area, a king-sized bed, and a fully equipped kitchen. Enjoy stunning views of the Burj Khalifa and Dubai skyline from your private balcony, providing an unparalleled experience of elegance and convenience.',
    image: '/accomodation/executive suites.jpg',
    features: ['Spacious Living Area', 'King-Sized Bed', 'Private Balcony'],
    size: '85 m²',
    guests: '3 Adults',
    badge: 'SIGNATURE',
    bookingUrl: '/booking?room-type=5048564',
  },
  {
    title: 'Premium King',
    description: 'A luxurious king bed room featuring a spacious layout with a large, comfortable king-sized bed, designed to offer the perfect blend of relaxation and sophistication, along with modern amenities for an exceptional stay.',
    image: '/accomodation/premium king.jpg',
    features: ['King-Sized Bed', 'Modern Amenities', 'Luxury Design'],
    size: '45 m²',
    guests: '2 Adults',
    badge: 'PREMIUM',
    bookingUrl: '/booking?room-type=5048568',
  },
  {
    title: 'Premium Twin',
    description: 'A stylish twin room, elegantly furnished with two single beds, providing a serene and comfortable retreat for guests seeking both relaxation and convenience.',
    image: '/accomodation/premium twin.jpg',
    features: ['Two Single Beds', 'Elegant Furnishings', 'Comfortable Retreat'],
    size: '45 m²',
    guests: '2 Adults',
    badge: 'PREMIUM',
    bookingUrl: '/booking?room-type=5048569',
  },
  {
    title: 'Premium City King',
    description: 'A luxurious king bed room with stunning city views, featuring a spacious layout and a comfortable king-sized bed, complemented by sophisticated decor and modern amenities for an unforgettable stay.',
    image: '/accomodation/premium city king.jpg',
    features: ['City Views', 'King-Sized Bed', 'Sophisticated Decor'],
    size: '50 m²',
    guests: '2 Adults',
    badge: 'PREMIUM',
    bookingUrl: '/booking?room-type=5048563',
  },
  {
    title: 'Premium City Twin',
    description: 'Featuring two single beds, offering more spacious accommodations with breathtaking city views, complemented by elegant furnishings and modern amenities for a truly comfortable and elevated stay.',
    image: '/accomodation/premium city twin.jpeg',
    features: ['Two Single Beds', 'City Views', 'Elegant Furnishings'],
    size: '50 m²',
    guests: '2 Adults',
    badge: 'PREMIUM',
    bookingUrl: '/booking?room-type=5048567',
  },
  {
    title: 'Premium Sea View King',
    description: 'Wake up to refreshing views of the serene sea from your king-sized bed, where you can relax and unwind while enjoying the peaceful, scenic beauty right outside your window.',
    image: '/accomodation/premium sea view king.jpg',
    features: ['Sea Views', 'King-Sized Bed', 'Serene Atmosphere'],
    size: '50 m²',
    guests: '2 Adults',
    badge: 'PREMIUM',
    bookingUrl: '/booking?room-type=5048566',
  },
  {
    title: 'Deluxe Family 2 Queen Bed',
    description: 'Our Deluxe Family Room features two spacious queen-sized beds, perfect for a restful stay. Ideal for families, this room offers plenty of space, modern amenities, and a comfortable setting for all.',
    image: '/accomodation/delux family 2 queen bed.jpg',
    features: ['Two Queen Beds', 'Family-Friendly', 'Spacious'],
    size: '60 m²',
    guests: '2 Adults, 2 Kids',
    badge: 'DELUXE',
    bookingUrl: '/booking?room-type=5048573,5048562',
  },
  {
    title: 'Deluxe Balcony King',
    description: 'A luxurious balcony room with a king-sized bed, offering a private outdoor space with stunning city and stadium, combining comfort, elegance, and modern amenities for an unforgettable stay.',
    image: '/accomodation/delux balcony king.jpg',
    features: ['Private Balcony', 'King-Sized Bed', 'City Views'],
    size: '55 m²',
    guests: '2 Adults',
    badge: 'DELUXE',
    bookingUrl: '/booking?room-type=5048565',
  },
  {
    title: 'Royal Suite',
    description: 'The Presidential Suite is the hotel\'s largest and most luxurious room, featuring expansive living areas, a private balcony with stunning views of the Burj Khalifa, Dubai skyline, and the Arabian Sea, offering the ultimate in comfort and sophistication.',
    image: '/accomodation/royal suit.jpg',
    features: ['Largest Suite', 'Expansive Living Areas', 'Panormaic Views'],
    size: '120 m²',
    guests: '4 Adults',
    badge: 'ROYAL',
    bookingUrl: '/booking?room-type=5049491',
  }
]

const luxuryEasing = [0.22, 1, 0.36, 1]

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
    <section className="py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0a0a0a] relative overflow-hidden text-white">
      {/* Ultra Premium Background Effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Elegant Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-900/20 via-yellow-900/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Floating Ambient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[150px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Elegant Border Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Premium Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="max-w-2xl"
          >
            {/* Elegant Subtitle with Sparkle */}
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
              <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-amber-400 uppercase tracking-[0.3em] text-xs font-bold">Sanctuary of Comfort</span>
            </div>

            {/* Main Title with Gradient */}
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Exquisite <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">Living</span>
            </h2>

            {/* Elegant Description */}
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl">
              Discover unparalleled comfort in our meticulously designed accommodations, where every detail speaks of luxury and sophistication.
            </p>
          </motion.div>

          {/* Premium Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: luxuryEasing }}
            className="flex gap-4"
          >
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-none border border-amber-500/30 flex items-center justify-center hover:border-amber-500 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
              aria-label="Previous rooms"
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ChevronLeft className="w-6 h-6 text-amber-400 group-hover:-translate-x-1 transition-transform relative z-10" />
            </motion.button>

            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-none border border-amber-500/30 flex items-center justify-center hover:border-amber-500 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
              aria-label="Next rooms"
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ChevronRight className="w-6 h-6 text-amber-400 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
          </motion.div>
        </div>

        {/* Rooms Carousel with Enhanced Cards */}
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

          {/* Premium Dots Indicator */}
          {roomTypes.length > itemsPerView && (
            <div className="flex items-center gap-6 mt-16 md:mt-20">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent flex-grow" />
              <div className="flex gap-3">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-[1px] transition-all duration-500 ${currentIndex === index
                      ? 'bg-amber-400 w-16'
                      : 'bg-white/20 w-8 hover:bg-white/40'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent flex-grow" />
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
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'ROYAL': return 'from-purple-500 to-pink-500'
      case 'SIGNATURE': return 'from-amber-500 to-yellow-500'
      case 'DELUXE': return 'from-blue-500 to-cyan-500'
      default: return 'from-amber-600 to-orange-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -60, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: luxuryEasing
      }}
      whileHover={{ y: -6 }}
      className="group relative h-[550px] w-full cursor-pointer overflow-hidden rounded-none"
    >
      {/* Premium Border Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

      {/* Card Container */}
      <div className="relative h-full w-full bg-black rounded-none overflow-hidden border border-white/5 group-hover:border-amber-400/30 transition-all duration-500">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={room.image}
            alt={room.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/0 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
          </div>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          {/* Top Section - Badge */}
          <div className="flex justify-between items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div className={`px-4 py-2 bg-white text-gray-900 rounded-none shadow-xl`}>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                  <Star className="w-3 h-3 text-amber-600 fill-current" />
                  {room.badge}
                </span>
              </div>
            </motion.div>

            {/* Premium Icon */}
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
          </div>

          {/* Bottom Section - Details */}
          <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            {/* Room Title */}
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-amber-400 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {room.title}
            </motion.h3>

            {/* Room Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-none">
                <Maximize className="w-4 h-4 text-amber-400" />
                <span className="font-light tracking-wider">{room.size}</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-none">
                <User className="w-4 h-4 text-amber-400" />
                <span className="font-light tracking-wider">{room.guests}</span>
              </div>
            </div>

            {/* Description - Revealed on Hover */}
            <motion.p
              className="text-gray-300 text-sm leading-relaxed mb-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-700 ease-in-out overflow-hidden"
            >
              {room.description}
            </motion.p>

            {/* Features & CTA */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-2">
              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                {room.features.slice(0, 2).map((feat, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase tracking-widest px-3 py-2 border border-white/20 rounded-none text-white/80 bg-white/5 backdrop-blur-sm font-light"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <Link href={room.bookingUrl}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-none border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
