/**
 * API utility functions for Dubai Booking API
 */

/**
 * Converts a property name to a URL-friendly slug
 * e.g., "Deluxe King Room" -> "deluxe-king-room"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
    .replace(/\s+/g, '-')           // spaces to hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')        // trim leading/trailing hyphens
}

/**
 * Extracts the MongoDB ObjectId from a slug (last 24 hex chars)
 * e.g., "deluxe-king-room-69487bfdef489742dc309150" -> "69487bfdef489742dc309150"
 */
export function idFromSlug(slug: string): string | null {
  const match = slug.match(/([a-f0-9]{24})$/)
  return match ? match[1] : null
}

/**
 * Creates an SEO-friendly room slug from property name and ID
 * e.g., "Deluxe King Room" + "69487bfdef489742dc309150" -> "deluxe-king-room-69487bfdef489742dc309150"
 */
export function makeRoomSlug(property: Property): string {
  const name = property.title || property.name || property.nickname || 'room'
  return `${slugify(name)}-${property._id}`
}
export interface PropertyFilters {
  address?: string
  city?: string
  bedrooms?: string
  category?: string
  area?: string
  minPrice?: number
  maxPrice?: number
  guest_no?: string | number
  amenities?: string[]
  roomType?: string
  search?: string
}

export interface PropertyApiParams {
  limit?: number
  page?: number
  activeStatus?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: PropertyFilters
}
export interface Property {
  _id: string
  id?: string
  title?: string
  name?: string
  nickname?: string
  description?: string
  address?: {
    address?: string
    latitude?: number
    longitude?: number
  } | string
  city?: string
  bedrooms?: string | number
  category?: string
  size?: number
  area?: number
  price?: number
  originalPrice?: number
  breakfastPrice?: number
  photos?: Array<{
    category?: string
    url: string
    _id?: string
  }> | string[]
  amenities?: string[]
  createdAt?: string
  [key: string]: any
}

export interface PropertyApiResponse {
  statusCode: number
  data: {
    properties: Property[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
  message: string
  [key: string]: any
}

// Curated actual rooms database for Seven Seas Hotel Dubai
const curatedProperties: Property[] = [
  {
    _id: '69487bfdef489742dc309150',
    title: 'Executive Suite',
    name: 'Executive Suite',
    description: 'The Executive Suite offers a perfect blend of luxury and comfort, featuring a spacious living area, a king-sized bed, and a fully equipped kitchen. Enjoy stunning views of the Dubai skyline from your private balcony, providing an unparalleled experience of elegance and convenience.',
    price: 600,
    size: 915,
    area: 915,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 3,
    category: 'SIGNATURE',
    roomType: 'Executive Suite',
    amenities: ['Spacious Living Area', 'King-Sized Bed', 'Private Balcony', 'Free WiFi', 'Air Conditioning', 'Fully Equipped Kitchen', 'Dubai Skyline View', 'EV Charging'],
    photos: [{ url: '/accomodation/executive suites.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 8, totalRevenue: 4800 }
  },
  {
    _id: '69487bfdef489742dc309151',
    title: 'Premium King Room',
    name: 'Premium King Room',
    description: 'A luxurious king bed room featuring a spacious layout with a large, comfortable king-sized bed, designed to offer the perfect blend of relaxation and sophistication, along with modern amenities for an exceptional stay.',
    price: 300,
    size: 484,
    area: 484,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 2,
    category: 'PREMIUM',
    roomType: 'King Bed',
    amenities: ['King-Sized Bed', 'Modern Amenities', 'Luxury Design', 'Free WiFi', 'Air Conditioning', 'In-room Safe', 'Mini Bar', 'EV Charging'],
    photos: [{ url: '/accomodation/premium king.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 15, totalRevenue: 4500 }
  },
  {
    _id: '69487bfdef489742dc309152',
    title: 'Premium Twin Room',
    name: 'Premium Twin Room',
    description: 'A stylish twin room, elegantly furnished with two single beds, providing a serene and comfortable retreat for guests seeking both relaxation and convenience.',
    price: 300,
    size: 484,
    area: 484,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 2,
    category: 'PREMIUM',
    roomType: 'Twin Bed',
    amenities: ['Two Single Beds', 'Elegant Furnishings', 'Comfortable Retreat', 'Free WiFi', 'Air Conditioning', 'Satellite TV', 'In-room Safe', 'EV Charging'],
    photos: [{ url: '/accomodation/premium twin.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 6, totalRevenue: 1800 }
  },
  {
    _id: '69487bfdef489742dc309153',
    title: 'Premium City King',
    name: 'Premium City King',
    description: 'A luxurious king bed room with stunning city views, featuring a spacious layout and a comfortable king-sized bed, complemented by sophisticated decor and modern amenities for an unforgettable stay.',
    price: 350,
    size: 538,
    area: 538,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 2,
    category: 'PREMIUM',
    roomType: 'King Bed',
    amenities: ['City Views', 'King-Sized Bed', 'Sophisticated Decor', 'Free WiFi', 'Air Conditioning', 'Coffee Maker', 'Premium Channels', 'EV Charging'],
    photos: [{ url: '/accomodation/premium city king.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 12, totalRevenue: 4200 }
  },
  {
    _id: '69487bfdef489742dc309154',
    title: 'Premium City Twin',
    name: 'Premium City Twin',
    description: 'Featuring two single beds, offering more spacious accommodations with breathtaking city views, complemented by elegant furnishings and modern amenities for a truly comfortable and elevated stay.',
    price: 350,
    size: 538,
    area: 538,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 2,
    category: 'PREMIUM',
    roomType: 'Twin Bed',
    amenities: ['Two Single Beds', 'City Views', 'Elegant Furnishings', 'Free WiFi', 'Air Conditioning', 'Coffee Maker', 'Desk', 'EV Charging'],
    photos: [{ url: '/accomodation/premium city twin.jpeg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 4, totalRevenue: 1400 }
  },
  {
    _id: '69487bfdef489742dc309155',
    title: 'Premium Sea View King',
    name: 'Premium Sea View King',
    description: 'Wake up to refreshing views of the serene sea from your king-sized bed, where you can relax and unwind while enjoying the peaceful, scenic beauty right outside your window.',
    price: 400,
    size: 538,
    area: 538,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 2,
    category: 'PREMIUM',
    roomType: 'King Bed',
    amenities: ['Sea Views', 'King-Sized Bed', 'Serene Atmosphere', 'Free WiFi', 'Air Conditioning', 'Balcony/Terrace', 'Mini Fridge', 'EV Charging'],
    photos: [{ url: '/accomodation/premium sea view king.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 9, totalRevenue: 3600 }
  },
  {
    _id: '69487bfdef489742dc309156',
    title: 'Deluxe Family 2 Queen Bed',
    name: 'Deluxe Family 2 Queen Bed',
    description: 'Our Deluxe Family Room features two spacious queen-sized beds, perfect for a restful stay. Ideal for families, this room offers plenty of space, modern amenities, and a comfortable setting for all.',
    price: 450,
    size: 645,
    area: 645,
    bedrooms: 2,
    washRoom: 1,
    guest_no: 4,
    category: 'DELUXE',
    roomType: 'Two Queen Beds',
    amenities: ['Two Queen Beds', 'Family-Friendly', 'Spacious', 'Free WiFi', 'Air Conditioning', 'Refrigerator', 'LED TV', 'EV Charging'],
    photos: [{ url: '/accomodation/delux family 2 queen bed.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 10, totalRevenue: 4500 }
  },
  {
    _id: '69487bfdef489742dc309157',
    title: 'Deluxe Balcony King',
    name: 'Deluxe Balcony King',
    description: 'A luxurious balcony room with a king-sized bed, offering a private outdoor space with stunning city and stadium, combining comfort, elegance, and modern amenities for an unforgettable stay.',
    price: 420,
    size: 592,
    area: 592,
    bedrooms: 1,
    washRoom: 1,
    guest_no: 2,
    category: 'DELUXE',
    roomType: 'King Bed',
    amenities: ['Private Balcony', 'King-Sized Bed', 'City & Stadium Views', 'Free WiFi', 'Air Conditioning', 'Bathrobe & Slippers', 'Espresso Machine', 'EV Charging'],
    photos: [{ url: '/accomodation/delux balcony king.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 5, totalRevenue: 2100 }
  },
  {
    _id: '69487bfdef489742dc309158',
    title: 'Royal Suite',
    name: 'Royal Suite',
    description: 'The Presidential Suite is the hotel\'s largest and most luxurious room, featuring expansive living areas, a private balcony with stunning views of the Dubai skyline, offering the ultimate in comfort and sophistication.',
    price: 1200,
    size: 1290,
    area: 1290,
    bedrooms: 2,
    washRoom: 2,
    guest_no: 4,
    category: 'ROYAL',
    roomType: 'King Beds',
    amenities: ['Largest Suite', 'Expansive Living Areas', 'Panoramic Views', 'Free WiFi', 'Air Conditioning', 'Kitchenette', 'Jacuzzi Bath', 'Private Butler Service', 'EV Charging'],
    photos: [{ url: '/accomodation/royal suit.jpg' }],
    createdAt: '2024-01-01T00:00:00.000Z',
    parking: 'Free Parking',
    Check_in_time: '15:00',
    Check_out_time: '12:00',
    bookingInfo: { totalBookings: 7, totalRevenue: 8400 }
  }
];

/**
 * Fetches properties from the Seven Seas Hotel Dubai local/mock database
 * Supports client-side sorting, filtering, and search options.
 */
export async function fetchProperties(params: PropertyApiParams = {}): Promise<PropertyApiResponse> {
  const {
    limit = 100,
    page = 1,
    sortBy = 'sno',
    sortOrder = 'asc',
    filters = {},
  } = params;

  let result = [...curatedProperties];

  // Apply filters
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (prop) =>
        prop.title?.toLowerCase().includes(searchLower) ||
        prop.description?.toLowerCase().includes(searchLower) ||
        prop.category?.toLowerCase().includes(searchLower)
    );
  }

  if (filters.category) {
    result = result.filter(
      (prop) => prop.category?.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((prop) => (prop.price || 0) >= (filters.minPrice || 0));
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((prop) => (prop.price || 0) <= (filters.maxPrice || 0));
  }

  if (filters.guest_no !== undefined) {
    const guestsNeeded = parseInt(filters.guest_no.toString()) || 0;
    result = result.filter((prop) => (prop.guest_no || 0) >= guestsNeeded);
  }

  if (filters.bedrooms !== undefined) {
    const roomsNeeded = parseInt(filters.bedrooms.toString()) || 0;
    result = result.filter((prop) => {
      const bedrooms = typeof prop.bedrooms === 'string' ? parseInt(prop.bedrooms) || 1 : prop.bedrooms || 1;
      return bedrooms >= roomsNeeded;
    });
  }

  // Apply sorting
  result.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'price') {
      comparison = (a.price || 0) - (b.price || 0);
    } else if (sortBy === 'size' || sortBy === 'area') {
      comparison = (a.size || a.area || 0) - (b.size || b.area || 0);
    } else {
      comparison = curatedProperties.indexOf(a) - curatedProperties.indexOf(b);
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedResult = result.slice(startIndex, startIndex + limit);

  const normalizedProperties = paginatedResult.map((prop) => ({
    ...prop,
    id: prop._id,
    name: prop.title,
  }));

  return {
    statusCode: 200,
    data: {
      properties: normalizedProperties,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    },
    message: 'Properties fetched successfully',
  };
}

/**
 * Fetches a single property by ID from the local curated database
 * @param propertyId - The ID of the property to fetch
 * @returns Promise with the property data
 */
export async function fetchPropertyById(propertyId: string): Promise<Property | null> {
  const property = curatedProperties.find(
    (prop) => prop._id === propertyId
  );
  return property ? { ...property, id: property._id } : null;
}

/**
 * Fetches a single property by slug from the curated database
 * @returns Promise with the property data
 */
export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const embeddedId = idFromSlug(slug);
    if (embeddedId) {
      return fetchPropertyById(embeddedId);
    }

    if (/^[a-f0-9]{24}$/.test(slug)) {
      return fetchPropertyById(slug);
    }

    const response = await fetchProperties({ limit: 100, page: 1 });
    const property = response.data?.properties?.find(
      (prop) => makeRoomSlug(prop) === slug
    );
    return property || null;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    throw error;
  }
}
