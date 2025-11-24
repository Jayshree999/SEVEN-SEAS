'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ImageBannerProps {
  imageUrl?: string
  title?: string
  subtitle?: string
  height?: 'small' | 'medium' | 'large' | 'full'
  overlay?: boolean
  textPosition?: 'left' | 'center' | 'right'
  className?: string
}

export default function ImageBanner({
  imageUrl,
  title,
  subtitle,
  height = 'medium',
  overlay = true,
  textPosition = 'center',
  className = '',
}: ImageBannerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const heightClasses = {
    small: 'h-64',
    medium: 'h-96',
    large: 'h-[500px]',
    full: 'h-screen',
  }

  const textAlignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={`relative ${heightClasses[height]} overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {imageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-9xl font-bold">
              {title?.charAt(0) || 'H'}
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      )}

      {/* Content */}
      {(title || subtitle) && (
        <div className={`relative z-10 h-full flex flex-col justify-end p-8 md:p-12 ${textAlignClasses[textPosition]}`}>
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 relative"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              <span className="relative z-10">{title}</span>
              <span className="absolute inset-0 luxury-shimmer opacity-20"></span>
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  )
}

