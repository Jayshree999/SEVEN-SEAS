'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import ParallaxBanner from '@/components/ParallaxBanner'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import { useInView } from 'react-intersection-observer'

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service',
    icon: '⭐',
  },
  {
    title: 'Hospitality',
    description: 'Warm, authentic Arabian hospitality at its finest',
    icon: '🤝',
  },
  {
    title: 'Innovation',
    description: 'Modern amenities and innovative solutions for our guests',
    icon: '💡',
  },
  {
    title: 'Sustainability',
    description: 'Committed to sustainable practices and environmental responsibility',
    icon: '🌱',
  },
]

const stats = [
  { number: '150+', label: 'Luxury Rooms' },
  { number: '10+', label: 'Years of Excellence' },
  { number: '50K+', label: 'Happy Guests' },
  { number: '4.8', label: 'Average Rating' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="ABOUT US"
        subtitle="Our Story of Excellence"
        height="large"
        textPosition="center"
      />

      {/* Image Showcase */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Our Heritage', description: 'A legacy of hospitality' },
              { id: 2, title: 'Our Team', description: 'Dedicated professionals' },
              { id: 3, title: 'Our Location', description: 'Heart of Dubai' },
              { id: 4, title: 'Our Awards', description: 'Recognition & excellence' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section - Our Story */}
      <VideoSection
        title="Our Story"
        description="Discover the journey of Seven Seas Hotel Dubai. From our founding vision to becoming one of Dubai's premier destinations, learn about our commitment to excellence and hospitality."
        position="right"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        title="A Legacy of Luxury"
        subtitle="Where tradition meets innovation"
        height={350}
      />

      {/* Story Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Welcome to Seven Seas Hotel Dubai
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nestled in the heart of Dubai, Seven Seas Hotel represents the perfect fusion of modern luxury and traditional Arabian hospitality. Since our opening, we have been committed to providing an unparalleled experience for every guest who walks through our doors.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our 4-star hotel offers 150+ elegantly designed rooms and suites, each thoughtfully appointed with contemporary amenities and stunning views of the city. Whether you're visiting for business or leisure, our dedicated team ensures your stay is nothing short of exceptional.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From our award-winning restaurants serving international and local cuisine to our state-of-the-art spa and wellness facilities, every aspect of Seven Seas Hotel is designed to exceed your expectations. We invite you to experience the magic of Dubai with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-black mb-12 text-center"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-black mb-2">{stat.number}</div>
      <div className="text-gray-600 font-semibold">{stat.label}</div>
    </motion.div>
  )
}

function ValueCard({ value, index }: { value: typeof values[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center"
    >
      <div className="text-5xl mb-4">{value.icon}</div>
      <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
      <p className="text-gray-600">{value.description}</p>
    </motion.div>
  )
}

