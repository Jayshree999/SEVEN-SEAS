'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function HostTermsPage() {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Host Terms</h1>
              <p className="text-gray-600 text-lg">Terms and conditions for property hosts</p>
            </div>

            <div className="space-y-8 prose prose-lg max-w-none">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Host Responsibilities</h2>
                <p className="text-gray-700 mb-4">
                  As a host on our platform, you are responsible for providing accurate property information, maintaining your property to high standards, and ensuring a positive guest experience.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Provide accurate and up-to-date property listings</li>
                  <li>Maintain properties in good condition</li>
                  <li>Respond promptly to guest inquiries and issues</li>
                  <li>Comply with all local laws and regulations</li>
                  <li>Ensure guest safety and security</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Standards</h2>
                <p className="text-gray-700 mb-4">
                  All properties listed on our platform must meet certain quality standards to ensure guest satisfaction.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-700">
                  <p><strong>Minimum Requirements:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Clean and well-maintained property</li>
                    <li>All amenities as described in listing</li>
                    <li>Working utilities and appliances</li>
                    <li>Safety equipment (smoke detectors, fire extinguishers)</li>
                    <li>Valid licenses and permits where required</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pricing and Payments</h2>
                <p className="text-gray-700 mb-4">
                  Hosts set their own pricing for properties. Payments are processed according to our payment terms, and hosts receive payouts as specified in their host agreement.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Hosts set their own nightly rates</li>
                  <li>Platform fees apply as per agreement</li>
                  <li>Payouts processed according to schedule</li>
                  <li>Tax obligations are the host's responsibility</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancellation Policy</h2>
                <p className="text-gray-700 mb-4">
                  Hosts must honor confirmed bookings. Cancellations by hosts may result in penalties and affect host ratings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Guest Relations</h2>
                <p className="text-gray-700 mb-4">
                  Hosts are expected to maintain professional relationships with guests and address any issues promptly and courteously.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compliance</h2>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-2">Hosts must comply with:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Local zoning and licensing requirements</li>
                    <li>Health and safety regulations</li>
                    <li>Tax obligations</li>
                    <li>Platform terms and policies</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Termination</h2>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate host accounts that violate these terms or fail to meet our quality standards.
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



