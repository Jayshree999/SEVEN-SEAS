'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
    Newspaper,
    Calendar,
    ArrowRight,
    ChevronRight,
    Star,
    Layout,
    TrendingUp,
    Sparkles,
    Search,
    Filter
} from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        'x-organisation': process.env.NEXT_PUBLIC_ORGANIZATION || 'sevenseas'
    },
});

export default function MediaPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const { data: mediaData, isLoading } = useQuery({
        queryKey: ['publicMedia', { category: selectedCategory }],
        queryFn: async () => {
            const params: any = {};
            if (selectedCategory !== 'all') params.category = selectedCategory;
            const response = await api.get('/api/v1/media', { params });
            return response.data;
        }
    });

    const posts = mediaData?.data?.posts || [];
    const featuredPost = posts.find((p: any) => p.isFeatured) || posts[0];
    const regularPosts = posts.filter((p: any) => p._id !== featuredPost?._id);

    const categories = ['all', 'Blog', 'Event', 'News', 'Highlight'];

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            {/* Premium Hero Section */}
            <div className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-white" />

                {/* Decorative background elements */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-amber-100/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-100/30 blur-[100px] rounded-full" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-amber-100/50 shadow-sm"
                        >
                            <Sparkles className="w-3 h-3" />
                            Seven Seas Media
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 font-serif">
                            Stories of <span className="text-amber-600 italic">Elegance</span>
                        </h1>
                        <p className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto font-light">
                            Discover the latest highlights, exclusive events, and luxury lifestyles curated by the Seven Seas family.
                        </p>
                    </motion.div>

                    {/* Featured Post Card - Large & Premium */}
                    <AnimatePresence mode="wait">
                        {featuredPost && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl group mb-20 ring-1 ring-stone-200"
                            >
                                <img
                                    src={featuredPost.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                                    alt={featuredPost.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row items-end justify-between gap-8">
                                    <div className="max-w-2xl">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                                Featured Story
                                            </span>
                                            <span className="text-stone-300 text-xs font-medium uppercase tracking-[0.1em] flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                {format(new Date(featuredPost.createdAt), 'MMMM d, yyyy')}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif group-hover:text-amber-400 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-stone-300 line-clamp-2 text-lg font-light leading-relaxed mb-8">
                                            {featuredPost.excerpt}
                                        </p>
                                        <Link href={`/media/${featuredPost.slug}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:bg-amber-500 hover:text-white transition-all"
                                            >
                                                Read Full Story
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedCategory === cat
                                            ? 'bg-stone-900 text-white border-stone-900 shadow-xl'
                                            : 'bg-white text-stone-400 border-stone-100 hover:border-amber-200 hover:text-amber-600'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-amber-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search our archives..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-200 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse space-y-4">
                                    <div className="aspect-[4/5] bg-stone-100 rounded-[2.5rem]" />
                                    <div className="h-4 bg-stone-100 w-1/4 rounded" />
                                    <div className="h-8 bg-stone-100 w-3/4 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
                            {posts.length > 0 ? (
                                posts.map((post: any) => (
                                    <motion.article
                                        key={post._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group cursor-pointer"
                                    >
                                        <Link href={`/media/${post.slug}`}>
                                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl ring-1 ring-stone-200">
                                                <img
                                                    src={post.image}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    alt={post.title}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                <div className="absolute top-6 left-6">
                                                    <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                        {post.category}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <button className="w-full bg-white text-stone-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                                                        Explore Story
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="px-2">
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-amber-600 mb-3">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {post.category} • {format(new Date(post.createdAt), 'MMM d, yyyy')}
                                                </div>
                                                <h3 className="text-2xl font-bold text-stone-900 mb-4 font-serif leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 font-light">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))
                            ) : (
                                <div className="col-span-full py-40 text-center">
                                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Layout className="w-8 h-8 text-stone-200" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-stone-400">Discoveries are on their way...</h3>
                                    <p className="text-stone-400 font-light mt-2">Check back soon for the latest updates.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
