'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import VideoBanner from '@/components/VideoBanner'

const faqs = [
  {
    category: 'Booking & Reservations',
    questions: [
      {
        q: 'How do I make a reservation?',
        a: 'You can make a reservation directly through our website by selecting your dates and room type, or contact our reservations team at +971 4 XXX XXXX or email reservations@sevenseasdubai.com.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Free cancellation is available up to 48 hours before your arrival date. Cancellations made within 48 hours may be subject to charges. Please check your booking confirmation for specific terms.',
      },
      {
        q: 'Do you require a deposit?',
        a: 'A credit card is required to guarantee your reservation, but no deposit is charged at the time of booking. Payment is processed upon check-in or check-out.',
      },
      {
        q: 'Can I modify my reservation?',
        a: 'Yes, you can modify your reservation by contacting our reservations team. Changes are subject to availability and may affect pricing.',
      },
    ],
  },
  {
    category: 'Rooms & Accommodations',
    questions: [
      {
        q: 'What time is check-in and check-out?',
        a: 'Check-in is from 3:00 PM and check-out is until 12:00 PM. Early check-in and late check-out may be available upon request for an additional fee.',
      },
      {
        q: 'Do you have rooms for families?',
        a: 'Yes, we offer Family Suites that can accommodate up to 4 guests with two separate bedrooms. Extra beds and cribs are also available upon request.',
      },
      {
        q: 'Are the rooms non-smoking?',
        a: 'All our rooms are non-smoking. Designated smoking areas are available in the hotel.',
      },
      {
        q: 'Do you have accessible rooms?',
        a: 'Yes, we have accessible rooms designed for guests with mobility needs. Please inform us of your requirements when booking.',
      },
    ],
  },
  {
    category: 'Services & Amenities',
    questions: [
      {
        q: 'Is WiFi available?',
        a: 'Yes, complimentary high-speed WiFi is available throughout the hotel, including all guest rooms and public areas.',
      },
      {
        q: 'Do you have a spa?',
        a: 'Yes, we have a full-service spa and wellness center offering a range of treatments. Advance booking is recommended.',
      },
      {
        q: 'Is parking available?',
        a: 'Complimentary valet parking is available for all guests. Self-parking options are also available.',
      },
      {
        q: 'Do you offer airport transfers?',
        a: 'Yes, we offer airport transfer services. Please contact our concierge to arrange transportation. Charges apply.',
      },
    ],
  },
  {
    category: 'Dining & Entertainment',
    questions: [
      {
        q: 'What dining options are available?',
        a: 'We have multiple dining venues including Azure Restaurant for international cuisine, Al Bahar Lounge for Middle Eastern flavors, and The Pool Bar for light bites and beverages.',
      },
      {
        q: 'Do you serve halal food?',
        a: 'Yes, all our restaurants serve halal-certified food. We also accommodate dietary restrictions and preferences with advance notice.',
      },
      {
        q: 'Is room service available?',
        a: 'Yes, 24/7 room service is available with an extensive menu. Orders can be placed through the in-room phone or our mobile app.',
      },
      {
        q: 'Do you have a bar?',
        a: 'Yes, Al Bahar Lounge features a full bar with signature cocktails, and The Pool Bar serves beverages throughout the day.',
      },
    ],
  },
  {
    category: 'Policies & General',
    questions: [
      {
        q: 'What is your pet policy?',
        a: 'Unfortunately, we do not allow pets in the hotel. Service animals are welcome with proper documentation.',
      },
      {
        q: 'What currency is accepted?',
        a: 'We accept UAE Dirhams (AED) and major credit cards. Currency exchange services are available at the front desk.',
      },
      {
        q: 'Do you have a business center?',
        a: 'Yes, we have a fully equipped business center with meeting rooms, printing, and secretarial services available.',
      },
      {
        q: 'Is the hotel suitable for events?',
        a: 'Yes, we have elegant event spaces suitable for meetings, conferences, weddings, and celebrations. Our events team can assist with planning.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="FREQUENTLY ASKED QUESTIONS"
        subtitle="Find answers to common questions about your stay at Seven Seas Hotel Dubai"
        height="large"
        textPosition="center"
      />

      {/* Helpful Images */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Booking Help', description: 'Reservation assistance' },
              { id: 2, title: 'Hotel Services', description: 'Amenities & facilities' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-2xl font-bold text-black">{category.category}</h2>
                  <motion.div
                    animate={{ rotate: openCategory === category.category ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                {/* Questions */}
                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 space-y-4">
                        {category.questions.map((faq, qIndex) => (
                          <div key={qIndex} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                            <button
                              onClick={() => setOpenQuestion(openQuestion === `${category.category}-${qIndex}` ? null : `${category.category}-${qIndex}`)}
                              className="w-full text-left flex items-start justify-between gap-4 py-3 hover:text-black transition-colors"
                            >
                              <span className="font-semibold text-gray-900 flex-1">{faq.q}</span>
                              <motion.div
                                animate={{ rotate: openQuestion === `${category.category}-${qIndex}` ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0"
                              >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </motion.div>
                            </button>
                            <AnimatePresence>
                              {openQuestion === `${category.category}-${qIndex}` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-gray-600 leading-relaxed pt-2 pl-4">
                                    {faq.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gray-50 rounded-lg p-12"
          >
            <h3 className="text-2xl font-bold text-black mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Our team is here to help you 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+9714XXXXXXX"
                className="px-8 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Call Us
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

