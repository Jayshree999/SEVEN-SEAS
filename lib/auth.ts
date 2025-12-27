/**
 * Authentication API service functions
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  fullName: string
  email: string
  password: string
  phone: string
}

export interface AuthResponse {
  _statusCode?: number
  statusCode?: number
  message?: string
  data?: {
    user?: {
      _id: string
      fullName: string
      email: string
      phone?: string | null
      role?: string
      createdAt?: string
      updatedAt?: string
    }
    token?: string
    accessToken?: string
  }
  token?: string
  user?: {
    _id: string
    fullName: string
    email: string
    phone?: string | null
    role?: string
  }
}

export interface ForgotPasswordResponse {
  statusCode?: number
  message?: string
  success?: boolean
}

export interface ResetPasswordData {
  token: string
  newPassword: string
}

/**
 * User login
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Use BookingUser login endpoint for frontend users (customers)
    const response = await fetch(`${API_URL}/api/v1/bookinguser/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
      },
      body: JSON.stringify(credentials),
    })

    const data: AuthResponse = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Backend returns: { data: { user: {...}, accessToken, refreshToken } }
    const token = data.token || data.data?.token || data.data?.accessToken
    const userData = data.user || data.data?.user

    // Store token and user if provided
    if (token && userData) {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(userData))
    }

    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * User signup/registration
 */
export async function signup(userData: SignupData): Promise<AuthResponse> {
  try {
    // Use BookingUser signup endpoint for frontend users (customers/guests)
    const response = await fetch(`${API_URL}/api/v1/bookinguser/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
      }),
    })

    const data: AuthResponse = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    // Backend returns: { data: { user: {...}, accessToken, refreshToken } }
    const token = data.token || data.data?.token || data.data?.accessToken
    const userDataFromResponse = data.user || data.data?.user

    // Store token and user if provided
    if (token && userDataFromResponse) {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(userDataFromResponse))
    } else if (userDataFromResponse) {
      // If user data exists but no token, still store user (token might be in cookies)
      localStorage.setItem('user', JSON.stringify(userDataFromResponse))
    }

    return data
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

/**
 * Forgot password - send reset email
 */
export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/host/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
      },
      body: JSON.stringify({ email }),
    })

    const data: ForgotPasswordResponse = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send reset email')
    }

    return data
  } catch (error) {
    console.error('Forgot password error:', error)
    throw error
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(resetData: ResetPasswordData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/host/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
      },
      body: JSON.stringify(resetData),
    })

    const data: AuthResponse = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Password reset failed')
    }

    return data
  } catch (error) {
    console.error('Reset password error:', error)
    throw error
  }
}

/**
 * Logout - clear stored auth data
 */
export function logout(): void {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

/**
 * Get stored user data
 */
export function getStoredUser(): { _id: string; fullName: string; email: string; phone?: string } | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

