'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Waves, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function OasisRooftopPoolbar() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="pt-12 md:pt-16 pb-0 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-blue-50/50 via-white to-cyan-50/50 relative overflow-hidden" style={{ marginBottom: '-150px', paddingBottom: '0' }}>
      {/* Ultra Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luxury gradient orbs - Blue/Cyan theme for pool/water */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/25 via-cyan-300/15 to-amber-200/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-400/25 via-blue-300/15 to-amber-200/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-200/8 via-cyan-100/4 to-amber-100/4 rounded-full blur-[120px]"></div>
        
        {/* Additional luxury accents */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-full blur-2xl"></div>
        
        {/* Premium pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306B6D4' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zM16.667 37.5c0-5.75-4.75-10.5-10.5-10.5S-4.833 31.75-4.833 37.5.083 48 5.833 48s10.834-4.75 10.834-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5S-8.167 29.492-8.167 37.5-1.675 52 6.333 52s14.5-6.492 14.5-14.5zM56.667 37.5c0-5.75-4.75-10.5-10.5-10.5s-10.5 4.75-10.5 10.5 4.75 10.5 10.5 10.5 10.5-4.75 10.5-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Elegant border lines - Enhanced */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 via-cyan-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 via-cyan-300/40 to-transparent"></div>
        
        {/* Side accent lines */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-blue-200/30 to-transparent"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-cyan-200/30 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Ultra Premium & Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-1 md:mb-2 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Waves className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm md:text-base text-blue-600 font-semibold tracking-wide uppercase mb-2">
                Where the Sky Meets the Water
              </p>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                OASIS ROOFTOP
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl">POOLBAR</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Image Showcase - Ultra Premium & Super Rich */}
        <Link href="/dining">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="group relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl cursor-pointer shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_80px_-10px_rgba(59,130,246,0.4)] transition-all duration-500 border border-blue-200/30 bg-white backdrop-blur-sm"
          style={{ marginBottom: 0 }}
        >
          {/* Premium card background glow - Enhanced with blue/cyan */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-cyan-400/30 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
          
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src="/DSC02655-scaled.jpg"
              alt="Oasis Rooftop Poolbar"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              priority
            />
            {/* Ultra Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            {/* Enhanced inner glow */}
            <div className="absolute inset-0 ring-2 ring-blue-400/20"></div>
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Content Overlay - Premium Design with CTA */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 w-full"
            >
              {/* Text Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-lg shadow-xl border border-white/80 inline-block mb-3"
                >
                  <p className="text-xs md:text-sm text-blue-600 font-semibold tracking-wide uppercase">
                    Where the Sky Meets the Water
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-600/95 to-cyan-600/95 backdrop-blur-md px-5 py-3 rounded-lg shadow-xl border border-blue-400/50 inline-block"
                >
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    OASIS ROOFTOP POOLBAR
                  </h3>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="group/btn relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-2xl border-2 border-amber-400/50 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span className="relative z-10 text-sm md:text-base uppercase tracking-wide">
                    Make a reservation
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Premium Border Glow on Hover - Enhanced with blue/cyan */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500 pointer-events-none ring-2 ring-white/0 group-hover:ring-cyan-300/30"></div>
          
          {/* Luxury corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating particles effect on hover - Blue/Cyan theme */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.6s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.8s' }}></div>
          </div>
        </motion.div>
        </Link>
      </div>
    </section>
  )
}


