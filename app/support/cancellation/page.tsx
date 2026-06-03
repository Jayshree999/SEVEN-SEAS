'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CancellationPage() {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation Policy</h1>
              <p className="text-gray-600 text-lg">Understanding our cancellation and refund policies</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Standard Cancellation Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h3 className="font-semibold text-gray-800 mb-2">Free Cancellation</h3>
                    <p>Cancel up to 48 hours before your check-in date for a full refund. No cancellation fees apply.</p>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <h3 className="font-semibold text-gray-800 mb-2">Late Cancellation</h3>
                    <p>Cancellations made within 48 hours of check-in may be subject to a cancellation fee equivalent to one night's stay.</p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h3 className="font-semibold text-gray-800 mb-2">No-Show</h3>
                    <p>Guests who do not arrive and do not cancel will be charged for the full reservation amount.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Special Rate Cancellations</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Some special rates, promotional offers, or packages may have different cancellation policies. Please review your booking confirmation for specific terms.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Non-refundable rates: Cannot be cancelled or modified</li>
                    <li>Advance purchase rates: May have specific cancellation deadlines</li>
                    <li>Group bookings: Subject to separate terms and conditions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Cancel</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You can cancel your reservation through:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Your online account or booking confirmation email</li>
                    <li>Contacting our reservations team at +971 55 100 9152</li>
                    <li>Emailing us at reservation@sevenseashotel.ae</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Processing</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">Refunds for eligible cancellations will be processed to the original payment method within 5-10 business days.</p>
                  <p className="text-gray-700">Please note that processing times may vary depending on your bank or credit card provider.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need Assistance?</h2>
                <p className="text-gray-700 mb-4">If you have questions about our cancellation policy or need help with a cancellation, please contact us.</p>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Contact Us
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




