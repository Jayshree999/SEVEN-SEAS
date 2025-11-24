'use client'

import { motion } from 'framer-motion'

export default function FloatingGoldParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, #FFD700 0%, #D4AF37 100%)`,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(255, 215, 0, 0.8)`,
            opacity: Math.random() * 0.6 + 0.4,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

