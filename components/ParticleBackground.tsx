'use client'

import { useMemo } from 'react'

// Optimized: Reduced particles and using CSS animations
export default function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.2 + 0.1,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-black particle-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  )
}
