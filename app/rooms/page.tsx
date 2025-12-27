'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProperties, Property } from '@/lib/api'
import { Star, MapPin, Home, Users, Bed, Bath, Heart, TrendingUp, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toggleWatchlist, getCurrentUserProfile } from '@/lib/user'
import { toast } from 'sonner'

interface RoomDisplay {
  id: string
  name: string
  price: number
  size: number
  guests: number
  beds: string
  baths: number
  bedrooms: number
  amenities: string[]
  image?: string
  property: Property
}

function mapPropertyToRoom(property: Property): RoomDisplay {
  const bedrooms = typeof property.bedrooms === 'string' ? parseInt(property.bedrooms) || 1 : property.bedrooms || 1
  const guests = parseInt(property.guest_no as string) || bedrooms * 2
  const size = property.size || property.area || 0
  const baths = typeof property.washRoom === 'string' ? parseInt(property.washRoom) || 1 : property.washRoom || 1
  
  // Determine bed type based on room name or default
  let beds = '1 King Bed'
  if (property.title?.toLowerCase().includes('twin') || property.title?.toLowerCase().includes('queen')) {
    beds = bedrooms > 1 ? `${bedrooms} Queen Beds` : '2 Queen Beds'
  } else if (property.title?.toLowerCase().includes('suite')) {
    beds = '1 King Bed + Sofa Bed'
  }

  // Extract image URL from photos array
  let imageUrl: string | undefined
  if (property.photos && property.photos.length > 0) {
    if (typeof property.photos[0] === 'object' && 'url' in property.photos[0]) {
      imageUrl = (property.photos[0] as { url: string }).url
    } else if (typeof property.photos[0] === 'string') {
      imageUrl = property.photos[0]
    }
  }

  return {
    id: property._id || property.id || '',
    name: property.title || property.name || property.nickname || 'Untitled Room',
    price: property.price || 0,
    size: size,
    guests: guests,
    beds: beds,
    baths: baths,
    bedrooms: bedrooms,
    amenities: property.amenities || ['Free WiFi', 'Air Conditioning'],
    image: imageUrl,
    property: property,
  }
}

const formatPrice = (price: number) => {
  // Validate price - if it's unreasonably high, it might be in a different currency unit
  // For a 4-star hotel in Dubai, reasonable prices are typically 150-2000 AED per night
  let adjustedPrice = price
  
  // If price seems too high (likely in fils or wrong unit), adjust it
  if (price > 10000 && price < 1000000) {
    // Might be in fils (1 AED = 1000 fils), but that would make it too low
    // More likely it's a data error, use a reasonable default based on room type
    adjustedPrice = 0 // Will show "Contact for pricing"
  } else if (price >= 1000000) {
    // Definitely wrong, set to 0
    adjustedPrice = 0
  }
  
  if (adjustedPrice === 0) {
    return null // Return null to show "Contact for pricing"
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(adjustedPrice)
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchProperties({
          limit: 100,
          page: 1,
          activeStatus: true,
        })
        
        const mappedRooms = (response.data?.properties || []).map(mapPropertyToRoom)
        setRooms(mappedRooms)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rooms')
        console.error('Error loading rooms:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-32 pb-10 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our Rooms
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Experience comfort and luxury in our thoughtfully designed accommodations
          </p>
        </motion.div>
      </div>

      {/* Rooms Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center py-20">
              <div className="text-red-600 text-lg">Error: {error}</div>
            </div>
          )}
          
          {!loading && !error && rooms.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-600 text-lg">No rooms available</div>
            </div>
          )}
          
          {!loading && !error && rooms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {rooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function RoomCard({ room, index }: { room: RoomDisplay, index: number }) {
  const { isAuth, user } = useAuth()
  const [isSaved, setIsSaved] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  // Calculate property age (new if less than 30 days old)
  const isNewProperty = room.property?.createdAt
    ? Date.now() - new Date(room.property.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000
    : false

  // Booking statistics
  const totalBookings = room.property?.bookingInfo?.totalBookings || 0
  const isPopular = totalBookings >= 5

  // Check if property is in watchlist on mount
  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (!isAuth || !room.property?._id) {
        setIsChecking(false)
        return
      }

      try {
        const profile = await getCurrentUserProfile()
        const watchlist = profile.data?.watchlist || profile.data?.user?.property || []
        const propertyIds = watchlist.map((item: any) => 
          typeof item === 'string' ? item : item._id || item
        )
        setIsSaved(propertyIds.includes(room.property._id))
      } catch (error) {
        console.error('Error checking watchlist:', error)
      } finally {
        setIsChecking(false)
      }
    }

    checkWatchlistStatus()
  }, [isAuth, room.property?._id])

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuth) {
      toast.error('Please login to save favorites')
      return
    }
    
    if (!room.property?._id) {
      toast.error('Property ID not found')
      return
    }

    try {
      setIsAnimating(true)
      const newSavedState = !isSaved
      
      // Optimistically update UI
      setIsSaved(newSavedState)

      const response = await toggleWatchlist(room.property._id, newSavedState ? 'save' : 'unsave')
      
      // Show success message
      if (response.message) {
        toast.success(response.message)
      } else {
        toast.success(newSavedState ? 'Added to favorites' : 'Removed from favorites')
      }
    } catch (error: any) {
      console.error('Error updating wishlist:', error)
      // Revert on error
      setIsSaved((prev) => !prev)
      toast.error(error?.message || 'Failed to update favorites. Please try again.')
    } finally {
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000)
    }
  }

  const formattedPrice = formatPrice(room.price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200"
    >
      <Link href={`/rooms/${room.id}`}>
        {/* Room Image */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {room.image ? (
            <>
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
              <Home className="w-20 h-20 text-amber-600 opacity-50" />
            </div>
          )}

          {/* Badges - Clean & Uniform */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-10">
            {room.property?.defaultPropertyType && (
              <span className="bg-white/95 backdrop-blur-md text-gray-800 font-semibold px-2 py-1 rounded-md text-[10px] shadow-md border border-gray-200">
                {room.property.defaultPropertyType.charAt(0).toUpperCase() + room.property.defaultPropertyType.slice(1)} Rent
              </span>
            )}
            {isNewProperty && (
              <span className="bg-white/95 backdrop-blur-md text-gray-800 font-semibold px-2 py-1 rounded-md text-[10px] shadow-md border border-gray-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                New Listing
              </span>
            )}
            {isPopular && (
              <span className="bg-white/95 backdrop-blur-md text-gray-800 font-semibold px-2 py-1 rounded-md text-[10px] shadow-md border border-gray-200 flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5 text-amber-600" />
                Popular
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          {isAuth && (
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-1.5 right-1.5 z-10 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white p-1.5 transition-all duration-300 shadow-sm hover:shadow-md ${
                isAnimating ? 'scale-125' : 'scale-100'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-all duration-300 ${
                  isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'
                }`}
              />
            </button>
          )}

          {/* Price Badge - Clean Design */}
          <div className="absolute bottom-1.5 right-1.5 z-10">
            <div className="bg-white/95 backdrop-blur-md text-gray-900 px-2 py-1 rounded-md shadow-md border border-gray-200">
              {formattedPrice ? (
                <>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xs font-bold tracking-tight">AED {formattedPrice}</span>
                  </div>
                  <div className="text-[8px] font-medium text-gray-600 leading-tight">per night</div>
                </>
              ) : (
                <>
                  <div className="text-[10px] font-bold">Contact Us</div>
                  <div className="text-[8px] font-medium text-gray-600 leading-tight">for pricing</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content - Ultra Compact Styling */}
        <div className="p-3 bg-white">
          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            {room.name}
          </h3>

          {/* Room Stats - Clean & Uniform */}
          <div className="grid grid-cols-2 gap-1.5 mb-2 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <Users className="w-2.5 h-2.5 text-gray-500" />
              <span className="font-medium">{room.guests} Guests</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <Bed className="w-2.5 h-2.5 text-gray-500" />
              <span className="font-medium line-clamp-1">{room.beds}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <Bath className="w-2.5 h-2.5 text-gray-500" />
              <span className="font-medium">{room.baths} Bath{room.baths > 1 ? 's' : ''}</span>
            </div>
            {room.size > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-gray-600">
                <Home className="w-2.5 h-2.5 text-gray-500" />
                <span className="font-medium">{room.size} sqft</span>
              </div>
            )}
          </div>

          {/* Rating - Clean & Uniform */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-gray-400 text-gray-400" />
              <span className="text-[10px] font-semibold text-gray-700">4.9</span>
            </div>
            <span className="text-[10px] text-gray-500">(284 reviews)</span>
          </div>

          {/* View Details Button - Clean Design */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-md transition-all duration-300 shadow-sm hover:shadow-md text-[11px] uppercase tracking-wide"
          >
            View Details
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}
