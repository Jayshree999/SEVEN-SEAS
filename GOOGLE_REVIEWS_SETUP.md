# Google Reviews Integration Setup

This guide will help you set up live Google Reviews on your website.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. A Google Places API key
3. Your Google Place ID for Seven Seas Hotel

## Step 1: Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API (New)**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Places API (New)"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
   - (Optional) Restrict the API key to only allow Places API

## Step 2: Find Your Google Place ID

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for "Seven Seas Hotel Dubai"
3. Click on your business listing
4. In the URL, you'll see something like: `.../place/Seven+Seas+Hotel/@25.1234,55.5678,17z/data=...`
5. Or use the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
6. Copy the Place ID (it looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

## Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```env
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

**Important:** Never commit your `.env.local` file to git!

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the testimonials section on your homepage
3. You should see Google Reviews loading automatically

## Features

- ✅ Fetches live reviews from Google
- ✅ Displays up to 6 recent reviews
- ✅ Shows rating, author name, profile photo, and review text
- ✅ Links to full Google Reviews page
- ✅ Automatically caches reviews for 1 hour
- ✅ Fallback to static testimonials if API fails
- ✅ Responsive design with animations

## Troubleshooting

### Reviews not showing?

1. Check that your API key is correct in `.env.local`
2. Verify the Place ID is correct
3. Ensure Places API (New) is enabled in Google Cloud Console
4. Check browser console for errors
5. Verify API key restrictions allow your domain

### API Quota Exceeded?

- Google Places API has free tier limits
- Consider upgrading your plan if you exceed limits
- Reviews are cached for 1 hour to reduce API calls

## Cost Considerations

- Google Places API (New) has a free tier
- After free tier: ~$17 per 1,000 requests
- Reviews are cached for 1 hour, so you won't hit limits easily

## Security Notes

- API key is stored server-side only (in `.env.local`)
- Never expose your API key in client-side code
- Consider restricting API key to your domain in Google Cloud Console


