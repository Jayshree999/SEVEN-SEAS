'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { fetchProperties, Property } from '@/lib/api'

const Room3DPreview = dynamic(() => import('@/components/Room3DPreview'), { ssr: false })

interface RoomDisplay {
  id: string
  name: string
  price: number
  size: string
  guests: number
  beds: string
  amenities: string[]
  image?: string
}

function mapPropertyToRoom(property: Property): RoomDisplay {
  const bedrooms = typeof property.bedrooms === 'string' ? parseInt(property.bedrooms) || 1 : property.bedrooms || 1
  const guests = parseInt(property.guest_no as string) || bedrooms * 2
  const size = property.size || property.area || 0
  
  // Determine bed type based on room name or default
  let beds = '1 King Bed'
  if (property.title?.toLowerCase().includes('twin') || property.title?.toLowerCase().includes('queen')) {
    beds = bedrooms > 1 ? `${bedrooms} Queen Beds` : '2 Queen Beds'
  } else if (property.title?.toLowerCase().includes('suite')) {
    beds = '1 King Bed + Sofa Bed'
  }

  return {
    id: property._id || property.id || '',
    name: property.title || property.name || property.nickname || 'Untitled Room',
    price: property.price || 0,
    size: `${size} sqm`,
    guests: guests,
    beds: beds,
    amenities: property.amenities || ['Free WiFi', 'Air Conditioning'],
    image: property.photos?.[0],
  }
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomDisplay[]>([])
  const [allRooms, setAllRooms] = useState<RoomDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

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
        setAllRooms(mappedRooms)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rooms')
        console.error('Error loading rooms:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setRooms(allRooms.slice(startIndex, endIndex))
  }, [allRooms, currentPage])

  const totalPages = Math.ceil(allRooms.length / itemsPerPage)
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="OUR ROOMS"
        subtitle="Experience comfort and luxury in our thoughtfully designed accommodations"
        height="large"
        textPosition="center"
      />

      {/* Room Types Showcase */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Room Categories
            </h2>
            <p className="text-lg text-gray-600">Choose from our selection of luxurious accommodations</p>
          </div>
          <ImageGrid
            images={[
              { id: 1, title: 'Deluxe Rooms', description: '35 sqm • City View • Perfect for couples' },
              { id: 2, title: 'Executive Suites', description: '55 sqm • Premium View • Separate living area' },
              { id: 3, title: 'Presidential Suites', description: '85 sqm • Panoramic View • Butler service' },
              { id: 4, title: 'Family Suites', description: '70 sqm • City View • Perfect for families' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        title="Luxury Redefined"
        description="Each room is meticulously designed to provide the ultimate comfort and elegance. Experience world-class amenities and breathtaking views in every accommodation."
        position="center"
      />

      {/* Rooms Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-600 text-lg">Loading rooms...</div>
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
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {rooms.map((room, index) => (
                  <RoomCard key={room.id} room={room} index={index} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center justify-center gap-4">
                  <div className="text-gray-600 text-sm mb-2">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, allRooms.length)} of {allRooms.length} rooms
                  </div>
                  <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    className={`px-6 py-3 border-2 font-semibold uppercase tracking-wider transition-all ${
                      currentPage === 1
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-black text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    Previous
                  </motion.button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 font-semibold transition-all ${
                          currentPage === page
                            ? 'bg-black text-white border-2 border-black'
                            : 'bg-white text-black border-2 border-gray-300 hover:border-black'
                        }`}
                      >
                        {page}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                    className={`px-6 py-3 border-2 font-semibold uppercase tracking-wider transition-all ${
                      currentPage === totalPages
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-black text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    Next
                  </motion.button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

function RoomCard({ room, index }: { room: RoomDisplay, index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  
  const displayedAmenities = showAllAmenities ? room.amenities : room.amenities.slice(0, 4)
  const hasMoreAmenities = room.amenities.length > 4

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)' }}
      className="bg-white border-2 border-amber-200 rounded-lg overflow-hidden group cursor-pointer hover:border-amber-400 transition-all duration-300 premium-border luxury-glow shadow-lg hover:shadow-2xl"
      style={{
        boxShadow: '0 10px 40px rgba(217, 119, 6, 0.1)',
      }}
    >
      {/* 3D Room Preview */}
      <div className="h-96 relative overflow-hidden">
        <Room3DPreview roomType={room.name.toLowerCase()} />
        <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-500 to-yellow-600 text-white px-5 py-2.5 font-bold rounded-lg shadow-xl border-2 border-amber-400 backdrop-blur-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
          ${room.price}/night
        </div>
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black/90 to-black/70 backdrop-blur-md text-white px-5 py-2.5 font-semibold rounded-lg border border-amber-400/30 shadow-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
          {room.name}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{room.name}</h3>
        
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <span className="px-3 py-1.5 bg-amber-50 text-amber-900 rounded-full border border-amber-200 font-medium">📏 {room.size}</span>
          <span className="px-3 py-1.5 bg-amber-50 text-amber-900 rounded-full border border-amber-200 font-medium">👥 {room.guests} Guests</span>
          <span className="px-3 py-1.5 bg-amber-50 text-amber-900 rounded-full border border-amber-200 font-medium">🛏️ {room.beds}</span>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-black mb-4 text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>Amenities:</h4>
          <div className="flex flex-wrap gap-2.5 mb-3">
            {displayedAmenities.map((amenity) => (
              <motion.span
                key={amenity}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 text-amber-900 text-sm rounded-full border border-amber-200 shadow-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.15)',
                }}
              >
                ✨ {amenity}
              </motion.span>
            ))}
          </div>
          {hasMoreAmenities && (
            <motion.button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-amber-700 hover:text-amber-900 font-semibold text-sm flex items-center gap-2 transition-colors group"
            >
              <span>{showAllAmenities ? 'Show Less' : 'Show More'}</span>
              <motion.span
                animate={{ rotate: showAllAmenities ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-amber-700 group-hover:text-amber-900"
              >
                ▼
              </motion.span>
            </motion.button>
          )}
        </div>

        <div className="flex gap-4">
          <Link href={`/rooms/${room.id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              View Details
            </motion.button>
          </Link>
          <Link href={`/rooms/${room.id}?book=true`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Book Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

