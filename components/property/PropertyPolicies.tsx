'use client'

import { motion } from 'framer-motion'
import { Clock, AlertTriangle, Shield } from 'lucide-react'
import { Property } from '@/lib/api'

interface PropertyPoliciesProps {
  data: Property | {
    Check_in_Message?: string
    cleaningfee?: number
    Check_in_time?: string
    Check_out_time?: string
    otherNotes?: string
    term?: {
      smoking?: boolean
      drinking?: boolean
      pets?: boolean
      children?: boolean
      party?: boolean
    }
    guest_no?: string | number
    [key: string]: any
  }
}

export function PropertyPolicies({ data }: PropertyPoliciesProps) {
  // Construct house rules based on the terms and other data
  const houseRules = [
    data.term?.smoking === false && 'No smoking',
    data.term?.pets === false && 'No pets allowed',
    data.term?.party === false && 'No parties or events',
    data.guest_no && `Maximum ${data.guest_no} guests`,
    'No unregistered guests',
    data.term?.children === false && 'No Child Allowed below 12',
  ].filter(Boolean) // Remove falsy values

  const policies = {
    check_in: data.Check_in_time || '3:00 PM',
    check_out: data.Check_out_time || '11:00 AM',
    cancellation: data.otherNotes || 'All bookings are final and non-refundable. No cancellations, modifications, or refunds will be accepted after reservation.',
    house_rules: houseRules,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-8"
    >
      <motion.h2 className="text-xl md:text-2xl font-semibold tracking-tight">
        Property Policies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-100">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-semibold">Check-in/Check-out Times</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center justify-between">
                    Check-in
                    <span className="font-medium text-gray-900">{policies.check_in}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    Check-out
                    <span className="font-medium text-gray-900">{policies.check_out}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-semibold">Cancellation Policy</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{policies.cancellation}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-base font-semibold">House Rules</h3>
              <ul className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3">
                {policies.house_rules.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 md:gap-3 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    {rule}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}



