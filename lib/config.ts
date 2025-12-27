/**
 * Application Configuration
 * Centralized configuration for API keys and environment variables
 */

export const config = {
  // Google Maps API Key (public - used in client-side components)
  googleMapsApiKey: 'AIzaSyBy-vjoIYaTk2fLxGo6VP1X3qAall_mGRw',
  
  // Google Places API Key (server-side only)
  googlePlacesApiKey: 'AIzaSyBy-vjoIYaTk2fLxGo6VP1X3qAall_mGRw',
  googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  
  // Google Maps Location Link
  googleMapsLocationLink: 'https://maps.app.goo.gl/sd5NvAgBXGQ2zmEf8',
  
  // API Base URL
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.dubaibooking.io',
  
  // Frontend URL
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
} as const

/**
 * Validate that required environment variables are set
 */
export function validateConfig() {
  if (!config.googleMapsApiKey) {
    console.warn('⚠️  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set. Google Maps features may not work.')
  }
  
  if (!config.googlePlacesApiKey) {
    console.warn('⚠️  GOOGLE_PLACES_API_KEY is not set. Google Reviews features may not work.')
  }
}

// Validate on import (only in development)
if (process.env.NODE_ENV === 'development') {
  validateConfig()
}

