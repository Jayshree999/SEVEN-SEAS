'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'

const offers = [
  {
    title: 'Early Bird Special',
    discount: '20% OFF',
    description: 'Book 30 days in advance and save on your stay',
    validUntil: 'Valid until Dec 31, 2024',
    link: '/offers',
  },
  {
    title: 'Weekend Getaway',
    discount: '15% OFF',
    description: 'Perfect weekend escape with complimentary breakfast',
    validUntil: 'Valid until Dec 31, 2024',
    link: '/offers',
  },
  {
    title: 'Extended Stay',
    discount: '25% OFF',
    description: 'Stay 5 nights or more and enjoy exclusive benefits',
    validUntil: 'Valid until Dec 31, 2024',
    link: '/offers',
  },
]

export default function OffersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden bg-white"
      id="offers"
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            SPECIAL OFFERS
          </h2>
          <p className="text-xl text-gray-600">
            Exclusive Deals and Promotions Just for You
          </p>
        </motion.div>

        {/* Offers Banner */}
        <div className="mb-12 max-w-6xl mx-auto">
          <ImageBanner
            title="Special Promotions"
            subtitle="Limited time offers available now"
            height="small"
            textPosition="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <Link key={offer.title} href={offer.link}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.08,
                  y: -15,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
                }}
                className="bg-white border-2 border-black rounded-lg p-8 relative overflow-hidden group cursor-pointer h-full premium-border luxury-glow"
              >
                {/* Discount Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute top-4 right-4 bg-black text-white px-4 py-2 font-bold text-lg rounded-full luxury-glow"
                >
                  {offer.discount}
                </motion.div>

                {/* Content */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {offer.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {offer.description}
                  </p>

                  <p className="text-sm text-gray-500 mb-6">
                    {offer.validUntil}
                  </p>

                  <motion.div
                    className="text-black font-semibold text-sm uppercase tracking-wider inline-flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Book Now →
                  </motion.div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/offers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Offers
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

