'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface VideoSectionProps {
  videoUrl?: string
  title: string
  description?: string
  thumbnail?: string
  position?: 'left' | 'right' | 'center'
}

export default function VideoSection({
  videoUrl,
  title,
  description,
  thumbnail,
  position = 'center',
}: VideoSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const handlePlay = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        setIsLoading(true)
        await videoRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error playing video:', error)
      setIsLoading(false)
      // Try unmuting and playing again (some browsers require user interaction)
      if (videoRef.current) {
        videoRef.current.muted = true
        try {
          await videoRef.current.play()
          setIsPlaying(true)
        } catch (e) {
          console.error('Error playing video after unmuting:', e)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const positionClasses = {
    left: 'md:flex-row',
    right: 'md:flex-row-reverse',
    center: 'flex-col md:flex-row md:justify-center',
  }

  return (
    <section
      ref={ref}
      className="py-20 px-6 bg-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div className={`flex flex-col ${positionClasses[position]} gap-12 items-center`}>
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)' }}
            className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden shadow-2xl group premium-border luxury-glow"
          >
            {videoUrl ? (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={thumbnail}
                  onClick={handlePlay}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                  <div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 cursor-pointer"
                    onClick={handlePlay}
                  >
                    {isLoading ? (
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlay()
                        }}
                        className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center group-hover:bg-white/30 transition-colors"
                        aria-label="Play video"
                      >
                        <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                )}
                {isPlaying && (
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={handlePlay}
                    aria-label="Pause video"
                  >
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-white/30 text-8xl font-bold">{title.charAt(0)}</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center"
                >
                  <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: position === 'right' ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              {title}
            </h2>
            {description && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

