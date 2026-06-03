'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import VideoBanner from '@/components/VideoBanner'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="Privacy Policy"
        subtitle="How we protect and use your information"
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
              <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name, contact information, and identification details</li>
                <li>Payment and billing information</li>
                <li>Reservation and stay preferences</li>
                <li>Special requests and dietary requirements</li>
                <li>Feedback and survey responses</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process and manage your reservations</li>
                <li>Provide personalized services and experiences</li>
                <li>Communicate with you about your stay</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our services and website</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. We may share your information with trusted service providers 
                who assist in operating our business, conducting our operations, or serving our guests. We may also disclose 
                information when required by law or to protect our rights and safety.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">6. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website uses cookies to enhance your experience, analyze site usage, and assist in marketing efforts. 
                You can control cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">7. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For privacy-related inquiries or to exercise your rights, please contact us at privacy@sevenseashotel.ae 
                or +971 55 100 9152.
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

