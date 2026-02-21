'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Globe, ChevronRight, Send } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import BackgroundVideo from './BackgroundVideo'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const footerLinks = {
    discover: [
      { name: 'Our Story', href: '/about-us' },
      { name: 'Luxury Rooms', href: '/rooms' },
      { name: 'Facilities', href: '/facilities' },
      { name: 'Dining', href: '/dining' },
      { name: 'Wellness & Spa', href: '/wellness' },
      { name: 'Location', href: '/location' },
      { name: 'Special Offers', href: '/offers' },
    ],
    services: [
      { name: 'Hotel Services', href: '/services' },
      { name: 'Events & Weddings', href: '/events-3' },
      { name: 'Concierge', href: '/services#concierge' },
      { name: 'Airport Transfer', href: '/services#transfer' },
      { name: 'Business Center', href: '/services#business' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/sevenseashoteldubai/?hl=en' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/seven-seas-hotel-dubai' },
  ]

  return (
    <footer ref={ref} className="relative bg-[#0a0f1c] text-white pt-12 pb-8 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <BackgroundVideo
          videoUrl="/footer.mp4"
          opacity={0.7}
          isMuted={true}
          className="brightness-[0.8]"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#0a0f1c]/70"></div>

        {/* Subtle Gradient Overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0f1c] via-transparent to-[#0a0f1c]/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Top Section: Newsletter & Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-10 border-b border-white/5 pb-10">

          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-6">
                <div className="relative">
                  <h2 className="text-3xl font-bold tracking-widest text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                    SEVEN SEAS
                  </h2>
                  <p className="text-[10px] tracking-[0.4em] text-amber-500 uppercase mt-2 ml-1">Hotel & Experiences</p>
                </div>
              </Link>
              <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base max-w-sm">
                A sanctuary of luxury in the heart of Dubai, where timeless elegance meets modern sophistication. Experience the art of hospitality.
              </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-amber-600 hover:border-amber-600 transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </motion.div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: 'Discover', links: footerLinks.discover },
              { title: 'Services', links: footerLinks.services },
              { title: 'Support', links: footerLinks.support },
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
              >
                <h3 className="text-lg font-bold text-white mb-6 font-serif tracking-wide">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center group">
                        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2 text-amber-500">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Middle Section: Newsletter & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-10 border-b border-white/5 pb-10">
          {/* Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>Join Our World</h3>
              <p className="text-gray-400 text-xs mb-4">Subscribe to receive exclusive offers and latest news.</p>

              <div className="relative max-w-md">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-full focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all pr-32 placeholder:text-gray-600 font-light"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-amber-600 hover:bg-amber-700 text-white px-6 rounded-full font-medium text-xs tracking-widest uppercase transition-colors flex items-center gap-2">
                  <span>Send</span>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1 hidden lg:block"></div>

          {/* Contact Details */}
          <div className="lg:col-span-6 flex flex-col md:flex-row justify-start md:justify-between gap-6 items-start md:items-center">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Reservation</p>
                <a href="tel:+971551009152" className="text-base text-white font-medium hover:text-amber-400 transition-colors">+971 55 100 9152</a>
              </div>
            </motion.div>

            <div className="h-10 w-px bg-white/10 hidden md:block"></div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                <a href="mailto:reservation@sevenseashotel.ae" className="text-base text-white font-medium hover:text-amber-400 transition-colors">reservation@sevenseashotel.ae</a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Policy & Copyright */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-8 text-xs text-gray-500 font-light border-t border-white/5">
          <p>© {currentYear} Seven Seas Hotel. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/terms" className="hover:text-amber-500 transition-colors">Hotel Policy</Link>
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-amber-500 transition-colors">Cookie Policy</Link>
            <Link href="/sitemap" className="hover:text-amber-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
