'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    category: 'Breakfast & Dining',
    questions: [
      {
        q: 'What kind of breakfast is served at Seven Seas Hotel?',
        a: 'Guests can enjoy a highly-rated breakfast (guest review score: 6.7). Breakfast options include Continental, Vegetarian, Halal, Asian, Buffet, and À la carte selections.',
      },
      {
        q: 'What breakfast options are available?',
        a: 'We offer Continental breakfast, Vegetarian options, Halal meals, Asian cuisine, Buffet service, and À la carte selections to cater to all dietary preferences.',
      },
      {
        q: 'Does Seven Seas Hotel have a restaurant on site?',
        a: 'Yes, Seven Seas Hotel has 1 restaurant: Salt Restaurant, serving international cuisine including Indian, Mediterranean, and local dishes.',
      },
      {
        q: 'What cuisines are available at the hotel?',
        a: 'Our restaurant serves Indian, Mediterranean, and international cuisines with options for vegetarian and halal dining.',
      },
      {
        q: 'Is halal food available?',
        a: 'Yes, we offer halal dining options at our restaurant and for room service.',
      },
      {
        q: 'Can I order vegetarian meals?',
        a: 'Absolutely! Vegetarian options are available for breakfast, lunch, and dinner.',
      },
      {
        q: 'Do you have kids\' meals?',
        a: 'Yes, kids\' meals are available at our restaurant (additional charge may apply).',
      },
      {
        q: 'Can I request special diet meals?',
        a: 'Yes, special diet meals can be arranged upon request. Please inform us of your dietary requirements when booking.',
      },
      {
        q: 'Is 24-hour room service available?',
        a: 'Yes, we offer 24-hour room service for your convenience.',
      },
      {
        q: 'Can I have breakfast in my room?',
        a: 'Yes, breakfast in room service is available.',
      },
      {
        q: 'Is there a bar at the hotel?',
        a: 'Yes, we have a bar and lounge serving beverages, and a pool bar at our rooftop pool.',
      },
      {
        q: 'Is there a coffee house?',
        a: 'Yes, there is a coffee house on site for your convenience.',
      },
      {
        q: 'Do rooms have tea/coffee makers?',
        a: 'Yes, all rooms are equipped with tea/coffee makers.',
      },
      {
        q: 'Is wine and champagne available?',
        a: 'Yes, wine and champagne service is available (additional charge).',
      },
      {
        q: 'Are minibars available in rooms?',
        a: 'Yes, all rooms feature a minibar.',
      },
    ],
  },
  {
    category: 'Rooms & Accommodations',
    questions: [
      {
        q: 'What type of rooms can I book at Seven Seas Hotel?',
        a: 'Room options include: Twin/Double, Double, Suite, Twin, and Family rooms.',
      },
      {
        q: 'What check-in and check-out times does Seven Seas Hotel have?',
        a: 'Check-in at Seven Seas Hotel is from 15:00 (3:00 PM), and check-out is until 11:30 AM.',
      },
      {
        q: 'Do you have family rooms?',
        a: 'Yes, we have family rooms available to accommodate families.',
      },
      {
        q: 'Are interconnected rooms available?',
        a: 'Yes, interconnected rooms are available for families or groups.',
      },
      {
        q: 'Do all rooms have air conditioning?',
        a: 'Yes, all rooms feature air conditioning.',
      },
      {
        q: 'Do rooms have private bathrooms?',
        a: 'Yes, all rooms have private bathrooms with modern amenities.',
      },
      {
        q: 'What bathroom amenities are provided?',
        a: 'Bathrooms include bathtub, shower, bidet, toilet, free toiletries, bathrobe, hairdryer, slippers, toilet paper, and premium towels.',
      },
      {
        q: 'Do rooms have city views?',
        a: 'Yes, rooms feature city views.',
      },
      {
        q: 'Are soundproof rooms available?',
        a: 'Yes, we offer soundproof rooms for enhanced comfort.',
      },
      {
        q: 'Do rooms have work desks?',
        a: 'Yes, all rooms are equipped with a desk workspace.',
      },
      {
        q: 'Is there a wardrobe in the rooms?',
        a: 'Yes, rooms have wardrobes or closets, with some featuring walk-in closets.',
      },
      {
        q: 'Do rooms have sitting areas?',
        a: 'Yes, rooms include sitting areas for relaxation.',
      },
      {
        q: 'Are sockets available near the bed?',
        a: 'Yes, there are sockets conveniently located near the bed.',
      },
      {
        q: 'Do you have accessible rooms?',
        a: 'Yes, we have accessible rooms designed for guests with mobility needs, featuring bathroom emergency cords, lowered sinks, toilets with grab rails, and wheelchair accessibility.',
      },
      {
        q: 'Is there an elevator in the hotel?',
        a: 'Yes, upper floors are accessible by elevator.',
      },
      {
        q: 'Do rooms have TVs?',
        a: 'Yes, all rooms feature flat-screen TVs.',
      },
      {
        q: 'Is there a telephone in the rooms?',
        a: 'Yes, all rooms have telephones.',
      },
      {
        q: 'Are there non-smoking rooms?',
        a: 'Yes, non-smoking rooms are available. Smoking is only allowed in designated areas.',
      },
    ],
  },
  {
    category: 'Pool & Spa Facilities',
    questions: [
      {
        q: 'Does Seven Seas Hotel have a pool?',
        a: 'Yes, this hotel has a rooftop swimming pool. The pool is open all year round and welcomes all ages.',
      },
      {
        q: 'Is the pool on the rooftop?',
        a: 'Yes, our swimming pool is located on the rooftop with stunning city views.',
      },
      {
        q: 'Is there a kids\' pool?',
        a: 'Yes, we have a kids\' pool area for younger guests.',
      },
      {
        q: 'Is there a pool bar?',
        a: 'Yes, our rooftop pool features a pool bar service.',
      },
      {
        q: 'Are beach chairs and umbrellas available?',
        a: 'Yes, beach chairs/loungers and beach umbrellas are available at the pool.',
      },
      {
        q: 'Are swimming pool toys provided?',
        a: 'Yes, swimming pool toys are available.',
      },
      {
        q: 'Are there locker rooms?',
        a: 'Yes, locker rooms are available at the pool area.',
      },
      {
        q: 'Does Seven Seas Hotel have a hot tub?',
        a: 'Yes, there is a hot tub/Jacuzzi available for guests.',
      },
      {
        q: 'What spa services are available?',
        a: 'Our spa offers full-body massage, hand massage, head massage, foot massage, neck massage, back massage, spa/wellness packages, steam room, sauna, light therapy, body wrap, body scrub, body treatments, waxing services, facial treatments, and beauty services.',
      },
      {
        q: 'Is there a sauna?',
        a: 'Yes, sauna facilities are available.',
      },
      {
        q: 'Do you have a steam room?',
        a: 'Yes, a steam room is part of our spa facilities.',
      },
      {
        q: 'Are spa packages available?',
        a: 'Yes, we offer spa/wellness packages. Please inquire at the spa for details.',
      },
      {
        q: 'Do you offer facial treatments?',
        a: 'Yes, professional facial treatments are available at our beauty services center.',
      },
      {
        q: 'Is there a massage chair?',
        a: 'Yes, a massage chair is available in the fitness area.',
      },
    ],
  },
  {
    category: 'Fitness & Activities',
    questions: [
      {
        q: 'Is there a fitness center?',
        a: 'Yes, we have a state-of-the-art fitness center with cardio machines, free weights, and modern equipment.',
      },
      {
        q: 'What hours is the fitness center open?',
        a: 'The fitness center is open 24/7 for hotel guests.',
      },
      {
        q: 'What entertainment is available?',
        a: 'We offer evening entertainment and a nightclub/DJ (additional charges may apply).',
      },
      {
        q: 'Is evening entertainment provided?',
        a: 'Yes, evening entertainment is available for guests.',
      },
    ],
  },
  {
    category: 'Location & Transportation',
    questions: [
      {
        q: 'How far is Seven Seas Hotel from Dubai International Airport?',
        a: 'Seven Seas Hotel is only 2.1 km (approximately 5 minutes drive) from Dubai International Airport.',
      },
      {
        q: 'How far is Seven Seas Hotel from the center of Dubai?',
        a: 'Seven Seas Hotel is 13 km from the center of Dubai.',
      },
      {
        q: 'How close is the hotel to the beach?',
        a: 'The nearest beach is 1.4 km from Seven Seas Hotel.',
      },
      {
        q: 'What is nearby the hotel?',
        a: 'Nearby attractions include Sahara Center (1.9 mi), Burj Khalifa (17 km), Dubai International Airport (2.1 km), and various beaches (1.4-9 km).',
      },
      {
        q: 'Is the hotel near public transit?',
        a: 'Yes, Stadium Metro Station is 1.2 km away, and Al Qiyadah Metro Station is 1.2 km away.',
      },
      {
        q: 'How far is Burj Khalifa?',
        a: 'Burj Khalifa is approximately 17 km from the hotel.',
      },
      {
        q: 'Is parking available?',
        a: 'Yes, private parking is available on site (reservation needed) and costs AED 20 per day. EV charging stations are also available.',
      },
      {
        q: 'Do you offer valet parking?',
        a: 'Yes, valet parking service is available.',
      },
      {
        q: 'Is there a parking garage?',
        a: 'Yes, we have a secure parking garage with CCTV surveillance.',
      },
      {
        q: 'Are there EV charging stations available?',
        a: 'Yes, electric vehicle (EV) charging stations are available in our secure parking garage for all hotel guests.',
      },
      {
        q: 'Do you offer airport transfers?',
        a: 'Yes, airport transfer services can be arranged. Please contact our concierge.',
      },
      {
        q: 'Is car rental available?',
        a: 'Yes, car rental services are available at the hotel.',
      },
    ],
  },
  {
    category: 'Services & Amenities',
    questions: [
      {
        q: 'Is WiFi available?',
        a: 'Yes, free WiFi is available in all areas of the hotel.',
      },
      {
        q: 'Is there a 24-hour front desk?',
        a: 'Yes, our front desk operates 24 hours a day.',
      },
      {
        q: 'Do you have concierge service?',
        a: 'Yes, professional concierge service is available to assist with tours, reservations, and local recommendations.',
      },
      {
        q: 'Is there a tour desk?',
        a: 'Yes, our tour desk can help arrange local tours and attractions.',
      },
      {
        q: 'Can you assist with restaurant reservations?',
        a: 'Yes, our concierge can help with restaurant reservations.',
      },
      {
        q: 'Is baggage storage available?',
        a: 'Yes, baggage storage is available at the front desk.',
      },
      {
        q: 'Do you offer currency exchange?',
        a: 'Yes, currency exchange services are available at the front desk.',
      },
      {
        q: 'Is there a wake-up service?',
        a: 'Yes, wake-up service/alarm clock service is available.',
      },
      {
        q: 'Is daily housekeeping provided?',
        a: 'Yes, daily housekeeping is provided.',
      },
      {
        q: 'Do you offer laundry service?',
        a: 'Yes, laundry service and dry cleaning are available (additional charges apply).',
      },
      {
        q: 'Is ironing service available?',
        a: 'Yes, ironing service is available (additional charge), and ironing facilities are in rooms.',
      },
      {
        q: 'Do you have business facilities?',
        a: 'Yes, we have a fully equipped business center, meeting rooms, and banquet facilities.',
      },
      {
        q: 'Are meeting rooms available?',
        a: 'Yes, meeting and banquet facilities are available (additional charge).',
      },
      {
        q: 'Do you offer fax and photocopying?',
        a: 'Yes, fax/photocopying services are available (additional charge).',
      },
      {
        q: 'Are there safety deposit boxes?',
        a: 'Yes, secure lockers are available at the front desk, and in-room safes are in all rooms.',
      },
      {
        q: 'What languages does your staff speak?',
        a: 'Our multilingual staff speaks Arabic, English, French, Gujarati, Hindi, Malayalam, Marathi, Burmese, Punjabi, Russian, Tamil, Filipino, and Urdu.',
      },
    ],
  },
  {
    category: 'Safety & Security',
    questions: [
      {
        q: 'What safety measures are in place?',
        a: 'We have fire extinguishers, CCTV outside property and in common areas, smoke alarms, security alarm, key card/key access, 24-hour security personnel, and in-room safes.',
      },
      {
        q: 'Is there 24-hour security?',
        a: 'Yes, 24-hour security personnel are on duty.',
      },
      {
        q: 'Are there CCTV cameras?',
        a: 'Yes, CCTV cameras are installed outside the property and in common areas.',
      },
      {
        q: 'Do rooms have safes?',
        a: 'Yes, all rooms are equipped with in-room safes.',
      },
      {
        q: 'Is key card access available?',
        a: 'Yes, the hotel uses key card access for enhanced security.',
      },
    ],
  },
  {
    category: 'Accessibility',
    questions: [
      {
        q: 'Is the hotel wheelchair accessible?',
        a: 'Yes, the entire property is wheelchair accessible with facilities for disabled guests.',
      },
      {
        q: 'Are there bathrooms with grab rails?',
        a: 'Yes, accessible bathrooms feature emergency cords, lowered sinks, and toilets with grab rails.',
      },
      {
        q: 'Is the entire unit wheelchair accessible?',
        a: 'Yes, the entire unit is wheelchair accessible.',
      },
      {
        q: 'Can wheelchairs access upper floors?',
        a: 'Yes, upper floors are accessible by elevator.',
      },
    ],
  },
  {
    category: 'Policies',
    questions: [
      {
        q: 'What is your pet policy?',
        a: 'Pets are not allowed. Service animals may be permitted with proper documentation.',
      },
      {
        q: 'Is smoking allowed?',
        a: 'Smoking is not allowed in rooms. There are designated smoking areas.',
      },
      {
        q: 'Can I cancel my reservation?',
        a: 'Cancellation policies vary by rate and booking platform. Please check your confirmation or contact reservations.',
      },
      {
        q: 'Do you provide invoices?',
        a: 'Yes, invoices are provided upon checkout.',
      },
    ],
  },
  {
    category: 'Pricing & Booking',
    questions: [
      {
        q: 'How much does it cost to stay at Seven Seas Hotel?',
        a: 'Prices may vary depending on your stay dates, room type, and hotel policy. To see current prices, please enter your dates on our booking page.',
      },
      {
        q: 'How can I make a reservation?',
        a: 'You can make a reservation through our website, by phone, or via online booking platforms.',
      },
      {
        q: 'Can I modify my reservation?',
        a: 'Yes, you can modify your reservation by contacting our reservations team. Changes are subject to availability.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept major credit cards and other standard payment methods.',
      },
      {
        q: 'Is express check-in/check-out available?',
        a: 'Yes, express check-in/check-out services are available.',
      },
      {
        q: 'Can I have a private check-in/check-out?',
        a: 'Yes, private check-in/check-out services are available.',
      },
    ],
  },
  {
    category: 'Events & Functions',
    questions: [
      {
        q: 'Can I host events at the hotel?',
        a: 'Yes, we have elegant event spaces suitable for meetings, conferences, weddings, and celebrations.',
      },
      {
        q: 'Do you have a ballroom?',
        a: 'Yes, we have the Mehfil Ballroom for large events and celebrations.',
      },
      {
        q: 'Can you help plan events?',
        a: 'Yes, our events team can assist with comprehensive event planning.',
      },
      {
        q: 'Are AV equipment available for events?',
        a: 'Yes, AV equipment is available for meetings and events.',
      },
    ],
  },
  {
    category: 'Additional Questions',
    questions: [
      {
        q: 'Do you have heating in rooms?',
        a: 'Yes, heating systems are available.',
      },
      {
        q: 'What type of flooring is in the rooms?',
        a: 'Rooms feature hardwood/parquet floors or carpeted areas.',
      },
      {
        q: 'Is there a beauty salon?',
        a: 'Yes, we have a hair/beauty salon on site.',
      },
      {
        q: 'Can I receive parcels at the hotel?',
        a: 'Yes, package receiving and mail services are available.',
      },
      {
        q: 'Is there a shoe shine service?',
        a: 'Yes, shoe shine service is available.',
      },
      {
        q: 'Is newspaper delivery available?',
        a: 'Yes, newspaper delivery can be arranged.',
      },
      {
        q: 'Do you have porter service?',
        a: 'Yes, porter service is available to assist with luggage.',
      },
      {
        q: 'Is there a fireplace in rooms?',
        a: 'Fireplaces are available in select room types.',
      },
      {
        q: 'Do rooms have dining areas?',
        a: 'Yes, rooms feature dining areas.',
      },
      {
        q: 'Is there an alarm clock in rooms?',
        a: 'Yes, alarm clocks are provided in all rooms.',
      },
      {
        q: 'Do you have electric kettles?',
        a: 'Yes, electric kettles and tea/coffee makers are in all rooms.',
      },
      {
        q: 'Are fresh fruit available?',
        a: 'Yes, fresh fruit is available (additional charge may apply).',
      },
      {
        q: 'What is the guest review score for breakfast?',
        a: 'The breakfast has a guest review score of 6.7.',
      },
      {
        q: 'Is the hotel suitable for business travelers?',
        a: 'Yes, with a business center, meeting facilities, high-speed WiFi, and work desks in rooms, we cater to business travelers.',
      },
      {
        q: 'Is the hotel family-friendly?',
        a: 'Yes, we offer family rooms, kids\' pool, kids\' meals, baby safety gates, and interconnected rooms.',
      },
      {
        q: 'What makes Seven Seas Hotel special?',
        a: 'Our prime location near Dubai Airport, rooftop pool, comprehensive spa, multilingual staff, halal dining, and 4-star luxury amenities make us the perfect choice for discerning travelers.',
      },
      {
        q: 'How can I contact the hotel?',
        a: 'You can reach us by phone at +971 55 100 9152 or email at info@sevenseashotel.ae',
      },
    ],
  },
]

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter FAQs based on search query
  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0)

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find answers to all your questions about Seven Seas Hotel Dubai
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-none bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            {filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-none shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-all border-b border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {category.category}
                    <span className="ml-3 text-sm font-normal text-gray-600">
                      ({category.questions.length} questions)
                    </span>
                  </h2>
                  <motion.div
                    animate={{ rotate: openCategory === category.category ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-amber-600" />
                  </motion.div>
                </button>

                {/* Questions */}
                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-4">
                        {category.questions.map((faq, index) => {
                          const questionKey = `${category.category}-${index}`
                          return (
                            <div
                              key={questionKey}
                              className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                            >
                              <button
                                onClick={() => toggleQuestion(questionKey)}
                                className="w-full text-left flex items-start justify-between gap-4 group"
                              >
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors flex-1">
                                  {faq.q}
                                </h3>
                                <motion.div
                                  animate={{ rotate: openQuestion === questionKey ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-shrink-0"
                                >
                                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {openQuestion === questionKey && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="mt-3 text-gray-600 leading-relaxed font-medium">
                                      {faq.a}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600">
                No FAQs found matching your search. Please try different keywords.
              </p>
            </motion.div>
          )}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-[#f8f6f0] rounded-none p-8 md:p-12 border border-gray-100 shadow-sm"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-6 font-light">
              Our team is here to help! Contact us for any additional information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="tel:+971551009152"
                className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold tracking-widest uppercase rounded-none transition-all shadow-sm"
              >
                Call Us: +971 55 100 9152
              </a>
              <a
                href="mailto:info@sevenseashotel.ae"
                className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-50 font-bold tracking-widest uppercase rounded-none border border-gray-300 transition-all shadow-sm"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
