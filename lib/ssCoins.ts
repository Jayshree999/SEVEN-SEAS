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

export async function fetchSSCoins(): Promise<SSCoinsData | null> {
    try {
        const token = typeof window !== 'undefined'
            ? localStorage.getItem('auth_token')
            : null
        if (!token) return null

        const response = await fetch(`${API_URL}/api/v1/user/ss-coins`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) return null

        const data = await response.json()
        return data.data || null
    } catch {
        return null
    }
}
