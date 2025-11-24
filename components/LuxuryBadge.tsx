'use client'

import { motion } from 'framer-motion'

interface LuxuryBadgeProps {
  text: string
  variant?: 'gold' | 'black' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export default function LuxuryBadge({ text, variant = 'gold', size = 'md' }: LuxuryBadgeProps) {
  const variantClasses = {
    gold: 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black',
    black: 'bg-black text-white',
    white: 'bg-white text-black border-2 border-black',
  }

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${variantClasses[variant]} ${sizeClasses[size]} font-bold uppercase tracking-wider rounded-full inline-block luxury-glow`}
    >
      {text}
    </motion.div>
  )
}

