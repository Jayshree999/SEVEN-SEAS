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

      {/* New Year Exclusive Offers Section */}
      <NewYearExclusiveOffersSection />

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

        <Link href={EXTERNAL_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RichButton variant="filled" className="w-full px-6 py-3.5 text-base">
              Book Now
            </RichButton>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}

const exclusiveOffers = [
  {
    id: 1,
    title: '3 Night Promo',
    code: 'PROMO 15',
    discount: '15% OFF',
    nights: 3,
    description: 'Stay for 3 nights and get 15% off when you book direct. Advance booking of 15 days is required.',
    image: '/3-night-promo-rezi8z9sy5jbwlmydsyszk8hyhp8nkma1j19ic4u5c.png',
    phone: '+971 55 100 9152',
  },
  {
    id: 2,
    title: '7 Night Promo',
    code: 'PROMO 20',
    discount: '20% OFF',
    nights: 7,
    description: 'Stay for 7 nights and get 20% off when you book direct. Advance booking of 15 days is required.',
    image: '/7-night-promo-rezie957aor91tz5l31fz8blybpdufk23mtcg8bb8g.png',
    phone: '+971 55 100 9152',
  },
  {
    id: 3,
    title: 'Royal Suit Promo',
    code: 'PROMO 10',
    discount: '10% OFF',
    nights: 1,
    description: 'Stay for 1 night and get 10% off when you book direct. Advance booking of 15 days is required.',
    image: '/Royal-Suit-promo-1-reziipvlrcva75hoiiinblrfj7p5eoa5pqddijozog.png',
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
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 border border-gray-200/50"
    >
      {/* Premium glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/0 via-amber-300/30 to-amber-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>

      {/* Room Image */}
      <div className="relative h-[300px] md:h-[350px] overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Discount Badge Overlay - Premium */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="bg-gradient-to-r from-amber-500/95 via-amber-600/95 to-yellow-600/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-amber-400/50"
          >
            <div className="text-center">
              <p className="text-xs md:text-sm text-white/90 uppercase tracking-wider mb-1 font-semibold">
                STAY {offer.nights} NIGHT{offer.nights > 1 ? 'S' : ''} & ENJOY
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                {offer.discount}
              </p>
              <p className="text-xs text-white/90 uppercase tracking-wide">
                WHEN YOU BOOK DIRECT.
              </p>
              <div className="mt-2 pt-2 border-t border-white/20">
                <p className="text-[10px] text-white/80">*15-DAY ADVANCE PRIOR BOOKING REQUIRED</p>
                <p className="text-[10px] text-white/80">*T&C APPLY</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 relative z-10">
        <h3
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {offer.title}
        </h3>

        {/* Promo Code - Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2.5 rounded-lg border-2 border-amber-300/50 shadow-md">
            <span className="text-sm font-semibold text-gray-700">Use Code:</span>
            <span className="text-lg font-bold text-amber-700 tracking-wider">{offer.code}</span>
          </div>
        </motion.div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6 text-base">
          {offer.description}
        </p>

        {/* Phone Number - Premium */}
        <motion.a
          href={`tel:${offer.phone.replace(/\s/g, '')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Phone className="w-5 h-5" />
          <span>{offer.phone}</span>
        </motion.a>
      </div>

      {/* Premium border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  )
}

const newYearEvents = [
  {
    id: 1,
    title: "Geoffrey's New Year Offer",
    venue: "Geoffrey's Level 22",
    image: '/Geoffry-rg1qusleu4g5vi5ajxxm8bj17vjhkupglxpueq9odc (1).png',
    description: 'Ring in 2026 at Geoffrey\'s Level 22 with our Midnight Mania celebration. Enjoy live DJ performances, great vibes, and special entry packages for singles, couples, and groups. The party starts at 9 PM onwards on 31st December.',
    date: '31st DEC 2025',
    time: '9 PM ONWARDS',
    pricing: {
      stag: 'AED 299',
      couple: 'AED 499',
      singleLady: 'AED 199',
    },
    phone: '+971 55 100 9150',
    features: ['Live DJ Performance', 'Burj Khalifa Fireworks Viewing Deck', 'Surprise Bollywood Show'],
  },
  {
    id: 2,
    title: 'Mehfil Ballroom New Year Offer',
    venue: 'Mehfil Ballroom',
    image: '/Banquet-Promotion-rg1quehtzlwv1cpru9u7ox34b3gzde5hjzxk7kukyo (1).png',
    description: 'Join us at the Mehfil Ballroom for a dazzling gala night featuring a lucky draw, live DJ, and a sparkling midnight toast. An unforgettable evening of food, music, and celebrations awaits. Book now!',
    date: '31st DEC 2025',
    time: '9 PM ONWARDS',
    pricing: {
      stag: 'AED 299',
      couple: 'AED 599',
      singleLady: 'AED 199',
    },
    phone: '+971 55 100 9137',
    features: ['Gala Dinner', 'Lucky Draw', 'Sparkling Toast at Midnight', 'Live DJ Performance'],
  },
]

function NewYearExclusiveOffersSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Ultra Premium Background Elements - Dark Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luxury gradient orbs - Purple/Blue/Pink for nightlife */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-amber-400/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 via-purple-500/15 to-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-400/8 via-pink-400/4 to-amber-300/4 rounded-full blur-[120px]"></div>

        {/* Sparkle effects */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-2xl"></div>

        {/* Premium pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm10 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Elegant border lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 via-pink-400/40 via-amber-400/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 via-pink-400/40 via-amber-400/40 to-transparent"></div>
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
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Banquet Promotion</span>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            New Year Exclusive Offers
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrate the New Year with special offers on events at Geoffrey and Mehfill Ballroom. Perfect for gatherings, parties, and corporate functions.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {newYearEvents.map((event, index) => (
            <NewYearEventCard key={event.id} event={event} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NewYearEventCard({ event, index, inView }: { event: typeof newYearEvents[0], index: number, inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_30px_80px_-10px_rgba(139,92,246,0.4)] transition-all duration-500 border border-gray-200/50"
    >
      {/* Premium glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 via-pink-500/30 to-amber-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>

      {/* Event Image */}
      <div className="relative h-[400px] md:h-[450px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={index < 1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>

        {/* Venue Badge - Top */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-xl border border-white/50">
            <p className="text-sm font-bold text-gray-900">{event.venue}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 relative z-10 bg-white">
        <h3
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {event.title}
        </h3>

        <p className="text-gray-700 leading-relaxed mb-6 text-base">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Date</p>
            <p className="text-sm font-semibold text-gray-900">{event.date}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Time</p>
            <p className="text-sm font-semibold text-gray-900">{event.time}</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-lg border border-amber-200/50">
          <p className="text-sm font-semibold text-amber-900 mb-2">Entry Pricing:</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-600">Stag</p>
              <p className="font-bold text-gray-900">{event.pricing.stag}</p>
            </div>
            <div>
              <p className="text-gray-600">Couple</p>
              <p className="font-bold text-gray-900">{event.pricing.couple}</p>
            </div>
            <div>
              <p className="text-gray-600">Single Lady</p>
              <p className="font-bold text-gray-900">{event.pricing.singleLady}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Highlights:</p>
          <div className="flex flex-wrap gap-2">
            {event.features.map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full border border-purple-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <motion.a
          href={`tel:${event.phone.replace(/\s/g, '')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Phone className="w-5 h-5" />
          <span>Contact Now: {event.phone}</span>
        </motion.a>
      </div>

      {/* Premium border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  )
}

