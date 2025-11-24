'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import BackgroundVideo from './BackgroundVideo'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'London, UK',
    rating: 5,
    text: 'Absolutely stunning hotel! The rooms are luxurious, the service is impeccable, and the location is perfect. We had an amazing stay and will definitely return.',
    image: '👩',
  },
  {
    id: 2,
    name: 'Ahmed Al-Mansoori',
    location: 'Dubai, UAE',
    rating: 5,
    text: 'As a local, I\'ve stayed in many Dubai hotels, but Seven Seas stands out. The attention to detail and genuine hospitality make it exceptional.',
    image: '👨',
  },
  {
    id: 3,
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Business trip turned into a luxury experience. The Executive Suite was perfect for work, and the staff went above and beyond to accommodate our needs.',
    image: '👨‍💼',
  },
  {
    id: 4,
    name: 'Emma Williams',
    location: 'New York, USA',
    rating: 5,
    text: 'Our family vacation was made perfect by the Family Suite. Spacious, clean, and the kids loved it! The pool and dining options are fantastic.',
    image: '👩‍👧',
  },
  {
    id: 5,
    name: 'James Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'The Presidential Suite exceeded all expectations. Butler service, stunning views, and every amenity you could imagine. Truly a 5-star experience.',
    image: '👨‍💼',
  },
  {
    id: 6,
    name: 'Sophie Martin',
    location: 'Paris, France',
    rating: 5,
    text: 'Romantic getaway perfection! The spa treatments were divine, and the restaurant served the most delicious meals. We felt truly pampered.',
    image: '👩',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden bg-white"
      id="testimonials"
    >
      <BackgroundVideo opacity={0.03} />
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            GUEST TESTIMONIALS
          </h2>
          <p className="text-xl text-gray-600">
            What Our Guests Say About Their Stay
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} inView={inView} />
          ))}
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-50 rounded-lg px-12 py-8">
            <div className="text-5xl font-bold text-black mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">⭐</span>
              ))}
            </div>
            <p className="text-gray-600">Based on 1,247 guest reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index, inView }: { testimonial: typeof testimonials[0], index: number, inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-gray-400 transition-colors"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 leading-relaxed mb-6 italic">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
          {testimonial.image}
        </div>
        <div>
          <div className="font-bold text-black">{testimonial.name}</div>
          <div className="text-sm text-gray-600">{testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  )
}

