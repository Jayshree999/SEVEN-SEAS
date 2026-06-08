'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Calendar, Sparkles } from 'lucide-react'
import Link from 'next/link'

const events = [
  {
    title: 'Destination Wedding',
    image: '/Wedding.png',
    link: '/weddings',
  },
  {
    title: 'Mehfil Ballroom',
    image: '/banquet-4.png',
    link: '/weddings',
  },
]

export default function WeddingsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Ultra Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luxury gradient orbs - Enhanced */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-amber-200/15 to-transparent rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-amber-300/25 via-amber-200/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-200/8 via-amber-100/4 to-amber-200/8 rounded-full blur-[120px]"></div>

        {/* Additional luxury accents */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl"></div>

        {/* Premium pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zM16.667 37.5c0-5.75-4.75-10.5-10.5-10.5S-4.833 31.75-4.833 37.5.083 48 5.833 48s10.834-4.75 10.834-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5S-8.167 29.492-8.167 37.5-1.675 52 6.333 52s14.5-6.492 14.5-14.5zM56.667 37.5c0-5.75-4.75-10.5-10.5-10.5s-10.5 4.75-10.5 10.5 4.75 10.5 10.5 10.5 10.5-4.75 10.5-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Elegant border lines - Enhanced */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>

        {/* Side accent lines */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Ultra Premium & Compact */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            {/* Title with Icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 flex items-center gap-3"
            >
              <div className="relative">
                <Calendar className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Dubai Iconic City
                  <br />
                  Weddings
                </h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 max-w-2xl"
            >
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                Seven Seas Hotel elevates every occasion into an awe-inspiring, immersive experience to cherish forever.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Events Grid - Ultra Premium & Super Rich */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-4 md:gap-5">
          {events.map((event, index) => (
            <EventCard key={event.title} event={event} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EventCard({
  event,
  index,
  inView
}: {
  event: typeof events[0]
  index: number
  inView: boolean
}) {
  return (
    <Link href={event.link}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -6 }}
        className="group relative h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-none cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-white"
      >
        {/* Premium card background glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-300/0 via-amber-200/10 to-amber-300/0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>

        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          />
          {/* Ultra Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5"></div>
          {/* Enhanced inner glow */}
          <div className="absolute inset-0 ring-2 ring-white/15"></div>
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        {/* Content Overlay - Premium Design */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-10">
          {/* Event Name Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            className="w-full"
          >
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-none shadow-2xl border border-white/20 text-center">
              <h3
                className="text-sm md:text-base font-bold text-white tracking-wide"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {event.title}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Premium Border Glow on Hover */}
        <div className="absolute inset-0 rounded-none border border-transparent group-hover:border-amber-400/30 transition-all duration-500 pointer-events-none"></div>

        {/* Luxury corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-400/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating particles effect on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-amber-200/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-300/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </motion.div>
    </Link>
  )
}


