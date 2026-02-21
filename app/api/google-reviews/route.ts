import { NextResponse } from 'next/server'
import { config } from '@/lib/config'

export async function GET() {
  try {
    const apiKey = config.googlePlacesApiKey
    const placeId = config.googlePlaceId

    if (!apiKey) {
      // Return fallback data when API key is not configured
      return NextResponse.json({
        name: 'Seven Seas Hotel',
        rating: 4.5,
        totalRatings: 128,
        address: 'Dubai, United Arab Emirates',
        reviews: [
          {
            authorName: 'Guest Review',
            authorUrl: '#',
            profilePhotoUrl: '',
            rating: 5,
            text: 'Excellent service and beautiful rooms!',
            time: Date.now() / 1000,
            relativeTimeDescription: 'a week ago',
          }
        ],
        fallback: true
      })
    }

    // Fetch place details including reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address&key=${apiKey}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Google Reviews')
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      // Return fallback data for API errors instead of throwing
      console.warn(`Google Places API error: ${data.status}`)
      return NextResponse.json({
        name: 'Seven Seas Hotel',
        rating: 4.5,
        totalRatings: 128,
        address: 'Dubai, United Arab Emirates',
        reviews: [
          {
            authorName: 'Guest Review',
            authorUrl: '#',
            profilePhotoUrl: '',
            rating: 5,
            text: 'Excellent service and beautiful rooms!',
            time: Date.now() / 1000,
            relativeTimeDescription: 'a week ago',
          }
        ],
        fallback: true,
        apiError: data.status
      })
    }

    const place = data.result

    return NextResponse.json({
      name: place.name,
      rating: place.rating,
      totalRatings: place.user_ratings_total,
      address: place.formatted_address,
      reviews: place.reviews?.map((review: any) => ({
        authorName: review.author_name,
        authorUrl: review.author_url,
        profilePhotoUrl: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relativeTimeDescription: review.relative_time_description,
      })) || [],
    })
  } catch (error: any) {
    console.error('Error fetching Google Reviews:', error)
    // Return fallback data for any errors to prevent build failures
    return NextResponse.json({
      name: 'Seven Seas Hotel',
      rating: 4.5,
      totalRatings: 128,
      address: 'Dubai, United Arab Emirates',
      reviews: [
        {
          authorName: 'Guest Review',
          authorUrl: '#',
          profilePhotoUrl: '',
          rating: 5,
          text: 'Excellent service and beautiful rooms!',
          time: Date.now() / 1000,
          relativeTimeDescription: 'a week ago',
        }
      ],
      fallback: true,
      error: error.message
    })
  }
}


