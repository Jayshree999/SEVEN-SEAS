'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="mb-8">
              <Link href="/legal" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Legal
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h1>
              <p className="text-gray-600 text-lg">Guidelines for using our platform and services</p>
            </div>

            <div className="space-y-8 prose prose-lg max-w-none">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Respectful Behavior</h2>
                <p className="text-gray-700 mb-4">
                  We expect all users to treat each other with respect and kindness. Harassment, discrimination, or abusive behavior will not be tolerated.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Be respectful in all communications</li>
                  <li>Do not engage in discriminatory behavior</li>
                  <li>Respect the privacy of others</li>
                  <li>Follow local laws and regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accurate Information</h2>
                <p className="text-gray-700 mb-4">
                  Please provide accurate information when making bookings and interacting with our platform. Misrepresentation may result in cancellation of reservations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Care</h2>
                <p className="text-gray-700 mb-4">
                  Guests are expected to treat hotel property with care and respect. Any damage to property may result in charges.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Follow hotel rules and policies</li>
                  <li>Respect quiet hours and other guests</li>
                  <li>Report any issues to hotel staff</li>
                  <li>Do not engage in illegal activities</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews and Feedback</h2>
                <p className="text-gray-700 mb-4">
                  We encourage honest and constructive feedback. Reviews should be based on actual experiences and should not contain false or misleading information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prohibited Activities</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-2">The following activities are strictly prohibited:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Smoking in non-designated areas</li>
                    <li>Bringing pets without prior approval</li>
                    <li>Excessive noise or disruptive behavior</li>
                    <li>Unauthorized parties or events</li>
                    <li>Any illegal activities</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consequences</h2>
                <p className="text-gray-700">
                  Violation of these guidelines may result in immediate removal from the platform, cancellation of reservations, and potential legal action.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}




