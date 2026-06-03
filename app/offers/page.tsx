'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import ParallaxBanner from '@/components/ParallaxBanner'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import RichButton from '@/components/RichButton'
import { Phone, Sparkles } from 'lucide-react'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

const offers = [
  {
    id: 1,
    title: 'Early Bird Special',
    discount: '20% OFF',
    description: 'Book your stay 30 days in advance and enjoy a 20% discount on our best available rates. Perfect for planning ahead!',
    validUntil: 'December 31, 2024',
    terms: ['Minimum 2 nights stay', 'Non-refundable', 'Subject to availability'],
    link: '/rooms',
  },
  {
    id: 2,
    title: 'Weekend Getaway',
    discount: '15% OFF',
    description: 'Escape for the weekend and enjoy a 15% discount plus complimentary breakfast for two. Relax and recharge!',
    validUntil: 'December 31, 2024',
    terms: ['Friday & Saturday nights', 'Includes breakfast', 'Minimum 2 nights'],
    link: '/rooms',
  },
  {
    id: 3,
    title: 'Extended Stay',
    discount: '25% OFF',
    description: 'Stay 5 nights or more and receive a 25% discount plus exclusive benefits including late checkout and spa credit.',
    validUntil: 'December 31, 2024',
    terms: ['Minimum 5 nights', 'Includes spa credit', 'Late checkout available'],
    link: '/rooms',
  },
  {
    id: 4,
    title: 'Honeymoon Package',
    discount: 'Special Package',
    description: 'Celebrate your special occasion with our romantic honeymoon package including room upgrade, champagne, and spa treatment.',
    validUntil: 'December 31, 2024',
    terms: ['Minimum 3 nights', 'Room upgrade subject to availability', 'Includes champagne'],
    link: '/rooms',
  },
  {
    id: 5,
    title: 'Business Traveler',
    discount: 'Corporate Rate',
    description: 'Special rates for business travelers with complimentary WiFi, access to business center, and express checkout.',
    validUntil: 'Ongoing',
    terms: ['Corporate ID required', 'Complimentary WiFi', 'Business center access'],
    link: '/rooms',
  },
  {
    id: 6,
    title: 'Family Package',
    discount: 'Family Special',
    description: 'Perfect for families! Kids stay free, complimentary breakfast for children, and access to family-friendly facilities.',
    validUntil: 'December 31, 2024',
    terms: ['Kids under 12 stay free', 'Family room available', 'Includes kids breakfast'],
    link: '/rooms',
  },
]

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Video Banner */}
      <VideoBanner
        title="SPECIAL OFFERS"
        subtitle="Exclusive Deals and Promotions"
        height="large"
        textPosition="center"
      />

      {/* Exclusive Room Offer Section - Premium */}
      <ExclusiveRoomOffersSection />

      {/* Offers Banner Showcase */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Early Bird Special', description: 'Save 20% on advance bookings' },
              { id: 2, title: 'Weekend Getaway', description: 'Perfect weekend escape' },
              { id: 3, title: 'Extended Stay', description: 'Stay longer, save more' },
            ]}
            columns={3}
            gap="large"
          />
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        title="Why Choose Our Offers"
        description="Discover the value and benefits of our special packages. From romantic getaways to business stays, find the perfect offer for your needs."
        position="center"
      />

      {/* Parallax Banner */}
      <ParallaxBanner
        title="Limited Time Offers"
        subtitle="Book now and enjoy exclusive benefits"
        height={300}
        ctaLink={EXTERNAL_BOOKING_URL}
      />

      {/* Offers Grid - Premium Enhanced */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function OfferCard({ offer, index }: { offer: typeof offers[0], index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{
        scale: 1.05,
        y: -12,
        boxShadow: '0 30px 60px rgba(217, 119, 6, 0.25)',
        borderColor: '#d97706',
        rotateY: 5,
      }}
      className="bg-white border-2 border-amber-200 rounded-xl overflow-hidden group cursor-pointer h-full flex flex-col hover:border-amber-400 transition-all duration-500 shadow-xl hover:shadow-2xl relative"
    >
      {/* Premium glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/0 via-amber-300/30 to-amber-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>

      {/* Discount Badge - Premium Enhanced */}
      <motion.div
        className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white px-6 py-5 text-center relative overflow-hidden"
        animate={{
          boxShadow: [
            '0 0 25px rgba(255, 215, 0, 0.4)',
            '0 0 40px rgba(255, 215, 0, 0.6)',
            '0 0 25px rgba(255, 215, 0, 0.4)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="text-3xl md:text-4xl font-bold mb-2 relative z-10">{offer.discount}</div>
        <div className="text-sm uppercase tracking-wider relative z-10 font-semibold">{offer.title}</div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* Content - Premium Enhanced */}
      <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10">
        <p className="text-gray-700 mb-6 leading-relaxed flex-grow text-base">
          {offer.description}
        </p>

        <div className="mb-6 p-4 bg-amber-50/50 rounded-lg border border-amber-200/50">
          <div className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <span>⏰</span> Valid Until:
          </div>
          <div className="text-gray-700 text-sm font-medium">{offer.validUntil}</div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-900 mb-3">Terms & Conditions:</div>
          <ul className="space-y-2">
            {offer.terms.map((term, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                className="text-gray-600 text-sm flex items-start gap-2"
              >
                <span className="text-amber-600 mt-1 font-bold">✓</span>
                <span>{term}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <RichButton 
          variant="filled" 
          className="w-full px-6 py-3.5 text-base mt-auto"
          onClick={() => window.open(EXTERNAL_BOOKING_URL, '_blank')}
        >
          Book Now
        </RichButton>
      </div>
    </motion.div>
  )
}

const exclusiveOffers = [
  {
    id: 1,
    title: 'Eid Special Offer',
    code: 'EID299',
    discount: 'AED 299',
    nights: 1,
    description: 'Celebrate Eid with our exclusive offer. Enjoy a luxurious stay starting from AED 299 per night (excluding taxes). Make your celebration memorable.',
    image: '/offer1.jpeg',
    phone: '+971 55 100 9152',
  },
  {
    id: 2,
    title: 'Ramadan Long Stay Offer',
    code: 'RAMADANMONTH',
    discount: 'AED 5000',
    nights: 30,
    description: 'Experience a serene Ramadan with our Long Stay Offer. Book your extended stay starting from AED 5000 per month (excluding taxes).',
    image: '/2.jpeg',
    phone: '+971 55 100 9152',
  },
  {
    id: 3,
    title: 'Ramadan Special Offer',
    code: 'RAMADAN150',
    discount: 'AED 150',
    nights: 1,
    description: 'Embrace the spirit of Ramadan. Enjoy a peaceful and comfortable stay starting from just AED 150 per night (excluding taxes).',
    image: '/3.jpeg',
    phone: '+971 55 100 9152',
  },
]

function ExclusiveRoomOffersSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 relative overflow-hidden">
      {/* Ultra Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luxury gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-amber-200/15 to-transparent rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-amber-300/25 via-amber-200/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-200/8 via-amber-100/4 to-amber-200/8 rounded-full blur-[120px]"></div>

        {/* Additional luxury accents */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl"></div>

        {/* Premium pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zM16.667 37.5c0-5.75-4.75-10.5-10.5-10.5S-4.833 31.75-4.833 37.5.083 48 5.833 48s10.834-4.75 10.834-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5S-8.167 29.492-8.167 37.5-1.675 52 6.333 52s14.5-6.492 14.5-14.5zM56.667 37.5c0-5.75-4.75-10.5-10.5-10.5s-10.5 4.75-10.5 10.5 4.75 10.5 10.5 10.5 10.5-4.75 10.5-10.5zm10 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Elegant border lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Offers & Promotions</span>
            <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Exclusive Room Offer
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlock special rates and enjoy premium benefits tailored just for you. Experience more with exclusive discounts available only to members!
          </p>
        </motion.div>

        {/* Exclusive Offers Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {exclusiveOffers.map((offer, index) => (
            <ExclusiveOfferCard key={offer.id} offer={offer} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExclusiveOfferCard({ offer, index, inView }: { offer: typeof exclusiveOffers[0], index: number, inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
    >
      {/* Room Image Container - Premium minimalist */}
      <div className="relative aspect-square bg-[#f8f6f0] overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          priority={index < 2}
        />
      </div>

      {/* Content Section - Elegant & refined */}
      <div className="p-8 relative z-10 flex flex-col flex-grow items-center text-center">
        <h3
          className="text-2xl text-gray-900 mb-3 tracking-wide"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
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

        <motion.a
          href={`tel:${offer.phone.replace(/\s/g, '')}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto flex items-center justify-center gap-2 w-full px-6 py-3 border border-amber-600/30 hover:border-amber-600 hover:bg-amber-50 text-amber-700 font-medium tracking-wide uppercase text-sm rounded transition-all duration-300"
        >
          <Phone className="w-4 h-4" />
          <span>{offer.phone}</span>
        </motion.a>
      </div>
    </motion.div>
  )
}



