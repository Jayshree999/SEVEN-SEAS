'use client'

import { useMemo, useState, useEffect } from 'react'

// Optimized: Use CSS animations instead of Framer Motion for better performance
export default function FloatingGoldParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize particle data to prevent recalculation on every render
  const particles = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.3,
    }))
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full particle-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: 'radial-gradient(circle, #FFD700 0%, #D4AF37 100%)',
            boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)',
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)', // GPU acceleration
          }}
        />
      ))}
    </div>
  )
}

