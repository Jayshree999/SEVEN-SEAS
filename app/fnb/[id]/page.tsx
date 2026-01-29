'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Users,
    ArrowLeft,
    Calendar,
    ChevronRight,
    Star,
    ImageIcon
} from 'lucide-react';
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

export default function VendorPublicDetails() {
    const { id } = useParams();

    const { data: vendorData, isLoading } = useQuery({
        queryKey: ['publicVendorDetails', id],
        queryFn: async () => {
            const response = await api.get(`/api/v1/fb-admin/showcase/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    const vendor = vendorData?.data;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <div className="flex items-center justify-center h-[70vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                </div>
            </div>
        );
    }

    if (!vendor) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h2 className="text-3xl font-serif mb-4">Partner Not Found</h2>
                    <p className="text-gray-500 mb-8">The culinary destination you're looking for might have moved or is unavailable.</p>
                    <Link href="/fnb" className="text-amber-600 font-bold hover:underline inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to partners
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <Navigation />

            {/* Hero Brand Section */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <img
                    src={vendor.coverImage || "/restaurant-placeholder.jpg"}
                    alt={vendor.restaurantName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-black/20" />

                <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
                    <div className="container mx-auto">
                        <Link href="/fnb" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Collection</span>
                        </Link>

                        <div className="flex flex-col md:flex-row items-end gap-10">
                            <div className="w-48 h-48 bg-white rounded-[2.5rem] p-3 shadow-2xl flex-shrink-0">
                                <img
                                    src={vendor.logo || "/logo-placeholder.png"}
                                    alt="Brand Logo"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </div>
                            <div className="pb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1.5 bg-amber-600/20 backdrop-blur-md border border-amber-500/30 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        {vendor.cuisine || "Fine Dining"}
                                    </span>
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                                    </div>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight">
                                    {vendor.restaurantName}
                                </h1>
                                <p className="text-white/70 mt-6 max-w-2xl text-lg font-light leading-relaxed">
                                    Located in {vendor.location || "Seven Seas Elite Destinations"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 py-24">
                    {/* Main Content */}
                    <div className="lg:col-span-7 space-y-20">
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-600 mb-8">The Brand Experience</h2>
                            <p className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed italic border-l-8 border-amber-500 pl-10 py-4 mb-10">
                                "{vendor.description || "A culinary journey defined by perfection and elegance."}"
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-10 border-t border-gray-100">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Atmosphere</p>
                                    <p className="font-bold text-gray-900 text-lg">{vendor.cuisine || "Luxurious"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Capacity</p>
                                    <p className="font-bold text-gray-900 text-lg">{vendor.capacity || "Elite"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hours</p>
                                    <p className="font-bold text-gray-900 text-lg">{vendor.openingHours || "TBA"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Gallery */}
                        {vendor.galleryImages && vendor.galleryImages.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-600">Visual Portfolio</h2>
                                    <ImageIcon className="w-5 h-5 text-gray-200" />
                                </div>
                                <div className="columns-2 md:columns-3 gap-6 space-y-6">
                                    {vendor.galleryImages.map((img: string, i: number) => (
                                        <div key={i} className="overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ring-1 ring-gray-100 group">
                                            <img
                                                src={img}
                                                alt={`Gallery ${i}`}
                                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Booking/Contact Sidebar */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-12">
                            <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100 shadow-2xl">
                                <h3 className="text-3xl font-serif text-gray-900 mb-8 text-center">Plan your Visit</h3>

                                <div className="space-y-8 mb-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-lg border border-gray-100">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                            <p className="font-bold text-gray-800">{vendor.location || "Available upon request"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-lg border border-gray-100">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Operational Hours</p>
                                            <p className="font-bold text-gray-800">{vendor.openingHours || "Contact for details"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-lg border border-gray-100">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Concierge Line</p>
                                            <p className="font-bold text-gray-800">{vendor.contactPhone || "Call Reception"}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/addons?vendor=${vendor.id}`}
                                    className="block w-full text-center py-6 bg-gray-950 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-amber-600 transition-colors shadow-xl shadow-amber-600/10 active:scale-95 duration-200"
                                >
                                    Book an Experience
                                </Link>

                                <p className="text-gray-400 text-xs text-center mt-6 font-medium">
                                    Experience curated by Seven Seas Management Services
                                </p>
                            </div>

                            <div className="px-8 flex flex-col items-center">
                                <div className="flex items-center gap-2 text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                                    <Star className="w-3 h-3 fill-current" /> Exclusive Portfolio <Star className="w-3 h-3 fill-current" />
                                </div>
                                <p className="text-center text-gray-500 font-light leading-relaxed">
                                    Seven Seas partners are carefully vetted to ensure they meet the highest standards of hospitality and luxury dining globally.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
