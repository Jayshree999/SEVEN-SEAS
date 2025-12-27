'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from './DatePicker'
import { getMonthlyRent, getYearlyRent, createBookingWithPayment } from '@/lib/booking'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

import { Property } from '@/lib/api'

interface BookingFormProps {
  roomId: string
  roomName: string
  price: number
  monthlyRent?: number
  yearlyRent?: number
  property?: Property | null
  onBookingSuccess?: () => void
}

type BookingType = 'day' | 'month' | 'year' | null

export default function BookingForm({ roomId, roomName, price, monthlyRent: propMonthlyRent, yearlyRent: propYearlyRent, property, onBookingSuccess }: BookingFormProps) {
  const { isAuth, user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  })
  const [bookingType, setBookingType] = useState<BookingType>(null)
  const [monthlyRent, setMonthlyRent] = useState(propMonthlyRent || 0)
  const [yearlyRent, setYearlyRent] = useState(propYearlyRent || 0)
  const [loadingPrices, setLoadingPrices] = useState(!propMonthlyRent && !propYearlyRent)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const [showTotalDetails, setShowTotalDetails] = useState(false)

  // Close guest dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showGuestDropdown && !target.closest('.guest-dropdown-container')) {
        setShowGuestDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showGuestDropdown])

  useEffect(() => {
    // If prices are provided as props, use them. Otherwise, fetch from API
    if (propMonthlyRent || propYearlyRent) {
      setMonthlyRent(propMonthlyRent || 0)
      setYearlyRent(propYearlyRent || 0)
      setLoadingPrices(false)
    } else {
      const loadPrices = async () => {
        try {
          setLoadingPrices(true)
          const [monthly, yearly] = await Promise.all([
            getMonthlyRent(roomId),
            getYearlyRent(roomId),
          ])
          setMonthlyRent(monthly)
          setYearlyRent(yearly)
        } catch (error) {
          console.error('Error loading prices:', error)
        } finally {
          setLoadingPrices(false)
        }
      }
      loadPrices()
    }
  }, [roomId, propMonthlyRent, propYearlyRent])

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut && bookingType === 'day') {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }
    return 0
  }

  const nights = calculateNights()

  const calculateTotal = () => {
    if (bookingType === 'month') {
      return monthlyRent || 0
    } else if (bookingType === 'year') {
      return yearlyRent || 0
    } else {
      return nights * price
    }
  }

  const total = calculateTotal()

  // Get blocked dates from property bookings
  const getBlockedDates = (): string[] => {
    const blocked: string[] = []
    
    if (!property) return blocked

    // Get dates from blockedDates array
    if (property.blockedDates && Array.isArray(property.blockedDates)) {
      property.blockedDates.forEach((blockedDate: any) => {
        if (blockedDate.start && blockedDate.end) {
          const start = new Date(blockedDate.start)
          const end = new Date(blockedDate.end)
          const current = new Date(start)
          
          while (current <= end) {
            blocked.push(current.toISOString().split('T')[0])
            current.setDate(current.getDate() + 1)
          }
        } else if (blockedDate.date) {
          blocked.push(new Date(blockedDate.date).toISOString().split('T')[0])
        }
      })
    }

    // Get dates from bookings
    if (property.bookingInfo?.allBookings && Array.isArray(property.bookingInfo.allBookings)) {
      property.bookingInfo.allBookings.forEach((booking: any) => {
        if (booking.checkIn && booking.checkOut && booking.status !== 'Cancelled' && booking.status !== 'Fail') {
          const checkIn = new Date(booking.checkIn)
          const checkOut = new Date(booking.checkOut)
          const current = new Date(checkIn)
          
          // Block dates from check-in to check-out (excluding check-out day)
          while (current < checkOut) {
            blocked.push(current.toISOString().split('T')[0])
            current.setDate(current.getDate() + 1)
          }
        }
      })
    }

    // Get dates from availabilityCalendar
    if (property.bookingInfo?.availabilityCalendar?.bookedDates) {
      property.bookingInfo.availabilityCalendar.bookedDates.forEach((booking: any) => {
        if (booking.checkIn && booking.checkOut) {
          const checkIn = new Date(booking.checkIn)
          const checkOut = new Date(booking.checkOut)
          const current = new Date(checkIn)
          
          while (current < checkOut) {
            blocked.push(current.toISOString().split('T')[0])
            current.setDate(current.getDate() + 1)
          }
        }
      })
    }

    return Array.from(new Set(blocked)) // Remove duplicates
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuth) {
      router.push('/login?redirect=/rooms/' + roomId)
      return
    }

    if (!formData.checkIn || !formData.checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate nights based on booking type
      const calculatedNights = bookingType === 'day' 
        ? nights 
        : bookingType === 'month' 
        ? 30 
        : bookingType === 'year' 
        ? 365 
        : nights

      // Calculate subtotal (base rent before fees)
      const subtotal = total

      // Calculate management fees (10% of rent, or use default)
      const manageMentFees = total * 0.1

      // Calculate income (rent - management fees)
      const income = total - manageMentFees

      if (!user?._id) {
        throw new Error('User not found. Please log in again.')
      }

      const bookingData: any = {
        userId: user._id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guest: formData.guests.toString(),
        property: roomId,
        nights: calculatedNights,
        rent: total,
        subtotal: subtotal,
        totalAmount: total,
        isMonthlyBooking: bookingType === 'month',
        isYearlyBooking: bookingType === 'year',
        monthlyPrice: bookingType === 'month' ? monthlyRent : undefined,
        yearlyPrice: bookingType === 'year' ? yearlyRent : undefined,
        bookingType: bookingType || 'day',
      }

      // Create payment session
      const paymentData = await createBookingWithPayment(bookingData)
      
      if (paymentData?.checkoutUrl) {
        // Redirect to payment gateway
        window.location.href = paymentData.checkoutUrl
      } else {
        throw new Error('Payment gateway error: No checkout URL received')
      }
    } catch (error: any) {
      alert(error.message || 'Failed to create booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBookingTypeSelect = (type: 'month' | 'year') => {
    setBookingType(type)
    // Set dates for monthly (30 days) or yearly (365 days)
    const today = new Date()
    const checkIn = today.toISOString().split('T')[0]
    const checkOut = new Date(today)
    if (type === 'month') {
      checkOut.setDate(checkOut.getDate() + 30)
    } else {
      checkOut.setDate(checkOut.getDate() + 365)
    }
    setFormData({
      ...formData,
      checkIn,
      checkOut: checkOut.toISOString().split('T')[0],
    })
  }

  const minCheckOutDate = formData.checkIn 
    ? new Date(new Date(formData.checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : undefined

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          label="Check-in"
            value={formData.checkIn}
          onChange={(date) => {
            setFormData({ ...formData, checkIn: date })
            setBookingType(bookingType === 'month' || bookingType === 'year' ? bookingType : 'day')
          }}
          minDate={new Date().toISOString().split('T')[0]}
          pricePerNight={price}
          blockedDates={getBlockedDates()}
          dailyPrices={property?.dailyPrices || []}
          propertyId={roomId}
        />
        <DatePicker
          label="Check-out"
            value={formData.checkOut}
          onChange={(date) => {
            setFormData({ ...formData, checkOut: date })
            setBookingType(bookingType === 'month' || bookingType === 'year' ? bookingType : 'day')
          }}
          minDate={minCheckOutDate}
          pricePerNight={price}
          blockedDates={getBlockedDates()}
          dailyPrices={property?.dailyPrices || []}
          propertyId={roomId}
        />
      </div>

      {/* Guest Count */}
      <div className="relative guest-dropdown-container">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
        <button
          type="button"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <span className="text-gray-900">{formData.guests} {formData.guests === 1 ? 'guest' : 'guests'}</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {showGuestDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, guests: num })
                    setShowGuestDropdown(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors ${
                    formData.guests === num ? 'bg-amber-50 font-semibold' : ''
                  }`}
                >
                  {num} {num === 1 ? 'guest' : 'guests'}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Total Before Taxes */}
      {(formData.checkIn && formData.checkOut) && (
      <div className="border-t-2 border-gray-200 pt-4">
          <button
            type="button"
            onClick={() => setShowTotalDetails(!showTotalDetails)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-sm font-semibold text-gray-700">Total before taxes</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{total.toLocaleString()} AED</span>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${showTotalDetails ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {showTotalDetails && bookingType === 'day' && (
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{nights} {nights === 1 ? 'night' : 'nights'} × {price.toLocaleString()} AED</span>
                <span>{(nights * price).toLocaleString()} AED</span>
          </div>
            </div>
          )}
            </div>
          )}

      {/* Monthly and Yearly Stay Options */}
      {(monthlyRent > 0 || yearlyRent > 0) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Looking for a longer stay?</h3>
          <div className="grid grid-cols-2 gap-4">
            {monthlyRent > 0 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  bookingType === 'month' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleBookingTypeSelect('month')}
              >
                <h4 className="font-bold text-gray-900 mb-1">Monthly Stay</h4>
                <p className="text-sm text-gray-600 mb-3">30-day booking at special rate</p>
                <div className="text-2xl font-bold text-blue-600 mb-3">
                  {monthlyRent.toLocaleString()} AED
            </div>
                <button
                  type="button"
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    bookingType === 'month'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {bookingType === 'month' ? 'Selected' : 'Select'}
                </button>
              </motion.div>
            )}

            {yearlyRent > 0 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  bookingType === 'year' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleBookingTypeSelect('year')}
              >
                <h4 className="font-bold text-gray-900 mb-1">Yearly Stay</h4>
                <p className="text-sm text-gray-600 mb-1">365-day booking at special rate</p>
                <p className="text-xs text-gray-500 mb-3">Split into 4 easy installments</p>
                <div className="text-2xl font-bold text-green-600 mb-3">
                  {yearlyRent.toLocaleString()} AED
            </div>
                <button
                  type="button"
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    bookingType === 'year'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {bookingType === 'year' ? 'Selected' : 'Select'}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.checkIn || !formData.checkOut}
        whileHover={{ scale: isSubmitting || !formData.checkIn || !formData.checkOut ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting || !formData.checkIn || !formData.checkOut ? 1 : 0.98 }}
        className="w-full px-6 py-4 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
      >
        {isSubmitting ? 'Processing...' : !isAuth ? 'Sign In to Book' : 'Book Now'}
      </motion.button>

      <p className="text-xs text-gray-500 text-center">
        By booking, you agree to our Terms & Conditions and Privacy Policy
      </p>
    </form>
  )
}
