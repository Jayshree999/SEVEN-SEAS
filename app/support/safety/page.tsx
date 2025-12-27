'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SafetyPage() {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety</h1>
              <p className="text-gray-600 text-lg">Your safety and security are our top priorities</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hotel Safety Measures</h2>
                <div className="space-y-4 text-gray-700">
                  <p>At Seven Seas Hotel, we are committed to providing a safe and secure environment for all our guests. We have implemented comprehensive safety protocols and measures.</p>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                    <h3 className="font-semibold text-gray-800 mb-2">24/7 Security</h3>
                    <p className="text-gray-700">Our hotel is monitored 24/7 by professional security personnel and advanced surveillance systems.</p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <h3 className="font-semibold text-gray-800 mb-2">Emergency Procedures</h3>
                    <p className="text-gray-700">All rooms are equipped with emergency information and evacuation procedures. Fire safety systems are regularly tested and maintained.</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h3 className="font-semibold text-gray-800 mb-2">Health & Hygiene</h3>
                    <p className="text-gray-700">We maintain the highest standards of cleanliness and hygiene throughout the hotel, with regular sanitization of all public areas.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Guest Safety Tips</h2>
                <ul className="space-y-3 text-gray-700 list-disc list-inside">
                  <li>Keep your room key secure and do not share it with others</li>
                  <li>Use the in-room safe for valuable items</li>
                  <li>Familiarize yourself with emergency exits and procedures</li>
                  <li>Report any suspicious activity to hotel staff immediately</li>
                  <li>Follow all posted safety guidelines and instructions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Contacts</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Hotel Front Desk</span>
                    <span className="text-amber-600 font-semibold">+971 4 XXX XXXX</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Emergency Services</span>
                    <span className="text-amber-600 font-semibold">999</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Security</span>
                    <span className="text-amber-600 font-semibold">+971 4 XXX XXXX</span>
                  </div>
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



