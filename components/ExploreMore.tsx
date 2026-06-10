'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const amenities = [
  {
    title: 'LONG STAY OFFERS',
    image: '/explore/explore-1.jpeg',
    link: '/offers-and-more',
  },
  {
    title: 'STAYCATION OFFER',
    image: '/explore/explore-2.jpeg',
    link: '/offers-and-more',
  },
  {
    title: 'LUNCH & DINNER BUFFET',
    image: '/explore/explore-3.jpeg',
    link: '/offers-and-more',
  },
  {
    title: 'THAMBURUU RESTOBAR',
    image: '/explore/explore-4.jpeg',
    link: '/offers-and-more',
  },
  {
    title: 'WEEKEND DRUNCH',
    image: '/explore/explore-5.jpeg',
    link: '/offers-and-more',
  },
  {
    title: 'BANQUETS & CELEBRATIONS',
    image: '/explore/explore-6.jpeg',
    link: '/offers-and-more',
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
                LATEST
                <br />
                OFFERS
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
                Dive into cool adventures at our picture-perfect destinations with Seven Seas Hotel.
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
    <Link href={amenity.link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="group relative aspect-square w-full overflow-hidden rounded-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent bg-white"
      >
        <div className="absolute inset-0 bg-[#f8f6f0]">
          <Image
            src={amenity.image}
            alt={amenity.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          />
          {/* Premium Gradient Overlay - Refined */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Caption Badge - Clean and elegant */}
        <div className="absolute bottom-4 left-4 right-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h3
            className="text-lg font-bold text-white tracking-widest text-center"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {amenity.title}
          </h3>
          <div className="w-12 h-[1px] bg-amber-400 mx-auto mt-2"></div>
        </div>
      </motion.div>
    </Link>
  )
}

