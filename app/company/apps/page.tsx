'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AppsPage() {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Apps</h1>
              <p className="text-gray-600 text-lg">Download our mobile applications for the best experience</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mobile Applications</h2>
                <p className="text-gray-700 mb-6">Experience Seven Seas Hotel on the go with our mobile applications available for iOS and Android devices.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.03-1.09-.86-2.11-1.83-3.23-2.67-2.08-1.64-3.11-3.23-3.11-5.67 0-2.72 2.15-5.06 5-5.06 1.09 0 2.18.33 3.08 1.01.25.19.38.3.38.3s.13-.11.38-.3c.9-.68 1.99-1.01 3.08-1.01 2.85 0 5 2.34 5 5.06 0 2.44-1.03 4.03-3.11 5.67-1.12.84-2.14 1.81-3.23 2.67-1.03.85-2.1.92-3.08-.03z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">iOS App</h3>
                        <p className="text-gray-600 text-sm">Available on App Store</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => alert('App coming soon!')}
                    >
                      Download for iOS
                    </motion.button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m-11.0055 0c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m11.0055-9.3046c-.5511 0-.9993-.4482-.9993-.9993 0-.5511.4482-.9993.9993-.9993.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9993-.9993.9993m-11.0055 0c-.5511 0-.9993-.4482-.9993-.9993 0-.5511.4482-.9993.9993-.9993.551 0 .9993.4482.9993.9993 0 .5511-.4483.9993-.9993.9993M23.52 12.6628c0 .8073-.6735 1.4808-1.4808 1.4808H1.9608c-.8073 0-1.4808-.6735-1.4808-1.4808 0-.8073.6735-1.4808 1.4808-1.4808h20.0784c.8073 0 1.4808.6735 1.4808 1.4808z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">Android App</h3>
                        <p className="text-gray-600 text-sm">Available on Google Play</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => alert('App coming soon!')}
                    >
                      Download for Android
                    </motion.button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">App Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Easy booking and reservation management',
                    'Exclusive mobile-only deals and offers',
                    'Digital check-in and check-out',
                    'Room service ordering',
                    'Access to hotel amenities and services',
                    'Real-time notifications and updates',
                    'Loyalty program integration',
                    '24/7 customer support chat'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

