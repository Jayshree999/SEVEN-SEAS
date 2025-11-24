'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import VideoBanner from '@/components/VideoBanner'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="Terms & Conditions"
        subtitle="Important information about your stay"
        height="medium"
        textPosition="center"
      />

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">1. Reservations</h2>
              <p className="text-gray-700 leading-relaxed">
                All reservations are subject to availability and confirmation. A valid credit card is required to guarantee your reservation. 
                The hotel reserves the right to cancel any reservation that does not comply with these terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">2. Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cancellation policies vary by rate type and booking channel:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Flexible Rate: Free cancellation up to 48 hours before arrival</li>
                <li>Non-Refundable Rate: No cancellation or modification allowed</li>
                <li>Group Bookings: Special cancellation terms apply</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">3. Payment</h2>
              <p className="text-gray-700 leading-relaxed">
                Payment is due upon check-in unless otherwise arranged. We accept major credit cards, debit cards, and cash (AED). 
                All prices are in UAE Dirhams (AED) and include applicable taxes unless stated otherwise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">4. Check-in & Check-out</h2>
              <p className="text-gray-700 leading-relaxed">
                Check-in is from 3:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are subject to availability 
                and may incur additional charges. Guests must be 18 years or older to check in.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">5. Guest Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Guests are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Any damage to hotel property</li>
                <li>Compliance with hotel policies and local laws</li>
                <li>Proper conduct during their stay</li>
                <li>Payment of all charges incurred</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">6. Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                The hotel is not liable for loss or damage to guest property. Guests are advised to use the in-room safe and 
                hotel security services. The hotel's liability is limited to the value of services provided.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">7. Accessibility</h2>
              <p className="text-gray-700 leading-relaxed">
                We are committed to providing accessible accommodations. Accessible rooms are available upon request. 
                Please contact us in advance to ensure your needs are met.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">8. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these terms, please contact us at info@sevenseasdubai.com or +971 4 XXX XXXX.
              </p>
            </div>

            <div className="pt-8 border-t-2 border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

