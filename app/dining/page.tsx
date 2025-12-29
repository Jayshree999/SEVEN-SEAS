'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { UtensilsCrossed, Phone, MessageCircle, Sparkles, ChefHat, Coffee, Star, ArrowRight, Clock } from 'lucide-react'
import { useRef } from 'react'

const legendaryRestaurants = [
  {
    name: 'Salt Restaurant',
    logo: '/Salt.webp',
    interiorImage: '/019A3962-Enhanced-NR-1-scaled.jpg',
    description: 'Immerse yourself in a sophisticated dining experience, where elegance meets exquisite flavors. Our menu showcases the finest Russian & Continental cuisine, blending tradition with gourmet artistry. From the rich, hearty borscht to an array of continental delicacies, every dish is a masterpiece crafted to perfection.',
    cuisine: 'Authentic Russian & Continental',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
    rating: 4.8,
  },
  {
    name: "Julienne's",
    logo: '/Julline-revrp2l58qx09vxs4atc909w9xpcievp01xqget734.png',
    interiorImage: '/019A3962-Enhanced-NR-1-scaled.jpg',
    description: "Indulge in an authentic Indian culinary experience at Julienne's. Our expertly crafted dishes, from sizzling tandoors to rich, aromatic curries, bring you the true flavors of India. Enjoy every bite in a warm, inviting al fresco setting, perfect for shared moments.",
    cuisine: 'Authentic Indian Flavors',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
    rating: 4.9,
  },
  {
    name: 'Rovee',
    logo: '/Rovee-LOGO-revrz2lbyaltsjeuq4fg9zffsiexehkw1jsp9dzew0.png',
    interiorImage: '/Nahas-al-Blad.webp',
    description: 'Indulge in the rich flavors of Lebanon at Nafas Al Balad Arabic Restaurant. Savor every bite of our mouthwatering Lebanese dishes, made with authentic ingredients and served with warmth. A culinary journey you won\'t forget!',
    cuisine: 'Authentic Arabic Flavors',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
    rating: 4.7,
  },
  {
    name: 'Chachu Chai',
    logo: '/Chahu-cai.png',
    interiorImage: '/WhatsApp_Image_2024-12-15_at_8.51.06_PM-removebg-preview-e1737565952933-r0e3pnup3j6939020r818shyip234hhmdnyw6ehnhc.png',
    description: 'Chachu Chai: A Cafe for Tea at Seven Seas Hotel Dubai is the perfect place to unwind with a cup of tea, offering a cozy ambiance and a variety of flavors. Whether you\'re looking for a soothing experience or a place to meet friends, Chachu Chai is the spot to relax and enjoy a warm beverage. Come and enjoy a cup of warmth today!',
    cuisine: 'A Cafe for Tea',
    phone: '+971 52 322 1162',
    whatsapp: '+971523221162',
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
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-400 drop-shadow-2xl" />
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
              <Link href="/rooms">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Make a reservation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
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
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
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
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-amber-200 h-full">
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`} style={{ fontFamily: 'var(--font-playfair)' }}>
                    {category.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Legendary Restaurant Brands */}
      <section ref={restaurantsRef} className="py-20 md:py-32 px-6 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
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
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}
              >
                <motion.div 
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
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
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      {restaurant.phone}
                    </motion.a>
                    <motion.a
                      href={`https://wa.me/${restaurant.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
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
      <section ref={categoriesRef} className="py-20 md:py-32 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
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
            className="text-center mb-16"
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
                <div className={`absolute inset-0 ${cuisine.bgHover} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-amber-200 text-center h-full flex flex-col items-center justify-center">
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
      <section className="py-20 md:py-32 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            x: [0, 100],
            y: [0, 100],
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
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Phone className="w-16 h-16 mx-auto" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>
              Reach to us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-3">Reservation:</h3>
                <a href="tel:+971551009152" className="text-2xl md:text-3xl font-bold hover:text-amber-200 transition-colors block">
                  +971 55 100 9152
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-3">Booking:</h3>
                <a href="tel:+971551009152" className="text-2xl md:text-3xl font-bold hover:text-amber-200 transition-colors block">
                  +971 55 100 9152
                </a>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-3">Information:</h3>
                <a href="mailto:info@sevenseashotel.ae" className="text-lg hover:text-amber-200 transition-colors">
                  info@sevenseashotel.ae
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-3">Reservations:</h3>
                <a href="mailto:reservation@sevenseashotel.ae" className="text-lg hover:text-amber-200 transition-colors">
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
