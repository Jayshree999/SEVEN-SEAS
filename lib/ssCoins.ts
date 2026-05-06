const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://infinitysignaturebackend-api.affworld.io'

export interface SSCoinTransaction {
    _id: string
    amount: number
    type: 'earned' | 'redeemed' | 'adjusted'
    bookingRef: string | null
    description: string
    date: string
}

export interface SSCoinsData {
    balance: number
    totalEarned: number
    totalRedeemed: number
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
    nextTierThreshold: number | null
    progressToNext: number
    transactions: SSCoinTransaction[]
}

import { getCurrentUserProfile } from './user'

export async function fetchSSCoins(): Promise<SSCoinsData | null> {
    try {
        const profile = await getCurrentUserProfile()
        const bookings = profile.data?.bookings
        if (!bookings) return null

        let totalEarned = 0
        let totalRedeemed = 0
        const transactions: SSCoinTransaction[] = []

        const allBookings = [
            ...(bookings.completed || []),
            ...(bookings.ConfirmedBookings || []),
            ...(bookings.hosting || []),
            ...(bookings.pending || []),
        ]

        allBookings.forEach(booking => {
            if (booking.rent && (booking.status === 'Completed' || booking.status === 'Confirmed')) {
               const amount = parseFloat(booking.rent)
               if (!isNaN(amount) && amount > 0) {
                   totalEarned += amount
                   transactions.push({
                       _id: booking._id,
                       amount: amount,
                       type: 'earned',
                       bookingRef: booking._id,
                       description: `Booking for ${booking.property?.title || 'Property'}`,
                       date: booking.checkIn || new Date().toISOString()
                   })
               }
            }
        })

        // Calculate Tier
        let tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' = 'Bronze'
        let nextTierThreshold: number | null = 1000

        if (totalEarned >= 10000) { tier = 'Platinum'; nextTierThreshold = null }
        else if (totalEarned >= 5000) { tier = 'Gold'; nextTierThreshold = 10000 }
        else if (totalEarned >= 1000) { tier = 'Silver'; nextTierThreshold = 5000 }

        const progressToNext = nextTierThreshold 
            ? Math.min(100, Math.round((totalEarned / nextTierThreshold) * 100))
            : 100

        return {
            balance: totalEarned - totalRedeemed,
            totalEarned,
            totalRedeemed,
            tier,
            nextTierThreshold,
            progressToNext,
            transactions: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }
    } catch {
        return null
    }
}
