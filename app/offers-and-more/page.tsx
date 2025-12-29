'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Tag, Gift, Sparkles, Calendar, Star, Percent, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const specialOffers = [
  {
    title: 'Early Bird Special',
    description: 'Book your stay in advance and enjoy exclusive discounts on room rates. Perfect for planning your Dubai getaway.',
    discount: '20% OFF',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Weekend Getaway',
    description: 'Escape to luxury this weekend. Special rates for Friday and Saturday stays with complimentary breakfast.',
    discount: '15% OFF',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Extended Stay',
    description: 'Stay longer and save more. Book 5 nights or more and receive special extended stay rates.',
    discount: '25% OFF',
    icon: Calendar,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Honeymoon Package',
    description: 'Celebrate your special moments with our romantic honeymoon package including room upgrade and spa credits.',
    discount: '30% OFF',
    icon: Sparkles,
    color: 'from-rose-500 to-pink-500',
  },
]

const packages = [
  {
    name: 'Dining Package',
    description: 'Enjoy complimentary breakfast and dinner credits at our signature restaurants.',
    icon: Tag,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Spa Package',
    description: 'Relax and rejuvenate with spa treatments included in your stay.',
    icon: Sparkles,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Family Package',
    description: 'Perfect for families with special rates and family-friendly amenities.',
    icon: Gift,
    gradient: 'from-blue-500 to-cyan-500',
  },
]

export default function OffersAndMorePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [offersRef, offersInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            src="/hero2.jpg"
            alt="Special Offers"
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
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', delay: 0.3 }}
              className="inline-block mb-6"
            >
              <Percent className="w-16 h-16 text-amber-400 drop-shadow-2xl" />
            </motion.div>
            
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              style={{ 
                fontFamily: 'var(--font-playfair)',
                textShadow: '0 4px 30px rgba(0, 0, 0, 1), 0 2px 15px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Offers & More
            </motion.h1>
            
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
              style={{
                textShadow: '0 3px 15px rgba(0, 0, 0, 1), 0 1px 8px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Exclusive Deals & Packages
            </motion.p>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
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

      {/* Enhanced Introduction */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              SPECIAL OFFERS & PACKAGES
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exclusive deals and packages designed to make your stay at Seven Seas Hotel even more memorable. From special rates to all-inclusive packages, find the perfect offer for your Dubai adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Special Offers */}
      <section ref={offersRef} className="py-20 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={offersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={offersInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-10 h-10 text-amber-500" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Special Offers
              </h2>
              <Star className="w-10 h-10 text-amber-500" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialOffers.map((offer, index) => {
              const IconComponent = offer.icon
              return (
                <motion.div
                  key={offer.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-amber-200">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.color} rounded-bl-full flex items-center justify-center shadow-xl`}>
                      <span className="text-white font-bold text-xl">{offer.discount}</span>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div 
                          className={`w-16 h-16 bg-gradient-to-br ${offer.color} rounded-full flex items-center justify-center shadow-lg`}
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {offer.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {offer.description}
                      </p>
                      
                      <Link href="/rooms">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className={`group relative w-full px-6 py-3 bg-gradient-to-r ${offer.color} text-white font-bold rounded-lg shadow-lg overflow-hidden`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Book Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <motion.div
                            className="absolute inset-0 opacity-80"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Packages */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Special Packages
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const IconComponent = pkg.icon
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-white rounded-xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-amber-200 h-full">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${pkg.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 bg-gradient-to-r ${pkg.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white relative overflow-hidden">
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

        <div className="container mx-auto max-w-4xl text-center relative z-10">
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
              <Percent className="w-16 h-16 mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Don't Miss Out on These Exclusive Offers
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-amber-50 leading-relaxed">
              Book now and take advantage of our special rates and packages. Limited availability, so secure your stay today!
            </p>
            <Link href="/rooms">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-white text-amber-600 font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All Offers
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gray-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
