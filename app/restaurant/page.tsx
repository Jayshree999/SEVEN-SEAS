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

const restaurants = [
  {
    name: 'Azure Restaurant',
    cuisine: 'International',
    description: 'Experience world-class international cuisine in an elegant setting with panoramic views of Dubai.',
    hours: '7:00 AM - 11:00 PM',
    dressCode: 'Smart Casual',
    features: ['Breakfast Buffet', 'A la Carte', 'Outdoor Seating', 'Live Music'],
  },
  {
    name: 'Al Bahar Lounge',
    cuisine: 'Middle Eastern',
    description: 'Authentic Middle Eastern flavors with a modern twist, featuring traditional shisha and live entertainment.',
    hours: '6:00 PM - 2:00 AM',
    dressCode: 'Casual',
    features: ['Shisha', 'Live Entertainment', 'Outdoor Terrace', 'Signature Cocktails'],
  },
  {
    name: 'The Pool Bar',
    cuisine: 'Light Bites & Beverages',
    description: 'Relax by the pool with refreshing drinks and light snacks in a tropical atmosphere.',
    hours: '10:00 AM - 8:00 PM',
    dressCode: 'Swimwear Allowed',
    features: ['Poolside Service', 'Fresh Juices', 'Light Meals', 'Happy Hour'],
  },
]

const services = [
  {
    title: 'Room Service',
    description: '24/7 in-room dining service with an extensive menu',
    icon: '🍽️',
  },
  {
    title: 'Concierge',
    description: 'Expert assistance with reservations, tours, and local recommendations',
    icon: '🎫',
  },
  {
    title: 'Business Center',
    description: 'Fully equipped business facilities with meeting rooms',
    icon: '💼',
  },
  {
    title: 'Fitness Center',
    description: 'State-of-the-art gym with modern equipment',
    icon: '💪',
  },
  {
    title: 'Spa & Wellness',
    description: 'Rejuvenating treatments and relaxation therapies',
    icon: '🧘',
  },
  {
    title: 'Valet Parking',
    description: 'Complimentary valet parking service',
    icon: '🚗',
  },
]

export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="DINE & SERVICES"
        subtitle="Culinary excellence and exceptional service"
        height="large"
        textPosition="center"
      />

      {/* Restaurant Showcase Banner */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Azure Restaurant', description: 'International cuisine' },
              { id: 2, title: 'Al Bahar Lounge', description: 'Middle Eastern flavors' },
              { id: 3, title: 'Pool Bar', description: 'Light bites & beverages' },
            ]}
            columns={3}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section - Dining Experience */}
      <VideoSection
        title="Culinary Excellence"
        description="Watch our master chefs create culinary masterpieces. Experience the art of fine dining with our award-winning restaurants featuring international and Middle Eastern cuisine."
        position="left"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        title="Where Every Meal is a Masterpiece"
        subtitle="Indulge in world-class dining experiences"
        height={350}
      />

      {/* Restaurants */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-black mb-12 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
            OUR RESTAURANTS
          </h2>
          <div className="space-y-12">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.name} restaurant={restaurant} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Banner */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageBanner
            title="Hotel Services"
            subtitle="Comprehensive amenities for your comfort and convenience"
            height="medium"
            textPosition="center"
          />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-black mb-12 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
            HOTEL SERVICES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function RestaurantCard({ restaurant, index }: { restaurant: typeof restaurants[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        <div className="h-64 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white text-6xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {restaurant.name.charAt(0)}
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Restaurant</div>
            <div className="text-lg font-bold">{restaurant.name}</div>
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-black mb-2">{restaurant.name}</h3>
          <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
          <p className="text-gray-700 mb-6">{restaurant.description}</p>
          
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Hours:</span>
              <span className="text-gray-600">{restaurant.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Dress Code:</span>
              <span className="text-gray-600">{restaurant.dressCode}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-2">Features:</h4>
            <div className="flex flex-wrap gap-2">
              {restaurant.features.map((feature) => (
                <span key={feature} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center"
    >
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </motion.div>
  )
}

