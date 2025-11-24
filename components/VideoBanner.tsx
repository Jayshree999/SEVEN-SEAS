'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface VideoBannerProps {
  videoUrl?: string
  title?: string
  subtitle?: string
  height?: 'small' | 'medium' | 'large' | 'full'
  textPosition?: 'left' | 'center' | 'right'
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  overlay?: boolean
  className?: string
}

export default function VideoBanner({
  videoUrl,
  title,
  subtitle,
  height = 'large',
  autoplay = true,
  loop = true,
  muted = true,
  overlay = true,
  textPosition = 'center',
  className = '',
}: VideoBannerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (videoRef.current && autoplay && inView) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
      setIsPlaying(true)
    }
  }, [inView, autoplay])

  const heightClasses = {
    small: 'h-64',
    medium: 'h-96',
    large: 'h-[600px]',
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
      transition={{ duration: 1 }}
      className={`relative ${heightClasses[height]} overflow-hidden ${className}`}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/20 text-9xl font-bold">
                {title?.charAt(0) || 'V'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      )}

      {/* Content */}
      {(title || subtitle) && (
        <div className={`relative z-10 h-full flex flex-col justify-end p-8 md:p-16 ${textAlignClasses[textPosition]}`}>
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-bold text-white mb-4 relative"
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
              transition={{ delay: 0.5 }}
              className="text-xl md:text-3xl text-white/90 max-w-3xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}

      {/* Play Button Overlay (if video not autoplaying) */}
      {!isPlaying && videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play()
                setIsPlaying(true)
              }
            }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group hover:bg-white/30 transition-colors"
          >
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

