'use client'

import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface BackgroundVideoProps {
  videoUrl?: string
  className?: string
  opacity?: number
}

export default function BackgroundVideo({
  videoUrl,
  className = '',
  opacity = 0.3,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (videoRef.current && inView) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  }, [inView])

  if (!videoUrl) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-black ${className}`} />
    )
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ 
          opacity,
          filter: 'none',
          transform: 'translateZ(0)',
          willChange: 'auto',
          imageRendering: 'auto',
          WebkitImageRendering: 'auto'
        }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  )
}

