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
 * Get current user profile
 */
export async function getCurrentUserProfile(): Promise<UserProfileResponse> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ss_hotel_token') : null

    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/tenant/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (response.status === 404 || response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ss_hotel_token')
        localStorage.removeItem('ss_hotel_user')
      }
      throw new Error('Session expired. Please log in again.')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.message || 'Failed to fetch user profile')
    }

    const tenantData = await response.json()

    // Map backend tenant schema to frontend UserProfile schema
    const userProfile: UserProfile = {
      _id: tenantData.id?.toString() || '',
      fullName: tenantData.tenant_name || '',
      email: tenantData.tenant_email || '',
      phone: tenantData.tenant_phone || null,
      location: tenantData.location || '',
      profileImg: tenantData.profile_pic || '',
      role: 'tenant'
    }

    // Backend returns rental_agreements directly on the tenant object
    const bookings = tenantData.rental_agreements || []
    
    // Process agreements into UserBookings shape for the frontend
    const organizedBookings: UserBookings = {
      completed: [],
      hosting: [],
      fail: [],
      pending: [],
      ConfirmedBookings: []
    }

    bookings.forEach((agreement: any) => {
      // Map agreement to a Booking format
      const booking: Booking = {
        _id: agreement.id?.toString() || '',
        status: agreement.status === 'ACTIVE' ? 'Confirmed' : (agreement.status === 'COMPLETED' ? 'Completed' : 'Pending'),
        checkIn: agreement.start_date || '',
        checkOut: agreement.end_date || '',
        rent: agreement.rent_amount?.toString() || '',
        property: {
          _id: agreement.property_id?.toString() || '',
          title: agreement.property_info?.title || '',
        }
      }

      if (booking.status === 'Completed') {
        organizedBookings.completed?.push(booking)
      } else if (booking.status === 'Confirmed') {
        organizedBookings.ConfirmedBookings?.push(booking)
      } else {
        organizedBookings.pending?.push(booking)
      }
    })

    return {
      data: {
        user: userProfile,
        bookings: organizedBookings
      }
    }
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
    const token = typeof window !== 'undefined' ? localStorage.getItem('ss_hotel_token') : null

    if (!token) {
      throw new Error('No authentication token found')
    }

    // Map frontend fields to backend TenantProfileUpdate schema
    const updatePayload = {
      tenant_name: profileData.fullName,
      tenant_email: profileData.email,
      tenant_phone: profileData.phone,
      location: profileData.location,
      profile_pic: profileData.profileImg
    }

    const response = await fetch(`${API_URL}/api/tenant/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatePayload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Failed to update profile')
    }

    // Update stored user data
    const updatedTenant = data.user
    if (updatedTenant) {
      const storedUser = {
        id: updatedTenant.id,
        fullName: updatedTenant.tenant_name,
        email: updatedTenant.tenant_email,
        phone: updatedTenant.tenant_phone,
        profileImg: updatedTenant.profile_pic,
        user_type: 'tenant'
      }
      localStorage.setItem('ss_hotel_user', JSON.stringify(storedUser))
    }

    return {
      message: data.message,
      data: {
        user: {
          _id: updatedTenant.id?.toString() || '',
          fullName: updatedTenant.tenant_name || '',
          email: updatedTenant.tenant_email || '',
          phone: updatedTenant.tenant_phone || null,
          location: updatedTenant.location || '',
          profileImg: updatedTenant.profile_pic || '',
          role: 'tenant'
        }
      }
    }
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

/**
 * Get user bookings
 * Note: Now returned as part of getCurrentUserProfile. This is kept for compatibility.
 */
export async function getUserBookings(): Promise<Booking[]> {
  try {
    const profile = await getCurrentUserProfile()
    const bookings = profile.data?.bookings
    if (!bookings) return []

    return [
      ...(bookings.completed || []),
      ...(bookings.hosting || []),
      ...(bookings.fail || []),
      ...(bookings.pending || []),
      ...(bookings.ConfirmedBookings || [])
    ]
  } catch (error) {
    console.error('Get bookings error:', error)
    return []
  }
}

/**
 * Toggle property in watchlist/favorites
 * Note: Watchlist is not supported in the live tenant backend currently.
 */
export async function toggleWatchlist(propertyId: string, action: 'save' | 'unsave'): Promise<{ statusCode?: number; message?: string; data?: string[] }> {
  console.log(`Watchlist ${action} for ${propertyId} is not supported currently.`)
  return { statusCode: 200, message: 'Action completed (mocked)', data: [] }
}
