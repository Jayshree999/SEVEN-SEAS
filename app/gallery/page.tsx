'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import ParallaxBanner from '@/components/ParallaxBanner'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'

const galleryImages = [
  { id: 1, category: 'Rooms', title: 'Deluxe Room', image: '/gallery-1.jpg' },
  { id: 2, category: 'Rooms', title: 'Executive Suite', image: '/gallery-2.jpg' },
  { id: 3, category: 'Facilities', title: 'Swimming Pool', image: '/gallery-3.jpg' },
  { id: 4, category: 'Restaurant', title: 'Fine Dining', image: '/gallery-4.jpg' },
  { id: 5, category: 'Spa', title: 'Wellness Center', image: '/gallery-5.jpg' },
  { id: 6, category: 'Facilities', title: 'Fitness Center', image: '/gallery-6.jpg' },
  { id: 7, category: 'Rooms', title: 'Presidential Suite', image: '/gallery-7.jpg' },
  { id: 8, category: 'Restaurant', title: 'Lounge Bar', image: '/gallery-8.jpg' },
  { id: 9, category: 'Facilities', title: 'Business Center', image: '/gallery-9.jpg' },
]

const categories = ['All', 'Rooms', 'Facilities', 'Restaurant', 'Spa']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="PHOTO GALLERY"
        subtitle="Explore our hotel through stunning visuals"
        height="large"
        textPosition="center"
      />

      {/* Filter */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-2 border-amber-400 shadow-lg'
                    : 'bg-white text-black border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedImage(image.id)}
                  className="relative h-80 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden cursor-pointer group border-2 border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl group-hover:scale-110 transition-transform duration-500">
                    {image.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="text-white/60 text-sm uppercase tracking-wider mb-1">
                      {image.category}
                    </div>
                    <div className="text-white text-xl font-bold">{image.title}</div>
                  </div>
                  <motion.div 
                    className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: '0 0 30px rgba(217, 119, 6, 0.5)',
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600">Discover different aspects of our hotel</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ImageBanner
              title="Luxury Accommodations"
              subtitle="Elegant rooms and suites designed for comfort"
              height="medium"
              textPosition="center"
            />
            <ImageBanner
              title="Dining Excellence"
              subtitle="World-class restaurants and culinary experiences"
              height="medium"
              textPosition="center"
            />
          </div>
          <ImageGrid
            images={[
              { id: 10, title: 'Spa & Wellness', description: 'Rejuvenating treatments' },
              { id: 11, title: 'Event Spaces', description: 'Elegant venues for celebrations' },
              { id: 12, title: 'Business Facilities', description: 'State-of-the-art meeting rooms' },
              { id: 13, title: 'Recreation Areas', description: 'Pool, gym, and leisure facilities' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        title="Hotel Showcase Video"
        description="Watch our comprehensive video tour showcasing the beauty and elegance of Seven Seas Hotel. From our luxurious rooms to world-class facilities, see it all."
        position="center"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        title="Capture Every Moment"
        subtitle="Experience luxury through our lens"
        height={400}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-4xl z-10"
              >
                ×
              </button>
              <div className="bg-gradient-to-br from-gray-900 to-black h-96 rounded-lg flex items-center justify-center text-white text-6xl">
                {galleryImages.find(img => img.id === selectedImage)?.title.charAt(0)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  )
}

