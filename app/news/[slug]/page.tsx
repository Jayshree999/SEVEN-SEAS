'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Tag, ChevronLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { newsItems } from '@/data/news'

interface PageProps {
  params: {
    slug: string
  }
}

export default function NewsDetailPage({ params }: PageProps) {
  console.log('NewsDetailPage rendered with slug:', params.slug)
  const newsItem = newsItems.find((item) => item.slug === params.slug)

  if (!newsItem) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={newsItem.image}
          alt={newsItem.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-8 pb-16 md:pb-24">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {newsItem.category}
                </span>
                <div className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                  <span>{newsItem.date}</span>
                </div>
              </div>
              
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {newsItem.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="relative z-10 -mt-24 md:-mt-32 bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-12 shadow-xl max-w-5xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/#news" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors mb-8 md:mb-12 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to News & Events</span>
          </Link>

          {/* Article Content */}
          <article 
            className="prose prose-lg md:prose-xl max-w-none text-gray-700"
          >
            {/* Using dangerouslySetInnerHTML to render the HTML content stored in data */}
            <div dangerouslySetInnerHTML={{ __html: newsItem.content! }} />
          </article>

          {/* Share / Tags Footer (Optional) */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Tag className="w-5 h-5" />
              <span className="font-medium">Tags:</span>
              <span className="text-amber-600 hover:underline cursor-pointer">{newsItem.category}</span>,
              <span className="text-amber-600 hover:underline cursor-pointer">Seven Seas</span>,
              <span className="text-amber-600 hover:underline cursor-pointer">Dubai</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
