'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar } from 'lucide-react'

interface PropertyInfoProps {
  title: string
  location: string
  description?: string
  beds?: number | string
  baths?: number | string
  guests?: number | string
  size?: number
  bedrooms?: number | string
  propertyId: string
  createdAt?: string
  price?: number
  monthlyRent?: number
  yearlyRent?: number
  dailyPrices?: any[]
}

const getCurrentDailyPrice = (dailyPrices: any[]) => {
  if (!dailyPrices || !Array.isArray(dailyPrices) || dailyPrices.length === 0) return null
  const today = new Date()
  const matchingPrice = dailyPrices.find((dp) => {
    const priceDate = new Date(dp.date)
    return priceDate.toDateString() === today.toDateString()
  })
  return matchingPrice?.price || null
}

const formatPrice = (price: number | undefined) => {
  if (!price) return '0'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function PropertyInfo({
  title,
  location,
  description,
  beds,
  baths,
  guests,
  size,
  bedrooms,
  propertyId,
  createdAt,
  price,
  monthlyRent,
  yearlyRent,
  dailyPrices,
}: PropertyInfoProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  if (!title || !propertyId) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading property information...</p>
        </div>
      </div>
    )
  }

  const renderDescription = () => {
    if (!description) {
      return 'No description available'
    }

    if (showFullDescription) {
      return description
    }

    const words = description.split(' ')
    const truncated = words.slice(0, 60).join(' ')

    return words.length > 60 ? `${truncated}...` : description
  }

  const formatListingDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-3xl"
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-2 leading-tight">{title || 'Property Title'}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500 flex-shrink-0" />
                <span className="font-medium">4.9</span>
              </div>
            </div>
          </div>
          {/* Price Display */}
          {price && (
            <div className="flex flex-col items-start sm:items-end gap-1 text-left sm:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-amber-600">
                  {formatPrice(getCurrentDailyPrice(dailyPrices || []) || price)}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">AED/night</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {guests && (
          <div className="flex items-start gap-3">
            <div>
              <div className="font-medium text-sm">{guests} Guests</div>
            </div>
          </div>
        )}
        {beds && (
          <div className="flex items-start gap-3">
            <div>
              <div className="font-medium text-sm">{beds} Room</div>
            </div>
          </div>
        )}
        {baths && (
          <div className="flex items-start gap-3">
            <div>
              <div className="font-medium text-sm">{baths} Bathrooms</div>
            </div>
          </div>
        )}
        {bedrooms && Number(bedrooms) > 0 && (
          <div className="flex items-start gap-3">
            <div>
              <div className="font-medium text-sm">{bedrooms} Bedroom</div>
            </div>
          </div>
        )}
      </div>

      {/* Listing Date */}
      {createdAt && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Listed on {formatListingDate(createdAt)}</span>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6"></div>

      <div>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700">{renderDescription()}</p>
        {description && description.split(' ').length > 60 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-amber-600 font-medium underline mt-3 sm:mt-4 text-sm sm:text-base hover:opacity-80"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </motion.div>
  )
}


