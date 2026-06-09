'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { UtensilsCrossed, Phone, MessageCircle, Sparkles, ChefHat, Coffee, Star, ArrowRight, Clock, Wifi } from 'lucide-react'
import { useRef } from 'react'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

const legendaryRestaurants = [
  {
    name: 'Thamburuu Kerala Resturant & Bar',
    logo: '/thamburuu-logo.jpg',
    interiorImage: '/thamburuu-dining.jpg',
    description: "Step into a world where the rich traditions of God's Own Country come alive. Inspired by the serene rhythm of Kerala's iconic houseboats and the soul-stirring melodies of the traditional thamburu, Thamburuu offers a fine dining experience crafted for the discerning palate. Nestled within the hotel, our restaurant pairs timeless coastal recipes with a sophisticated, modern ambiance. Whether you are starting your evening with a curated cocktail or indulging in a multi-course feast, Thamburuu promises a journey of flavors that lingers long after the last bite.",
    phone: '+971 526691891',
    whatsapp: '971526691891',
  },
  {
    name: 'Salt All Day Dinning',
    logo: '/salt-logo.png',
    interiorImage: '/salt-dining.jpeg',
    description: "From the first light of dawn to late-night cravings, Salt offers a seamless, sophisticated dining experience that evolves with the rhythm of your day. Named after the world's most essential element of flavor, Salt celebrates culinary clarity, sourcing premium global ingredients to craft a menu that is both comfortingly familiar and delightfully innovative. Set in a bright, sun-lit architectural space with panoramic views, Salt is the vibrant heart of the hotel—a place where casual breakfasts transition effortlessly into power lunches, and intimate dinners unfold into evening drinks.",
    phone: '+971 525703016',
    whatsapp: '971525703016',
  },
  {
    name: "Geoffrey's Resto bar",
    logo: '/geoffreys-logo.jpg',
    interiorImage: '/geoffreys-dining.png',
    description: "Welcome to Geoffrey's, where the timeless charm of a classic gentleman's lounge meets the vibrant energy of modern nightlife. With its rich wood paneling, plush leather seating, and warm, ambient lighting, Geoffrey's offers an intimate yet lively sanctuary for hotel guests and local connoisseurs alike. Whether you are winding down after a day of business, celebrating a milestone, or catching up over flawlessly poured classics, Geoffrey's provides the perfect backdrop of effortless luxury and old-world sophistication.",
    phone: '+971 551009150',
    whatsapp: '971551009150',
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legendaryRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, y: 50 }}
                animate={restaurantsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white border border-gray-100 shadow-sm flex flex-col justify-between group h-full relative"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full">
                  {/* Image wrapper with overflow-hidden to contain the zoom effect */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={restaurant.interiorImage}
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Circular logo badge overlapping the bottom-right of the image (placed outside overflow-hidden) */}
                  <div className="absolute bottom-0 right-6 translate-y-1/2 z-10">
                    <div className="relative w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center shadow-lg border border-gray-100">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={restaurant.logo}
                          alt={`${restaurant.name} Logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 pt-12 flex-1 flex flex-col justify-between">
                  <div>
                    {/* 4.5 Stars Rating */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {[1, 2, 3, 4].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 fill-amber-500 text-amber-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      {/* 5th Star: Half-filled */}
                      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id={`halfGrad-${index}`}>
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="50%" stopColor="#e5e7eb" />
                          </linearGradient>
                        </defs>
                        <path
                          fill={`url(#halfGrad-${index})`}
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    </div>

                    <h3
                      className="text-lg font-bold text-gray-900 mb-3"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {restaurant.name}
                    </h3>

                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                      {restaurant.description}
                    </p>
                  </div>

                  <div>
                    {/* Phone link */}
                    <a
                      href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-gray-500 hover:text-[#b8860b] transition-colors text-sm mb-6 font-medium"
                    >
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{restaurant.phone}</span>
                    </a>

                    {/* Bottom action bar */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <a
                        href={`https://wa.me/${restaurant.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-[#b8860b] hover:bg-[#997008] text-white text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 rounded-none shadow-sm inline-block text-center"
                      >
                        WhatsApp
                      </a>

                      <div className="flex items-center gap-3 text-[#b8860b]">
                        <UtensilsCrossed className="w-5 h-5" />
                        <Wifi className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
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
