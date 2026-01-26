'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Globe } from 'lucide-react'
import BackgroundVideo from './BackgroundVideo'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  }, [])

  const footerLinks = {
    hotel: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Our Rooms', href: '/rooms' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Services', href: '/services' },
    ],
    services: [
      { name: 'Dining', href: '/dining' },
      { name: 'Spa & Wellness', href: '/wellness' },
      { name: 'Events', href: '/events-3' },
      { name: 'Concierge', href: '/contact' },
    ],
    support: [
      { name: 'Support', href: '/support' },
      { name: 'Help Center', href: '/support/help-center' },
      { name: 'Safety', href: '/support/safety' },
      { name: 'Cancellation', href: '/support/cancellation' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'Company', href: '/company' },
      { name: 'About', href: '/about-us' },
      { name: 'Our Apps', href: '/company/apps' },
      { name: 'Contact', href: '/contact' },
      { name: 'Corporate Contact', href: '/company/corporate' },
      { name: 'Press', href: '/company/press' },
    ],
    legal: [
      { name: 'Legal', href: '/legal' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
      { name: 'Guidelines', href: '/legal/guidelines' },
      { name: 'Host Terms', href: '/legal/host-terms' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  ]

  return (
    <motion.footer
      className="bg-[#191f3b] text-white relative overflow-hidden pt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <BackgroundVideo
          videoUrl="/footer.mp4"
          opacity={0.4}
          isMuted={true}
          className="brightness-[0.7]"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#191f3b]/80"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Image
                    src="/logo.png"
                    alt="Seven Seas Hotel Dubai"
                    width={150}
                    height={50}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-white/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </Link>

              <p className="text-gray-300 leading-relaxed mb-4 max-w-md text-xs sm:text-sm">
                Experience unparalleled luxury and world-class service at Dubai's premier 4-star destination.
              </p>

              {/* Contact Information */}
              <div className="space-y-2 text-xs sm:text-sm text-gray-400">
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-amber-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5 mt-0.5 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed">Seven Seas Hotel - 231, Al Ittihad Rd, Al Qusais, Al Nahda 1, Dubai, UAE</span>
                </motion.a>

                <motion.a
                  href="tel:+971551009152"
                  className="flex items-center gap-3 hover:text-amber-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+971 55 100 9152</span>
                </motion.a>

                <motion.a
                  href="mailto:reservation@sevenseashotel.ae"
                  className="flex items-center gap-3 hover:text-amber-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>reservation@sevenseashotel.ae</span>
                </motion.a>

                <motion.a
                  href="https://sevenseashotel.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-amber-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Globe className="w-5 h-5 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>www.sevenseashotel.ae</span>
                </motion.a>
              </div>

              {/* Social Media Icons */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-300 mb-2">Follow Us</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                        whileHover={{
                          scale: 1.2,
                          y: -5,
                          rotate: [0, -10, 10, -10, 0],
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-amber-500/50 hover:bg-gray-800`}
                        aria-label={social.name}
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hotel Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm font-bold mb-3 uppercase tracking-wider text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-transparent"
            >
              Hotel
            </motion.h3>
            <ul className="space-y-2">
              {footerLinks.hotel.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold mb-3 uppercase tracking-wider text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-transparent"
            >
              Services
            </motion.h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm font-bold mb-3 uppercase tracking-wider text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-transparent"
            >
              Support
            </motion.h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links Combined */}
          <div className="md:col-span-2 lg:col-span-1">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm font-bold mb-3 uppercase tracking-wider text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-transparent"
            >
              Company
            </motion.h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hotel Policies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-gray-800/50"
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-base font-bold mb-4 text-center text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              Hotel Policy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Check-in time is 2:00 PM; check-out time is 12:00 PM.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>A valid ID or passport is required at the time of check-in.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Pets are not allowed on the premises.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Smoking inside the room is strictly prohibited; penalties will apply.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>An AED 200 security deposit is required upon check-in.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Parking is available at AED 20 per day.</span>
              </div>
              <div className="flex items-start gap-2 md:col-span-2 lg:col-span-3">
                <span className="text-amber-500 mt-1">•</span>
                <span>Visitors are not permitted in guest rooms after 10:00 PM.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Quick Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-amber-400 transition-colors">
                Terms
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                Privacy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/legal/cookies" className="hover:text-amber-400 transition-colors">
                Cookies
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-gray-500">
              <p>© {currentYear} Seven Seas Hotel Dubai. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
