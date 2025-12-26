'use client'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { fetchPropertyById, fetchProperties, Property } from '@/lib/api'

const Room3DPreview = dynamic(() => import('@/components/Room3DPreview'), { ssr: false })

interface RoomDetail {
  name: string
  price: number
  size: string
  guests: number
  beds: string
  view: string
  floor: string
  description: string
  longDescription: string
  amenities: Array<{ category: string; items: string[] }>
  images: Array<{ id: number; url: string; alt: string }>
  highlights: string[]
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    children: string
    pets: string
    smoking: string
  }
}

function mapPropertyToRoomDetail(property: Property | null): RoomDetail | null {
  if (!property) return null

  const bedrooms = typeof property.bedrooms === 'string' ? parseInt(property.bedrooms) || 1 : property.bedrooms || 1
  const guests = parseInt(property.guest_no as string) || bedrooms * 2
  const size = property.size || property.area || 0
  
  // Determine bed type and view based on property data
  let beds = '1 King Bed'
  if (property.title?.toLowerCase().includes('twin') || property.title?.toLowerCase().includes('queen')) {
    beds = bedrooms > 1 ? `${bedrooms} Queen Beds` : '2 Queen Beds'
  } else if (property.title?.toLowerCase().includes('suite')) {
    beds = '1 King Bed + Sofa Bed'
  }

  const view = property.description?.includes('view') 
    ? (property.description.match(/view/i)?.[0] || 'City View')
    : 'City View'

  // Organize amenities by category
  const amenitiesList = property.amenities || []
  const amenities = [
    { category: 'Room Features', items: amenitiesList.filter(a => 
      ['WiFi', 'Air Conditioning', 'TV', 'Desk', 'View', 'Windows'].some(keyword => 
        a.toLowerCase().includes(keyword.toLowerCase())
      )
    ) },
    { category: 'Bathroom', items: amenitiesList.filter(a => 
      ['Bath', 'Shower', 'Toiletries', 'Hair', 'Bathrobe'].some(keyword => 
        a.toLowerCase().includes(keyword.toLowerCase())
      )
    ) },
      { category: 'Services', items: ['Room Service (24/7)', 'Daily Housekeeping', 'Turndown Service', 'Laundry Service'] },
    { category: 'Entertainment', items: amenitiesList.filter(a => 
      ['TV', 'Entertainment', 'Streaming'].some(keyword => 
        a.toLowerCase().includes(keyword.toLowerCase())
      )
    ) },
    { category: 'Comfort', items: amenitiesList.filter(a => 
      ['Mini Bar', 'Coffee', 'Safe', 'Iron', 'Curtains'].some(keyword => 
        a.toLowerCase().includes(keyword.toLowerCase())
      )
    ) },
  ].filter(cat => cat.items.length > 0)

  // Create images from photos or use placeholders
  let images: Array<{ id: number; url: string; alt: string }> = []
  
  if (property.photos && property.photos.length > 0) {
    // Handle both array of objects and array of strings
    if (typeof property.photos[0] === 'object' && 'url' in property.photos[0]) {
      // Photos are objects with url property
      images = (property.photos as Array<{ url: string; category?: string; _id?: string }>).map((photo, index) => ({
        id: index + 1,
        url: photo.url,
        alt: `${property.title || property.name} - ${photo.category || 'Image'} ${index + 1}`
      }))
    } else {
      // Photos are strings
      images = (property.photos as string[]).map((photo, index) => ({
        id: index + 1,
        url: photo,
        alt: `${property.title || property.name} - Image ${index + 1}`
      }))
    }
  } else {
    // Use placeholders if no photos
    images = [
      { id: 1, url: '/room-placeholder.jpg', alt: `${property.title || property.name} - Main View` },
      { id: 2, url: '/room-placeholder.jpg', alt: `${property.title || property.name} - Bed Area` },
      { id: 3, url: '/room-placeholder.jpg', alt: `${property.title || property.name} - Bathroom` },
      { id: 4, url: '/room-placeholder.jpg', alt: `${property.title || property.name} - View` },
    ]
  }

  return {
    name: property.title || property.name || property.nickname || 'Untitled Room',
    price: property.price || 0,
    size: `${size} sqm`,
    guests: guests,
    beds: beds,
    view: view,
    floor: property.totalFloor ? `${property.totalFloor} Floor` : 'Various Floors',
    description: property.description || 'A luxurious accommodation offering comfort and style.',
    longDescription: property.description || 'Experience the ultimate in comfort and sophistication with our thoughtfully designed accommodations.',
    amenities: amenities.length > 0 ? amenities : [
      { category: 'Room Features', items: amenitiesList.slice(0, 5) }
    ],
    images: images,
    highlights: [
      `Spacious ${size} sqm ${property.title?.toLowerCase().includes('suite') ? 'suite' : 'room'}`,
      ...(amenitiesList.slice(0, 3).map(a => `Includes ${a}`)),
      'Premium amenities and services',
      'Modern design and comfort',
    ],
    policies: {
      checkIn: property.Check_in_time || '3:00 PM',
      checkOut: property.Check_out_time || '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before arrival',
      children: property.term?.children ? 'Children welcome' : 'Children under 12 stay free when using existing beds',
      pets: property.term?.pets ? 'Pets are welcome' : 'Pets are not allowed',
      smoking: property.term?.smoking ? 'Smoking rooms available' : 'Non-smoking rooms',
    },
  }
}

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Promise and direct object for compatibility with different Next.js versions
  let resolvedParams: { id: string }
  if (params && typeof params === 'object' && 'then' in params) {
    // It's a Promise
    resolvedParams = use(params as Promise<{ id: string }>)
  } else {
    // It's already resolved
    resolvedParams = params as { id: string }
  }

  const [property, setProperty] = useState<Property | null>(null)
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'policies'>('overview')
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({})
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedProperty = await fetchPropertyById(resolvedParams.id)
        setProperty(fetchedProperty)

        // Load related properties
        const response = await fetchProperties({
          limit: 100,
          page: 1,
          activeStatus: true,
        })
        const allProperties = response.data?.properties || []
        const related = allProperties
          .filter(p => (p._id || p.id) !== resolvedParams.id)
          .slice(0, 3)
        setRelatedProperties(related)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load room details')
        console.error('Error loading property:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [resolvedParams.id])

  const room = mapPropertyToRoomDetail(property)

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center py-40">
          <div className="text-gray-600 text-lg">Loading room details...</div>
        </div>
      </main>
    )
  }

  if (error || !room) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center py-40">
          <div className="text-red-600 text-lg">Error: {error || 'Room not found'}</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Banner - Compact Design */}
      <div className="pt-32">
        <div className="relative h-[380px] md:h-[420px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Background Pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/5 text-9xl font-bold select-none">
              {room.name.charAt(0)}
            </div>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50" />
          
          {/* Content - Compact Layout */}
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="container mx-auto max-w-7xl px-6 pb-6 md:pb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                {/* Room Title */}
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {room.name}
                </h1>
                
                {/* Room Details - Compact Badge Layout */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20">
                    <span className="text-amber-400 text-sm">📏</span>
                    <span className="font-medium text-sm">{room.size}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20">
                    <span className="text-amber-400 text-sm">👥</span>
                    <span className="font-medium text-sm">{room.guests} Guests</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20">
                    <span className="text-amber-400 text-sm">🏙️</span>
                    <span className="font-medium text-sm">{room.view}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold rounded-lg shadow-xl border border-amber-400/50 text-base md:text-lg">
                      AED {room.price}
                    </span>
                    <span className="text-white/70 text-xs md:text-sm">per night</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <section className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-7xl">
          <Link href="/rooms" className="text-gray-600 hover:text-black inline-flex items-center gap-2">
            <span>←</span>
            <span>Back to Rooms</span>
          </Link>
        </div>
      </section>

      {/* Image Gallery Section */}
      {room.images && room.images.length > 0 && (
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black mb-8">Room Gallery</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
            {/* Main Image */}
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black group">
                {room.images[selectedImage]?.url ? (
                  <>
              <AnimatePresence mode="wait">
                      <motion.img
                  key={selectedImage}
                        src={room.images[selectedImage]?.url}
                        alt={room.images[selectedImage]?.alt || `${room.name} - Image ${selectedImage + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          if (!target.parentElement?.querySelector('.fallback-placeholder')) {
                            const fallback = document.createElement('div')
                            fallback.className = 'fallback-placeholder absolute inset-0 flex items-center justify-center text-white text-8xl bg-gradient-to-br from-gray-900 to-black'
                            fallback.textContent = room.name.charAt(0)
                            target.parentElement?.appendChild(fallback)
                          }
                        }}
                      />
              </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-10">
                {room.images.map((img: any, index: number) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      selectedImage === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded z-10">
                {room.images[selectedImage]?.alt || `${room.name} - Image ${selectedImage + 1}`}
              </div>
                    <motion.button
                      onClick={() => {
                        setLightboxIndex(selectedImage)
                        setLightboxOpen(true)
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all z-10"
                    >
                      🔍 View Fullscreen
                    </motion.button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-8xl">
                    {room.name.charAt(0)}
                  </div>
                )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-2 gap-4">
              {room.images.slice(0, 4).map((img: any, index: number) => (
                <motion.button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black group ${
                      selectedImage === index ? 'ring-4 ring-amber-400' : ''
                    }`}
                  >
                    {img.url ? (
                      <>
                        <img
                          src={img.url}
                          alt={img.alt || `View ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            if (!target.parentElement?.querySelector('.fallback-thumbnail')) {
                              const fallback = document.createElement('div')
                              fallback.className = 'fallback-thumbnail absolute inset-0 flex items-center justify-center text-white text-2xl bg-gradient-to-br from-gray-900 to-black'
                              fallback.textContent = `${index + 1}`
                              target.parentElement?.appendChild(fallback)
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold truncate z-10">
                          {img.alt || `View ${index + 1}`}
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                    {index + 1}
                  </div>
                    )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Additional Room Images */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black mb-8">More Views</h2>
          <ImageGrid
            images={room.images.map((img: any) => ({
              id: img.id,
              url: img.url,
              title: img.alt || room.name,
              description: `View of ${room.name}`,
            }))}
            columns={4}
            gap="medium"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Tabs */}
              <div className="border-b-2 border-gray-200">
                <div className="flex gap-8">
                  {(['overview', 'amenities', 'policies'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 font-semibold uppercase tracking-wider transition-colors ${
                        activeTab === tab
                          ? 'text-black border-b-2 border-black -mb-[2px]'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-black mb-4">Room Overview</h2>
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">{room.description}</p>
                      <p className="text-gray-700 leading-relaxed">{room.longDescription}</p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-4">Room Highlights</h3>
                      <ul className="space-y-3">
                        {room.highlights.map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-black mt-1">✓</span>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Room Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="p-6 border-2 border-gray-200 rounded-lg text-center">
                        <div className="text-3xl mb-3">📏</div>
                        <div className="font-bold text-black text-lg">{room.size}</div>
                        <div className="text-sm text-gray-600">Size</div>
                      </div>
                      <div className="p-6 border-2 border-gray-200 rounded-lg text-center">
                        <div className="text-3xl mb-3">👥</div>
                        <div className="font-bold text-black text-lg">{room.guests}</div>
                        <div className="text-sm text-gray-600">Guests</div>
                      </div>
                      <div className="p-6 border-2 border-gray-200 rounded-lg text-center">
                        <div className="text-3xl mb-3">🛏️</div>
                        <div className="font-bold text-black text-sm">{room.beds}</div>
                        <div className="text-sm text-gray-600">Beds</div>
                      </div>
                      <div className="p-6 border-2 border-gray-200 rounded-lg text-center">
                        <div className="text-3xl mb-3">🏢</div>
                        <div className="font-bold text-black text-sm">{room.floor}</div>
                        <div className="text-sm text-gray-600">Floor</div>
                      </div>
                    </div>

                    {/* 3D Preview */}
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-4">3D Room Preview</h3>
                      <Room3DPreview roomType={room.name.toLowerCase()} />
                    </div>

                    {/* Room Views Banner */}
                    <div className="mt-12">
                      <ImageBanner
                        title={`${room.name} Views`}
                        subtitle={`Experience ${room.view} from your room`}
                        height="medium"
                        textPosition="center"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'amenities' && (
                  <motion.div
                    key="amenities"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Amenities & Services</h2>
                    {room.amenities.map((category: any, index: number) => {
                      const isExpanded = expandedCategories[index] || false
                      const displayedItems = isExpanded ? category.items : category.items.slice(0, 4)
                      const hasMoreItems = category.items.length > 4
                      
                      return (
                        <div key={index} className="bg-gradient-to-br from-amber-50/30 to-yellow-50/30 p-6 rounded-lg border border-amber-100">
                          <h3 className="text-xl font-bold text-black mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                            <span className="text-amber-600">✦</span>
                            {category.category}
                          </h3>
                          <div className="flex flex-wrap gap-2.5 mb-3">
                            {displayedItems.map((item: string) => (
                              <motion.span
                                key={item}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-4 py-2 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 text-amber-900 text-sm rounded-full border border-amber-200 shadow-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200"
                                style={{
                                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
                                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.15)',
                                }}
                              >
                                ✨ {item}
                              </motion.span>
                            ))}
                            </div>
                          {hasMoreItems && (
                            <motion.button
                              onClick={() => setExpandedCategories(prev => ({
                                ...prev,
                                [index]: !prev[index]
                              }))}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-amber-700 hover:text-amber-900 font-semibold text-sm flex items-center gap-2 transition-colors group mt-2"
                            >
                              <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-amber-700 group-hover:text-amber-900"
                              >
                                ▼
                              </motion.span>
                            </motion.button>
                          )}
                        </div>
                      )
                    })}
                  </motion.div>
                )}

                {activeTab === 'policies' && (
                  <motion.div
                    key="policies"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold text-black mb-6">Policies & Information</h2>
                    <div className="space-y-6">
                      <div className="p-6 border-2 border-gray-200 rounded-lg">
                        <h3 className="font-bold text-black mb-3">Check-in & Check-out</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Check-in</div>
                            <div className="font-semibold text-black">{room.policies.checkIn}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Check-out</div>
                            <div className="font-semibold text-black">{room.policies.checkOut}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border-2 border-gray-200 rounded-lg">
                        <h3 className="font-bold text-black mb-3">Cancellation Policy</h3>
                        <p className="text-gray-700">{room.policies.cancellation}</p>
                      </div>

                      <div className="p-6 border-2 border-gray-200 rounded-lg">
                        <h3 className="font-bold text-black mb-3">Children & Extra Beds</h3>
                        <p className="text-gray-700 mb-2">{room.policies.children}</p>
                        <p className="text-sm text-gray-600">Extra beds may be available upon request (additional charges apply)</p>
                      </div>

                      <div className="p-6 border-2 border-gray-200 rounded-lg">
                        <h3 className="font-bold text-black mb-3">Pets</h3>
                        <p className="text-gray-700">{room.policies.pets}</p>
                      </div>

                      <div className="p-6 border-2 border-gray-200 rounded-lg">
                        <h3 className="font-bold text-black mb-3">Smoking</h3>
                        <p className="text-gray-700">{room.policies.smoking}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg"
                >
                  <div className="mb-6">
                    <motion.div 
                      className="text-4xl font-bold text-black mb-2 relative inline-block"
                      animate={{
                        backgroundPosition: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{
                        background: 'linear-gradient(90deg, #000 0%, #92400e 50%, #000 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AED {room.price}
                    </motion.div>
                    <div className="text-gray-600">per night</div>
                    <div className="text-sm text-gray-500 mt-2">Taxes and fees included</div>
                  </div>

                    <motion.button
                      onClick={() => setShowBooking(!showBooking)}
                      whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-4 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 relative overflow-hidden premium-border luxury-glow group"
                    >
                      <span className="relative z-10">{showBooking ? 'Hide Booking Form' : 'Book This Room'}</span>
                      <span className="absolute inset-0 luxury-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </motion.button>

                  <AnimatePresence>
                    {showBooking && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <BookingForm roomId={property?._id || property?.id || resolvedParams.id} roomName={room.name} price={room.price} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>✓</span>
                        <span>Free cancellation</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>✓</span>
                        <span>No prepayment needed</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>✓</span>
                        <span>Best price guarantee</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/rooms">
                    <button className="w-full mt-4 px-6 py-3 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                      View All Rooms
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms Banner */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageBanner
            title="Explore More Rooms"
            subtitle="Discover other luxurious accommodations"
            height="small"
            textPosition="center"
          />
        </div>
      </section>

      {/* Related Rooms */}
      {relatedProperties.length > 0 && (
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProperty) => {
                const relatedRoom = mapPropertyToRoomDetail(relatedProperty)
                if (!relatedRoom) return null
                const propertyId = relatedProperty._id || relatedProperty.id || ''
                return (
                  <Link key={propertyId} href={`/rooms/${propertyId}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white text-4xl">
                      {relatedRoom.name.charAt(0)}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black mb-2">{relatedRoom.name}</h3>
                      <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-black">AED {relatedRoom.price}</span>
                        <span className="text-gray-600 text-sm">per night</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <span>{relatedRoom.size}</span>
                        <span>•</span>
                        <span>{relatedRoom.guests} Guests</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                )
              })}
          </div>
        </div>
      </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full"
            >
              <img
                src={room.images[lightboxIndex]?.url}
                alt={room.images[lightboxIndex]?.alt || `${room.name} - Image ${lightboxIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
              <motion.button
                onClick={() => setLightboxOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all text-2xl"
              >
                ✕
              </motion.button>
              {lightboxIndex > 0 && (
                <motion.button
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all text-xl"
                >
                  ←
                </motion.button>
              )}
              {lightboxIndex < room.images.length - 1 && (
                <motion.button
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all text-xl"
                >
                  →
                </motion.button>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded">
                {lightboxIndex + 1} / {room.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
