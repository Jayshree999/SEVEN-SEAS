'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Newspaper, Calendar, ArrowRight } from 'lucide-react'

import { newsItems } from '@/data/news'

export default function NewsEvents() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 flex items-center gap-3"
            >
              <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
              <div>
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  NEWS &
                  <br />
                  EVENTS
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 max-w-2xl"
            >
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium mb-2">
                Stay updated with the latest happenings, exclusive events, and exciting announcements.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                From special offers to industry insights, explore what's new and stay connected with all the action.
              </p>
            </motion.div>
          </div>
        </div>

        {/* News Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <NewsCard key={item.slug} item={item} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsCard({ 
  item, 
  index, 
  inView 
}: { 
  item: typeof newsItems[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -15, scale: 1.05 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-amber-300 bg-white"
    >
      {/* Make the whole card clickable */}
      <Link href={`/news/${item.slug}`} className="absolute inset-0 z-20" aria-label={`Read more about ${item.title}`} />
      
      {/* Premium card background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-300/0 via-amber-200/30 to-amber-300/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-amber-200/50">
            <span className="text-xs font-semibold text-amber-700">{item.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{item.date}</span>
        </div>
        
        <h3 
          className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {item.excerpt}
        </p>

        {/* Read More Visual Indicator (Not a Link anymore, just visual) */}
        <div className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm group/link">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Premium Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-300/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  )
}

