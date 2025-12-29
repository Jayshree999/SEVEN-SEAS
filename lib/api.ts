/**
 * API utility functions for Dubai Booking API
 */

export interface PropertyFilters {
  address?: string
  city?: string
  bedrooms?: string
  category?: string
  area?: string
}

export interface PropertyApiParams {
  limit?: number
  page?: number
  activeStatus?: boolean
  filters?: PropertyFilters
}

export interface Property {
  _id: string
  id?: string
  title?: string
  name?: string
  nickname?: string
  description?: string
  address?: {
    address?: string
    latitude?: number
    longitude?: number
  } | string
  city?: string
  bedrooms?: string | number
  category?: string
  size?: number
  area?: number
  price?: number
  photos?: Array<{
    category?: string
    url: string
    _id?: string
  }> | string[]
  amenities?: string[]
  [key: string]: any
}

export interface PropertyApiResponse {
  statusCode: number
  data: {
    properties: Property[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
  message: string
  [key: string]: any
}

/**
 * Fetches properties from the Dubai Booking API
 * @param params - Query parameters for the API call
 * @returns Promise with the API response
 */
export async function fetchProperties(params: PropertyApiParams = {}): Promise<PropertyApiResponse> {
  const {
    limit = 100,
    page = 1,
    activeStatus = true,
    filters = {},
  } = params

  // Build query parameters
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    activeStatus: activeStatus.toString(),
  })

  // Add filter parameters
  if (filters.address) {
    queryParams.append('filters[address]', filters.address)
  } else {
    queryParams.append('filters[address]', '')
  }

  if (filters.city) {
    queryParams.append('filters[city]', filters.city)
  } else {
    queryParams.append('filters[city]', '')
  }

  if (filters.bedrooms) {
    queryParams.append('filters[bedrooms]', filters.bedrooms)
  } else {
    queryParams.append('filters[bedrooms]', '')
  }

  if (filters.category) {
    queryParams.append('filters[category]', filters.category)
  } else {
    queryParams.append('filters[category]', '')
  }

  if (filters.area) {
    queryParams.append('filters[area]', filters.area)
  } else {
    queryParams.append('filters[area]', '')
  }

  const url = `https://api.dubaibooking.io/api/v1/property/property?${queryParams.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-organisation': 'sevenseas',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data: PropertyApiResponse = await response.json()
    
    // Normalize property IDs for easier access
    if (data.data?.properties) {
      data.data.properties = data.data.properties.map(prop => ({
        ...prop,
        id: prop._id || prop.id,
        name: prop.title || prop.name || prop.nickname || 'Untitled Property',
      }))
    }
    
    return data
  } catch (error) {
    console.error('Error fetching properties:', error)
    throw error
  }
}

/**
 * Fetches a single property by ID from the Dubai Booking API
 * @param propertyId - The ID of the property to fetch
 * @returns Promise with the property data
 */
export async function fetchPropertyById(propertyId: string): Promise<Property | null> {
  try {
    const response = await fetchProperties({
      limit: 100,
      page: 1,
      activeStatus: true,
    })

    const property = response.data?.properties?.find(
      (prop) => prop._id === propertyId || prop.id === propertyId
    )

    return property || null
  } catch (error) {
    console.error('Error fetching property by ID:', error)
    throw error
  }
}

