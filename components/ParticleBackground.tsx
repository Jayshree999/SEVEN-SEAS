'use client'

import { motion } from 'framer-motion'

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-black"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}
