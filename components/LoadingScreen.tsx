'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/30 via-amber-100/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/30 via-amber-100/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Seven Seas Hotel Dubai"
            width={250}
            height={80}
            className="h-20 w-auto object-contain mx-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
        
        {/* Loading Spinner - Premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 border-4 border-amber-200 rounded-full"
            />
            <motion.div
              className="absolute inset-0 border-4 border-amber-600 rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 font-semibold text-lg"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Loading Luxury Experience...
        </motion.p>
      </div>
    </motion.div>
  )
}

