'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Bed, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

const roomTypes = [
  {
    title: 'Executive Suites',
    description: 'The Executive Suite offers a perfect blend of luxury and comfort, featuring a spacious living area, a king-sized bed, and a fully equipped kitchen. Enjoy stunning views of the Burj Khalifa and Dubai skyline from your private balcony, providing an unparalleled experience of elegance and convenience.',
    image: '/accomodation/executive suites.jpg',
    features: ['Spacious Living Area', 'King-Sized Bed', 'Fully Equipped Kitchen', 'Private Balcony', 'Burj Khalifa Views'],
  },
  {
    title: 'Premium King',
    description: 'A luxurious king bed room featuring a spacious layout with a large, comfortable king-sized bed, designed to offer the perfect blend of relaxation and sophistication, along with modern amenities for an exceptional stay.',
    image: '/accomodation/premium king.jpg',
    features: ['King-Sized Bed', 'Spacious Layout', 'Modern Amenities', 'Luxury Design'],
  },
  {
    title: 'Premium Twin',
    description: 'A stylish twin room, elegantly furnished with two single beds, providing a serene and comfortable retreat for guests seeking both relaxation and convenience.',
    image: '/accomodation/premium twin.jpg',
    features: ['Two Single Beds', 'Elegant Furnishings', 'Serene Atmosphere', 'Comfortable Retreat'],
  },
  {
    title: 'Premium City King',
    description: 'A luxurious king bed room with stunning city views, featuring a spacious layout and a comfortable king-sized bed, complemented by sophisticated decor and modern amenities for an unforgettable stay.',
    image: '/accomodation/premium city king.jpg',
    features: ['City Views', 'King-Sized Bed', 'Sophisticated Decor', 'Modern Amenities'],
  },
  {
    title: 'Premium City Twin',
    description: 'Featuring two single beds, offering more spacious accommodations with breathtaking city views, complemented by elegant furnishings and modern amenities for a truly comfortable and elevated stay.',
    image: '/accomodation/premium city twin.jpeg',
    features: ['Two Single Beds', 'City Views', 'Spacious', 'Elegant Furnishings'],
  },
  {
    title: 'Premium Sea View King',
    description: 'Wake up to refreshing views of the serene sea from your king-sized bed, where you can relax and unwind while enjoying the peaceful, scenic beauty right outside your window.',
    image: '/accomodation/premium sea view king.jpg',
    features: ['Sea Views', 'King-Sized Bed', 'Serene Atmosphere', 'Scenic Beauty'],
  },
  {
    title: 'Deluxe Family 2 Queen Bed',
    description: 'Our Deluxe Family Room features two spacious queen-sized beds, perfect for a restful stay. Ideal for families, this room offers plenty of space, modern amenities, and a comfortable setting for all.',
    image: '/accomodation/delux family 2 queen bed.jpg',
    features: ['Two Queen Beds', 'Family-Friendly', 'Spacious', 'Modern Amenities'],
  },
  {
    title: 'Deluxe Balcony King',
    description: 'A luxurious balcony room with a king-sized bed, offering a private outdoor space with stunning city and stadium views, combining comfort, elegance, and modern amenities for an unforgettable stay.',
    image: '/accomodation/delux balcony king.jpg',
    features: ['Private Balcony', 'King-Sized Bed', 'City & Stadium Views', 'Elegant Design'],
  },
  {
    title: 'Royal Suite',
    description: 'The Presidential Suite is the hotel\'s largest and most luxurious room, featuring expansive living areas, a private balcony with stunning views of the Burj Khalifa, Dubai skyline, and the Arabian Sea, offering the ultimate in comfort and sophistication.',
    image: '/accomodation/royal suit.jpg',
    features: ['Largest Suite', 'Expansive Living Areas', 'Private Balcony', 'Burj Khalifa Views', 'Arabian Sea Views'],
  },
]

export default function AccommodationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const itemsPerView = 3 // Show 3 cards at a time on desktop, 1 on mobile

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, roomTypes.length - itemsPerView)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, roomTypes.length - itemsPerView)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const visibleRooms = roomTypes.slice(currentIndex, currentIndex + itemsPerView)
  const maxIndex = Math.max(0, roomTypes.length - itemsPerView)

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Bed className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              ACCOMMODATION
            </h2>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Experience luxury and comfort in our thoughtfully designed rooms and suites
          </motion.p>
        </div>

        {/* Rooms Carousel */}
        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visibleRooms.map((room, idx) => {
              const actualIndex = currentIndex + idx
              return (
                <RoomCard key={`${room.title}-${currentIndex}`} room={room} index={actualIndex} inView={inView} />
              )
            })}
          </div>

          {/* Navigation Arrows */}
          {roomTypes.length > itemsPerView && (
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
          {roomTypes.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-amber-600 w-8'
                      : 'bg-gray-300 hover:bg-amber-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
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
  inView 
}: { 
  room: typeof roomTypes[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -15, scale: 1.05 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-amber-300 bg-white"
    >
      {/* Premium card background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-300/0 via-amber-200/30 to-amber-300/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        
        {/* Room Title Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-amber-200/50">
            <h3 
              className="text-sm md:text-base font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {room.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {room.description}
        </p>
        
        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-200"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                +{room.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Book Button */}
        <Link href="/rooms">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book a Stay
          </motion.button>
        </Link>
      </div>

      {/* Premium Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-300/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  )
}

