'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const legalLinks = [
  { name: 'Terms', href: '/terms', icon: '📄' },
  { name: 'Privacy', href: '/privacy', icon: '🔒' },
  { name: 'Cookie Policy', href: '/legal/cookies', icon: '🍪' },
  { name: 'Guidelines', href: '/legal/guidelines', icon: '📋' },
  { name: 'Host Terms', href: '/legal/host-terms', icon: '🏠' },
]

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal</h1>
            <p className="text-gray-600 text-lg">Legal information and policies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer border border-gray-100"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4">{link.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800">{link.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}



