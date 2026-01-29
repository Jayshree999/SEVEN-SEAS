import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use((config) => {
    // Add organization header
    const organization = process.env.NEXT_PUBLIC_ORGANIZATION || 'sevenseas';
    config.headers.set('x-organisation', organization);

    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

// Addon Services
export interface PublicAddon {
    _id: string;
    name: string;
    description?: string;
    shortDescription?: string;
    category: string;
    shopName?: string;
    images: Array<{ url: string; caption?: string; isPrimary: boolean }>;
    pricing: {
        basePrice: number;
        discountedPrice?: number;
        currency: string;
        pricingType: string;
    };
    stats: {
        averageRating: number;
        totalReviews: number;
        totalBookings: number;
    };
    features: string[];
    highlights: string[];
    status: string;
    featured: boolean;
}

export const getPublicAddons = async (filters?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    vendor?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
}) => {
    const params = new URLSearchParams();
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
    }
    const response = await api.get(`/api/v1/addons/public?${params.toString()}`);
    return response.data;
};

export const getPublicAddonById = async (id: string) => {
    const response = await api.get(`/api/v1/addons/public/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get('/api/v1/addon-categories');
    return response.data;
};

export const checkAvailability = async (id: string, data: {
    date?: string;
    timeSlot?: { startTime: string; endTime: string };
    quantity?: number;
}) => {
    const response = await api.post(`/api/v1/addons/${id}/check-availability`, data);
    return response.data;
};

// Addon Booking Services
export const createAddonBooking = async (data: {
    addon: string;
    booking?: string;
    bookingDate: string;
    timeSlot?: { startTime: string; endTime: string };
    quantity: number;
    specialRequests?: string;
    deliveryLocation?: string;
}) => {
    const response = await api.post('/api/v1/addon-bookings/create', data);
    return response.data;
};

export const getMyAddonBookings = async (filters?: {
    page?: number;
    limit?: number;
    status?: string;
}) => {
    const params = new URLSearchParams();
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
    }
    const response = await api.get(`/api/v1/addon-bookings/my-bookings?${params.toString()}`);
    return response.data;
};

export const getAddonBookingById = async (id: string) => {
    const response = await api.get(`/api/v1/addon-bookings/my-bookings/${id}`);
    return response.data;
};

export const cancelAddonBooking = async (id: string, reason?: string) => {
    const response = await api.post(`/api/v1/addon-bookings/${id}/cancel`, { reason });
    return response.data;
};

export const completeAddonPayment = async (id: string) => {
    const response = await api.post(`/api/v1/addon-bookings/${id}/pay`);
    return response.data;
};

export const getPublicVendors = async () => {
    const response = await api.get('/api/v1/addons/public/vendors');
    return response.data;
};
