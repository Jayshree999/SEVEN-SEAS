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
  const disableLightbox = true // Disable lightbox functionality

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
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onClick={disableLightbox ? undefined : () => setSelectedImage(image.id)}
            className={`group relative h-64 md:h-80 rounded-none overflow-hidden ${disableLightbox ? '' : 'cursor-pointer'} transition-all duration-500`}
          >
            <div className="absolute inset-0 bg-[#f8f6f0]">
              {image.url ? (
                <div
                  className="absolute inset-4 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out shadow-sm"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
              ) : (
                <div className="absolute inset-4 flex items-center justify-center bg-gray-100 text-gray-300 text-6xl shadow-sm">
                  {image.title.charAt(0)}
                </div>
              )}
            </div>

            {/* Elegant overlay */}
            <div className="absolute inset-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-4 left-4 right-4 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-white text-xl md:text-2xl mb-2 tracking-wide font-medium" style={{ fontFamily: 'var(--font-playfair)' }}>{image.title}</h3>
              <div className="w-8 h-[1px] bg-amber-400 mb-3"></div>
              {image.description && (
                <p className="text-white/80 text-sm font-light leading-relaxed">{image.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {!disableLightbox && selectedImage && (
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

