/**
 * Utility to verify if a user registration was successful
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export async function verifyUserExists(email: string): Promise<boolean> {
  try {
    // Try to login with the email (this will verify the user exists)
    // Note: This is just for verification - in production, you'd use an admin endpoint
    const response = await fetch(`${API_URL}/api/v1/auth/logins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organisation': 'sevenseas',
      },
      body: JSON.stringify({
        email,
        password: 'test', // We're just checking if user exists, not actually logging in
      }),
    })

    // If we get a 400 with "Invalid credentials" or "User not found", user doesn't exist
    // If we get a 401 with "Invalid password", user exists but password is wrong (which means user exists)
    const status = response.status
    
    if (status === 401) {
      // User exists but password is wrong - this means registration was successful
      return true
    }
    
    if (status === 400) {
      const data = await response.json()
      if (data.message?.toLowerCase().includes('not found') || 
          data.message?.toLowerCase().includes('does not exist')) {
        return false
      }
    }

    // If we get 200, user exists and credentials are correct
    if (status === 200) {
      return true
    }

    return false
  } catch (error) {
    console.error('Error verifying user:', error)
    return false
  }
}

export async function checkRegistrationStatus(email: string): Promise<{
  exists: boolean
  message: string
}> {
  const exists = await verifyUserExists(email)
  
  return {
    exists,
    message: exists 
      ? `✅ User with email ${email} is registered successfully!` 
      : `❌ User with email ${email} was not found. Registration may have failed.`
  }
}




