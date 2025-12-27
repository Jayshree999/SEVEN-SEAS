'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

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
      { name: 'About Us', href: '/about' },
      { name: 'Our Rooms', href: '/rooms' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Services', href: '/services' },
    ],
    services: [
      { name: 'Dining', href: '/restaurant' },
      { name: 'Spa & Wellness', href: '/services' },
      { name: 'Events', href: '/services' },
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
      { name: 'About', href: '/about' },
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
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
  ]

  return (
    <motion.footer 
      className="bg-black text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: 0.4 }}
          onError={(e) => {
            console.error('Video failed to load:', e)
          }}
        >
          <source src="/footer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-0"
            >
              <div className="mb-2">
                <Image
                  src="/logo.png"
                  alt="Seven Seas Hotel Dubai"
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 leading-relaxed mb-3 max-w-md text-xs">
                Experience unparalleled luxury and world-class service at Dubai's premier 4-star destination.
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Seven Seas Hotel - 231, Al Ittihad Rd, Al Qusais, Al Nahda 1, Dubai, UAE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <a href="tel:+971551009152" className="hover:text-amber-400 transition-colors">+971 55 100 9152</a>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <a href="mailto:reservation@sevenseashotel.ae" className="hover:text-amber-400 transition-colors">reservation@sevenseashotel.ae</a>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <a href="https://sevenseashotel.ae" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">www.sevenseashotel.ae</a>
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
              className="text-sm font-bold mb-2 uppercase tracking-wider"
            >
              Hotel
            </motion.h3>
            <ul className="space-y-1.5">
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
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
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
              className="text-sm font-bold mb-2 uppercase tracking-wider"
            >
              Services
            </motion.h3>
            <ul className="space-y-1.5">
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
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
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
              className="text-sm font-bold mb-2 uppercase tracking-wider"
            >
              Support
            </motion.h3>
            <ul className="space-y-1.5">
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
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm font-bold mb-2 uppercase tracking-wider"
            >
              Company
            </motion.h3>
            <ul className="space-y-1.5">
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
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-sm font-bold mb-2 uppercase tracking-wider"
            >
              Legal
            </motion.h3>
            <ul className="space-y-1.5">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 pt-4 border-t border-gray-800"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-bold mb-1">Stay Connected</h3>
            <p className="text-gray-400 mb-3 text-xs">Subscribe to receive exclusive offers and updates</p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-white text-xs"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-1.5 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors text-xs"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Social Media & Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Follow Us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.3, 
                    y: -5,
                    rotate: [0, -10, 10, -10, 0],
                    filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))',
                  }}
                  className="text-2xl hover:text-amber-400 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Quick Legal Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/legal/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-3 pt-3 border-t border-gray-800 text-center text-xs text-gray-500">
            <p>© {currentYear} Seven Seas Hotel Dubai. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

