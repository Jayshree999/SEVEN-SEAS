'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { UtensilsCrossed, Phone, Mail, MessageCircle, Sparkles } from 'lucide-react'

const legendaryRestaurants = [
  {
    name: 'Salt Restaurant',
    logo: '/Salt-Logo-e1738424251524-r0ve7vp0mv2lw2wr3727r5fzgdy2xri15y1k2smxi8.png',
    interiorImage: '/019A3962-Enhanced-NR-1-scaled.jpg',
    description: 'Immerse yourself in a sophisticated dining experience, where elegance meets exquisite flavors. Our menu showcases the finest Russian & Continental cuisine, blending tradition with gourmet artistry. From the rich, hearty borscht to an array of continental delicacies, every dish is a masterpiece crafted to perfection.',
    cuisine: 'Authentic Russian & Continental',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
  },
  {
    name: "Julienne's",
    logo: '/Julline-revrp2l58qx09vxs4atc909w9xpcievp01xqget734.png',
    interiorImage: '/019A3962-Enhanced-NR-1-scaled.jpg',
    description: "Indulge in an authentic Indian culinary experience at Julienne's Our expertly crafted dishes, from sizzling tandoors to rich, aromatic curries, bring you the true flavors of India. Enjoy every bite in a warm, inviting al fresco setting, perfect for shared moments.",
    cuisine: 'Authentic Indian Flavors',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
  },
  {
    name: 'Rovee',
    logo: '/Rovee-LOGO-revrz2lbyaltsjeuq4fg9zffsiexehkw1jsp9dzew0.png',
    interiorImage: '/Nahas-al-Blad.webp',
    description: 'Our open-air dining option "Indulge in the rich flavors of Lebanon at Nafas Al Balad Arabic Restaurant. Savor every bite of our mouthwatering Lebanese dishes, made with authentic ingredients and served with warmth. A culinary journey you won\'t forget!',
    cuisine: 'Authentic Arabic Flavors',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
  },
  {
    name: 'Chachu Chai',
    logo: '/Chahu-cai.png',
    interiorImage: '/WhatsApp_Image_2024-12-15_at_8.51.06_PM-removebg-preview-e1737565952933-r0e3pnup3j6939020r818shyip234hhmdnyw6ehnhc.png',
    description: 'Chachu Chai: A Cafe for Tea" at Seven Seas Hotel Dubai is the perfect place to unwind with a cup of tea, offering a cozy ambiance and a variety of flavors. Whether you\'re looking for a soothing experience or a place to meet friends, Chachu Chai is the spot to relax and enjoy a warm beverage. Come and enjoy a cup of warmth today!',
    cuisine: 'A Cafe for Tea',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
  },
]

const fineDiningRestaurants = [
  {
    name: 'Feel Arabic Taste',
    image: '/Nahas-al-Blad.webp',
    description: 'Authentic Arabic flavors in the heart of Dubai, serving traditional dishes with a modern touch.',
  },
  {
    name: 'Authentic Indian Cuisine',
    image: '/Delhi-6.png',
    description: 'A taste of rich culinary heritage, bringing authentic Indian flavors and spices to your plate.',
  },
  {
    name: 'Fine Dine Restaurant',
    image: '/Salt.webp',
    description: 'An elegant fine dining experience, offering gourmet cuisine in a sophisticated and inviting atmosphere.',
  },
]

const modernDinnerCuisines = [
  { name: 'Classic Arabic Cuisine', image: '/Nahas-al-Blad.webp' },
  { name: 'Authentic Indian Cuisine', image: '/Delhi-6.png' },
  { name: 'Classic Russian Cuisine', image: '/Salt.webp' },
  { name: 'Pure Chinese Cuisine', image: '/Salt.webp' },
]

export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - A Culinary Legacy */}
      <HeroSection />

      {/* Fine Dining at Seven Seas Restaurants */}
      <FineDiningSection />

      {/* Our Legendary Restaurant Brands */}
      <LegendaryRestaurantsSection />

      {/* The Modern Dinner */}
      <ModernDinnerSection />

      {/* Reach to us */}
      <ContactSection />

      <Footer />
    </main>
  )
}

function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <UtensilsCrossed className="w-8 h-8 text-amber-600" />
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </motion.div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            A Culinary Legacy
          </h1>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Discover the epitome of comfort and elegance at Seven Seas Hotel, where luxury meets impeccable hospitality. Nestled in the bustling neighborhood of Al Nahda 1, Dubai, our hotel offers a serene escape with world-class amenities and personalized services.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="group relative px-10 py-5 bg-white text-gray-900 hover:text-white font-bold text-lg uppercase tracking-wider rounded-none shadow-sm overflow-hidden border border-gray-900 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span className="relative z-10 transition-colors duration-300">Make a reservation</span>
              <div className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FineDiningSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Fine Dining at Seven Seas Restaurants
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Embark on a journey of exquisite experiences for the discerning connoisseur, seamlessly woven together with impeccable service, sophisticated ambience and masterful culinary artistry.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {fineDiningRestaurants.map((restaurant, index) => (
            <FineDiningCard key={restaurant.name} restaurant={restaurant} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FineDiningCard({ restaurant, index, inView }: { restaurant: typeof fineDiningRestaurants[0], index: number, inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative h-[350px] md:h-[400px] overflow-hidden rounded-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 bg-[#f8f6f0]"
    >
      <div className="absolute inset-2 overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center">
        <h3
          className="text-xl md:text-2xl font-bold text-white tracking-widest mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {restaurant.name}
        </h3>
        <div className="w-8 h-[1px] bg-amber-400 mx-auto mb-3"></div>
        <p className="text-sm text-white/80 font-light leading-relaxed">
          {restaurant.description}
        </p>
      </div>
    </motion.div>
  )
}

function LegendaryRestaurantsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Our Legendary
            <br />
            Restaurant Brands
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Step into the realm of our culinary legends where a symphony of flavours enchants your taste buds, ambience embraces you in a tapestry of elegance and the genuine warmth of our service leaves you feeling truly indulged.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legendaryRestaurants.map((restaurant, index) => (
            <LegendaryRestaurantCard key={restaurant.name} restaurant={restaurant} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LegendaryRestaurantCard({ restaurant, index, inView }: { restaurant: typeof legendaryRestaurants[0], index: number, inView: boolean }) {
  const whatsappUrl = `https://wa.me/${restaurant.whatsapp.replace(/\s/g, '')}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-none shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        {/* Interior Image */}
        <div className="relative h-64 md:h-full min-h-[300px] group overflow-hidden">
          <Image
            src={restaurant.interiorImage || restaurant.logo}
            alt={`${restaurant.name} interior`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          {/* Logo as Small Icon */}
          <div className="absolute top-4 left-4 z-10">
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center shadow-lg">
              <Image
                src={restaurant.logo}
                alt={restaurant.name}
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 64px, 80px"
              />
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <h3
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {restaurant.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {restaurant.description}
          </p>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
              {restaurant.cuisine}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {restaurant.phone}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ModernDinnerSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The Modern Dinner
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether picking up a fresh snack on your way out, or lingering over a good meal with friends, the flavors you crave are here.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {modernDinnerCuisines.map((cuisine, index) => (
            <ModernDinnerCard key={cuisine.name} cuisine={cuisine} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ModernDinnerCard({ cuisine, index, inView }: { cuisine: typeof modernDinnerCuisines[0], index: number, inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative h-[200px] md:h-[250px] overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <div className="absolute inset-0">
        <Image
          src={cuisine.image}
          alt={cuisine.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      <div className="absolute inset-0 flex items-end p-4 z-10">
        <h3 className="text-sm md:text-base font-bold text-white text-center w-full">
          {cuisine.name}
        </h3>
      </div>
    </motion.div>
  )
}

function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Reach to us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Reservation & Booking</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600">Reservation</p>
                  <a href="tel:+971569756484" className="text-gray-900 font-semibold hover:text-amber-600 transition-colors">
                    +971 56 975 6484
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600">Booking</p>
                  <a href="tel:+971569756484" className="text-gray-900 font-semibold hover:text-amber-600 transition-colors">
                    +971 56 975 6484
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Drop a line</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600">Information</p>
                  <a href="mailto:info@sevenseashotel.ae" className="text-gray-900 font-semibold hover:text-amber-600 transition-colors">
                    info@sevenseashotel.ae
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600">Reservations</p>
                  <a href="mailto:reservation@sevenseashotel.ae" className="text-gray-900 font-semibold hover:text-amber-600 transition-colors">
                    reservation@sevenseashotel.ae
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
