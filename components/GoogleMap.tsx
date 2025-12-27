'use client'

import { useEffect, useRef, useState } from 'react'
import { config } from '@/lib/config'

interface GoogleMapProps {
  latitude?: number
  longitude?: number
  address?: string
  zoom?: number
  height?: string
  className?: string
}

export default function GoogleMap({
  latitude = 25.197197,
  longitude = 55.2707828,
  address = 'Seven Seas Hotel, Dubai',
  zoom = 15,
  height = '400px',
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (mapLoaded || !mapRef.current) {
      return
    }

    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
      return
    }

    // Load Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true)
        initializeMap()
      }
    }
    script.onerror = () => {
      setMapError('Failed to load Google Maps. Please check your API key.')
      console.error('Failed to load Google Maps script')
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (existingScript && existingScript.parentNode) {
        // Only remove if no other components are using it
        // In a real app, you might want to track script usage
      }
    }
  }, [mapLoaded])

  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      return
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })

      // Add marker
      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: address,
        animation: window.google.maps.Animation.DROP,
      })

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">Seven Seas Hotel</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">${address}</p>
            <a 
              href="${config.googleMapsLocationLink}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="display: inline-block; margin-top: 8px; color: #d97706; text-decoration: none; font-weight: 500;"
            >
              View on Google Maps →
            </a>
          </div>
        `,
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      // Open info window by default
      infoWindow.open(map, marker)
    } catch (error) {
      console.error('Error initializing Google Map:', error)
      setMapError('Failed to initialize map')
    }
  }


  if (mapError) {
    return (
      <div 
        className={`bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center border-2 border-red-300 relative overflow-hidden ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-5xl mb-3">⚠️</div>
          <p className="text-red-700 font-semibold mb-1">Map Loading Error</p>
          <p className="text-sm text-red-600">{mapError}</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef} 
      className={`rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg ${className}`}
      style={{ height }}
    />
  )
}

