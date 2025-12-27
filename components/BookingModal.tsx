'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookingForm from './BookingForm'
import { Property } from '@/lib/api'

interface BookingModalProps {
  roomId: string
  roomName: string
  price: number
  monthlyRent?: number
  yearlyRent?: number
  property?: Property | null
  onBookingSuccess?: () => void
}

export default function BookingModal({ roomId, roomName, price, monthlyRent, yearlyRent, property, onBookingSuccess }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleBookingSuccess = () => {
    setIsOpen(false)
    if (onBookingSuccess) {
      onBookingSuccess()
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 relative overflow-hidden rounded-lg sm:rounded-xl text-sm sm:text-base whitespace-nowrap"
      >
        <span className="relative z-10">Book This Room</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 text-2xl sm:text-3xl z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  &times;
                </button>

                {/* Header */}
                <div className="mb-4 sm:mb-6 pr-8 sm:pr-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Book Your Stay
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">Complete your reservation</p>
                </div>

                {/* Content */}
                <BookingForm 
                  roomId={roomId} 
                  roomName={roomName} 
                  price={price}
                  monthlyRent={monthlyRent}
                  yearlyRent={yearlyRent}
                  property={property}
                  onBookingSuccess={handleBookingSuccess}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

