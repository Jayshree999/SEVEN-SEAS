'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    title: 'Spa & Wellness',
    description: 'Rejuvenating treatments and relaxation therapies',
    icon: '🧘',
    image: '/SPA.png',
  },
  {
    title: 'Fitness Center',
    description: 'State-of-the-art gym with modern equipment',
    icon: '💪',
    image: '/Gym.png',
  },
  {
    title: 'Swimming Pool',
    description: 'Rooftop pool with panoramic city views',
    icon: '🏊',
    image: '/DSC02661-2048x1365.jpg',
  },
  {
    title: 'Business Center',
    description: 'Fully equipped business facilities with meeting rooms',
    icon: '💼',
    image: '/Meeting-Room.png',
  },
  {
    title: 'Concierge',
    description: '24/7 expert assistance with reservations and recommendations',
    icon: '🎫',
    image: '/hero2.jpg',
  },
  {
    title: 'Room Service',
    description: '24/7 in-room dining service with extensive menu',
    icon: '🍽️',
    image: '/hero2.jpg',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="SERVICES"
        subtitle="Comprehensive amenities for your comfort"
        height="small"
        textPosition="center"
      />

      {/* Services Showcase - Premium Enhanced */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Our Premium Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience our comprehensive range of services designed to make your stay exceptional. From 24/7 concierge to world-class spa treatments, we cater to your every need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        videoUrl="https://sevenseashotel.ae/wp-content/uploads/2025/01/Lobby-video-converter.com_.mp4"
        title="Experience Excellence"
        description="Watch how we deliver exceptional service and create memorable experiences for our guests."
        position="center"
      />

      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200/50"
          >
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              For detailed services information, including our restaurants and dining options, please visit our{' '}
              <Link href="/dining" className="text-amber-600 hover:text-amber-700 font-semibold underline decoration-2 underline-offset-4 transition-colors">
                Restaurant & Services
              </Link>{' '}
              page.
            </p>
            <Link href="/dining">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group relative h-[300px] md:h-[350px] overflow-hidden rounded-xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50"
    >
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"></div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div className="text-4xl mb-3">{service.icon}</div>
        <h3 
          className="text-xl md:text-2xl font-bold text-white mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {service.title}
        </h3>
        <p className="text-sm text-gray-200 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Premium border glow */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  )
}

