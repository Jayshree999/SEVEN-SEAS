'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  login as loginApi,
  signup as signupApi,
  partnerSignup as partnerSignupApi,
  logout as logoutApi,
  googleLogin as googleLoginApi,
  getStoredUser,
  isAuthenticated,
  type AuthResponse,
  type LoginCredentials,
  type SignupData,
} from '@/lib/auth'

interface User {
  _id: string
  fullName: string
  email: string
  phone?: string | null
  profileImg?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (userData: SignupData, isPartner?: boolean) => Promise<void>
  googleLogin: (credential: string) => Promise<void>
  logout: () => void
  isAuth: boolean
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set mounted first to prevent hydration errors
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Check for stored user only after component is mounted
    if (isMounted && typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser && isAuthenticated()) {
        setUser(storedUser)
      }
      setLoading(false)
    }
  }, [isMounted])

  // Function to refresh user data (can be called from profile page)
  const refreshUser = () => {
    if (typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser && isAuthenticated()) {
        setUser(storedUser)
      }
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await loginApi(credentials)
      const userData = response.user || response.data?.user
      if (userData) {
        setUser(userData)
        router.push('/')
      }
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData: SignupData, isPartner: boolean = false) => {
    try {
      const response: AuthResponse = isPartner
        ? await partnerSignupApi(userData)
        : await signupApi(userData)

      const userDataFromResponse = response.user || response.data?.user
      if (userDataFromResponse) {
        setUser(userDataFromResponse)
        // Redirect to profile page after successful registration
        router.push('/profile')
      }
    } catch (error) {
      throw error
    }
  }

  const googleLogin = async (credential: string) => {
    try {
      const response: AuthResponse = await googleLoginApi(credential)
      const userData = response.user || response.data?.user
      if (userData) {
        setUser(userData)
        router.push('/')
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    logoutApi()
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        isAuth: isMounted && !!user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

