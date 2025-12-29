'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Music, Sparkles } from 'lucide-react'

const venues = [
  {
    title: 'BAAZIGAR',
    image: '/russian-belly-dancer-r1n13tqyv4wa4d8wi79pk0zwuej9wxn0rzr4nczv1q.jpg',
    description: 'Catch every game live with an unbeatable atmosphere & refreshing drinks. The ultimate destination for sports lovers!',
  },
  {
    title: "GEOFREY'S SPORTS BAR",
    image: '/WhatsApp-Image-2025-02-17-at-5.41.40-PM-r1n18v5ti5smd3xe2vopf97vhrp46in7sxnu9rivou.jpeg',
    description: 'Feel the beat, own the night! Experience electrifying music, dazzling lights, and an unforgettable party vibe at Rhythm Nightclub.',
  },
  {
    title: 'OVO CLUB',
    image: '/OVO-revnlf3x7tabbdepouclc6803qagbm0zetfdwyr7ce.png',
    description: 'Sip, savor, and unwind with a premium selection of spirits and cocktails in a stylish, laid-back ambiance.',
  },
]

export default function NightlifeSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Ultra Premium Background Elements - Dark Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luxury gradient orbs - Enhanced with purple/blue for nightlife */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-amber-400/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 via-purple-500/15 to-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-400/8 via-pink-400/4 to-amber-300/4 rounded-full blur-[120px]"></div>
        
        {/* Additional luxury accents */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-2xl"></div>
        
        {/* Premium pattern overlay - Subtle */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zM16.667 37.5c0-5.75-4.75-10.5-10.5-10.5S-4.833 31.75-4.833 37.5.083 48 5.833 48s10.834-4.75 10.834-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5S-8.167 29.492-8.167 37.5-1.675 52 6.333 52s14.5-6.492 14.5-14.5zM56.667 37.5c0-5.75-4.75-10.5-10.5-10.5s-10.5 4.75-10.5 10.5 4.75 10.5 10.5 10.5 10.5-4.75 10.5-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Elegant border lines - Enhanced with glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 via-pink-400/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 via-pink-400/40 to-transparent"></div>
        
        {/* Side accent lines */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-purple-300/20 to-transparent"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-pink-300/20 to-transparent"></div>
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
                <Music className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 animate-pulse" />
              </div>
              <div>
                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  THE ULTIMATE PLAYGROUND
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl">FOR STARS & NIGHTLIFE LOVERS!</span>
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
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium">
                Step into a world of excitement where sports, music, and premium drinks come together for an unforgettable time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Venues Grid - Ultra Premium & Super Rich */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {venues.map((venue, index) => (
            <VenueCard key={venue.title} venue={venue} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VenueCard({ 
  venue, 
  index, 
  inView 
}: { 
  venue: typeof venues[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-2xl cursor-pointer shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_80px_-10px_rgba(139,92,246,0.4)] transition-all duration-500 border border-purple-500/20 bg-white backdrop-blur-sm"
    >
      {/* Premium card background glow - Enhanced with purple/pink */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-pink-500/30 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
      
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={venue.image}
          alt={venue.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
        />
        {/* Ultra Premium Gradient Overlay - Darker for nightlife */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
        {/* Enhanced inner glow */}
        <div className="absolute inset-0 ring-2 ring-purple-400/20"></div>
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      {/* Content Overlay - Premium Design */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-10">
        {/* Venue Name Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          className="mb-3"
        >
          <div className="bg-gradient-to-r from-amber-500/95 to-amber-600/95 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-amber-400/50 inline-block">
            <h3 
              className="text-sm md:text-base font-bold text-white whitespace-nowrap tracking-wide"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {venue.title}
            </h3>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-white/50"
        >
          <p className="text-[10px] md:text-xs text-gray-800 leading-relaxed font-medium">
            {venue.description}
          </p>
        </motion.div>
      </div>

      {/* Premium Border Glow on Hover - Enhanced with purple/pink */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500 pointer-events-none ring-2 ring-white/0 group-hover:ring-pink-300/30"></div>
      
      {/* Luxury corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating particles effect on hover - Purple/Pink theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.8s' }}></div>
      </div>
    </motion.div>
  )
}


