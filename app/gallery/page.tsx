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

      {/* Filter - Premium Enhanced */}
      <section className="py-12 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-100/10 via-transparent to-amber-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-2 border-amber-400 shadow-lg shadow-amber-500/30'
                    : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Premium Enhanced */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-amber-200/15 via-amber-100/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-amber-200/15 via-amber-100/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -8, rotateY: 5 }}
                  onClick={() => setSelectedImage(image.id)}
                  className="relative h-80 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden cursor-pointer group border-2 border-gray-200/50 hover:border-amber-400/70 transition-all duration-500 shadow-xl hover:shadow-2xl"
                >
                  {/* Premium glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/0 via-amber-300/30 to-amber-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl group-hover:scale-110 transition-transform duration-700 relative z-10">
                    {image.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="text-white/70 text-xs uppercase tracking-wider mb-1 font-semibold">
                      {image.category}
                    </div>
                    <div className="text-white text-xl font-bold">{image.title}</div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section - Premium Enhanced */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-amber-200/15 via-amber-100/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-amber-200/15 via-amber-100/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600">Discover different aspects of our hotel</p>
          </motion.div>
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

      {/* Lightbox - Premium Enhanced */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Premium */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-4 -right-4 md:top-4 md:right-4 w-12 h-12 bg-white/10 backdrop-blur-md text-white text-3xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 shadow-xl border border-white/20"
              >
                ×
              </motion.button>
              
              {/* Image Container - Premium */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <div className="h-[60vh] md:h-[70vh] flex items-center justify-center text-white text-8xl relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="relative z-10">
                    {galleryImages.find(img => img.id === selectedImage)?.title.charAt(0)}
                  </div>
                </div>
                
                {/* Image Info - Premium */}
                <div className="p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white/70 text-sm uppercase tracking-wider mb-2">
                    {galleryImages.find(img => img.id === selectedImage)?.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  )
}

