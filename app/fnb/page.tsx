'use client';

import { useQuery } from '@tanstack/react-query';
import { Star, MapPin, Store, Utensils, ArrowRight, ExternalLink } from 'lucide-react';
import axios from 'axios';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'x-organisation': process.env.NEXT_PUBLIC_ORGANIZATION || 'sevenseas'
    },
});

export default function FnBPage() {
    const { data: vendorsData, isLoading } = useQuery({
        queryKey: ['publicVendorsShowcase'],
        queryFn: async () => {
            const response = await api.get('/api/v1/fb-admin/showcase');
            return response.data;
        },
    });

    const vendors = vendorsData?.data || [];

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/Punajbi-Dhba-1.png"
                        alt="Fine Dining"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Our Culinary Partners</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Experience the finest dining destinations curated by Seven Seas. From traditional flavors to contemporary fusion.
                    </p>
                </div>
            </div>

            {/* Partners Grid */}
            <div className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <span className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">World Class Experience</span>
                    <h2 className="text-4xl font-serif text-gray-900">Featured Establishments</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-80 bg-gray-100 rounded-2xl mb-6" />
                                <div className="h-6 bg-gray-100 w-3/4 mb-4" />
                                <div className="h-4 bg-gray-100 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : vendors.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <Utensils className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800">No partners featured yet</h3>
                        <p className="text-gray-500">Check back soon for our curated selection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {vendors.map((vendor: any) => (
                            <Link
                                href={`/fnb/${vendor._id}`}
                                key={vendor._id}
                                className="group cursor-pointer block"
                            >
                                <div className="relative h-[450px] overflow-hidden rounded-3xl mb-8 group-hover:shadow-2xl transition-all duration-500 ring-1 ring-gray-100">
                                    <img
                                        src={vendor.coverImage || vendor.profileImg || "/restaurant-placeholder.jpg"}
                                        alt={vendor.restaurantName}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    {/* Logo Overlay */}
                                    <div className="absolute top-6 left-6 w-20 h-20 bg-white rounded-2xl p-2 shadow-xl">
                                        <img
                                            src={vendor.logo || vendor.profileImg || "/logo-placeholder.png"}
                                            alt="Logo"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                                {vendor.cuisine || "Exquisite Dining"}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-serif text-white mb-2">{vendor.restaurantName || "Exclusive Partner"}</h3>
                                        <p className="text-gray-300 text-sm mb-6 line-clamp-2 font-light">
                                            {vendor.vendorBio || "Experience unparalleled service and exquisite flavors at our select partner location."}
                                        </p>

                                        <div className="inline-flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase border-b-2 border-amber-500 pb-1 group-hover:text-amber-500 transition-colors">
                                            Explore Venue <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-serif text-white mb-8">Want to become a Partner?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
                        Join Middle East's most exclusive hospitality network and showcase your services to thousands of guests.
                    </p>
                    <Link
                        href="/auth/fb/register"
                        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20"
                    >
                        Register your Business
                    </Link>
                </div>
            </div>
        </div>
    );
}
