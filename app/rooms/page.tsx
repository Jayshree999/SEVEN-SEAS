'use client'

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

const Room3DPreview = dynamic(() => import('@/components/Room3DPreview'), { ssr: false })

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    price: 450,
    size: '35 sqm',
    guests: 2,
    beds: '1 King Bed',
    amenities: ['Free WiFi', 'Mini Bar', 'City View', 'Work Desk'],
    image: '/room-deluxe.jpg',
  },
  {
    id: 2,
    name: 'Executive Suite',
    price: 750,
    size: '55 sqm',
    guests: 2,
    beds: '1 King Bed',
    amenities: ['Free WiFi', 'Mini Bar', 'Balcony', 'Living Area', 'Premium View'],
    image: '/room-executive.jpg',
  },
  {
    id: 3,
    name: 'Presidential Suite',
    price: 1200,
    size: '85 sqm',
    guests: 4,
    beds: '1 King Bed + Sofa Bed',
    amenities: ['Free WiFi', 'Mini Bar', 'Private Balcony', 'Separate Living Room', 'Premium View', 'Butler Service'],
    image: '/room-presidential.jpg',
  },
  {
    id: 4,
    name: 'Family Suite',
    price: 950,
    size: '70 sqm',
    guests: 4,
    beds: '2 Queen Beds',
    amenities: ['Free WiFi', 'Mini Bar', 'City View', 'Separate Bedroom', 'Kids Amenities'],
    image: '/room-family.jpg',
  },
]

export default function RoomsPage() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function RoomCard({ room, index }: { room: typeof rooms[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)' }}
      className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:border-gray-400 transition-all duration-300 premium-border luxury-glow"
    >
      {/* 3D Room Preview */}
      <div className="h-96 relative overflow-hidden">
        <Room3DPreview roomType={room.name.toLowerCase()} />
        <div className="absolute top-4 right-4 bg-white text-black px-4 py-2 font-bold rounded shadow-lg border-2 border-gray-200">
          ${room.price}/night
        </div>
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 font-semibold rounded">
          {room.name}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-black mb-4">{room.name}</h3>
        
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
          <span>📏 {room.size}</span>
          <span>👥 {room.guests} Guests</span>
          <span>🛏️ {room.beds}</span>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-black mb-3">Amenities:</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
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

