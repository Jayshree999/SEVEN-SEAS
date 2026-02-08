'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
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
      <Breadcrumbs />

      {/* Generate JSON-LD Product Schema for all rooms */}
      {!loading && !error && rooms.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": rooms.map((room, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "@id": `https://sevenseashotel.ae/rooms/${room.id}`,
                  "name": room.name,
                  "description": `Luxurious ${room.name} at Seven Seas Hotel Dubai. Features ${room.beds}, ${room.baths} bathroom(s), accommodates ${room.guests} guests. ${room.amenities.slice(0, 3).join(', ')}.`,
                  "image": room.image || "https://sevenseashotel.ae/default-room.jpg",
                  "brand": {
                    "@type": "Brand",
                    "name": "Seven Seas Hotel Dubai"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": `https://sevenseashotel.ae/rooms/${room.id}`,
                    "priceCurrency": "AED",
                    "price": room.price || "0",
                    "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "Seven Seas Hotel Dubai"
                    }
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "284",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "category": "Hotel Room",
                  "amenityFeature": room.amenities.map(amenity => ({
                    "@type": "LocationFeatureSpecification",
                    "name": amenity
                  }))
                }
              }))
            })
          }}
        />
      )}

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
      className="group cursor-pointer"
    >
      <Link href={`/rooms/${room.id}`}>
        {/* Ultra-Premium Card Container */}
        <div className="relative bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 border-2 border-amber-200/30 hover:border-amber-300/50 backdrop-blur-sm group-hover:scale-[1.02]">

          {/* Ultra-Premium Image Container with Ornate Overlay */}
          <div className="relative h-64 overflow-hidden">
            {room.image ? (
              <>
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-[1.15] transition-transform duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                {/* Multi-Layered Luxury Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-purple-900/20 pointer-events-none" />
                {/* Elegant Vignette Effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-purple-50">
                <Home className="w-24 h-24 text-amber-600/30" />
              </div>
            )}

            {/* Ultra-Premium Popular Badge */}
            {isPopular && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-extrabold px-4 py-2 rounded-full text-[11px] shadow-2xl border-2 border-white/40 backdrop-blur-xl flex items-center gap-2 animate-pulse">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="tracking-widest">POPULAR</span>
                </div>
              </div>
            )}

            {/* Premium Wishlist Button */}
            {isAuth && (
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-3 right-3 z-10 rounded-full bg-white/95 backdrop-blur-lg hover:bg-white p-2.5 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 ${isAnimating ? 'scale-125' : 'scale-100'
                  }`}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700 hover:text-red-500'
                    }`}
                />
              </button>
            )}

            {/* Ultra-Premium Price Badge with Ornate Styling */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-gradient-to-br from-white via-amber-50/90 to-white backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-300/40">
                {formattedPrice ? (
                  <>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-extrabold text-amber-900 tracking-wide">AED</span>
                      <span className="text-2xl font-black text-gray-900 tracking-tight">{formattedPrice}</span>
                    </div>
                    <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-[0.15em] text-center mt-0.5">per night</div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-black text-gray-900">Contact Us</div>
                    <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-[0.15em]">for pricing</div>
                  </>
                )}
              </div>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-transparent rounded-br-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full pointer-events-none" />
          </div>

          {/* Premium Content Section */}
          <div className="p-5 bg-gradient-to-br from-white via-slate-50/50 to-amber-50/30 relative">

            {/* Decorative Element */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

            {/* Premium Title */}
            <h3 className="text-lg font-extrabold text-gray-900 mb-3 line-clamp-1 leading-tight">
              {room.name}
            </h3>

            {/* Ultra-Premium Amenities Grid - 3 items only, no size */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="flex flex-col items-center gap-2 text-center bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl px-3 py-3 border-2 border-amber-200/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg shadow-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-900">{room.guests}</span>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wide">Guests</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl px-3 py-3 border-2 border-blue-200/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-lg">
                  <Bed className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-900 line-clamp-1">{room.beds}</span>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wide">Beds</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl px-3 py-3 border-2 border-purple-200/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-lg">
                  <Bath className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-900">{room.baths}</span>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wide">Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Ultra-Premium Rating Section */}
            <div className="flex items-center justify-between mb-5 bg-gradient-to-r from-amber-50 via-amber-100/50 to-purple-50 rounded-2xl px-4 py-3 border-2 border-amber-200/40 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl px-3 py-1.5 shadow-xl border border-amber-400/50">
                  <Star className="w-4 h-4 fill-white text-white drop-shadow-md" />
                  <span className="text-sm font-black text-white">4.9</span>
                </div>
                <span className="text-sm text-gray-900 font-extrabold tracking-tight">Exceptional</span>
              </div>
              <span className="text-xs text-gray-700 font-bold">284 reviews</span>
            </div>

            {/* Ultra-Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 text-white font-black rounded-2xl transition-all duration-700 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-sm uppercase tracking-[0.2em] relative overflow-hidden group/btn border-2 border-gray-800 hover:border-amber-600"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="drop-shadow-lg">View Details</span>
                <motion.span
                  className="inline-block text-lg"
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </span>
              {/* Enhanced Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
              {/* Subtle Pulse Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/10 to-amber-600/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
            </motion.button>
          </div>

          {/* Ultra-Premium Border Glow & Shimmer */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/0 via-amber-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />

          {/* Elegant Corner Highlights */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-tr-full pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  )
}
