'use client';

import { useQuery } from '@tanstack/react-query';
import {
    Linkedin,
    Twitter,
    Instagram,
    ArrowRight,
    Quote,
    Award,
    Star,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navigation from '@/components/Navigation';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        'x-organisation': process.env.NEXT_PUBLIC_ORGANIZATION || 'sevenseas'
    },
});

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function TeamPage() {
    const { data: staffData, isLoading } = useQuery({
        queryKey: ['publicStaff'],
        queryFn: async () => {
            const response = await api.get('/api/v1/staff');
            return response.data;
        },
    });

    const teamMembers = staffData?.data || [];

    return (
        <div className="min-h-screen bg-stone-50 overflow-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-stone-900">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/Punajbi-Dhba-1.png"
                        alt="Luxury background"
                        className="w-full h-full object-cover scale-110 grayscale"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/60 to-stone-50" />

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block">The Custodians of Luxury</span>
                        <h1 className="text-6xl md:text-8xl font-serif text-stone-100 mb-8 tracking-tight">
                            Meet Our <br /><span className="italic text-stone-400">Distinguished</span> Team
                        </h1>
                        <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            The visionaries behind Dubai's most exclusive hospitality experiences, dedicated to the art of flawless service.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Showcase */}
            <section className="container mx-auto px-4 md:px-24 py-32 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
                >
                    {isLoading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse space-y-8">
                                <div className="aspect-[3/4] bg-stone-200 rounded-[3rem]" />
                                <div className="h-4 bg-stone-200 w-1/4 mx-auto" />
                                <div className="h-8 bg-stone-200 w-3/4 mx-auto" />
                            </div>
                        ))
                    ) : teamMembers.map((member: any) => (
                        <motion.div
                            key={member._id}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] mb-10">
                                {/* Decorative elements */}
                                <div className="absolute -inset-4 border border-amber-500/10 rounded-[4rem] group-hover:border-amber-500/30 transition-colors duration-700" />

                                <div className="relative h-full w-full overflow-hidden rounded-[3.5rem] shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-700" />

                                    {/* Social Overlay */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {member.socialLinks?.linkedin && (
                                            <a href={member.socialLinks.linkedin} className="text-white hover:text-amber-500 transition-colors">
                                                <Linkedin className="w-5 h-5 fill-current" />
                                            </a>
                                        )}
                                        {member.socialLinks?.twitter && (
                                            <a href={member.socialLinks.twitter} className="text-white hover:text-amber-500 transition-colors">
                                                <Twitter className="w-5 h-5 fill-current" />
                                            </a>
                                        )}
                                        {member.socialLinks?.instagram && (
                                            <a href={member.socialLinks.instagram} className="text-white hover:text-amber-500 transition-colors">
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center group">
                                <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-3 block opacity-60 group-hover:opacity-100 transition-opacity">
                                    {member.designation}
                                </span>
                                <h3 className="text-3xl font-serif text-stone-800 mb-6 group-hover:text-amber-700 transition-colors">
                                    {member.name}
                                </h3>

                                <div className="relative inline-block">
                                    <Quote className="w-12 h-12 text-amber-500/10 absolute -top-4 -left-6" />
                                    <p className="text-stone-500 font-light leading-relaxed max-w-xs mx-auto text-sm italic py-4">
                                        "{member.story || "Committed to delivering unparalleled hospitality and creating timeless memories for every guest."}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {teamMembers.length === 0 && !isLoading && (
                    <div className="text-center py-40">
                        <Sparkles className="w-12 h-12 text-stone-200 mx-auto mb-6" />
                        <h2 className="text-stone-400 font-serif text-2xl italic">Our team collection is being curated...</h2>
                    </div>
                )}
            </section>

            {/* Philosophy Section */}
            <section className="bg-stone-100 py-32 border-t border-stone-200">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-3 text-amber-600 mb-8">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-10">Our Service Philosophy</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-16 px-6">
                        "Luxury is not a status, it is a standard of care. Our team is trained to anticipate needs before they are felt, ensuring an experience that is as seamless as it is spectacular."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="p-8">
                            <h4 className="font-serif text-2xl mb-4 text-stone-800">Intuitive Service</h4>
                            <p className="text-stone-500 text-sm leading-relaxed">Anticipating your every requirement with discreet precision.</p>
                        </div>
                        <div className="p-8 border-x border-stone-200">
                            <h4 className="font-serif text-2xl mb-4 text-stone-800">Local Expertise</h4>
                            <p className="text-stone-500 text-sm leading-relaxed">Masters of the Dubai landscape, unlocking exclusive access for you.</p>
                        </div>
                        <div className="p-8">
                            <h4 className="font-serif text-2xl mb-4 text-stone-800">Unwavering Integrity</h4>
                            <p className="text-stone-500 text-sm leading-relaxed">Upholding the highest standards of trust and professional excellence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-stone-900 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/Punajbi-Dhba-1.png')] opacity-10 bg-fixed" />
                <div className="relative z-10">
                    <h2 className="text-stone-100 text-4xl font-serif mb-8">Join the Seven Seas Family</h2>
                    <p className="text-stone-400 mb-12 max-w-xl mx-auto px-6">We are always seeking exceptional talent to join our elite hospitality team.</p>
                    <button className="px-12 py-5 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-amber-600/20">
                        Explore Careers
                    </button>
                </div>
            </section>
        </div>
    );
}
