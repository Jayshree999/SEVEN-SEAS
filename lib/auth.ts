// lib/auth.ts
// Connected to live Seven Seas API: https://sevenseas-api.propfusion.io

const API_BASE = 'https://sevenseas-api.propfusion.io'
const USER_KEY = 'ss_hotel_user'
const TOKEN_KEY = 'ss_hotel_token'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  fullName: string
  email: string
  password: string
  phone?: string
  // legacy fields (ignored for live API)
  restaurantName?: string
  token?: string
}

export interface User {
  id: number
  fullName: string
  email: string
  phone?: string | null
  profileImg?: string | null
  user_type: 'tenant'
}

export interface AuthResponse {
  user?: User
  data?: { user?: User }
  access_token?: string
  token_type?: string
  id?: number
  user_type?: string
  message?: string
}

// ─── Token helpers ────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return !!getToken() && !!getStoredUser()
}

function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function post(path: string, body: Record<string, unknown>, isFormData = false) {
  const headers: Record<string, string> = {}
  let bodyPayload: string | URLSearchParams

  if (isFormData) {
    // FastAPI OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
    const params = new URLSearchParams()
    Object.entries(body).forEach(([k, v]) => params.append(k, String(v)))
    bodyPayload = params
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    bodyPayload = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: bodyPayload,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.detail || data?.message || 'Request failed')
  }

  return data
}

// ─── Auth functions ───────────────────────────────────────────────────────────

/**
 * Login — uses /api/login (form-encoded)
 * Returns a normalised AuthResponse with user & access_token
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const data = await post('/api/login', {
    username: credentials.email,
    password: credentials.password,
  }, true /* form-encoded */)

  // Build user object from the token response
  const user: User = {
    id: data.id,
    fullName: credentials.email.split('@')[0], // fallback name until profile loads
    email: credentials.email,
    user_type: 'tenant',
  }

  saveSession(data.access_token, user)

  return {
    access_token: data.access_token,
    user,
  }
}

/**
 * Register a new tenant — uses POST /api/tenant/register
 */
export async function signup(userData: SignupData): Promise<AuthResponse> {
  const data = await post('/api/tenant/register', {
    tenant_name: userData.fullName,
    tenant_email: userData.email,
    password: userData.password,
    tenant_phone: userData.phone || '',
  })

  const user: User = {
    id: data.id,
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone || null,
    user_type: 'tenant',
  }

  saveSession(data.access_token, user)

  return {
    access_token: data.access_token,
    user,
  }
}

// Keep for backward compat (partner signup no longer used — redirect to normal signup)
export async function partnerSignup(userData: SignupData): Promise<AuthResponse> {
  return signup(userData)
}

/**
 * Forgot / reset password — uses POST /api/tenant/reset-password (form-encoded)
 */
export async function forgotPassword(email: string): Promise<void> {
  await post('/api/tenant/reset-password', {
    username: email,
    password: '',   // required by form schema but unused for reset
  }, true /* form-encoded */)
}

/**
 * Google login — not supported by this backend.
 * Throw a clear message so the UI can handle it.
 */
export async function googleLogin(_credential: string): Promise<AuthResponse> {
  throw new Error('Google login is not supported. Please use email & password.')
}

/**
 * Logout — clears local session
 */
export function logout(): void {
  clearSession()
}
