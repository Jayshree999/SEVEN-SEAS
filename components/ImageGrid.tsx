'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import ImageBanner from './ImageBanner'

interface ImageGridProps {
  images: Array<{
    id: number
    url?: string
    title: string
    description?: string
  }>
  columns?: 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
}

export default function ImageGrid({ images, columns = 3, gap = 'medium' }: ImageGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8',
  }

  return (
    <>
      <div ref={ref} className={`grid grid-cols-1 ${columnClasses[columns]} ${gapClasses[gap]}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
            onClick={() => setSelectedImage(image.id)}
            className="relative h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer group premium-border border-2 border-amber-900/20 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
              {image.url ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl">
                  {image.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
              {image.description && (
                <p className="text-white/80 text-sm">{image.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl z-10 hover:text-gray-300"
            >
              ×
            </button>
            <div className="bg-gradient-to-br from-gray-900 to-black h-96 rounded-lg flex items-center justify-center text-white text-8xl">
              {images.find(img => img.id === selectedImage)?.title.charAt(0)}
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

