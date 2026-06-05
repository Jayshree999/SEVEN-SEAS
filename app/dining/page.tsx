'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { UtensilsCrossed, Phone, MessageCircle, Sparkles, ChefHat, Coffee, Star, ArrowRight, Clock } from 'lucide-react'
import { useRef } from 'react'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

const legendaryRestaurants = [
  {
    name: 'Fine Dining Restaurant',
    logo: '/Julline-revrp2l58qx09vxs4atc909w9xpcievp01xqget734.png',
    interiorImage: '/019A3962-Enhanced-NR-1-scaled.jpg',
    description: 'Welcome to Seven Seas Restaurants, where exceptional cuisine, elegant ambiance, and impeccable service come together to create a truly memorable dining experience.',
    cuisine: 'Fine Dining',
    phone: '+971 4 276 5555',
    whatsapp: '971526090739',
    rating: 4.8,
  },
  {
    name: "Thamburuu Kerala Restaurant & Bar",
    logo: '/Rovee-LOGO-revrz2lbyaltsjeuq4fg9zffsiexehkw1jsp9dzew0.png',
    interiorImage: '/Nahas-al-Blad.webp',
    description: "Experience the true taste of Kerala. Whether you're planning a romantic dinner, a festive gathering, or a business lunch, our inviting ambiance and exceptional service ensure an unforgettable experience every time.",
    cuisine: 'Authentic Kerala Cuisine',
    phone: '+971 4 276 5555',
    whatsapp: '971526090739',
    rating: 4.9,
  },
  {
    name: 'Salt All Day Dining',
    logo: '/Salt.webp',
    interiorImage: '/019A3962-Enhanced-NR-1-scaled.jpg',
    description: 'Every dish reflects our dedication to craftsmanship, combining time-honored traditions with contemporary culinary innovation.',
    cuisine: 'International Specialties',
    phone: '+971 4 276 5555',
    whatsapp: '971526090739',
    rating: 4.7,
  },
  {
    name: 'Geoffrey\'s Resto bar',
    logo: '/WhatsApp_Image_2024-12-15_at_8.51.06_PM-removebg-preview-e1737565952933-r0e3pnup3j6939020r818shyip234hhmdnyw6ehnhc.png',
    interiorImage: '/Chahu-cai.png',
    description: 'Experience the perfect blend of live music, shisha, and refreshing drinks at Geoffrey’s Bar, nestled inside the iconic Seven Seas Hotel. Join us for unforgettable Dubai nights!',
    cuisine: 'Resto Bar',
    phone: '+971 4 276 5555',
    whatsapp: '971526090739',
    rating: 4.6,
  },
]

const fineDiningCategories = [
  {
    title: 'Feel Arabic Taste',
    description: 'Authentic Arabic flavors in the heart of Dubai, serving traditional dishes with a modern touch.',
    icon: '🍽️',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Authentic Indian Cuisine',
    description: 'A taste of rich culinary heritage, bringing authentic Indian flavors and spices to your plate.',
    icon: '🍛',
    gradient: 'from-red-500 to-pink-600',
  },
  {
    title: 'Fine Dine Restaurant',
    description: 'An elegant fine dining experience, offering gourmet cuisine in a sophisticated and inviting atmosphere.',
    icon: '✨',
    gradient: 'from-purple-500 to-indigo-600',
  },
]

const cuisineTypes = [
  { name: 'Classic Arabic Cuisine', icon: '🥘', color: 'amber', bgHover: 'bg-amber-500' },
  { name: 'Authentic Indian Cuisine', icon: '🍛', color: 'red', bgHover: 'bg-red-500' },
  { name: 'Classic Russian Cuisine', icon: '🥖', color: 'blue', bgHover: 'bg-blue-500' },
  { name: 'Pure Chinese Cuisine', icon: '🥢', color: 'green', bgHover: 'bg-green-500' },
]

export default function DiningPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [restaurantsRef, restaurantsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navigation />

      {/* Enhanced Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/019A3962-Enhanced-NR-1-scaled.jpg"
            alt="Fine Dining"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', delay: 0.3 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <div className="w-16 h-16 rounded-none bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight px-2"
              style={{
                fontFamily: 'var(--font-playfair)',
                textShadow: '0 4px 30px rgba(0, 0, 0, 1), 0 2px 15px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A Culinary Legacy
            </motion.h1>

            <motion.div
              className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6 sm:mb-8"
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-2"
              style={{
                textShadow: '0 3px 15px rgba(0, 0, 0, 1), 0 1px 8px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover the epitome of comfort and elegance at Seven Seas Hotel, where luxury meets impeccable hospitality. Nestled in the bustling neighborhood of Al Nahda 1, Dubai, our hotel offers a serene escape with world-class amenities and personalized services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gray-900 hover:bg-black text-white font-bold text-lg uppercase tracking-widest rounded-none shadow-xl overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Make a reservation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Enhanced Fine Dining Categories */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <UtensilsCrossed className="w-8 h-8 text-amber-500" />
              <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Fine Dining at Seven Seas
              </h2>
              <UtensilsCrossed className="w-8 h-8 text-amber-500" />
            </motion.div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Embark on a journey of exquisite experiences for the discerning connoisseur, seamlessly woven together with impeccable service, sophisticated ambience and masterful culinary artistry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fineDiningCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-none p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-amber-200/50 h-full flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-none bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl filter drop-shadow-sm">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-wide text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {category.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-amber-600/50 mb-4 transition-all duration-500 group-hover:w-16"></div>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Legendary Restaurant Brands */}
      <section ref={restaurantsRef} className="py-12 md:py-16 px-6 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={restaurantsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={restaurantsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-10 h-10 text-amber-500" />
              <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Our Legendary Restaurant Brands
              </h2>
              <Star className="w-10 h-10 text-amber-500" />
            </motion.div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Step into the realm of our culinary legends where a symphony of flavours enchants your taste buds, ambience embraces you in a tapestry of elegance and the genuine warmth of our service leaves you feeling truly indulged.
            </p>
          </motion.div>

          <div className="space-y-32">
            {legendaryRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, y: 100 }}
                animate={restaurantsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 md:gap-8 items-center group`}
              >
                <motion.div
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-[500px] md:h-[600px] rounded-none overflow-hidden shadow-xl border border-gray-100">
                    <Image
                      src={restaurant.interiorImage}
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                    {/* Rating Badge */}
                    <motion.div
                      className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-900">{restaurant.rating}</span>
                    </motion.div>
                  </div>
                </motion.div>

                <div className="flex-1 space-y-6">
                  <motion.div
                    className="relative h-24 w-auto"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Image
                      src={restaurant.logo}
                      alt={`${restaurant.name} Logo`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  <motion.h3
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                  >
                    {restaurant.name}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-lg md:text-xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                  >
                    {restaurant.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-3 text-amber-600 font-semibold text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <ChefHat className="w-6 h-6" />
                    <span>Cuisine: {restaurant.cuisine}</span>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    <motion.a
                      href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-none font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      {restaurant.phone}
                    </motion.a>
                    <motion.a
                      href={`https://wa.me/${restaurant.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-none font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Cuisine Types */}
      <section ref={categoriesRef} className="py-12 md:py-16 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3), transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3), transparent 50%)`,
          }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              The Modern Dinner
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Whether picking up a fresh snack on your way out, or lingering over a good meal with friends, the flavors you crave are here.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cuisineTypes.map((cuisine, index) => (
              <motion.div
                key={cuisine.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-none p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-amber-200 text-center h-full flex flex-col items-center justify-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {cuisine.icon}
                  </motion.div>
                  <h3 className={`font-bold text-gray-800 text-sm md:text-base`}>{cuisine.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-24 md:py-36 px-6 bg-[#1a1a1a] relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            x: [0, 50],
            y: [0, 50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto max-w-5xl text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-8"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Phone className="w-12 h-12 mx-auto text-amber-400" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-16" style={{ fontFamily: 'var(--font-playfair)' }}>
              Reach to us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-none p-8 border border-white/10"
              >
                <h3 className="text-lg font-light text-amber-200 uppercase tracking-widest mb-4">Reservation:</h3>
                <a href="tel:+97142765555" className="text-2xl md:text-3xl font-bold hover:text-white transition-colors block">
                  +971 4 276 5555
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-none p-8 border border-white/10"
              >
                <h3 className="text-lg font-light text-amber-200 uppercase tracking-widest mb-4">Booking:</h3>
                <a href="tel:+971526090739" className="text-2xl md:text-3xl font-bold hover:text-white transition-colors block">
                  +971 52 609 0739
                </a>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-none p-8 border border-white/10"
              >
                <h3 className="text-lg font-light text-amber-200 uppercase tracking-widest mb-4">Information:</h3>
                <a href="mailto:info@sevenseashotel.ae" className="text-xl md:text-2xl font-bold hover:text-white transition-colors">
                  info@sevenseashotel.ae
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-none p-8 border border-white/10"
              >
                <h3 className="text-lg font-light text-amber-200 uppercase tracking-widest mb-4">Reservations:</h3>
                <a href="mailto:reservation@sevenseashotel.ae" className="text-xl md:text-2xl font-bold hover:text-white transition-colors">
                  reservation@sevenseashotel.ae
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
