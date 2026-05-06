/**
 * Booking API utility functions
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://infinitysignaturebackend-api.affworld.io'

export interface BookingData {
  checkIn: string
  checkOut: string
  guest: number
  property: string
  nights?: number
  rent?: number
  totalAmount?: number
  isMonthlyBooking?: boolean
  isYearlyBooking?: boolean
  monthlyPrice?: number
  yearlyPrice?: number
  bookingType?: 'daily' | 'monthly' | 'yearly'
}

export async function getMonthlyRent(propertyId: string): Promise<number> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ss_hotel_token') : null
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-organisation': 'sevenseas',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}/api/v1/booking/property/${propertyId}/monthly-rent`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      if (response.status === 404) {
        return 0 // Monthly rent not available
      }
      throw new Error(`Failed to fetch monthly rent: ${response.status}`)
    }

    const data = await response.json()
    return data.data || 0
  } catch (error) {
    console.error('Error fetching monthly rent:', error)
    return 0
  }
}

export async function getYearlyRent(propertyId: string): Promise<number> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ss_hotel_token') : null
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-organisation': 'sevenseas',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}/api/v1/booking/property/${propertyId}/yearly-rent`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      if (response.status === 404) {
        return 0 // Yearly rent not available
      }
      throw new Error(`Failed to fetch yearly rent: ${response.status}`)
    }

    const data = await response.json()
    return data.data || 0
  } catch (error) {
    console.error('Error fetching yearly rent:', error)
    return 0
  }
}

export async function createBooking(bookingData: BookingData): Promise<any> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ss_hotel_token') : null

    if (!token) {
      throw new Error('Please log in to make a booking')
    }

    const response = await fetch(`${API_URL}/api/v1/booking/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to create booking')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}

export async function createBookingWithPayment(bookingData: BookingData): Promise<any> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ss_hotel_token') : null

    if (!token) {
      throw new Error('Please log in to make a booking')
    }

    const response = await fetch(`${API_URL}/api/v1/booking/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Payment API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })

      let errorData: any = {}
      try {
        errorData = JSON.parse(errorText)
      } catch {
        // Ignore JSON parse error if body is not JSON
      }

      throw new Error(errorData.message || `Payment session failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error creating payment session:', error)
    throw error
  }
}

