'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Search, Filter, Star, MapPin, Store, Utensils, Calendar } from 'lucide-react';
import { getPublicAddons, getCategories, getPublicVendors, type PublicAddon } from '@/lib/addonService';
import Navigation from '@/components/Navigation';

export default function AddonsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedVendor, setSelectedVendor] = useState('all');
    const [page, setPage] = useState(1);

    // Fetch Categories
    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    // Fetch Vendors
    const { data: vendorsData } = useQuery({
        queryKey: ['publicVendors'],
        queryFn: getPublicVendors,
    });

    // Fetch Addons
    const { data: addonsData, isLoading } = useQuery({
        queryKey: ['publicAddons', { page, search: searchTerm, category: selectedCategory, vendor: selectedVendor }],
        queryFn: () => getPublicAddons({
            page,
            limit: 12,
            search: searchTerm || undefined,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            // Assuming getPublicAddons can handle 'vendor' if I add it to the interface or param construction
            // I need to update getPublicAddons in service to pass 'vendor' param
            // I'll update the service call in a moment to ensure it passes 'vendor'
            // For now, let's assume I update the service signature below or in parallel
            ...((selectedVendor !== 'all') ? { vendor: selectedVendor } : {}) as any
        }),
    });

    const addons = addonsData?.data?.addons || [];
    const pagination = addonsData?.data?.pagination;
    const categories = categoriesData?.data || [];
    const vendors = vendorsData?.data || [];

    const categoryOptions = [
        { value: 'all', label: 'All Experiences', icon: Star },
        { value: 'food_beverage', label: 'Dining & Promotions', icon: Utensils },
        { value: 'spa_wellness', label: 'Spa & Wellness', icon: Star },
        { value: 'activities', label: 'Activities', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/Punjabi-Dhba-1.png')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Discover Hotel Experiences
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
                        Explore dining promotions, spa treatments, and exclusive activities from our premium partners.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-2 flex gap-2 border border-white/20 shadow-2xl">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for events, dining, or services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                            />
                        </div>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-800">
                                <Filter className="w-5 h-5 text-amber-500" />
                                Filters
                            </h3>

                            {/* Categories */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-700 mb-3 uppercase text-xs tracking-wider">Categories</h4>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'all'
                                            ? 'bg-amber-50 text-amber-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Star className={`w-4 h-4 mr-3 ${selectedCategory === 'all' ? 'text-amber-500' : 'text-gray-400'}`} />
                                        All Experiences
                                    </button>
                                    {categories.map((cat: any) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.slug
                                                ? 'bg-amber-50 text-amber-700 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full mr-4 ${selectedCategory === cat.slug ? 'bg-amber-500' : 'bg-gray-300'}`} />
                                            <span className="flex-1 text-left">{cat.name}</span>
                                            <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-400">
                                                {cat.addonCount}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Vendors Filter */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-700 mb-3 uppercase text-xs tracking-wider">Partners & Venues</h4>
                                <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-thin">
                                    <button
                                        onClick={() => setSelectedVendor('all')}
                                        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all ${selectedVendor === 'all'
                                            ? 'bg-amber-50 text-amber-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Store className={`w-4 h-4 mr-3 ${selectedVendor === 'all' ? 'text-amber-500' : 'text-gray-400'}`} />
                                        All Venues
                                    </button>
                                    {vendors.map((vendor: any) => (
                                        <button
                                            key={vendor._id}
                                            onClick={() => setSelectedVendor(vendor._id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all truncate flex items-center ${selectedVendor === vendor._id
                                                ? 'bg-amber-50 text-amber-700 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`w-2 h-2 rounded-sm mr-3 ${selectedVendor === vendor._id ? 'bg-amber-500 shadow-sm' : 'bg-gray-200'}`} />
                                            {vendor.restaurantName || vendor.fullName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Addons Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {pagination?.total || 0} Experiences Found
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Showing page {page} of {pagination?.totalPages || 1}</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse p-4">
                                        <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : addons.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-200">
                                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No experiences found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search term.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedVendor('all'); }}
                                    className="mt-6 text-amber-600 font-semibold hover:text-amber-700 hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {addons.map((addon: any) => (
                                    <Link key={addon._id} href={`/addons/${addon._id}`}>
                                        <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col overflow-hidden">
                                            {/* Image Container */}
                                            <div className="relative h-56 overflow-hidden">
                                                {addon.images?.[0] ? (
                                                    <img
                                                        src={addon.images[0].url}
                                                        alt={addon.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 flex gap-2">
                                                    {addon.featured && (
                                                        <span className="bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
                                                            Featured
                                                        </span>
                                                    )}
                                                    {addon.category === 'food_beverage' && (
                                                        <span className="bg-white/90 backdrop-blur text-gray-800 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
                                                            Dining
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Price Tag */}
                                                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-lg shadow-lg">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-sm font-semibold text-gray-900">{addon.pricing.currency}</span>
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {addon.pricing.discountedPrice || addon.pricing.basePrice}
                                                        </span>
                                                        {addon.pricing.discountedPrice && (
                                                            <span className="text-xs text-gray-500 line-through ml-1">
                                                                {addon.pricing.basePrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <div className="mb-2">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-bold text-gray-800">{addon.stats?.averageRating?.toFixed(1) || 'New'}</span>
                                                        <span className="text-xs text-gray-400">({addon.stats?.totalReviews || 0} reviews)</span>
                                                    </div>
                                                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-amber-600 transition-colors">
                                                        {addon.name}
                                                    </h3>
                                                </div>

                                                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
                                                    {addon.shortDescription}
                                                </p>

                                                {/* Meta Details */}
                                                <div className="space-y-2 mt-auto pt-4 border-t border-gray-50">
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Store className="w-4 h-4 mr-2 text-gray-400" />
                                                        <span className="truncate max-w-[200px] font-medium text-gray-700">
                                                            {addon.vendor?.restaurantName || addon.vendor?.fullName || "Hotel Service"}
                                                        </span>
                                                    </div>
                                                    {(addon.property?.location || addon.vendor?.location) && (
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span className="truncate max-w-[200px]">
                                                                {addon.property?.location || "Main Property"}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-12">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition shadow-sm"
                                >
                                    Previous
                                </button>
                                {[...Array(pagination.totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition shadow-sm ${page === i + 1
                                            ? 'bg-amber-500 text-white font-bold'
                                            : 'bg-white border hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                    disabled={page === pagination.totalPages}
                                    className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition shadow-sm"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
