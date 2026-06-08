'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'
import { useCurrency } from '@/contexts/CurrencyContext'
import { fetchProperties, Property } from '@/lib/api'
import { createBooking, createBookingWithPayment, BookingData } from '@/lib/booking'
import { toast } from 'sonner'
import { Calendar, Users, CreditCard, User, CheckCircle2, Lock, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react'
import Link from 'next/link'

// Mapping of external Exely room-types to our local property IDs
const EXELY_ROOM_MAPPING: { [key: string]: string } = {
  '5048564': '69487bfdef489742dc309150', // Executive Suite
  '5048568': '69487bfdef489742dc309151', // Premium King Room
  '5048569': '69487bfdef489742dc309152', // Premium Twin Room
  '5048563': '69487bfdef489742dc309153', // Premium City King
  '5048567': '69487bfdef489742dc309154', // Premium City Twin
  '5048566': '69487bfdef489742dc309155', // Premium Sea View King
  '5048573': '69487bfdef489742dc309156', // Deluxe Family 2 Queen Bed
  '5048562': '69487bfdef489742dc309156', // Deluxe Family 2 Queen Bed (secondary id)
  '5048565': '69487bfdef489742dc309157', // Deluxe Balcony King
  '5049491': '69487bfdef489742dc309158', // Royal Suite
}

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuth, user, login, signup } = useAuth()
  const { formatPrice, currency } = useCurrency()

  const [properties, setProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [loadingRooms, setLoadingRooms] = useState(true)

  // Booking Form State
  const [step, setStep] = useState(1)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [specialRequests, setSpecialRequests] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'hotel' | 'online'>('hotel')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auth form states (for inline auth)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Default dates
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 3)

    setCheckIn(tomorrow.toISOString().split('T')[0])
    setCheckOut(dayAfter.toISOString().split('T')[0])
  }, [])

  // Load Rooms
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoadingRooms(true)
        const response = await fetchProperties()
        const rooms = response.data?.properties || []
        setProperties(rooms)

        // Determine pre-selected room
        const roomQuery = searchParams.get('room')
        const roomTypeQuery = searchParams.get('room-type')

        let preselectedId = ''
        if (roomQuery) {
          preselectedId = roomQuery
        } else if (roomTypeQuery) {
          preselectedId = EXELY_ROOM_MAPPING[roomTypeQuery] || ''
        }

        if (preselectedId) {
          const matched = rooms.find((r) => r._id === preselectedId)
          if (matched) setSelectedProperty(matched)
        } else if (rooms.length > 0) {
          setSelectedProperty(rooms[0])
        }
      } catch (err) {
        console.error('Error loading rooms for booking page:', err)
        toast.error('Failed to load rooms. Please refresh.')
      } finally {
        setLoadingRooms(false)
      }
    }

    loadRooms()
  }, [searchParams])

  // Calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 0
  }

  const nights = calculateNights()
  const pricePerNight = selectedProperty?.price || 0
  const totalAmount = pricePerNight * nights

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedProperty) {
        toast.error('Please select a room')
        return
      }
      if (!checkIn || !checkOut) {
        toast.error('Please select dates')
        return
      }
      if (new Date(checkIn) >= new Date(checkOut)) {
        toast.error('Check-out date must be after check-in date')
        return
      }
      if (new Date(checkIn) < new Date(new Date().setHours(0,0,0,0))) {
        toast.error('Check-in date cannot be in the past')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!isAuth) {
        toast.error('Please sign in or register to continue')
        return
      }
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleInlineAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    try {
      if (authMode === 'login') {
        if (!email || !password) {
          toast.error('Please fill in all fields')
          setAuthLoading(false)
          return
        }
        await login({ email, password })
        toast.success('Successfully logged in')
      } else {
        if (!email || !password || !fullName) {
          toast.error('Please fill in all required fields')
          setAuthLoading(false)
          return
        }
        await signup({ email, password, fullName, phone })
        toast.success('Registration successful')
      }
      setStep(3)
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleConfirmBooking = async () => {
    if (!isAuth || !selectedProperty) return
    setIsSubmitting(true)

    const bookingData: BookingData = {
      checkIn,
      checkOut,
      guest: guests,
      property: selectedProperty._id,
      nights,
      rent: pricePerNight,
      totalAmount,
      bookingType: 'daily',
    }

    try {
      if (paymentMethod === 'hotel') {
        const response = await createBooking(bookingData)
        toast.success('Booking created successfully!')
        const orderId = response.data?._id || response.data?.id
        const reference = response.data?.bookingId || response.data?.reference || ''
        router.push(`/payment/success?orderId=${orderId}&reference=${reference}`)
      } else {
        const paymentSession = await createBookingWithPayment(bookingData)
        if (paymentSession?.url) {
          toast.info('Redirecting to secure payment...')
          window.location.href = paymentSession.url
        } else {
          throw new Error('Payment session URL not returned')
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to complete booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#222]">
      <Navigation />

      {/* Hero Header */}
      <div className="pt-32 pb-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50 to-transparent text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          Book Your Stay
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Experience a luxurious retreat in the heart of Dubai at Seven Seas Hotel
        </p>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-2 mt-8 max-w-md mx-auto">
          {[
            { step: 1, label: 'Room & Dates' },
            { step: 2, label: 'Guest Details' },
            { step: 3, label: 'Payment' }
          ].map((item, idx) => (
            <div key={item.step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= item.step ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > item.step ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                </div>
                <span className={`text-[11px] font-semibold tracking-wider uppercase ${
                  step >= item.step ? 'text-amber-800' : 'text-gray-400'
                }`}>{item.label}</span>
              </div>
              {idx < 2 && (
                <div className={`h-[2px] flex-1 mx-2 transition-colors ${
                  step > item.step ? 'bg-amber-600' : 'bg-gray-200'
                }`} style={{ minWidth: '40px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="px-4 sm:px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Wizard Form - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white border border-gold/10 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6"
                >
                  <h3 className="text-2xl font-bold text-charcoal border-b border-gray-100 pb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    <Calendar className="w-5 h-5 text-amber-600" />
                    Select Dates & Accommodations
                  </h3>

                  {/* Date Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Check-in Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkIn}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Check-out Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Number of Guests</label>
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl w-fit border border-gray-200">
                      <button
                        type="button"
                        onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg text-charcoal px-4 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(prev => Math.min(6, prev + 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Select Room Type</label>
                    {loadingRooms ? (
                      <div className="flex justify-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {properties.map((room) => {
                          const isSelected = selectedProperty?._id === room._id
                          return (
                            <div
                              key={room._id}
                              onClick={() => setSelectedProperty(room)}
                              className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-amber-600 bg-amber-50/20 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                {room.photos && room.photos[0] && (
                                  <img
                                    src={typeof room.photos[0] === 'object' ? room.photos[0].url : room.photos[0]}
                                    alt={room.title}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="font-bold text-charcoal text-base truncate">{room.title}</h4>
                                <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                                  <span>{room.size} sqft</span>
                                  <span>•</span>
                                  <span>Up to {room.guest_no} Guests</span>
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="font-black text-amber-700 text-lg">{formatPrice(room.price || 0)}</span>
                                <span className="text-[10px] block text-gray-400 font-bold uppercase tracking-wider">Per Night</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                      className="px-8 py-4 bg-charcoal hover:bg-gold text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center gap-2 shadow-lg"
                    >
                      Next: Guest Details
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-gold/10 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6"
                >
                  <h3 className="text-2xl font-bold text-charcoal border-b border-gray-100 pb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    <User className="w-5 h-5 text-amber-600" />
                    Guest Information
                  </h3>

                  {isAuth ? (
                    // Authenticated State - Show Profile Info
                    <div className="space-y-6">
                      <div className="bg-green-50/50 border border-green-200 p-4 rounded-xl flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-green-800">You are logged in as {user?.fullName}</p>
                          <p className="text-xs text-green-700">{user?.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                          <input
                            type="text"
                            value={user?.fullName || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                          <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={phone || user?.phone || ''}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +971 50 123 4567"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Special Requests (Optional)</label>
                        <textarea
                          rows={3}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Please let us know if you require airport pickup, early check-in, dietary preferences, etc."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl resize-none"
                        />
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNextStep}
                          className="px-8 py-4 bg-charcoal hover:bg-gold text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center gap-2 shadow-lg"
                        >
                          Next: Payment
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    // Unauthenticated State - Inline Login/Register
                    <div className="space-y-6">
                      <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl flex items-center gap-3">
                        <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-xs text-amber-800 font-medium">
                          You need to log in to your Seven Seas account to complete this booking. Register an account if you don't have one.
                        </p>
                      </div>

                      <div className="flex border-b border-gray-200">
                        <button
                          onClick={() => setAuthMode('login')}
                          className={`flex-1 py-3 text-sm font-bold tracking-wide uppercase border-b-2 transition-all ${
                            authMode === 'login'
                              ? 'border-amber-600 text-amber-700'
                              : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Log In
                        </button>
                        <button
                          onClick={() => setAuthMode('signup')}
                          className={`flex-1 py-3 text-sm font-bold tracking-wide uppercase border-b-2 transition-all ${
                            authMode === 'signup'
                              ? 'border-amber-600 text-amber-700'
                              : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Register
                        </button>
                      </div>

                      <form onSubmit={handleInlineAuth} className="space-y-4">
                        {authMode === 'signup' && (
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                          />
                        </div>

                        {authMode === 'signup' && (
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+971 50 123 4567"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white outline-none transition-all rounded-xl"
                            />
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={authLoading}
                          className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                        >
                          <KeyRound className="w-4 h-4" />
                          {authLoading ? 'Authenticating...' : authMode === 'login' ? 'Log In & Proceed' : 'Register & Proceed'}
                        </button>
                      </form>

                      <div className="pt-4 border-t border-gray-100 flex justify-start">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-gold/10 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6"
                >
                  <h3 className="text-2xl font-bold text-charcoal border-b border-gray-100 pb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    Review & Payment Method
                  </h3>

                  {/* Payment Choices */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Choose Payment Option</label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pay at Hotel */}
                      <div
                        onClick={() => setPaymentMethod('hotel')}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                          paymentMethod === 'hotel'
                            ? 'border-amber-600 bg-amber-50/10 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-charcoal text-base">Pay at Hotel</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              paymentMethod === 'hotel' ? 'border-amber-600 bg-amber-600' : 'border-gray-300'
                            }`}>
                              {paymentMethod === 'hotel' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            No prepayment needed. Pay at the front desk using cash or credit card upon check-in.
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-amber-800 mt-4">Free Cancellation</span>
                      </div>

                      {/* Pay Online */}
                      <div
                        onClick={() => setPaymentMethod('online')}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                          paymentMethod === 'online'
                            ? 'border-amber-600 bg-amber-50/10 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-charcoal text-base">Pay Now (Online)</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              paymentMethod === 'online' ? 'border-amber-600 bg-amber-600' : 'border-gray-300'
                            }`}>
                              {paymentMethod === 'online' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Secure your booking instantly. Redirect to credit card / Stripe billing.
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-amber-800 mt-4">Best Rate Guarantee</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms / Notice */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      By clicking "Confirm Reservation", you agree to Seven Seas Hotel policies, check-in time of 15:00, and check-out time of 12:00. Cancel free of charge up to 24 hours prior to arrival.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmBooking}
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-charcoal hover:bg-gold text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-wider text-sm flex items-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Confirm Reservation</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar - Right Column */}
          <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm h-fit space-y-6">
            <h3 className="text-xl font-bold text-charcoal border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
              Reservation Summary
            </h3>

            {selectedProperty ? (
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                  {selectedProperty.photos && selectedProperty.photos[0] && (
                    <img
                      src={typeof selectedProperty.photos[0] === 'object' ? selectedProperty.photos[0].url : selectedProperty.photos[0]}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-charcoal text-lg">{selectedProperty.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{selectedProperty.roomType || 'Hotel Room'}</p>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  {checkIn && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-in</span>
                      <span className="font-semibold text-gray-900">{checkIn}</span>
                    </div>
                  )}
                  {checkOut && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-out</span>
                      <span className="font-semibold text-gray-900">{checkOut}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests</span>
                    <span className="font-semibold text-gray-900">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  {nights > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-semibold text-gray-900">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rate per night</span>
                    <span className="font-semibold text-gray-900">{formatPrice(pricePerNight)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black border-t border-dashed border-gray-200 pt-3">
                    <span className="text-charcoal uppercase tracking-wider text-xs font-bold">Total Est. Price</span>
                    <span className="text-amber-700 text-xl">{formatPrice(totalAmount)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right font-medium">Excluding 10% service charge & Tourism Dirham</p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400 text-sm">
                Select a room and dates to see the summary.
              </div>
            )}
          </div>

        </div>
      </section>
      <Footer />
    </main>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#faf8f5] text-[#222]">
        <Navigation />
        <div className="pt-32 pb-16 px-4 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-gray-500">Loading booking portal...</p>
        </div>
        <Footer />
      </main>
    }>
      <BookingContent />
    </Suspense>
  )
}
