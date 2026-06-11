'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, ArrowRight } from 'lucide-react'

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

export default function EntertainmentPage() {
  const [partyRef, partyInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [geoffreysRef, geoffreysInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [vibeRef, vibeInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [baazigarRef, baazigarInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [hotspotRef, hotspotInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [danceRef, danceInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/entertainment_bg.avif"
            alt="Entertainment Background"
            fill
            className="object-cover opacity-65 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#faf9f6]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Entertainment &amp; Nightlife
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Book a Table
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
            <p className="text-lg sm:text-xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto">
              Discover the epitome of comfort and elegance at Seven Seas Hotel, where luxury meets impeccable hospitality. Nestled in the bustling neighborhood of Al Nahda 1, Dubai, our hotel offers a serene escape with world-class amenities and personalized services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PARTY AT SEVEN SEAS RESTAURANTS --- */}
      <section ref={partyRef} className="py-20 sm:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Celebrate Life
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Party at Seven Seas Restaurants
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
            <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
              Step into a world of excitement where sports, music, and premium drinks come together for an unforgettable time.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={partyInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6"
          >
            {/* Card 1 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-gray-150 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                  <Image
                    src="/entertainment/party-thumb-1.jpg"
                    alt="Unwind, Cheer & Celebrate"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#c5a880] group-hover:text-amber-600 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Unwind, Cheer &amp; Celebrate
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Catch every game live with an unbeatable atmosphere &amp; refreshing drinks. The ultimate destination for sports lovers!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-gray-150 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                  <Image
                    src="/entertainment/party-thumb-2.jpg"
                    alt="Blend of Action, Beats & Drinks"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#c5a880] group-hover:text-amber-600 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Blend of Action, Beats &amp; Drinks
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Feel the beat, own the night! Experience electrifying music, dazzling lights, and an unforgettable party vibe at Rhythm Nightclub.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-gray-150 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                  <Image
                    src="/entertainment/party-thumb-3.webp"
                    alt="Drink, Dance, Repeat It's party time"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#c5a880] group-hover:text-amber-600 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Drink, Dance, Repeat It&apos;s party time
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Sip, savor, and unwind with a premium selection of spirits and cocktails in a stylish, laid-back ambiance.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- GEOFFREY'S RESTO BAR --- */}
      <section ref={geoffreysRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={geoffreysInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-6">
              <div className="relative w-36 h-16 transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/entertainment/geoffreys-logo.png"
                  alt="Geoffrey's Resto Bar Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Geoffrey&apos;s Resto Bar
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
                Geoffrey&apos;s Bar Your Ultimate Hangout Spot Experience the perfect blend of live music, shisha, and refreshing drinks at Geoffrey’s Bar, nestled inside the iconic Seven Seas Hotel. Join us for unforgettable Dubai nights!
              </p>
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                  Reservation Hotline
                </span>
                <a
                  href="tel:+971551009150"
                  className="text-2xl font-bold text-gray-950 hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>+971 55 100 9150</span>
                </a>
              </div>
              <div className="pt-4">
                <a
                  href="tel:+971551009150"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-amber-600 transition-all font-medium text-sm tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book a Table</span>
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-[#faf9f6]">
                <Image
                  src="/entertainment/geoffreys-detail.png"
                  alt="Geoffrey's Resto Bar Interior"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- VIBE NATION --- */}
      <section ref={vibeRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={vibeInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-[#faf9f6]">
                <Image
                  src="/entertainment/vibe-nation-detail.jpg"
                  alt="Vibe Nation Nightlife"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <div className="relative w-36 h-16 transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/entertainment/vibe-nation-logo.png"
                  alt="Vibe Nation Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Vibe Nation
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
                The Rhythm of Africa. The Pulse of the Night. Step into Vibe Nation, where the energy never sleeps and the culture comes alive. We aren’t just a nightclub; we are a movement. Bringing you the absolute best of Afrobeats, Amapiano, Dancehall, and urban hits, Vibe Nation is your ultimate weekend escape. Whether you’re here for the hypnotic basslines, the premium cocktails, or the unmatched crowd energy, we guarantee a night you won’t forget.
              </p>
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                  Reservation Hotline
                </span>
                <a
                  href="tel:+971543617972"
                  className="text-2xl font-bold text-gray-950 hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>+971 54 361 7972</span>
                </a>
              </div>
              <div className="pt-4">
                <a
                  href="tel:+971543617972"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-amber-600 transition-all font-medium text-sm tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book a Table</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- BAAZIGAR --- */}
      <section ref={baazigarRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={baazigarInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-6">
              <div className="relative w-36 h-16 transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/entertainment/baazigar-logo.png"
                  alt="Baazigar Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Baazigar
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
                &quot;Naam toh suna hoga...&quot; But you haven&apos;t experienced it like this. Bazigar isn’t just a nightclub; it’s a nightly celebration of rhythm, luxury, and unforgettable memories. Named after the ultimate gambler of hearts, we invite you to lose yourself to the music, the lights, and the unmatched energy of the city&apos;s premier Indian nightlife destination.
              </p>
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                  Reservation Hotline
                </span>
                <a
                  href="tel:+971527186711"
                  className="text-2xl font-bold text-gray-950 hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>+971 527186711</span>
                </a>
              </div>
              <div className="pt-4">
                <a
                  href="tel:+971527186711"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-amber-600 transition-all font-medium text-sm tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book a Table</span>
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-[#faf9f6]">
                <Image
                  src="/entertainment/baazigar-detail.jpg"
                  alt="Baazigar Nightclub Interior"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- THE HOTSPOT OF ICONS --- */}
      <section ref={hotspotRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Icons &amp; Legends
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The Hotspot of Icons – Where Legends Celebrate!
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={hotspotInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: luxuryEasing }}
            className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-gray-100 bg-[#faf9f6]"
          >
            <Image
              src="/entertainment/legends-celebrate.jpg"
              alt="The Hotspot of Icons Where Legends Celebrate"
              fill
              className="object-cover hover:scale-102 transition-transform duration-[8000ms]"
            />
          </motion.div>
        </div>
      </section>

      {/* --- ENJOY THE MUSIC GALLERY --- */}
      <section ref={galleryRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Feel the vibe
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Enjoy The Music
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={galleryInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6"
          >
            <motion.div
              variants={fadeInUp}
              className="relative aspect-[3/4] w-full overflow-hidden shadow-xl border border-gray-100 bg-gray-50 group"
            >
              <Image
                src="/entertainment/vibe-nation-detail.jpg"
                alt="Enjoy The Music Vibe"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative aspect-[3/4] w-full overflow-hidden shadow-xl border border-gray-100 bg-gray-50 group"
            >
              <Image
                src="/entertainment/enjoy-music-2.jpg"
                alt="Party Beats"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative aspect-[3/4] w-full overflow-hidden shadow-xl border border-gray-100 bg-gray-50 group"
            >
              <Image
                src="/entertainment/enjoy-music-3.avif"
                alt="Dance Floor Celebration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DANCE LIKE A PRO --- */}
      <section ref={danceRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Move &amp; Groove
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Dance like a Pro
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={danceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: luxuryEasing }}
            className="relative aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden shadow-2xl border border-gray-100 bg-[#faf9f6]"
          >
            <Image
              src="/entertainment/dance-pro.avif"
              alt="Dance like a Pro Nightlife"
              fill
              className="object-cover hover:scale-102 transition-transform duration-[8000ms]"
            />
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT GRID (MAP + REACH TO US + DROP A LINE) --- */}
      <section ref={contactRef} className="py-20 sm:py-24 bg-white">
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
                      href="tel:+97142765555"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors"
                    >
                      + 971 4 276 5555
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Booking
                    </span>
                    <a
                      href="tel:+971526090739"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors"
                    >
                      +971 52 609 0739
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full">
                <a
                  href="tel:+971526090739"
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
              Experience Dubai&apos;s Finest Nightlife
            </h2>
            <p className="text-base sm:text-lg text-amber-100 font-light max-w-2xl mx-auto leading-relaxed">
              Join us for an unforgettable night of entertainment, music, and celebration. Our premier venues offer the perfect setting for your night out in Dubai.
            </p>
            <div className="pt-6">
              <Link href="https://sevenseashotel.net/reservation/">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-5 bg-white text-gray-950 font-bold text-sm uppercase tracking-[0.2em] rounded-none shadow-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book Your Night Out
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
