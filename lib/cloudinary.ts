/**
 * Cloudinary upload utility
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dbk0iancm'
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_UPLOAD_PRESET || '24booking'

export interface CloudinaryResponse {
  secure_url: string
  public_id: string
  [key: string]: any
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
    }

    const data: CloudinaryResponse = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}




