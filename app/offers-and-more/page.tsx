'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Tag, Gift, Sparkles, Calendar, Star, Percent, ArrowRight, Phone, CheckCircle } from 'lucide-react'
import { useRef } from 'react'

const exclusiveRoomOffers = [
  {
    title: 'Eid Special Offer',
    code: 'EID299',
    discount: 'AED 299',
    description: 'Celebrate Eid with our exclusive offer. Enjoy a luxurious stay starting from AED 299 per night (excluding taxes). Make your celebration memorable.',
    image: '/offer1.jpeg',
    color: 'from-amber-600 to-yellow-600',
  },
  {
    title: 'Ramadan Long Stay Offer',
    code: 'RAMADANMONTH',
    discount: 'AED 5000',
    description: 'Experience a serene Ramadan with our Long Stay Offer. Book your extended stay starting from AED 5000 per month (excluding taxes).',
    image: '/2.jpeg',
    color: 'from-amber-500 to-amber-600',
  },
  {
    title: 'Ramadan Special Offer',
    code: 'RAMADAN150',
    discount: 'AED 150',
    description: 'Embrace the spirit of Ramadan. Enjoy a peaceful and comfortable stay starting from just AED 150 per night (excluding taxes).',
    image: '/3.jpeg',
    color: 'from-yellow-600 to-amber-700',
  },
]



const longStayRooms = [
  {
    title: 'Premium 19 Series',
    description: 'Stay A Bit Longer - Breakfast Inclusive',
    features: [
      'Bi-weekly housekeeping service',
      'Free WiFi & Utility Bills',
      'Complimentary access to Swimming Pool, Gym, Steam room, Sauna & Jacuzzi.',
      '10% discount on food & beverages except promotions.',
    ],
    validity: 'Monthly / Round the Year',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    title: 'Burj View Executive Suites',
    description: 'Stay A Bit Longer - Breakfast Inclusive',
    features: [
      'Bi-weekly housekeeping service',
      'Free WiFi & Utility Bills',
      'Complimentary access to Swimming Pool, Gym, Steam room, Sauna & Jacuzzi.',
      '10% discount on food & beverages except promotions.',
    ],
    validity: 'Monthly / Round the Year',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Sea View Deluxe Suites',
    description: 'Stay A Bit Longer - Breakfast Inclusive',
    features: [
      'Bi-weekly housekeeping service',
      'Free WiFi & Utility Bills',
      'Complimentary access to Swimming Pool, Gym, Steam room, Sauna & Jacuzzi.',
      '10% discount on food & beverages except promotions.',
    ],
    validity: 'Monthly / Round the Year',
    color: 'from-green-500 to-emerald-500',
  },
]

const amenitiesOffers = [
  {
    title: 'Spa & Wellness',
    discount: '20% OFF',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Fitness & Gym',
    discount: '20% OFF',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Swimming Pool',
    discount: '20% OFF',
    color: 'from-cyan-500 to-blue-500',
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
            src="/offers.webp"
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
              Offers & Promotions
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
              Exclusive Room Offer
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

      {/* Exclusive Room Offers */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Exclusive Room Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock special rates and enjoy premium benefits tailored just for you. Experience more with exclusive discounts available only to members!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {exclusiveRoomOffers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                <div className="relative aspect-square bg-[#f8f6f0] overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-2xl text-gray-900 mb-3 tracking-wide" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {offer.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-amber-600 mb-4"></div>
                  <p className="text-gray-600 mb-6 text-sm font-light leading-relaxed">
                    {offer.description}
                  </p>
                  <div className="mb-6 flex flex-col items-center gap-1">
                    <span className="text-xs uppercase tracking-widest text-gray-400">Promo Code</span>
                    <span className="text-sm font-medium tracking-widest text-amber-700">{offer.code}</span>
                  </div>
                  <a
                    href="tel:+971551009152"
                    className="mt-auto flex items-center justify-center gap-2 w-full px-6 py-3 border border-amber-600/30 hover:border-amber-600 hover:bg-amber-50 text-amber-700 font-medium tracking-wide uppercase text-sm rounded transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+971 55 100 9152</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Newly Renovated Long Stay Rooms */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Newly Renovated Long Stay Rooms
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore spaces thoughtfully designed to welcome you the moment you step inside
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {longStayRooms.map((room, index) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100"
              >
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${room.color} bg-clip-text text-transparent`} style={{ fontFamily: 'var(--font-playfair)' }}>
                  {room.title}
                </h3>
                <p className="text-gray-600 mb-6 font-semibold">{room.description}</p>
                <ul className="space-y-3 mb-6">
                  {room.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-6">
                  <span className="text-sm text-gray-500">Validity:</span>
                  <span className="ml-2 font-semibold text-gray-900">{room.validity}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+971551009152"
                    className="flex items-center justify-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+971 55 100 9152</span>
                  </a>
                  <Link href="/rooms">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-6 py-3 bg-gradient-to-r ${room.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
                    >
                      Book now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get 20% off On Amenities */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Get 20% off On Amenities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Relaxing beach paradises, thrilling urban getaways, exotic hill stations and historic homes of royalty are all within reach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {amenitiesOffers.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${amenity.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white font-bold text-xl">{amenity.discount}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {amenity.title}
                </h3>
                <Link href="/wellness">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-4 px-6 py-3 bg-gradient-to-r ${amenity.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Modern Attire Section */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              The Modern Attire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-bold mb-3">To be Thoughtfully Considered</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether picking up a fresh snack on your way out, or lingering over a good meal with friends, the flavors you crave are here.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">That Wake up the Senses</h3>
                <p className="text-gray-600 leading-relaxed">
                  Power everywhere you need it. Locally inspired artwork adorns our spaces, creating an atmosphere of sophistication and culture.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white relative overflow-hidden">
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
