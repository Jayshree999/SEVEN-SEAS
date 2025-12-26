'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Thank you for your message! We will get back to you shortly.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Video Banner */}
      <VideoBanner
        title="CONTACT US"
        subtitle="We're here to help"
        height="large"
        textPosition="center"
      />

      {/* Location Images */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ImageGrid
            images={[
              { id: 1, title: 'Hotel Location', description: 'Prime location in Dubai' },
              { id: 2, title: 'Reception', description: '24/7 concierge service' },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-black mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Planning</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📍</div>
                    <div>
                      <div className="font-semibold text-black mb-1">Address</div>
                      <div className="text-gray-600">
                        Seven Seas Hotel - 231, Al Ittihad Rd<br />
                        Al Qusais, Al Nahda 1, Dubai, UAE
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📞</div>
                    <div>
                      <div className="font-semibold text-black mb-1">Phone</div>
                      <div className="text-gray-600">
                        <a href="tel:+971551009152" className="hover:text-amber-600 transition-colors">+971 55 100 9152</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">✉️</div>
                    <div>
                      <div className="font-semibold text-black mb-1">Email</div>
                      <div className="text-gray-600">
                        <a href="mailto:reservation@sevenseashotel.ae" className="hover:text-amber-600 transition-colors">reservation@sevenseashotel.ae</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🌐</div>
                    <div>
                      <div className="font-semibold text-black mb-1">Website</div>
                      <div className="text-gray-600">
                        <a href="https://sevenseashotel.ae" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">www.sevenseashotel.ae</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🕒</div>
                    <div>
                      <div className="font-semibold text-black mb-1">Reception Hours</div>
                      <div className="text-gray-600">
                        24/7 Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map Placeholder */}
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Location</h3>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600">Google Map Integration</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Add your Google Maps API key to display the map
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  To integrate Google Maps, add your API key in the component and use the Google Maps React library.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section - Location */}
      <VideoSection
        title="Visit Us in Dubai"
        description="Experience our prime location in the heart of Dubai. Watch this video to see our hotel's surroundings and easy access to major attractions."
        position="left"
      />

      <Footer />
    </main>
  )
}

