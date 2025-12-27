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
]

export default function ExploreMore() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
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
        {/* Header Section - Ultra Compact & Premium */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                EXPLORE
                <br />
                MORE
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 max-w-lg"
            >
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Relaxing beach paradises, thrilling urban getaways, exotic hill stations and historic homes of royalty are all within reach.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Amenities Grid - Ultra Compact & Super Rich */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {amenities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AmenityCard({ 
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-xl cursor-pointer shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 border border-gray-300/30 bg-white backdrop-blur-sm"
    >
      {/* Premium card background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/0 via-amber-100/20 to-amber-200/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={amenity.image}
          alt={amenity.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
        />
        {/* Premium Gradient Overlay - Richer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5"></div>
        {/* Subtle inner glow */}
        <div className="absolute inset-0 ring-1 ring-white/10"></div>
      </div>

      {/* Caption Badge - Super Premium & Compact */}
      <div className="absolute bottom-3 right-3 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: index * 0.08 + 0.15, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/98 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-200/90"
        >
          <h3 
            className="text-xs md:text-sm font-bold text-gray-900 whitespace-nowrap tracking-wide"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {amenity.title}
          </h3>
        </motion.div>
      </div>

      {/* Premium Border Glow on Hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/40 transition-all duration-500 pointer-events-none ring-1 ring-white/0 group-hover:ring-white/20"></div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  )
}

