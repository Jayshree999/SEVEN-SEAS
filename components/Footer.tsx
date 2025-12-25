'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BackgroundVideo from './BackgroundVideo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
    information: [
      { name: 'Special Offers', href: '/offers' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Location', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
    legal: [
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cancellation Policy', href: '/terms' },
      { name: 'Accessibility', href: '/terms' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
  ]

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <BackgroundVideo opacity={0.1} />
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">7</span>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-wider">SEVEN SEAS</div>
                  <div className="text-sm text-gray-400 tracking-widest">DUBAI</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Experience unparalleled luxury and world-class service at Dubai's premier 4-star destination. 
                Where modern elegance meets authentic Arabian hospitality.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Dubai, United Arab Emirates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <a href="tel:+971423456789" className="hover:text-amber-400 transition-colors">+971 4 234 5678</a>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@sevenseasdubai.com</span>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
                  <span>🔗</span>
                  <a 
                    href="https://api.dubaibooking.io/api/v1/property/property?limit=100&filters[address]=&filters[city]=&filters[bedrooms]=&filters[category]=&filters[area]=&page=1&activeStatus=true" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors break-all text-xs"
                  >
                    API Endpoint
                  </a>
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
              className="text-lg font-bold mb-6 uppercase tracking-wider"
            >
              Hotel
            </motion.h3>
            <ul className="space-y-3">
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
              className="text-lg font-bold mb-6 uppercase tracking-wider"
            >
              Services
            </motion.h3>
            <ul className="space-y-3">
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

          {/* Information Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold mb-6 uppercase tracking-wider"
            >
              Information
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.information.map((link, index) => (
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
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-gray-800"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-6">Subscribe to receive exclusive offers and updates</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Social Media & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
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
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-2xl hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {currentYear} Seven Seas Hotel Dubai. All rights reserved.</p>
            <p className="mt-2">Designed with luxury in mind</p>
            <div className="mt-4 text-xs text-gray-600">
              <p>Powered by <a href="https://api.dubaibooking.io" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">Dubai Booking API</a></p>
              <p className="mt-1">API: <code className="text-gray-500">x-organisation: sevenseas</code></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

