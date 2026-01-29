                  # Seven Seas Hotel Dubai - Luxury 4 Star Hotel Website

A clean, modern, and highly animated website for a luxury 4-star hotel in Dubai built with Next.js, Three.js, and Framer Motion. Features a sophisticated white and black design with smooth animations and 3D elements.
,,,
## Features

### Website Features

- ✅ **Custom UI/UX Hotel Website Design** - Clean, modern white/black aesthetic
- ✅ **Homepage** - Banners, images, and promotional content with 3D animations
- ✅ **Rooms Listing Page** - Room types, pricing, and amenities
- ✅ **Individual Room Details Page** - Detailed room information
- ✅ **Online Room Booking Engine** - Complete booking form with date selection
- ✅ **Photo Gallery** - Filterable gallery with lightbox view
- ✅ **Restaurant & Services Section** - Dining options and hotel services
- ✅ **Offers & Promotions Module** - Special deals and packages
- ✅ **About Us Section** - Hotel story, values, and statistics
- ✅ **Contact Page** - Contact form with Google Map integration placeholder
- ✅ **Mobile Responsive Layout** - Fully responsive on all devices
- ✅ **SEO-Ready Architecture** - Optimized metadata and structure

### Technical Features

- 🎨 **3D Interactive Elements** - Immersive Three.js scenes with animated hotel building
- ✨ **Smooth Animations** - Framer Motion and GSAP for eye-catching transitions
- 🎭 **Particle Effects** - Subtle background particles
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎯 **Clean Design** - Modern white/black aesthetic with elegant typography

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Tailwind CSS** - Utility-first CSS framework
- **React Intersection Observer** - Scroll animations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── rooms/
│   │   ├── page.tsx         # Rooms listing page
│   │   └── [id]/page.tsx    # Individual room details
│   ├── gallery/
│   │   └── page.tsx         # Photo gallery
│   ├── restaurant/
│   │   └── page.tsx         # Restaurant & services
│   ├── services/
│   │   └── page.tsx         # Services page
│   ├── offers/
│   │   └── page.tsx         # Offers & promotions
│   ├── about/
│   │   └── page.tsx         # About Us page
│   └── contact/
│       └── page.tsx         # Contact page
├── components/
│   ├── Navigation.tsx       # Animated navigation bar
│   ├── HeroSection.tsx      # Hero section with animations
│   ├── PromoBanner.tsx      # Promotional banner
│   ├── Scene3D.tsx          # 3D hotel building scene
│   ├── FeaturesSection.tsx  # Features showcase
│   ├── GalleryPreview.tsx   # Gallery preview
│   ├── OffersSection.tsx    # Offers section
│   ├── CTA.tsx              # Call-to-action section
│   ├── BookingForm.tsx      # Online booking form
│   └── ParticleBackground.tsx # Particle effects
└── package.json
```

## Pages & Sections

### Homepage
- Hero section with 3D animations
- Promotional banner
- 3D interactive hotel scene
- Features showcase
- Gallery preview
- Offers section
- Call-to-action

### Rooms
- **Listing Page**: Grid view of all room types with pricing and amenities
- **Detail Page**: Individual room details with booking form
- **Booking Engine**: Complete online booking system with date selection

### Gallery
- Filterable photo gallery by category
- Lightbox view for images
- Smooth animations

### Restaurant & Services
- Restaurant listings with details
- Hotel services overview
- Operating hours and features

### Offers
- Special promotions and packages
- Terms and conditions
- Direct booking links

### About Us
- Hotel story and history
- Statistics and achievements
- Core values

### Contact
- Contact form
- Contact information
- Google Map integration placeholder

## Design System

- **Colors**: Clean white/black palette with subtle grays
- **Typography**: Inter (sans-serif) and Playfair Display (serif)
- **Animations**: Smooth, professional transitions
- **3D Elements**: Subtle, elegant 3D hotel building

## SEO Optimization

- Meta tags and descriptions
- Semantic HTML structure
- Open Graph tags
- Proper heading hierarchy
- Alt text placeholders for images

## Google Maps Integration

The contact page includes a placeholder for Google Maps. To integrate:

1. Get a Google Maps API key
2. Install `@react-google-maps/api` or similar
3. Add your API key to the environment variables
4. Update the contact page component

## Future Enhancements

- Multilingual support (i18n)
- Payment gateway integration
- Real-time availability checking
- User reviews and ratings
- Blog section
- Newsletter subscription

## License

This project is created for Seven Seas Hotel Dubai.

---

Enjoy your luxury hotel website! 🏨✨
