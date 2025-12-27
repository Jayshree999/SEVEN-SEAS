'use client'

import { Star } from 'lucide-react'

interface PropertyReviewsProps {
  propertyId?: string
}

export function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  // For now, return a placeholder. Reviews can be implemented later with API integration
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-semibold tracking-tight">4.9</h2>
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
          </div>
        </div>
        <p className="text-lg text-gray-600">Reviews coming soon</p>
      </div>
    </div>
  )
}



