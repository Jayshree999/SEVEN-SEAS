'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wifi, Bath, Car, TreePine, Mountain, Shield, Home, Tv, Briefcase, Waves, Flame, Heart, BellRing, Timer, Snowflake, WashingMachine, Droplets, ChevronRight, X } from 'lucide-react'

// Amenity categories with icons
const amenityCategories = {
  'Most popular': [
    { name: 'wifi', icon: Wifi },
    { name: 'air_conditioning', icon: Snowflake },
    { name: 'parking', icon: Car },
    { name: 'swimming_pool', icon: Waves },
  ],
  Bathroom: [
    { name: 'Hairdryer', icon: Home },
    { name: 'Shampoo', icon: Bath },
    { name: 'Conditioner', icon: Bath },
    { name: 'Shower Gel', icon: Bath },
    { name: 'Body Soap', icon: Bath },
  ],
  Entertainment: [
    { name: 'Tv', icon: Tv },
  ],
  Safety: [
    { name: 'Smoke Alarm', icon: Shield },
    { name: 'Fire Extinguisher', icon: Flame },
    { name: 'First Aid Kit', icon: Heart },
  ],
  'Outdoor & Views': [
    { name: 'Garden View', icon: TreePine },
    { name: 'Mountain View', icon: Mountain },
  ],
  Workspace: [{ name: 'Dedicated Workspace', icon: Briefcase }],
  Services: [
    { name: 'Host Greets You', icon: BellRing },
    { name: 'Long Term Stays Allowed', icon: Timer },
    { name: 'Washer', icon: WashingMachine },
    { name: 'Hot Water', icon: Droplets },
  ],
}

interface PropertyAmenitiesProps {
  amenities: string[]
}

// Helper function to normalize amenity names for consistent comparison
const normalizeAmenityName = (name: string) => name.toLowerCase().replace(/[\s_]/g, '')

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!amenities || amenities.length === 0) {
    return null
  }

  // Normalize the input amenities array once for efficient lookup
  const normalizedInputAmenities = amenities.map(normalizeAmenityName)

  // Group amenities by category
  const groupedAmenities = Object.entries(amenityCategories).reduce((acc, [category, categoryAmenities]) => {
    const matchingAmenities = categoryAmenities.filter((amenity) =>
      normalizedInputAmenities.includes(normalizeAmenityName(amenity.name)),
    )
    if (matchingAmenities.length > 0) {
      acc[category] = matchingAmenities
    }
    return acc
  }, {} as Record<string, (typeof amenityCategories)[keyof typeof amenityCategories]>)

  if (Object.keys(groupedAmenities).length === 0) {
    return null
  }

  // Get all available amenities in a flat array
  const allAvailableAmenities = Object.values(groupedAmenities).flat()

  // Take first 6 amenities for preview regardless of category
  const previewAmenities = allAvailableAmenities.slice(0, 6)
  const totalAmenities = allAvailableAmenities.length

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-8">What this place offers</h2>
      {/* Preview Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewAmenities.map((amenity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="p-1">
                <amenity.icon className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-base">{amenity.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Show All Button */}
      {totalAmenities > 6 && (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg h-14 text-base font-medium w-full justify-between hover:border-amber-600 transition-colors border-2 border-gray-300 px-4 flex items-center"
          >
            Show all {totalAmenities} amenities
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-3xl w-full h-[90vh] flex flex-col">
                <div className="p-6 border-b flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">All amenities</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full hover:bg-gray-100 p-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="overflow-y-auto p-6 space-y-8">
                  {Object.entries(groupedAmenities).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="text-xl font-semibold mb-6">{category}</h3>
                      <div className="grid gap-y-6">
                        {items.map((amenity, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4"
                          >
                            <div className="p-1">
                              <amenity.icon className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="text-base">{amenity.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}



