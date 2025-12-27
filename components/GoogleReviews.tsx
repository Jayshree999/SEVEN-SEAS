'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface GoogleReview {
  authorName: string
  authorUrl?: string
  profilePhotoUrl?: string
  rating: number
  text: string
  time: number
  relativeTimeDescription: string
}

interface GoogleReviewsData {
  name: string
  rating: number
  totalRatings: number
  address: string
  reviews: GoogleReview[]
}

export default function GoogleReviews() {
  const [reviewsData, setReviewsData] = useState<GoogleReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews')
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const data = await response.json()
        setReviewsData(data)
      } catch (err: any) {
        console.error('Error fetching Google Reviews:', err)
        setError(err.message || 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (error || !reviewsData) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>Unable to load Google Reviews at this time.</p>
        {error && <p className="text-sm mt-2">{error}</p>}
      </div>
    )
  }

  const displayedReviews = reviewsData.reviews.slice(0, 6) // Show first 6 reviews

  return (
    <div className="w-full">
      {/* Google Reviews Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
              alt="Google"
              width={24}
              height={24}
              className="object-contain"
            />
            <h3 className="text-2xl font-bold text-gray-900">Google Reviews</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-bold text-gray-900">{reviewsData.rating.toFixed(1)}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(reviewsData.rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-gray-600">
              {reviewsData.totalRatings.toLocaleString()} reviews
            </span>
          </div>
        </div>
        {reviewsData.reviews.length > 0 && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=Seven+Seas+Hotel+Dubai`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium"
          >
            View all on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={`${review.authorName}-${review.time}`} review={review} index={index} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review, index }: { review: GoogleReview; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-amber-400 transition-all duration-200 shadow-md hover:shadow-xl"
    >
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        {review.profilePhotoUrl ? (
          <Image
            src={review.profilePhotoUrl}
            alt={review.authorName}
            width={48}
            height={48}
            className="rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
            {review.authorName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">{review.authorName}</div>
          <div className="text-xs text-gray-500">{review.relativeTimeDescription}</div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'fill-amber-500 text-amber-500'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">
        {review.text}
      </p>

      {/* Google Badge */}
      {review.authorUrl && (
        <a
          href={review.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 transition-colors"
        >
          View on Google
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  )
}

