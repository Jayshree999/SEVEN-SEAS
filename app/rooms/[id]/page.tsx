'use client'

import { use, useState } from 'react'
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

const Room3DPreview = dynamic(() => import('@/components/Room3DPreview'), { ssr: false })

const roomDetails: Record<string, any> = {
  '1': {
    name: 'Deluxe Room',
    price: 450,
    size: '35 sqm',
    guests: 2,
    beds: '1 King Bed',
    view: 'City View',
    floor: '3rd - 8th Floor',
    description: 'Our Deluxe Rooms offer a perfect blend of comfort and style, featuring modern amenities and elegant furnishings. Ideal for business travelers and couples seeking a luxurious stay in Dubai. The room features floor-to-ceiling windows offering stunning city views, a comfortable king-size bed, and a well-appointed bathroom with premium toiletries.',
    longDescription: 'Step into a world of refined elegance with our Deluxe Rooms. Each room is thoughtfully designed with contemporary decor and luxurious touches. The spacious layout includes a comfortable seating area, a work desk perfect for business travelers, and modern technology throughout. Wake up to breathtaking views of Dubai\'s skyline and enjoy the convenience of being in the heart of the city.',
    amenities: [
      { category: 'Room Features', items: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV (55")', 'Work Desk', 'Seating Area', 'City View', 'Floor-to-Ceiling Windows'] },
      { category: 'Bathroom', items: ['Rain Shower', 'Premium Toiletries', 'Hair Dryer', 'Bathrobes', 'Slippers'] },
      { category: 'Services', items: ['Room Service (24/7)', 'Daily Housekeeping', 'Turndown Service', 'Laundry Service'] },
      { category: 'Entertainment', items: ['Smart TV', 'Cable Channels', 'Streaming Services', 'Bluetooth Speaker'] },
      { category: 'Comfort', items: ['Mini Bar', 'Coffee/Tea Maker', 'Safe', 'Iron & Ironing Board', 'Blackout Curtains'] },
    ],
    images: [
      { id: 1, url: '/room-deluxe-1.jpg', alt: 'Deluxe Room Main View' },
      { id: 2, url: '/room-deluxe-2.jpg', alt: 'Deluxe Room Bed Area' },
      { id: 3, url: '/room-deluxe-3.jpg', alt: 'Deluxe Room Bathroom' },
      { id: 4, url: '/room-deluxe-4.jpg', alt: 'Deluxe Room City View' },
    ],
    highlights: [
      'Spacious 35 sqm room with modern design',
      'Stunning city views from floor-to-ceiling windows',
      'Premium king-size bed with luxury linens',
      'Fully equipped work space for business travelers',
      '24/7 room service available',
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before arrival',
      children: 'Children under 12 stay free when using existing beds',
      pets: 'Pets are not allowed',
      smoking: 'Non-smoking rooms',
    },
  },
  '2': {
    name: 'Executive Suite',
    price: 750,
    size: '55 sqm',
    guests: 2,
    beds: '1 King Bed',
    view: 'Premium City View',
    floor: '9th - 15th Floor',
    description: 'Spacious Executive Suites provide a separate living area and premium amenities. Perfect for extended stays or guests who appreciate extra space and luxury. The suite features a private balcony, separate living room, and enhanced business facilities.',
    longDescription: 'Experience the ultimate in comfort and sophistication with our Executive Suites. These expansive accommodations feature a separate living area, perfect for entertaining or relaxing after a long day. The private balcony offers panoramic views of Dubai, while the enhanced business amenities make it ideal for corporate travelers. The suite includes a luxurious king-size bed, a spacious bathroom with separate bathtub and shower, and premium furnishings throughout.',
    amenities: [
      { category: 'Room Features', items: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV (65")', 'Separate Living Room', 'Private Balcony', 'Premium City View', 'Work Desk'] },
      { category: 'Bathroom', items: ['Separate Bathtub & Shower', 'Premium Toiletries', 'Hair Dryer', 'Bathrobes', 'Slippers', 'Bathroom TV'] },
      { category: 'Services', items: ['Room Service (24/7)', 'Daily Housekeeping', 'Turndown Service', 'Laundry Service', 'Priority Check-in'] },
      { category: 'Entertainment', items: ['Smart TV', 'Cable Channels', 'Streaming Services', 'Premium Sound System'] },
      { category: 'Comfort', items: ['Mini Bar (Premium)', 'Nespresso Machine', 'Safe', 'Iron & Ironing Board', 'Blackout Curtains', 'Separate Seating Area'] },
    ],
    images: [
      { id: 1, url: '/room-executive-1.jpg', alt: 'Executive Suite Living Area' },
      { id: 2, url: '/room-executive-2.jpg', alt: 'Executive Suite Bedroom' },
      { id: 3, url: '/room-executive-3.jpg', alt: 'Executive Suite Balcony' },
      { id: 4, url: '/room-executive-4.jpg', alt: 'Executive Suite Bathroom' },
    ],
    highlights: [
      'Spacious 55 sqm suite with separate living area',
      'Private balcony with premium city views',
      'Enhanced business amenities and workspace',
      'Premium mini bar and Nespresso machine',
      'Priority check-in and personalized service',
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 72 hours before arrival',
      children: 'Children under 12 stay free when using existing beds',
      pets: 'Pets are not allowed',
      smoking: 'Non-smoking rooms',
    },
  },
  '3': {
    name: 'Presidential Suite',
    price: 1200,
    size: '85 sqm',
    guests: 4,
    beds: '1 King Bed + Sofa Bed',
    view: 'Panoramic City View',
    floor: '16th - 20th Floor',
    description: 'Our most luxurious accommodation, the Presidential Suite offers unparalleled elegance with separate living and dining areas, premium furnishings, and exclusive services. Perfect for VIP guests and special occasions.',
    longDescription: 'Indulge in the epitome of luxury with our Presidential Suite. This magnificent accommodation spans 85 square meters and features a grand living room, separate dining area, and a master bedroom with a king-size bed. The suite includes a private jacuzzi, a fully equipped kitchenette, and exclusive butler service. Floor-to-ceiling windows provide breathtaking panoramic views of Dubai, while the premium furnishings and artwork create an atmosphere of refined elegance.',
    amenities: [
      { category: 'Room Features', items: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV (75")', 'Separate Living & Dining Room', 'Private Balcony', 'Panoramic City View', 'Kitchenette'] },
      { category: 'Bathroom', items: ['Jacuzzi', 'Separate Shower', 'Premium Toiletries', 'Hair Dryer', 'Bathrobes', 'Slippers', 'Bathroom TV', 'Separate Powder Room'] },
      { category: 'Services', items: ['Butler Service', 'Room Service (24/7)', 'Daily Housekeeping', 'Turndown Service', 'Laundry Service', 'Priority Check-in/out', 'Airport Transfer (Complimentary)'] },
      { category: 'Entertainment', items: ['Smart TV', 'Premium Sound System', 'Gaming Console', 'Streaming Services'] },
      { category: 'Comfort', items: ['Premium Mini Bar', 'Nespresso Machine', 'Wine Selection', 'Safe', 'Iron & Ironing Board', 'Blackout Curtains', 'Separate Seating Areas'] },
    ],
    images: [
      { id: 1, url: '/room-presidential-1.jpg', alt: 'Presidential Suite Living Room' },
      { id: 2, url: '/room-presidential-2.jpg', alt: 'Presidential Suite Bedroom' },
      { id: 3, url: '/room-presidential-3.jpg', alt: 'Presidential Suite Jacuzzi' },
      { id: 4, url: '/room-presidential-4.jpg', alt: 'Presidential Suite Dining Area' },
    ],
    highlights: [
      'Luxurious 85 sqm suite with multiple rooms',
      'Private jacuzzi and premium bathroom',
      'Exclusive butler service',
      'Panoramic views from high floors',
      'Complimentary airport transfer',
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '2:00 PM',
      cancellation: 'Free cancellation up to 7 days before arrival',
      children: 'Children under 12 stay free when using existing beds',
      pets: 'Pets are not allowed',
      smoking: 'Non-smoking rooms',
    },
  },
  '4': {
    name: 'Family Suite',
    price: 950,
    size: '70 sqm',
    guests: 4,
    beds: '2 Queen Beds',
    view: 'City View',
    floor: '5th - 12th Floor',
    description: 'Designed with families in mind, our Family Suites provide ample space, separate sleeping areas, and family-friendly amenities for a comfortable stay. Perfect for families traveling with children.',
    longDescription: 'Create lasting memories with your family in our spacious Family Suites. These thoughtfully designed accommodations feature two separate bedrooms with queen-size beds, a comfortable living area, and family-friendly amenities. The suite includes a kitchenette for preparing snacks, a dining area, and plenty of space for children to play. Special amenities for kids include welcome gifts, children\'s bathrobes, and age-appropriate entertainment options.',
    amenities: [
      { category: 'Room Features', items: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV (55")', 'Separate Bedrooms', 'Living Area', 'City View', 'Kitchenette'] },
      { category: 'Bathroom', items: ['Bathtub & Shower', 'Premium Toiletries', 'Hair Dryer', 'Bathrobes (Adult & Kids)', 'Slippers'] },
      { category: 'Services', items: ['Room Service (24/7)', 'Daily Housekeeping', 'Turndown Service', 'Laundry Service', 'Kids Welcome Amenities'] },
      { category: 'Entertainment', items: ['Smart TV', 'Cable Channels', 'Kids Channels', 'Streaming Services', 'Board Games'] },
      { category: 'Comfort', items: ['Mini Bar', 'Coffee/Tea Maker', 'Safe', 'Iron & Ironing Board', 'Blackout Curtains', 'Extra Beds Available'] },
    ],
    images: [
      { id: 1, url: '/room-family-1.jpg', alt: 'Family Suite Main Room' },
      { id: 2, url: '/room-family-2.jpg', alt: 'Family Suite Bedroom' },
      { id: 3, url: '/room-family-3.jpg', alt: 'Family Suite Living Area' },
      { id: 4, url: '/room-family-4.jpg', alt: 'Family Suite Kitchenette' },
    ],
    highlights: [
      'Spacious 70 sqm suite with separate bedrooms',
      'Family-friendly amenities and services',
      'Kitchenette for preparing snacks',
      'Kids welcome amenities included',
      'Extra beds available upon request',
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before arrival',
      children: 'Children under 12 stay free when using existing beds',
      pets: 'Pets are not allowed',
      smoking: 'Non-smoking rooms',
    },
  },
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
  const room = roomDetails[resolvedParams.id] || roomDetails['1']
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'policies'>('overview')

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <div className="pt-32">
        <VideoBanner
          title={room.name}
          subtitle={`${room.size} • ${room.guests} Guests • ${room.view} • $${room.price} per night`}
          height="large"
          textPosition="left"
        />
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
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black mb-8">Room Gallery</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
            {/* Main Image */}
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center text-white text-8xl"
                >
                  {room.images[selectedImage]?.title?.charAt(0) || room.name.charAt(0)}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
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
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded">
                {room.images[selectedImage]?.alt || `${room.name} - Image ${selectedImage + 1}`}
              </div>
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
                    selectedImage === index ? 'ring-4 ring-black' : ''
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold truncate">
                    {img.alt || `View ${index + 1}`}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Room Images */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black mb-8">More Views</h2>
          <ImageGrid
            images={room.images.map((img: any) => ({
              id: img.id,
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
                    <h2 className="text-3xl font-bold text-black mb-6">Amenities & Services</h2>
                    {room.amenities.map((category: any, index: number) => (
                      <div key={index}>
                        <h3 className="text-xl font-bold text-black mb-4">{category.category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.items.map((item: string) => (
                            <div key={item} className="flex items-center gap-3">
                              <span className="text-black">✓</span>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
                    <div className="text-4xl font-bold text-black mb-2">${room.price}</div>
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
                        <BookingForm roomId={resolvedParams.id} roomName={room.name} price={room.price} />
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
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(roomDetails)
              .filter(([id]) => id !== resolvedParams.id)
              .slice(0, 3)
              .map(([id, relatedRoom]: [string, any]) => (
                <Link key={id} href={`/rooms/${id}`}>
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
                        <span className="text-2xl font-bold text-black">${relatedRoom.price}</span>
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
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
