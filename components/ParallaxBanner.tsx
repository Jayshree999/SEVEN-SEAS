'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxBannerProps {
  imageUrl?: string
  title: string
  subtitle?: string
  height?: number
}

export default function ParallaxBanner({ imageUrl, title, subtitle, height = 500 }: ParallaxBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  return (
    <div ref={ref} className={`relative h-[${height}px] overflow-hidden`} style={{ height: `${height}px` }}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      >
        {imageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-9xl font-bold">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}

