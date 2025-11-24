'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface BookingFormProps {
  roomId: string
  roomName: string
  price: number
}

export default function BookingForm({ roomId, roomName, price }: BookingFormProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    adults: 1,
    children: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
    extraBed: false,
    airportTransfer: false,
    earlyCheckIn: false,
    lateCheckOut: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Booking request submitted successfully! We will send a confirmation email shortly.')
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }
    return 0
  }

  const nights = calculateNights()
  const roomTotal = nights * price
  const taxRate = 0.10 // 10% tax
  const tax = roomTotal * taxRate
  const extraBedCost = formData.extraBed ? nights * 50 : 0
  const airportTransferCost = formData.airportTransfer ? 75 : 0
  const earlyCheckInCost = formData.earlyCheckIn ? 50 : 0
  const lateCheckOutCost = formData.lateCheckOut ? 50 : 0
  const subtotal = roomTotal + extraBedCost + airportTransferCost + earlyCheckInCost + lateCheckOutCost
  const total = subtotal + tax

  const minCheckOutDate = formData.checkIn 
    ? new Date(new Date(formData.checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Check In *</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Check Out *</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={minCheckOutDate}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Adults *</label>
          <select
            name="adults"
            value={formData.adults}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Children</label>
          <select
            name="children"
            value={formData.children}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
          >
            {[0, 1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guest Information */}
      <div className="border-t-2 border-gray-200 pt-4">
        <h3 className="font-semibold text-black mb-4">Guest Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-black mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
            >
              <option value="">Select Country</option>
              <option value="AE">United Arab Emirates</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="IN">India</option>
              <option value="SA">Saudi Arabia</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="border-t-2 border-gray-200 pt-4">
        <h3 className="font-semibold text-black mb-4">Additional Services</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="extraBed"
              checked={formData.extraBed}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-black"
            />
            <div className="flex-1">
              <span className="font-medium text-black">Extra Bed</span>
              <span className="text-gray-600 text-sm ml-2">$50 per night</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="airportTransfer"
              checked={formData.airportTransfer}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-black"
            />
            <div className="flex-1">
              <span className="font-medium text-black">Airport Transfer</span>
              <span className="text-gray-600 text-sm ml-2">$75 one-way</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="earlyCheckIn"
              checked={formData.earlyCheckIn}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-black"
            />
            <div className="flex-1">
              <span className="font-medium text-black">Early Check-in (Before 2 PM)</span>
              <span className="text-gray-600 text-sm ml-2">$50</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="lateCheckOut"
              checked={formData.lateCheckOut}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-black"
            />
            <div className="flex-1">
              <span className="font-medium text-black">Late Check-out (After 12 PM)</span>
              <span className="text-gray-600 text-sm ml-2">$50</span>
            </div>
          </label>
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-semibold text-black mb-2">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={3}
          placeholder="Any special requests or preferences..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
        />
      </div>

      {/* Price Summary */}
      {nights > 0 && (
        <div className="border-t-2 border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Room ({nights} {nights === 1 ? 'night' : 'nights'})</span>
            <span className="font-semibold">${roomTotal.toFixed(2)}</span>
          </div>
          {extraBedCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Extra Bed</span>
              <span className="font-semibold">${extraBedCost.toFixed(2)}</span>
            </div>
          )}
          {airportTransferCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Airport Transfer</span>
              <span className="font-semibold">${airportTransferCost.toFixed(2)}</span>
            </div>
          )}
          {earlyCheckInCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Early Check-in</span>
              <span className="font-semibold">${earlyCheckInCost.toFixed(2)}</span>
            </div>
          )}
          {lateCheckOutCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Late Check-out</span>
              <span className="font-semibold">${lateCheckOutCost.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes & Fees (10%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting || nights === 0}
        whileHover={{ scale: nights > 0 && !isSubmitting ? 1.05 : 1, boxShadow: nights > 0 && !isSubmitting ? '0 15px 40px rgba(0, 0, 0, 0.3)' : 'none' }}
        whileTap={{ scale: nights > 0 && !isSubmitting ? 0.98 : 1 }}
        className="w-full px-6 py-4 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden premium-border luxury-glow group"
      >
        <span className="relative z-10">{isSubmitting ? 'Processing...' : nights === 0 ? 'Select Dates to Continue' : 'Confirm Booking'}</span>
        {!isSubmitting && nights > 0 && (
          <span className="absolute inset-0 luxury-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        )}
      </motion.button>

      <p className="text-xs text-gray-500 text-center">
        By booking, you agree to our Terms & Conditions and Privacy Policy
      </p>
    </form>
  )
}
