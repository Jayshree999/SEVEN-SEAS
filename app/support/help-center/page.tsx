'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function HelpCenterPage() {
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
              <Link href="/support" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Support
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
              <p className="text-gray-600 text-lg">Find answers to common questions and get assistance</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Welcome to Seven Seas Hotel! We're here to help make your stay as comfortable as possible.</p>
                  <p>Our help center provides comprehensive guides and answers to frequently asked questions about booking, staying, and making the most of your visit.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/faq" className="p-4 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <h3 className="font-semibold text-gray-800 mb-2">Frequently Asked Questions</h3>
                    <p className="text-sm text-gray-600">Find answers to common questions</p>
                  </Link>
                  <Link href="/support/cancellation" className="p-4 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <h3 className="font-semibold text-gray-800 mb-2">Cancellation Policy</h3>
                    <p className="text-sm text-gray-600">Learn about our cancellation terms</p>
                  </Link>
                  <Link href="/contact" className="p-4 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>
                    <p className="text-sm text-gray-600">Get in touch with our team</p>
                  </Link>
                  <Link href="/support/safety" className="p-4 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <h3 className="font-semibold text-gray-800 mb-2">Safety Information</h3>
                    <p className="text-sm text-gray-600">Important safety guidelines</p>
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need More Help?</h2>
                <p className="text-gray-700 mb-4">If you can't find what you're looking for, our support team is available 24/7 to assist you.</p>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Contact Support
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




