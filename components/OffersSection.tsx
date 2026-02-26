'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import ImageBanner from './ImageBanner'
import RichButton from './RichButton'
import { ArrowRight, Clock, Tag } from 'lucide-react'

const offers = [
  {
    title: 'Early Bird Special',
    discount: '20% OFF',
    description: 'Plan ahead and secure your luxury escape. Book 30 days in advance and enjoy exclusive savings on our premium rooms and suites.',
    validUntil: 'Valid until Dec 31, 2024',
    link: '/offers-and-more',
    image: '/offers/early-bird.jpg', // Assuming you might have images, if not we keep text based but styled richer
  },
  {
    title: 'Weekend Getaway',
    discount: '15% OFF',
    description: 'Escape the ordinary with a perfect weekend retreat. Includes complimentary breakfast and late check-out for a relaxing stay.',
    validUntil: 'Valid until Dec 31, 2024',
    link: '/offers-and-more',
    image: '/offers/weekend.jpg',
  },
  {
    title: 'Extended Stay',
    discount: '25% OFF',
    description: 'Make yourself at home. Stay 5 nights or more and unlock exclusive benefits, including dining credits and spa discounts.',
    validUntil: 'Valid until Dec 31, 2024',
    link: '/offers-and-more',
    image: '/offers/extended.jpg',
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
      className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden bg-white"
      id="offers"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-amber-600 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Exclusive Privileges</span>
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            SPECIAL OFFERS
          </h2>
          <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Curated experiences and exclusive deals designed to enhance your stay
          </p>
        </motion.div>

        {/* Offers Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 max-w-6xl mx-auto rounded-none overflow-hidden border border-gray-100"
        >
          <ImageBanner
            imageUrl="/019A3962-Enhanced-NR-1-scaled.jpg"
            title="Seasonal Promotions"
            subtitle="Limited time offers available now"
            height="small"
            textPosition="center"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {offers.map((offer, index) => (
            <Link key={offer.title} href={offer.link} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-gray-100 p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-150 group-hover:bg-amber-100" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gray-50 rounded-tr-full -ml-8 -mb-8 transition-transform duration-500 group-hover:scale-150" />

                {/* Content Container */}
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-8 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <Tag className="w-3 h-3" />
                    <span>{offer.discount}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {offer.title}
                  </h3>

                  <p className="text-gray-600 mb-8 leading-relaxed font-light">
                    {offer.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="relative z-10 pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    <span>{offer.validUntil}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-100/50 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/offers-and-more">
            <RichButton variant="filled" className="px-10 py-4 bg-black text-white hover:bg-amber-600 border border-transparent hover:border-amber-600 transition-all duration-300 uppercase tracking-[0.2em] text-sm">
              <span className="flex items-center gap-3">
                View All Exclusive Offers
                <ArrowRight className="w-4 h-4" />
              </span>
            </RichButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

