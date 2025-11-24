'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import ImageGrid from '@/components/ImageGrid'

const tourSections = [
  {
    id: 1,
    title: 'Lobby & Reception',
    description: 'Experience our grand entrance and elegant reception area',
    video: '/tour-lobby.mp4',
  },
  {
    id: 2,
    title: 'Guest Rooms',
    description: 'Take a virtual walkthrough of our luxurious accommodations',
    video: '/tour-rooms.mp4',
  },
  {
    id: 3,
    title: 'Restaurants & Bars',
    description: 'Explore our dining venues and culinary spaces',
    video: '/tour-restaurants.mp4',
  },
  {
    id: 4,
    title: 'Spa & Wellness',
    description: 'Discover our relaxation and wellness facilities',
    video: '/tour-spa.mp4',
  },
  {
    id: 5,
    title: 'Pool & Recreation',
    description: 'See our pool area and recreational facilities',
    video: '/tour-pool.mp4',
  },
  {
    id: 6,
    title: 'Event Spaces',
    description: 'Tour our elegant venues for meetings and celebrations',
    video: '/tour-events.mp4',
  },
]

export default function VirtualTourPage() {
  const [selectedTour, setSelectedTour] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="VIRTUAL TOUR"
        subtitle="Explore our hotel from anywhere in the world"
        height="large"
        textPosition="center"
      />

      {/* Main Tour Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Interactive Hotel Tour
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a comprehensive virtual tour of our hotel facilities, rooms, and amenities. 
              Experience the luxury and elegance of Seven Seas Hotel from the comfort of your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedTour(section.id)}
                className="relative h-80 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                  {section.title.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white text-2xl font-bold mb-2">{section.title}</h3>
                  <p className="text-white/80 text-sm">{section.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Tour Video */}
      <VideoSection
        title="Complete Hotel Tour"
        description="Watch our comprehensive video tour showcasing every aspect of Seven Seas Hotel. From the moment you arrive to the luxury of your room, experience it all."
        position="center"
      />

      {/* Tour Highlights */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Tour Highlights
            </h2>
            <p className="text-lg text-gray-600">Key areas to explore</p>
          </div>
          <ImageGrid
            images={[
              { id: 1, title: 'Grand Lobby', description: 'Elegant entrance hall' },
              { id: 2, title: 'Luxury Suites', description: 'Spacious accommodations' },
              { id: 3, title: 'Fine Dining', description: 'Award-winning restaurants' },
              { id: 4, title: 'Spa Retreat', description: 'Wellness sanctuary' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Lightbox for Tour Video */}
      {selectedTour && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedTour(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-6xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-4 right-4 text-white text-4xl z-10 hover:text-gray-300"
            >
              ×
            </button>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
              <div className="text-white text-6xl">
                {tourSections.find(s => s.id === selectedTour)?.title.charAt(0)}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-4">{tourSections.find(s => s.id === selectedTour)?.title}</div>
                  <div className="text-white/60">Virtual Tour Video</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  )
}

