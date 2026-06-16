'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProperties, Property, PropertyFilters, makeRoomSlug } from '@/lib/api'
import { Star, MapPin, Home, Users, Bed, Bath, Heart, TrendingUp, Sparkles, SlidersHorizontal, Search as SearchIcon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCurrency } from '@/contexts/CurrencyContext'
import { toggleWatchlist, getCurrentUserProfile } from '@/lib/user'
import { toast } from 'sonner'
import Filters from '@/components/Filters'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

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

  const [activeFilters, setActiveFilters] = useState<PropertyFilters>({})
  const [sortBy, setSortBy] = useState('sno')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const loadRooms = async (filters: PropertyFilters = {}, sort: string = 'sno', order: 'asc' | 'desc' = 'asc') => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchProperties({
        limit: 100,
        page: 1,
        activeStatus: true,
        filters: filters,
        sortBy: sort,
        sortOrder: order,
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

  useEffect(() => {
    loadRooms(activeFilters, sortBy, sortOrder)
  }, [activeFilters, sortBy, sortOrder])

  const handleFilterChange = (newFilters: PropertyFilters) => {
    setActiveFilters(newFilters)
  }

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

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
                  "@id": `https://sevenseashotel.ae/rooms/${makeRoomSlug(room.property)}`,
                  "name": room.name,
                  "description": `Luxurious ${room.name} at Seven Seas Hotel Dubai. Features ${room.beds}, ${room.baths} bathroom(s), accommodates ${room.guests} guests. ${room.amenities.slice(0, 3).join(', ')}.`,
                  "image": room.image || "https://sevenseashotel.ae/default-room.jpg",
                  "brand": {
                    "@type": "Brand",
                    "name": "Seven Seas Hotel Dubai"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": `https://sevenseashotel.ae/rooms/${makeRoomSlug(room.property)}`,
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
      <div className="pt-32 pb-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our Rooms
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Experience comfort and luxury in our thoughtfully designed accommodations
          </p>
        </motion.div>
      </div>

      {/* Rooms Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Filters
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            initialFilters={activeFilters}
            initialSortBy={sortBy}
            initialSortOrder={sortOrder}
          />

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


      {/* ── AMENITIES ICON BAR ─────────────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-12 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { icon: '/rooms/amenity-smartkey.png',    label: 'Smart Key' },
            { icon: '/rooms/amenity-luggage.png',     label: 'Luggage Storage' },
            { icon: '/rooms/amenity-roomservice.png', label: '24/7 Room Service' },
            { icon: '/rooms/amenity-dining.jpg',      label: '24/7 All Day Dining' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 relative">
                <Image
                  src={item.icon}
                  alt={item.label}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span className="text-white text-sm font-medium tracking-wider uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LONG STAY ROOMS ────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#f7f3ee]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-3 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
            Long Stay Rooms
          </h2>
          <p className="text-center text-gray-600 mb-12 text-base">
            Explore spaces thoughtfully designed to welcome you the moment you step inside
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Room',
                image: '/rooms/longstay-premium.jpg',
                subtitle: 'Stay A Bit Longer - Room Only',
                perks: [
                  'Paid parking',
                  'Bi-weekly housekeeping service',
                  'Free WiFi & Utility Bills',
                  'Complimentary access to Swimming Pool, Gym, Steam room, Sauna & Jacuzzi.',
                  '15% discount on food & beverages except promotions.',
                  '20% Disc on (21st Floor Spa).',
                ],
                validity: 'Monthly / Round the Year',
                phone: '+971 55 1009136',
              },
              {
                title: 'Premium King Room',
                image: '/rooms/longstay-king.jpg',
                subtitle: 'Stay A Bit Longer - Room Only',
                perks: [
                  'Paid parking',
                  'Bi-weekly housekeeping service',
                  'Free WiFi & Utility Bills',
                  'Complimentary access to Swimming Pool, Gym, Steam room, Sauna & Jacuzzi.',
                  '15% discount on food & beverages except promotions.',
                  '15% Disc on (21st Floor Spa).',
                ],
                validity: 'Monthly / Round the Year.',
                phone: '+971 55 100 9136',
              },
              {
                title: 'Executive Suite',
                image: '/rooms/longstay-suite.jpg',
                subtitle: 'Stay A Bit Longer - Room Only',
                perks: [
                  'Paid parking',
                  'Bi-weekly housekeeping service',
                  'Free WiFi & Utility Bills',
                  'Complimentary access to Swimming Pool, Gym, Steam room, Sauna & Jacuzzi.',
                  '15% discount on food & beverages except promotions.',
                  '15% Disc on (21st Floor Spa).',
                ],
                validity: 'Monthly / Round the Year.',
                phone: '+971 55 100 9136',
              },
            ].map((pkg) => (
              <div key={pkg.title} className="bg-white shadow-md overflow-hidden flex flex-col">
                <div className="relative h-56 w-full">
                  <Image src={pkg.image} alt={pkg.title} fill unoptimized className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {pkg.title}
                  </h3>
                  <p className="text-[#b3832b] text-sm font-semibold mb-4">{pkg.subtitle}</p>
                  <ul className="space-y-2 mb-4 flex-1">
                    {pkg.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-[#b3832b] mt-0.5">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mb-4">
                    <span className="font-semibold">Validity:</span> {pkg.validity}
                  </p>
                  <a
                    href={`tel:${pkg.phone.replace(/\s/g, '')}`}
                    className="text-[#b3832b] font-bold text-sm mb-3 block"
                  >
                    {pkg.phone}
                  </a>
                  <a
                    href={EXTERNAL_BOOKING_URL} target="_blank" rel="noopener noreferrer"
                    className="block text-center bg-[#1a1a2e] hover:bg-[#b3832b] text-white text-sm font-semibold py-3 px-6 transition-colors duration-300 tracking-wider uppercase"
                  >
                    Book now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES & AMENITIES ───────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-10" style={{ fontFamily: 'var(--font-playfair)' }}>
              Key Features &amp; Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '24 hours Front Desk', 'Valet Parking', 'Concierge Service', 'Travel Assistance',
                '24 hours Room Service', '24 hours All Day Dining', 'Individually Controlled AC',
                'Minibar & Tea Coffee Maker', 'Wake Up Call Service', 'Laundry Service',
                'Free WI-FI & Safe Deposit', 'Hairdryer', 'Satellite TV', 'Saloon',
                'Gift Shop', 'Luggage Assistance', 'Car Rental',
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#b3832b] flex-shrink-0 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-sm">{feat}</span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-block mt-10 bg-[#1a1a2e] hover:bg-[#b3832b] text-white text-sm font-semibold py-3 px-8 transition-colors duration-300 tracking-wider uppercase"
            >
              Make a reservation
            </Link>
          </div>
          {/* Image side */}
          <div className="relative h-[480px] w-full">
            <Image
              src="/rooms/key-features.jpg"
              alt="Key Features & Amenities"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── REACH TO US / DROP A LINE ──────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#f7f3ee]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Reach to us */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              Reach to us
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="/rooms/contact-phone.png" alt="Phone" fill unoptimized className="object-contain" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Reservation:</p>
                  <a href="tel:+971551009152" className="text-[#1a1a2e] font-bold text-base hover:text-[#b3832b] transition-colors">
                    + 971 55 100 9152
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="/rooms/contact-phone.png" alt="Phone" fill unoptimized className="object-contain" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Booking:</p>
                  <a href="tel:+971551009152" className="text-[#1a1a2e] font-bold text-base hover:text-[#b3832b] transition-colors">
                    + 971 55 100 9152
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Drop a line */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              Drop a line
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="/rooms/contact-email.png" alt="Email" fill unoptimized className="object-contain" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Information:</p>
                  <a href="mailto:info@sevenseashotel.ae" className="text-[#1a1a2e] font-bold text-base hover:text-[#b3832b] transition-colors">
                    info@sevenseashotel.ae
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="/rooms/contact-email.png" alt="Email" fill unoptimized className="object-contain" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Reservations:</p>
                  <a href="mailto:reservation@sevenseashotel.ae" className="text-[#1a1a2e] font-bold text-base hover:text-[#b3832b] transition-colors">
                    reservation@sevenseashotel.ae
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


function RoomCard({ room, index }: { room: RoomDisplay, index: number }) {
  const { isAuth, user } = useAuth()
  const { formatPrice: formatPriceCurrency, currency } = useCurrency()
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

  const formattedPrice = room.price > 0 ? formatPriceCurrency(room.price) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer"
    >
      <Link href={EXTERNAL_BOOKING_URL} target="_blank" rel="noopener noreferrer">
        {/* Premium Card Container */}
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 border border-gold/10 hover:border-gold/30 group-hover:scale-[1.01]">

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
                {/* Subtle Luxury Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                {/* Elegant Vignette Effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-purple-50">
                <Home className="w-24 h-24 text-amber-600/30" />
              </div>
            )}

            {/* Premium Popular Badge */}
            {isPopular && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gold text-white font-bold px-4 py-2 rounded-full text-[11px] shadow-lg border border-white/60 backdrop-blur-md flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="tracking-wider">POPULAR</span>
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

            {/* Premium Price Badge */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl border border-gold/30">
                {formattedPrice ? (
                  <>
                    <div className="flex items-baseline gap-1.5">
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
          </div>

          {/* Premium Content Section */}
          <div className="p-6 bg-white relative">
            {/* Premium Title */}
            <h3 className="text-xl font-bold text-charcoal mb-4 line-clamp-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              {room.name}
            </h3>

            {/* Premium Amenities Grid - Monochromatic Elegance */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="flex flex-col items-center gap-2 text-center bg-cream/40 rounded-lg px-3 py-3 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-md">
                <Users className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-charcoal">{room.guests}</span>
                  <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Guests</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center bg-cream/40 rounded-lg px-3 py-3 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-md">
                <Bed className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-charcoal line-clamp-1">{room.beds}</span>
                  <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Beds</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center bg-cream/40 rounded-lg px-3 py-3 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-md">
                <Bath className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-charcoal">{room.baths}</span>
                  <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Premium Rating Section */}
            <div className="flex items-center justify-between mb-5 bg-cream/30 rounded-xl px-4 py-3 border border-gold/20">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-gold rounded-lg px-3 py-1.5 shadow-md">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span className="text-sm font-bold text-white">4.9</span>
                </div>
                <span className="text-sm text-charcoal font-bold">Exceptional</span>
              </div>
              <span className="text-xs text-gray-700 font-medium">284 reviews</span>
            </div>

            {/* Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-charcoal hover:bg-gold text-white font-bold rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl text-sm uppercase tracking-wider relative overflow-hidden group/btn border border-charcoal hover:border-gold"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>View Details</span>
                <motion.span
                  className="inline-block text-lg"
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </span>
              {/* Subtle Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
