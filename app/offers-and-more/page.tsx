'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Phone, Mail, ArrowRight, Percent, Sparkles, Shield, Clock } from 'lucide-react'

// Easing curve for luxury feel
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

export default function OffersAndMorePage() {
  const [ramadanRef, ramadanInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [membersRef, membersInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [stayLongerRef, stayLongerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [longStayRef, longStayInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [amenitiesRef, amenitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [attireRef, attireInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/offers/longstay-premium19.jpg"
            alt="Offers & Promotions"
            fill
            className="object-cover opacity-65 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#faf9f6]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Exclusive Packages
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              OFFERS &amp; PROMOTIONS
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
            <p className="text-lg sm:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
              Unlock special rates and enjoy premium benefits tailored just for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- RAMADAN OFFERS --- */}
      <section ref={ramadanRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={ramadanInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
              Holy Month Celebrations
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ramadan Offers
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto mb-6" />
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
              Experience a peaceful and fulfilling stay with our exclusive Stay with Iftar and Suhoor package. Break your fast with a delightful Iftar spread, rest in comfort, and wake up to a nourishing Suhoor to start your day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {/* Offer 1 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/offers/ramadan-stay.jpg"
                    alt="Stay with Iftar and Suhoor"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Stay with Iftar and Suhoor
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Experience a peaceful and fulfilling stay with our exclusive Stay with Iftar and Suhoor package. Break your fast with a delightful Iftar spread, rest in comfort, and wake up to a nourishing Suhoor to start your day.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 border-t border-gray-50 flex flex-col gap-3">
                <a href="tel:+971551009140" className="flex items-center justify-center gap-2 py-3 border border-amber-600/30 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+971 55 100 9140</span>
                </a>
                <Link href="/booking" className="w-full text-center py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase">
                  Book now
                </Link>
              </div>
            </motion.div>

            {/* Offer 2 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/offers/ramadan-gathering.jpg"
                    alt="Iftar & Suhoor Gathering"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Iftar &amp; Suhoor Gathering at Mehfil Ballroom
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Celebrate the spirit of Ramadan with an elegant Iftar &amp; Suhoor Gathering at Mehfil Ballroom. Indulge in a lavish spread of traditional and international delicacies in a warm and inviting ambiance.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 border-t border-gray-50 flex flex-col gap-3">
                <a href="tel:+971551009140" className="flex items-center justify-center gap-2 py-3 border border-amber-600/30 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+971 55 100 9140</span>
                </a>
                <Link href="/booking" className="w-full text-center py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase">
                  Book now
                </Link>
              </div>
            </motion.div>

            {/* Offer 3 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/offers/ramadan-salt.webp"
                    alt="Iftar Scene at Salt"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                    A Star-Studded Iftar Scene at Salt Restaurant
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Experience a Star-Studded Iftar Scene at Salt Restaurant, where exquisite flavors meet unmatched elegance. Indulge in a gourmet Iftar feast curated to perfection, surrounded by a sophisticated ambiance.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 border-t border-gray-50 flex flex-col gap-3">
                <a href="tel:+971551009140" className="flex items-center justify-center gap-2 py-3 border border-amber-600/30 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+971 55 100 9140</span>
                </a>
                <Link href="/booking" className="w-full text-center py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase">
                  Book now
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- MEMBER RATES --- */}
      <section ref={membersRef} className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={membersInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                Exclusive Privileges
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Member Rates
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40 mx-auto mb-6" />
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
                Unlock special rates and enjoy premium benefits tailored just for you. Experience more with exclusive discounts available only to members!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {/* Member Offer 1 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] border border-gray-100 flex flex-col md:flex-row hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-full overflow-hidden">
                  <Image
                    src="/offers/loyalty.jpg"
                    alt="Loyalty Program"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between w-full md:w-1/2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Loyalty Program
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                      Join our Loyalty Program and unlock a world of exclusive perks, special discounts, and unforgettable experiences. Earn points every time you indulge, dine, or stay with us, and redeem them for exciting rewards. The more you enjoy, the more you gain.
                    </p>
                  </div>
                  <Link href="/signup" className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm hover:text-amber-800 group/link">
                    <span>Join Loyalty Program</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Member Offer 2 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] border border-gray-100 flex flex-col md:flex-row hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-full overflow-hidden">
                  <Image
                    src="/offers/breakfast-inclusive.jpg"
                    alt="Breakfast Inclusive Rates"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between w-full md:w-1/2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Breakfast Inclusive Rates
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                      Enjoy a perfect morning with our Breakfast Inclusive Rates. Wake up to a delicious spread of fresh & healthy options, all included in your stay. Whether you're in the mood for a light bite or a full breakfast feast, we've got you covered to kickstart your day with energy and flavor!
                    </p>
                  </div>
                  <Link href="/rooms" className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm hover:text-amber-800 group/link">
                    <span>View Rates</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STAY LONGER & SAVE --- */}
      <section ref={stayLongerRef} className="py-20 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-black text-white flex flex-col lg:flex-row items-center overflow-hidden border border-white/5 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[80px]" />
            <div className="relative w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:h-[450px]">
              <Image
                src="/offers/stay-longer.png"
                alt="Stay Longer & Save"
                fill
                className="object-cover opacity-85"
              />
            </div>
            <div className="p-8 sm:p-12 lg:p-16 w-full lg:w-1/2 z-10 space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Percent className="w-3.5 h-3.5" /> Special Offer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Stay Longer &amp; Save up to 20%*
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Spend time making even more memories together on your next getaway with the help of great savings. Simply stay for 2 nights or more and save up to 20%* off your entire stay.
              </p>
              <div className="pt-2">
                <Link href="/rooms" className="inline-flex items-center gap-3 bg-amber-500 text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors">
                  Book now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- NEWLY RENOVATED LONG STAY ROOMS --- */}
      <section ref={longStayRef} className="py-20 sm:py-28 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={longStayInView ? "visible" : "hidden"}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                Premium Extended Stays
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Newly Renovated Long Stay Rooms
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40 mx-auto mb-6" />
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
                Explore spaces thoughtfully designed to welcome you the moment you step inside. Feel at home in our spacious layouts equipped with premium features.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Room 1 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/offers/longstay-premium19.jpg"
                      alt="Premium 19 Series"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Premium 19 Series
                    </h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-6">
                      Stay A Bit Longer - Breakfast Inclusive
                    </p>
                    <ul className="space-y-3">
                      {[
                        '1 free parking',
                        'Bi-weekly housekeeping service',
                        'Free WiFi & Utility Bills',
                        'Complimentary access to Pool, Gym, Sauna & Jacuzzi.',
                        '20% discount on food & beverages except promotions.'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 pt-0 flex flex-col gap-3">
                  <div className="text-xs text-gray-400 border-t border-gray-200/60 pt-4 flex justify-between items-center mb-2">
                    <span>Validity:</span>
                    <span className="font-semibold text-gray-900">Monthly / Round the Year</span>
                  </div>
                  <a href="tel:+971551009140" className="flex items-center justify-center gap-2 py-3 border border-amber-600/30 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+971 55 100 9140</span>
                  </a>
                  <Link href="/rooms" className="w-full text-center py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase">
                    Book now
                  </Link>
                </div>
              </motion.div>

              {/* Room 2 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/offers/longstay-burjview.jpg"
                      alt="Burj View Executive Suites"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Burj View Executive Suites
                    </h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-6">
                      Stay A Bit Longer - Breakfast Inclusive
                    </p>
                    <ul className="space-y-3">
                      {[
                        '1 free parking',
                        'Bi-weekly housekeeping service',
                        'Free WiFi & Utility Bills',
                        'Complimentary access to Pool, Gym, Sauna & Jacuzzi.',
                        '20% discount on food & beverages except promotions.'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 pt-0 flex flex-col gap-3">
                  <div className="text-xs text-gray-400 border-t border-gray-200/60 pt-4 flex justify-between items-center mb-2">
                    <span>Validity:</span>
                    <span className="font-semibold text-gray-900">Monthly / Round the Year</span>
                  </div>
                  <a href="tel:+971551009140" className="flex items-center justify-center gap-2 py-3 border border-amber-600/30 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+971 55 100 9140</span>
                  </a>
                  <Link href="/rooms" className="w-full text-center py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase">
                    Book now
                  </Link>
                </div>
              </motion.div>

              {/* Room 3 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/offers/longstay-seaview.jpg"
                      alt="Sea View Deluxe Suites"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Sea View Deluxe Suites
                    </h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-6">
                      Stay A Bit Longer - Breakfast Inclusive
                    </p>
                    <ul className="space-y-3">
                      {[
                        '1 free parking',
                        'Bi-weekly housekeeping service',
                        'Free WiFi & Utility Bills',
                        'Complimentary access to Pool, Gym, Sauna & Jacuzzi.',
                        '20% discount on food & beverages except promotions.'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 pt-0 flex flex-col gap-3">
                  <div className="text-xs text-gray-400 border-t border-gray-200/60 pt-4 flex justify-between items-center mb-2">
                    <span>Validity:</span>
                    <span className="font-semibold text-gray-900">Monthly / Round the Year</span>
                  </div>
                  <a href="tel:+971551009140" className="flex items-center justify-center gap-2 py-3 border border-amber-600/30 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+971 55 100 9140</span>
                  </a>
                  <Link href="/rooms" className="w-full text-center py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase">
                    Book now
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- GET 20% OFF ON AMENITIES --- */}
      <section ref={amenitiesRef} className="py-20 sm:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={amenitiesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 space-y-6">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Exclusive Amenities
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Get 20% off<br />On Amenities
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
                Relaxing beach paradises, thrilling urban getaways, exotic hill stations and historic homes of royalty are all within reach. Indulge in our wellness features with exclusive guest benefits.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Spa */}
              <motion.div variants={fadeInUp} className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center group">
                <div className="relative w-full aspect-square overflow-hidden mb-6">
                  <Image
                    src="/offers/amenities-main.jpg"
                    alt="Spa & Wellness"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase text-sm tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Spa &amp; Wellness
                </h3>
              </motion.div>

              {/* Gym */}
              <motion.div variants={fadeInUp} className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center group">
                <div className="relative w-full aspect-square overflow-hidden mb-6">
                  <Image
                    src="/offers/amenities-gym.png"
                    alt="Fitness & Gym"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase text-sm tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Fitness &amp; Gym
                </h3>
              </motion.div>

              {/* Pool */}
              <motion.div variants={fadeInUp} className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center group">
                <div className="relative w-full aspect-square overflow-hidden mb-6">
                  <Image
                    src="/offers/amenities-pool.jpg"
                    alt="Swimming Pool"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase text-sm tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Swimming Pool
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- THE MODERN ATTIRE --- */}
      <section ref={attireRef} className="py-20 sm:py-28 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={attireInView ? "visible" : "hidden"}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                Contemporary Experience
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                The Modern Attire
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40 mx-auto mb-6" />
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
                Whether picking up a fresh snack on your way out, or lingering over a good meal with friends, the flavors you crave are here.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] p-8 border border-gray-100 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <Image
                      src="/offers/modern-attire-main.jpg"
                      alt="To be Thoughtfully Considered"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                    To be Thoughtfully Considered
                  </h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Culinary mastery that leaves an imprint, crafted with care using locally sourced fresh ingredients.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] p-8 border border-gray-100 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <Image
                      src="/offers/modern-attire-1.jpg"
                      alt="That Wakeup the Senses"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                    That Wakeup the Senses
                  </h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Designed for travelers who seek meaning and aesthetic pleasure in every detail of their environment.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] p-8 border border-gray-100 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <Image
                      src="/offers/modern-attire-spa.jpg"
                      alt="Power Everywhere"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Power Everywhere You need it
                  </h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Stay charged and connected effortlessly. Premium workstations and integrated technology keep you in flow.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div variants={fadeInUp} className="bg-[#faf9f6] p-8 border border-gray-100 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <Image
                      src="/offers/amenities-gym.png"
                      alt="Artwork"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Locally inspired Artwork
                  </h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Locally inspired artwork adorns our spaces, creating an atmosphere of sophistication and culture.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT & REACH US SECTION --- */}
      <section ref={contactRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Reach us */}
            <motion.div variants={fadeInUp} className="bg-white p-10 shadow-sm border border-gray-100 relative group flex gap-6">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src="/offers/icon-19.png" alt="Reach Us" fill className="object-contain" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Reach to us
                </h3>
                <div className="h-[1px] w-12 bg-amber-500/40" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800">Reservation:</p>
                  <p className="text-lg text-amber-700 font-bold">+971 55 100 9140 / +971 55 100 9152</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800">Booking:</p>
                  <p className="text-lg text-amber-700 font-bold">+971 55 100 9140 / +971 55 100 9152</p>
                </div>
              </div>
            </motion.div>

            {/* Drop a line */}
            <motion.div variants={fadeInUp} className="bg-white p-10 shadow-sm border border-gray-100 relative group flex gap-6">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Mail className="w-10 h-10 text-amber-600" strokeWidth={1} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Drop a line
                </h3>
                <div className="h-[1px] w-12 bg-amber-500/40" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800">Information:</p>
                  <p className="text-base text-gray-900 font-medium">info@sevenseashotel.ae</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800">Reservations:</p>
                  <p className="text-base text-gray-900 font-medium">reservation@sevenseashotel.ae</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
