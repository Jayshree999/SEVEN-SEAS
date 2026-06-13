'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { UtensilsCrossed, Sparkles } from 'lucide-react'
import Link from 'next/link'

const restaurants = [
  {
    title: 'Caffine Coffee Shop',
    image: '/dining/caffine-shop.jpg',
    description: 'At Caffine Coffee Shop, every cup tells a story. We are passionate about creating exceptional coffee experiences that bring people together in a warm, relaxing, and inspiring atmosphere. Whether you are starting your morning, catching up with friends, working remotely, or simply taking a break from a busy day, Caffine is your perfect destination. Our café is built around a love for premium coffee, handcrafted beverages, fresh bites, and genuine hospitality. From rich espresso blends and creamy cappuccinos to refreshing cold brews and signature specialty drinks, every beverage is prepared with carefully selected beans and expert craftsmanship. At Caffine Coffee Shop, we believe coffee is more than just a drink - it is a daily ritual, a source of comfort, and a way to connect with people and moments that matter.',
    link: '/',
  },
  {
    title: 'Thamburuu Kerala resturant & bar',
    image: '/dining/thamburuu-kerala.jpg',
    description: 'Experience the soul of Kerala in the heart of Dubai. At Thamburu Restaurant & Bar, we bring together authentic Kerala flavors, vibrant hospitality, refreshing beverages, and unforgettable dining experiences under one roof. Inspired by the rich culinary heritage of God\'s Own Country, our restaurant is a destination where tradition meets modern comfort. From spicy seafood delicacies and signature Malabar dishes to flavorful grills and handcrafted beverages, every plate at Thamburu is prepared with passion and authenticity. Whether you are craving a comforting Kerala meal, planning a family dinner, or looking for a lively evening with music and friends, Thamburu offers the perfect atmosphere for every occasion. Our menu celebrates the true essence of Kerala cuisine with favorites like fish curry, kappa specials, beef roast, chicken fry, seafood platters, and traditional toddy-shop-inspired recipes loved by food enthusiasts across the UAE. Guests also enjoy our warm ambiance, attentive service, and live entertainment that create a memorable dining experience.',
    link: '/dining',
  },
]

export default function SignatureDining() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30 relative overflow-hidden">
      {/* Ultra Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luxury gradient orbs - Enhanced */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-amber-200/15 to-transparent rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-amber-300/25 via-amber-200/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-200/8 via-amber-100/4 to-amber-200/8 rounded-full blur-[120px]"></div>

        {/* Additional luxury accents */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl"></div>

        {/* Premium pattern overlay - More visible */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zM16.667 37.5c0-5.75-4.75-10.5-10.5-10.5S-4.833 31.75-4.833 37.5.083 48 5.833 48s10.834-4.75 10.834-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5S-8.167 29.492-8.167 37.5-1.675 52 6.333 52s14.5-6.492 14.5-14.5zM56.667 37.5c0-5.75-4.75-10.5-10.5-10.5s-10.5 4.75-10.5 10.5 4.75 10.5 10.5 10.5 10.5-4.75 10.5-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Elegant border lines - Enhanced */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>

        {/* Side accent lines */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Ultra Premium & Compact */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            {/* Title with Icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 flex items-center gap-3"
            >
              <div className="relative">
                <UtensilsCrossed className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  SIGNATURE
                  <br />
                  DINING
                </h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 max-w-2xl"
            >
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                Embark on a journey of exquisite experiences, encompassing impeccable service, sophisticated ambience and masterful culinary artistry.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Restaurants - Alternating Layout */}
        <div ref={ref} className="space-y-12 md:space-y-16">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.title} restaurant={restaurant} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RestaurantCard({
  restaurant,
  index,
  inView
}: {
  restaurant: typeof restaurants[0]
  index: number
  inView: boolean
}) {
  const isEven = index % 2 === 0

  return (
    <Link href={restaurant.link}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        <div className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`}>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
            className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[300px]"
          >
            <Image
              src={restaurant.image}
              alt={restaurant.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
          >
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {restaurant.title}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mb-6"></div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="text-gray-600 leading-relaxed text-sm md:text-base mb-6"
            >
              {restaurant.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <span className="inline-flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                Explore More
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-32 h-32 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      </motion.div>
    </Link>
  )
}


