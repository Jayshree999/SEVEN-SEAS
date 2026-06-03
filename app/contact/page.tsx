'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageBanner from '@/components/ImageBanner'
import ImageGrid from '@/components/ImageGrid'
import VideoBanner from '@/components/VideoBanner'
import VideoSection from '@/components/VideoSection'
import GoogleMap from '@/components/GoogleMap'
import { config } from '@/lib/config'
import { MapPin, ExternalLink } from 'lucide-react'

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
        height="small"
        textPosition="center"
      />

      {/* Location Images - Enhanced */}
      <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Our Location
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our prime location in the heart of Dubai, easily accessible from major attractions and business districts.
            </p>
          </motion.div>
          <ImageGrid
            images={[
              {
                id: 1,
                url: '/hero2.jpg',
                title: 'Hotel Location',
                description: 'Prime location in Dubai with easy access to major attractions'
              },
              {
                id: 2,
                url: '/DSC02655-scaled.jpg',
                title: 'Reception',
                description: '24/7 concierge service and world-class hospitality'
              },
            ]}
            columns={2}
            gap="large"
          />
        </div>
      </section>

      {/* Contact Section - Premium Enhanced */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form - Premium Design */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#f8f6f0] rounded-none shadow-sm p-8 md:p-10 border border-gray-100"
            >
              <div className="mb-8">
                <h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Send us a Message
                </h2>
                <p className="text-gray-600">We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-300 bg-white"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-300 bg-white"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-300 bg-white"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-300 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Planning</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-300 bg-white resize-none"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold uppercase tracking-widest rounded-none shadow-sm transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Map - Premium Design */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Info Card */}
              <div className="bg-[#f8f6f0] rounded-none shadow-sm p-8 md:p-10 border border-gray-100">
                <h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-amber-50/50 transition-colors duration-300"
                  >
                    <div className="text-3xl flex-shrink-0">📍</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Address</div>
                      <div className="text-gray-600 leading-relaxed">
                        Seven Seas Hotel - 231, Al Ittihad Rd<br />
                        Al Qusais, Al Nahda 1, Dubai, UAE
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-amber-50/50 transition-colors duration-300"
                  >
                    <div className="text-3xl flex-shrink-0">📞</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Phone</div>
                      <div className="text-gray-600">
                        <a href="tel:+971551009152" className="hover:text-amber-600 transition-colors font-medium">+971 55 100 9152</a>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-amber-50/50 transition-colors duration-300"
                  >
                    <div className="text-3xl flex-shrink-0">✉️</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Email</div>
                      <div className="text-gray-600">
                        <a href="mailto:reservation@sevenseashotel.ae" className="hover:text-amber-600 transition-colors font-medium break-all">reservation@sevenseashotel.ae</a>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-amber-50/50 transition-colors duration-300"
                  >
                    <div className="text-3xl flex-shrink-0">🌐</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Website</div>
                      <div className="text-gray-600">
                        <a href="https://sevenseashotel.net" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors font-medium">www.sevenseashotel.net</a>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-amber-50/50 transition-colors duration-300"
                  >
                    <div className="text-3xl flex-shrink-0">🕒</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Reception Hours</div>
                      <div className="text-gray-600 font-medium">
                        24/7 Available
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Google Map - Premium */}
              <div className="bg-[#f8f6f0] rounded-none shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-xl md:text-2xl font-bold text-gray-900"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Location
                  </h3>
                  <a
                    href={config.googleMapsLocationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-semibold rounded-none transition-all duration-300 shadow-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <GoogleMap
                  latitude={25.2795}
                  longitude={55.3745}
                  address="Seven Seas Hotel, 231 Al Ittihad Rd, Al Qusais, Al Nahda 1, Dubai, UAE"
                  zoom={16}
                  height="400px"
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                  Visit us at Seven Seas Hotel in the heart of Dubai. Click on the marker for directions or use the button above to open in Google Maps.
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

