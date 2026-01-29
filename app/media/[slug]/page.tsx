'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
    Calendar,
    User,
    ArrowLeft,
    Share2,
    Bookmark,
    Clock,
    Tag,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        'x-organisation': process.env.NEXT_PUBLIC_ORGANIZATION || 'sevenseas'
    },
});

export default function MediaDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const { data: postData, isLoading } = useQuery({
        queryKey: ['mediaPost', slug],
        queryFn: async () => {
            const response = await api.get(`/api/v1/media/${slug}`);
            return response.data;
        },
        enabled: !!slug
    });

    const post = postData?.data;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="space-y-8 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-amber-100 rounded-full" />
                        <div className="absolute inset-0 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-stone-400 font-light tracking-widest uppercase text-xs">Curating Majesty...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <h1 className="text-9xl font-black text-stone-100 mb-8">404</h1>
                <h2 className="text-3xl font-serif text-stone-900 mb-6">The story has vanished</h2>
                <button
                    onClick={() => router.push('/media')}
                    className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl"
                >
                    Return to Library
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section with Parallax Effect */}
            <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-stone-950/20 to-stone-950/40" />

                <div className="absolute inset-0 flex flex-col justify-end pb-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-2 text-white/80 text-xs font-medium tracking-wide">
                                    <Clock className="w-3.5 h-3.5" />
                                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-serif leading-tight drop-shadow-2xl">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50 shadow-xl">
                                        <img
                                            src={post.author?.profileImg || `https://ui-avatars.com/api/?name=${post.author?.fullName || 'SS'}&background=d97706&color=fff`}
                                            alt={post.author?.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Authored by</p>
                                        <p className="text-sm font-semibold">{post.author?.fullName || 'Seven Seas Editorial'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-24">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="prose prose-stone prose-lg max-w-none"
                        >
                            {/* Rich Content Rendering */}
                            <div
                                className="text-stone-700 leading-relaxed font-light space-y-8"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </motion.div>

                        {/* Tags & Meta */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-16 pt-12 border-t border-stone-100 flex flex-wrap gap-3">
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className="flex items-center gap-2 px-5 py-2.5 bg-stone-50 text-stone-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-32 space-y-12">
                            {/* Action Card */}
                            <div className="bg-stone-50 rounded-[2.5rem] p-10 border border-stone-100 shadow-sm">
                                <h3 className="text-lg font-bold text-stone-900 mb-6 font-serif">Share this Discovery</h3>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:text-amber-600 transition-all font-black text-[10px] uppercase tracking-widest text-stone-400 group">
                                        Copy Secret Link
                                        <Share2 className="w-4 h-4 text-stone-200 group-hover:text-amber-500 transition-colors" />
                                    </button>
                                    <button className="w-full flex items-center justify-between px-6 py-4 bg-stone-900 text-white rounded-2xl hover:bg-amber-600 transition-all font-black text-[10px] uppercase tracking-widest group">
                                        Save for later
                                        <Bookmark className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* Event Details if category is Event */}
                            {post.category === 'Event' && post.eventDate && (
                                <div className="bg-amber-600 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-amber-600/20 overflow-hidden relative">
                                    <Sparkles className="absolute -top-4 -right-4 w-32 h-32 opacity-10" />
                                    <h3 className="text-lg font-bold mb-6 font-serif">Event Information</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Date & Time</p>
                                                <p className="text-sm font-semibold">{format(new Date(post.eventDate), 'MMMM d, yyyy')}</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-white text-amber-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                                            Request RSVP
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-4 text-stone-400 hover:text-stone-900 transition-colors px-4 group"
                            >
                                <div className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center group-hover:border-stone-900 transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Return to Archives</span>
                            </button>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
        </main>
    );
}
