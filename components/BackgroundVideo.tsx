'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface BackgroundVideoProps {
  videoUrl?: string
  className?: string
  opacity?: number
  videoType?: string
  isMuted?: boolean
}

export default function BackgroundVideo({
  videoUrl,
  className = '',
  opacity = 0.3,
  videoType = 'video/mp4',
  isMuted = true,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (videoRef.current && inView && isMounted) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  }, [inView, isMounted])

  if (!videoUrl) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-black ${className}`} />
    )
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      {isMounted && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          style={{
            opacity,
            filter: 'none',
            transform: 'translateZ(0)',
            willChange: 'auto',
            imageRendering: 'auto',
            ...({ WebkitImageRendering: 'auto' } as React.CSSProperties)
          }}
        >
          <source src={videoUrl} type={videoType} />
        </video>
      )}
    </div>
  )
}

