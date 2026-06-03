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
  { number: '317', label: 'Luxury Rooms' },
  { number: '2024', label: 'Year Established' },
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

      {/* Story Section - Premium Enhanced */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200/50"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Welcome to Seven Seas Hotel Dubai
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Nestled in the heart of Dubai, Seven Seas Hotel represents the perfect fusion of modern luxury and traditional Arabian hospitality. Since our opening, we have been committed to providing an unparalleled experience for every guest who walks through our doors.
              </p>
              <p>
                Our hotel offers 317 elegantly designed rooms and suites, each thoughtfully appointed with contemporary amenities and stunning views of the city. Whether you're visiting for business or leisure, our dedicated team ensures your stay is nothing short of exceptional.
              </p>
              <p>
                From our award-winning restaurants serving international and local cuisine to our state-of-the-art spa and wellness facilities, every aspect of Seven Seas Hotel is designed to exceed your expectations. We invite you to experience the magic of Dubai with us.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Premium Enhanced */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/10 via-transparent to-amber-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Premium Enhanced */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-amber-200/15 via-amber-100/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-amber-200/15 via-amber-100/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 md:mb-16 text-center"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 md:p-8 text-center border border-gray-200/50 transition-all duration-300"
    >
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-3">
        {stat.number}
      </div>
      <div className="text-gray-700 font-semibold text-sm md:text-base">{stat.label}</div>
    </motion.div>
  )
}

function ValueCard({ value, index }: { value: typeof values[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.08, 
        y: -10,
        boxShadow: '0 25px 50px rgba(217, 119, 6, 0.2)',
        borderColor: '#d97706',
        rotateY: 5,
      }}
      className="bg-white border-2 border-amber-200 rounded-xl p-6 md:p-8 text-center hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-100/0 group-hover:from-amber-50/50 group-hover:to-amber-100/30 transition-all duration-300"></div>
      
      <div className="relative z-10">
        <motion.div
          animate={inView ? { scale: [1, 1.1, 1] } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl mb-4"
        >
          {value.icon}
        </motion.div>
        <h3 
          className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {value.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{value.description}</p>
      </div>
    </motion.div>
  )
}

