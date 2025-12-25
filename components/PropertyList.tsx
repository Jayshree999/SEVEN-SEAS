'use client'

import { useState, useEffect } from 'react'
import { fetchProperties, Property, PropertyFilters } from '@/lib/api'

interface PropertyListProps {
  filters?: PropertyFilters
}

export default function PropertyList({ filters = {} }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchProperties({
          limit: 100,
          page: 1,
          activeStatus: true,
          filters,
        })
        setProperties(response.data?.properties || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load properties')
        console.error('Error loading properties:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [filters])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading properties...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">No properties found</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-gray-400 transition-colors"
        >
          <h3 className="text-xl font-bold text-black mb-2">{property.name || property.title || 'Untitled Property'}</h3>
          {property.address && (
            <p className="text-gray-600 text-sm mb-2">
              📍 {typeof property.address === 'string' ? property.address : property.address.address || 'Address not available'}
            </p>
          )}
          {property.city && (
            <p className="text-gray-600 text-sm mb-2">🏙️ {property.city}</p>
          )}
          <div className="flex gap-4 text-sm text-gray-600">
            {property.bedrooms && <span>🛏️ {property.bedrooms} Bedrooms</span>}
            {(property.size || property.area) && <span>📏 {property.size || property.area} sqm</span>}
          </div>
          {property.description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{property.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

