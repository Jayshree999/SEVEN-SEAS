/**
 * User profile and favorites API functions
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://infinitysignaturebackend-api.affworld.io'

export interface UpdateProfileData {
  fullName?: string
  email?: string
  phone?: string
  location?: string
  profileImg?: string
}

export interface Booking {
  _id: string
  status: string
  checkIn: string
  checkOut: string
  nights?: number
  rent?: string
  property?: {
    _id: string
    title?: string
    name?: string
    photos?: any[]
  }
  createdAt?: string
  [key: string]: any
}

export interface UserProfile {
  _id: string
  fullName: string
  email: string
  phone?: string | null
  location?: string
  profileImg?: string
  role?: string
  property?: string[] // Watchlist/favorites
  createdAt?: string
  updatedAt?: string
}

export interface UserBookings {
  completed?: Booking[]
  hosting?: Booking[]
  fail?: Booking[]
  pending?: Booking[]
  ConfirmedBookings?: Booking[]
}

export interface UserProfileResponse {
  statusCode?: number
  message?: string
  data?: {
    user?: UserProfile
    watchlist?: string[] | any[]
    bookings?: UserBookings
  }
}

/**
 * Get current user profile with watchlist and bookings
 */
export async function getCurrentUserProfile(): Promise<UserProfileResponse> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v1/bookinguser/get-user-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
        'Authorization': `Bearer ${token}`,
      },
    })

    // Handle 404 or 401 - might be old token from different user model
    if (response.status === 404 || response.status === 401) {
      let errorData: any = {}
      try {
        const text = await response.text()
        errorData = text ? JSON.parse(text) : {}
      } catch {
        errorData = { message: 'Authentication failed' }
      }

      // Clear invalid token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }

      throw new Error(errorData.message || 'Session expired. Please log in again with your email and password.')
    }

    if (!response.ok) {
      let errorData: any = {}
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: 'Failed to fetch user profile' }
      }
      throw new Error(errorData.message || 'Failed to fetch user profile')
    }

    const data: UserProfileResponse = await response.json()

    // Backend returns: { data: { user: {...}, watchlist: [...], bookings: {...} } }
    // Extract user and add watchlist property IDs
    if (data.data?.user) {
      data.data.user.property = data.data.watchlist || []
    }

    return data
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

/**
 * Update user profile
 */
export async function updateProfile(profileData: UpdateProfileData): Promise<UserProfileResponse> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v1/bookinguser/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })

    const data: UserProfileResponse = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile')
    }

    // Update stored user data
    // Backend returns: { data: { user: {...} } } or { data: UserProfile }
    const userData = data.data?.user || data.data
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }

    return data
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

/**
 * Get user bookings
 */
export async function getUserBookings(): Promise<Booking[]> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v1/booking/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (response.status === 404 || response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
      throw new Error('Session expired. Please log in again.')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to fetch bookings')
    }

    const data = await response.json()

    // Backend returns: { data: Booking[] } or { data: null } if no bookings
    if (!data.data) {
      return []
    }

    return Array.isArray(data.data) ? data.data : []
  } catch (error) {
    console.error('Get bookings error:', error)
    throw error
  }
}

/**
 * Toggle property in watchlist/favorites
 */
export async function toggleWatchlist(propertyId: string, action: 'save' | 'unsave'): Promise<{ statusCode?: number; message?: string; data?: string[] }> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v1/bookinguser/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        propertyId,
        action,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update watchlist')
    }

    return data
  } catch (error) {
    console.error('Toggle watchlist error:', error)
    throw error
  }
}
