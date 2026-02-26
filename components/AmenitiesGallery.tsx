'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const amenities = [
  {
    title: 'SPA & WELLNESS',
    image: '/SPA.png',
  },
  {
    title: 'FITNESS & GYM',
    image: '/Gym.png',
  },
  {
    title: 'SWIMMING POOL',
    image: '/DSC02661-2048x1365.jpg',
  },
  {
    title: 'SIGNATURE DINING',
    image: '/Salt.webp',
  },
  {
    title: 'ARABIC CUISINE',
    image: '/Nahas-al-Blad.webp',
  },
  {
    title: 'INDIAN CUISINE',
    image: '/Delhi-6.png',
  },
  {
    title: 'MEETINGS & CONFERENCES',
    image: '/Meeting-Room.png',
  },
  {
    title: 'EVENTS & BANQUETS',
    image: '/banquet-4.png',
  },
  {
    title: 'TIMELESS WEDDINGS',
    image: '/Wedding.png',
  },
]

export default function AmenitiesGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/5 via-transparent to-amber-100/5 rounded-full blur-3xl"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Elegant border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            OUR AMENITIES
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the world-class facilities and experiences that make Seven Seas Hotel your perfect destination
          </p>
        </motion.div>

        {/* Amenities Grid - Premium Gallery */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {amenities.map((amenity, index) => (
            <AmenityGalleryCard key={amenity.title} amenity={amenity} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AmenityGalleryCard({
  amenity,
  index,
  inView
}: {
  amenity: typeof amenities[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-none cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-white"
    >
      {/* Premium card background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/0 via-amber-100/10 to-amber-200/0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={amenity.image}
          alt={amenity.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5"></div>
        {/* Subtle inner glow */}
        <div className="absolute inset-0 ring-1 ring-white/10"></div>
      </div>

      {/* Title Badge - Premium Design */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: index * 0.08 + 0.15, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-none shadow-2xl border border-gray-100"
        >
          <h3
            className="text-xs md:text-sm font-bold text-gray-900 tracking-[0.2em] uppercase text-center"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {amenity.title}
          </h3>
        </motion.div>
      </div>

      {/* Premium Border Glow on Hover */}
      <div className="absolute inset-0 rounded-none border border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none"></div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  )
}


