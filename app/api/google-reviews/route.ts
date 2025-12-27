import { NextResponse } from 'next/server'
import { config } from '@/lib/config'

export async function GET() {
  try {
    const apiKey = config.googlePlacesApiKey
    const placeId = config.googlePlaceId

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Places API key not configured' },
        { status: 500 }
      )
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
      throw new Error(`Google Places API error: ${data.status}`)
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
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}


