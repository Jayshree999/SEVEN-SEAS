# Google Maps API Setup Guide

This guide explains how to set up and use the Google Maps API in the Seven Seas Hotel project.

## ✅ What's Already Configured

1. **Config File**: `lib/config.ts` - Centralized configuration for API keys
2. **GoogleMap Component**: `components/GoogleMap.tsx` - Reusable Google Maps component
3. **TypeScript Types**: `types/google-maps.d.ts` - Type definitions for Google Maps API
4. **Contact Page**: Updated to use the GoogleMap component

## 📝 Setup Instructions

### Step 1: Create `.env.local` File

Create a `.env.local` file in the root of the project (`SEVEN-SEAS-1/.env.local`) with the following content:

```env
# Google Maps API Configuration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBy-vjoIYaTk2fLxGo6VP1X3qAall_mGRw

# Google Places API (for reviews)
GOOGLE_PLACES_API_KEY=AIzaSyBy-vjoIYaTk2fLxGo6VP1X3qAall_mGRw
GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
```

### Step 2: Restart Development Server

After creating `.env.local`, restart your Next.js development server:

```bash
npm run dev
```

### Step 3: Verify Setup

1. Visit the Contact page (`/contact`)
2. You should see an interactive Google Map showing the hotel location
3. Click on the marker to see the info window with directions link

## 🗺️ Using Google Maps in Your Components

### Basic Usage

```tsx
import GoogleMap from '@/components/GoogleMap'

export default function MyComponent() {
  return (
    <GoogleMap
      latitude={25.197197}
      longitude={55.2707828}
      address="Seven Seas Hotel, Dubai"
      zoom={16}
      height="400px"
    />
  )
}
```

### Props

- `latitude` (number, optional): Latitude coordinate (default: 25.197197)
- `longitude` (number, optional): Longitude coordinate (default: 55.2707828)
- `address` (string, optional): Address to display in info window (default: "Seven Seas Hotel, Dubai")
- `zoom` (number, optional): Map zoom level (default: 15)
- `height` (string, optional): Map container height (default: "400px")
- `className` (string, optional): Additional CSS classes

## 🔧 Configuration

All API keys are managed through `lib/config.ts`:

```typescript
import { config } from '@/lib/config'

// Access the API key
const apiKey = config.googleMapsApiKey
```

## 🚀 Features

- ✅ Interactive Google Maps with marker
- ✅ Info window with hotel details
- ✅ "Get Directions" link
- ✅ Custom map styling
- ✅ Error handling and fallback UI
- ✅ TypeScript support
- ✅ Responsive design

## 📍 Current Implementation

The Google Maps API is currently used in:

1. **Contact Page** (`app/contact/page.tsx`)
   - Shows hotel location with interactive map
   - Marker with info window
   - Directions link

2. **Google Reviews API** (`app/api/google-reviews/route.ts`)
   - Uses Google Places API for fetching reviews
   - Configured through `lib/config.ts`

## 🔒 Security Notes

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is exposed to the client (required for Google Maps)
- `GOOGLE_PLACES_API_KEY` is server-side only (used in API routes)
- Always restrict your API keys in Google Cloud Console:
  - Set HTTP referrer restrictions for Maps API
  - Set IP restrictions for Places API (server-side)

## 🐛 Troubleshooting

### Map Not Loading

1. Check that `.env.local` exists and contains the API key
2. Verify the API key is correct in Google Cloud Console
3. Check browser console for errors
4. Ensure Maps JavaScript API is enabled in Google Cloud Console

### API Key Errors

- Make sure the API key has the following APIs enabled:
  - Maps JavaScript API
  - Places API (New)
  - Geocoding API (if using address search)

### TypeScript Errors

- Ensure `types/google-maps.d.ts` is included in your `tsconfig.json`
- Restart your TypeScript server in your IDE

## 📚 Additional Resources

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Places API Documentation](https://developers.google.com/maps/documentation/places)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)


