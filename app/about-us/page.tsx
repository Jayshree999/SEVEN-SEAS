'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, MapPin, ArrowRight, Quote } from 'lucide-react'

const luxuryEasing = [0.22, 1, 0.36, 1]

const fadeInUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEasing }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

export default function AboutUsPage() {
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [chairmanRef, chairmanInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [smartFeaturesRef, smartFeaturesInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [amenitiesRef, amenitiesInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const processes = [
    {
      num: '01',
      title: 'Reserve a Room',
      desc: 'Choose from our luxurious room options to suit your needs.'
    },
    {
      num: '02',
      title: 'Reach the Hotel',
      desc: 'Conveniently located in Al Nahda 1, Dubai, with easy access.'
    },
    {
      num: '03',
      title: 'Enjoy the Stay',
      desc: 'Relax in our elegantly designed rooms with modern amenities.'
    }
  ]

  const smartFeatures = [
    {
      icon: '/icons/icon-16.png',
      title: 'Smart Key',
      desc: ''
    },
    {
      icon: '/icons/icon-15.png',
      title: 'Luggage Room',
      desc: ''
    },
    {
      icon: '/icons/icon-17.png',
      title: 'Room Service',
      desc: '24/7 Available'
    },
    {
      icon: '/icons/icon-18.png',
      title: 'All Day Dining',
      desc: '24/7 Available'
    }
  ]

  const amenities = [
    {
      title: 'Rooftop Naughty Pool Bar & Lounge',
      image: '/about/naughty-pool-bar.jpg'
    },
    {
      title: 'Meeting Rooms',
      image: '/about/meeting-rooms.jpg'
    },
    {
      title: 'Geoffreys - Bar & Lounge',
      image: '/about/geoffreys.png'
    },
    {
      title: 'Inhouse full equipped GYM',
      image: '/about/gym.png'
    }
  ]

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero2.jpg"
            alt="Seven Seas Hotel About Us"
            fill
            className="object-cover opacity-60 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-[#faf9f6]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Established Luxury
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              ABOUT US
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
            <p className="text-lg sm:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
              Nestled in Al Nahda 1, Dubai, experience a sanctuary of elegance and personalized hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTRODUCTION SECTION --- */}
      <section ref={introRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={introInView ? 'visible' : 'hidden'}
          className="text-center space-y-6"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-5xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Welcome to Seven Seas Hotel
          </motion.h1>
          <motion.div variants={fadeInUp} className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-2xl text-gray-700 font-light leading-relaxed max-w-4xl mx-auto"
          >
            Discover the epitome of comfort and elegance at Seven Seas Hotel, where luxury meets impeccable hospitality. Nestled in the bustling neighborhood of Al Nahda 1, Dubai, our hotel offers a serene escape with world-class amenities and personalized services.
          </motion.p>
        </motion.div>
      </section>

      {/* --- CHAIRMAN MESSAGE SECTION --- */}
      <section ref={chairmanRef} className="py-20 sm:py-28 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={chairmanInView ? 'visible' : 'hidden'}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                Leadership Vision
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-950"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Chairman’s Message!
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/30 mx-auto mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
              {/* Chairman Image */}
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-5 relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] w-full overflow-hidden shadow-2xl border border-gray-100 group"
              >
                <Image
                  src="/chairman.jpg"
                  alt="Jitender Kumar Singla - Chairman"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-white z-10 block lg:hidden">
                  <p className="text-xl font-bold font-serif">Jitender Kumar Singla</p>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mt-1">Chairman</p>
                </div>
              </motion.div>

              {/* Chairman's Message */}
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-7 relative bg-[#faf9f6] border border-gray-200/60 p-8 sm:p-12 shadow-sm rounded-none h-full flex flex-col justify-between"
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-amber-500/10 pointer-events-none" />
                <div className="text-gray-700 font-light text-base sm:text-lg leading-relaxed space-y-6 relative z-10">
                  <p>
                    Open your eyes to a new form of hospitality in one of the world&apos;s most dynamic cities, thanks to the contemporary impact of global hospitality icon Seven Seas Hotel, Al Nahda.
                  </p>
                  <p>
                    Welcome to a destination where every feature defines the Seven Seas Hotel, Al Nahda&apos;s lifestyle and design philosophy; where our commitment to world-class service and elegance matches our guests&apos; high standards.
                  </p>
                  <p>
                    Personalisation is our mark, and the Stay with Seven Seas Hotel experience invites you to experience a distinctive idea rich in imagination, unparalleled in innovation, and crafted with meticulous attention to detail. Elegance matches our guests&apos; exacting standards..
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200/85 flex flex-col items-end">
                  <span
                    className="text-xl font-bold text-gray-900 tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Jitender Kumar Singla
                  </span>
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-widest mt-1">
                    Chairman
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- 3-STEP PROCESS SECTION --- */}
      <section ref={processRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={processInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8"
        >
          {processes.map((proc, index) => (
            <motion.div
              key={proc.num}
              variants={fadeInUp}
              className="bg-white border border-gray-100 p-8 sm:p-10 shadow-sm relative group hover:shadow-xl hover:border-amber-500/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div
                  className="text-5xl sm:text-6xl font-light text-amber-500/20 mb-6 font-serif group-hover:text-amber-500/40 transition-colors"
                >
                  {proc.num}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {proc.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- SMART FEATURES / ICONS SECTION --- */}
      <section ref={smartFeaturesRef} className="py-20 sm:py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={smartFeaturesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6"
          >
            {smartFeatures.map((feat, idx) => (
              <motion.div
                key={feat.title}
                variants={fadeInUp}
                className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 text-center flex flex-col items-center justify-center group hover:border-amber-500/30 transition-colors"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 transform transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={feat.icon}
                    alt={feat.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4
                  className="text-lg sm:text-xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {feat.title}
                </h4>
                {feat.desc && (
                  <p className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wider">
                    {feat.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- OUR AMENITIES SECTION --- */}
      <section ref={amenitiesRef} className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={amenitiesInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Exceptional Facilities
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Our amenities
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light pt-2">
              We take pride in offering a wide range of world-class amenities designed to enhance your stay and create unforgettable experiences. From our luxurious accommodations and fully equipped fitness center to our rejuvenating spa and temperature-controlled swimming pool, every detail is tailored to your comfort and relaxation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, idx) => (
              <motion.div
                key={amenity.title}
                variants={fadeInUp}
                className="bg-white border border-gray-100 flex flex-col justify-between overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6 text-center border-t border-gray-50 flex items-center justify-center min-h-[80px]">
                  <h3
                    className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {amenity.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- CONTACT & DETAIL SECTION --- */}
      <section ref={contactRef} className="py-20 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={contactInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          >
            {/* Map Column */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#faf9f6] border border-gray-200/60 p-1 overflow-hidden min-h-[350px] flex"
            >
              <iframe
                src="https://maps.google.com/maps?q=seven%20seas%20hotel%20dubai%2C%20al%20nahda&t=m&z=12&output=embed&iwloc=near"
                className="w-full h-full min-h-[300px] border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seven Seas Hotel Dubai location map"
              />
            </motion.div>

            {/* Reach to us Column */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#faf9f6] border border-gray-200/60 p-8 sm:p-10 flex flex-col items-center text-center justify-between group hover:shadow-xl hover:border-amber-500/20 transition-all duration-500"
            >
              <div className="flex flex-col items-center w-full">
                <div className="relative w-16 h-16 mb-6 transform transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/offers/icon-20.png"
                    alt="Phone Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Reach to us
                </h3>
                <div className="w-full space-y-6">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Reservation
                    </span>
                    <a
                      href="tel:+971551009152"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors"
                    >
                      +971 55 100 9152
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Booking
                    </span>
                    <a
                      href="tel:+971551009152"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors"
                    >
                      +971 55 100 9152
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full">
                <a
                  href="tel:+971551009152"
                  className="flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase w-full"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call reservation</span>
                </a>
              </div>
            </motion.div>

            {/* Drop a line Column */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#faf9f6] border border-gray-200/60 p-8 sm:p-10 flex flex-col items-center text-center justify-between group hover:shadow-xl hover:border-amber-500/20 transition-all duration-500"
            >
              <div className="flex flex-col items-center w-full">
                <div className="relative w-16 h-16 mb-6 transform transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/offers/icon-19.png"
                    alt="Email Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Drop a line
                </h3>
                <div className="w-full space-y-6">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Information
                    </span>
                    <a
                      href="mailto:info@sevenseashotel.ae"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors break-all"
                    >
                      info@sevenseashotel.ae
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Reservations
                    </span>
                    <a
                      href="mailto:reservation@sevenseashotel.ae"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors break-all"
                    >
                      reservation@sevenseashotel.ae
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full">
                <a
                  href="mailto:reservation@sevenseashotel.ae"
                  className="flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase w-full"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.25), transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.25), transparent 50%)`,
          }} />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="space-y-6"
          >
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Your Journey Begins Here
            </h2>
            <p className="text-base sm:text-lg text-amber-100 font-light max-w-2xl mx-auto leading-relaxed">
              Indulge in the extraordinary. Book your stay at Seven Seas Hotel and elevate your Dubai experience.
            </p>
            <div className="pt-6">
              <Link href="https://sevenseashotel.net/reservation/">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-5 bg-white text-gray-950 font-bold text-sm uppercase tracking-[0.2em] rounded-none shadow-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Make a reservation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div
                    className="absolute inset-0 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0"
                  />
                  <span className="absolute inset-0 bg-amber-500 -z-10 group-hover:text-white" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
