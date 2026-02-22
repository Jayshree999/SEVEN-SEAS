/**
 * API utility functions for Dubai Booking API
 */

/**
 * Converts a property name to a URL-friendly slug
 * e.g., "Deluxe King Room" -> "deluxe-king-room"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
    .replace(/\s+/g, '-')           // spaces to hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')        // trim leading/trailing hyphens
}

/**
 * Extracts the MongoDB ObjectId from a slug (last 24 hex chars)
 * e.g., "deluxe-king-room-69487bfdef489742dc309150" -> "69487bfdef489742dc309150"
 */
export function idFromSlug(slug: string): string | null {
  const match = slug.match(/([a-f0-9]{24})$/)
  return match ? match[1] : null
}

/**
 * Creates an SEO-friendly room slug from property name and ID
 * e.g., "Deluxe King Room" + "69487bfdef489742dc309150" -> "deluxe-king-room-69487bfdef489742dc309150"
 */
export function makeRoomSlug(property: Property): string {
  const name = property.title || property.name || property.nickname || 'room'
  return `${slugify(name)}-${property._id}`
}
export interface PropertyFilters {
  address?: string
  city?: string
  bedrooms?: string
  category?: string
  area?: string
  minPrice?: number
  maxPrice?: number
  guest_no?: string | number
  amenities?: string[]
  roomType?: string
  search?: string
}

export interface PropertyApiParams {
  limit?: number
  page?: number
  activeStatus?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
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
  originalPrice?: number
  breakfastPrice?: number
  photos?: Array<{
    category?: string
    url: string
    _id?: string
  }> | string[]
  amenities?: string[]
  createdAt?: string
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
    sortBy = 'sno',
    sortOrder = 'asc',
    filters = {},
  } = params

  // Build query parameters
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    activeStatus: activeStatus.toString(),
    sortBy: sortBy,
    sortOrder: sortOrder,
  })

  // Add filter parameters directly (not wrapped in filters[])
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        queryParams.append(key, value.join(','))
      } else {
        queryParams.append(key, value.toString())
      }
    }
  })

  const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'https://infinitysignaturebackend-api.affworld.io'

  const url = `${SERVER_URL}/api/v1/property/property?${queryParams.toString()}`

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

/**
 * Fetches a single property by slug from the Dubai Booking API
 * The slug can be either:
 * - "property-name-{24_char_id}" (preferred, embeds the ID)
 * - A raw MongoDB ObjectId (fallback for old links)
 * @returns Promise with the property data
 */
export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    // Try to extract the ID from the end of the slug first (fastest)
    const embeddedId = idFromSlug(slug)
    if (embeddedId) {
      return fetchPropertyById(embeddedId)
    }

    // Fallback: raw ObjectId
    if (/^[a-f0-9]{24}$/.test(slug)) {
      return fetchPropertyById(slug)
    }

    // Last resort: match by slug against all properties
    const response = await fetchProperties({ limit: 100, page: 1, activeStatus: true })
    const property = response.data?.properties?.find(
      (prop) => makeRoomSlug(prop) === slug
    )
    return property || null
  } catch (error) {
    console.error('Error fetching property by slug:', error)
    throw error
  }
}
