'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PressPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="mb-8">
              <Link href="/company" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Company
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Press</h1>
              <p className="text-gray-600 text-lg">Media resources and press information</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Press Kit</h2>
                <p className="text-gray-700 mb-6">Download our press kit containing logos, high-resolution images, and brand guidelines.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 border border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left"
                    onClick={() => alert('Press kit download coming soon!')}
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">Brand Assets</h3>
                    <p className="text-sm text-gray-600">Logos, images, and brand guidelines</p>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 border border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left"
                    onClick={() => alert('Fact sheet download coming soon!')}
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">Fact Sheet</h3>
                    <p className="text-sm text-gray-600">Hotel information and statistics</p>
                  </motion.button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Media Contact</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Press Inquiries</p>
                    <p className="text-amber-600">press@sevenseasdubai.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Phone</p>
                    <p className="text-amber-600">+971 4 XXX XXXX</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Response Time</p>
                    <p className="text-gray-700">We aim to respond to all press inquiries within 24-48 hours.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent News</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Hotel Opening Announcement</h3>
                    <p className="text-sm text-gray-600">December 2024</p>
                    <p className="text-gray-700 mt-2">Seven Seas Hotel Dubai opens its doors, offering luxury accommodations in the heart of Dubai.</p>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Award Recognition</h3>
                    <p className="text-sm text-gray-600">November 2024</p>
                    <p className="text-gray-700 mt-2">Recognized for excellence in hospitality and guest service.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Press Releases</h2>
                <p className="text-gray-700 mb-4">For the latest press releases and announcements, please contact our press team.</p>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Contact Press Team
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}



