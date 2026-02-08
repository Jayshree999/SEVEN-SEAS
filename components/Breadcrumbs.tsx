'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface Breadcrumb {
    label: string
    href: string
}

interface BreadcrumbsProps {
    customItems?: Breadcrumb[]
}

export default function Breadcrumbs({ customItems }: BreadcrumbsProps) {
    const pathname = usePathname()

    // Generate breadcrumbs from pathname or use custom items
    const breadcrumbs: Breadcrumb[] = customItems || generateBreadcrumbs(pathname)

    // Generate JSON-LD for BreadcrumbList
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.label,
            "item": `https://sevenseashotel.ae${crumb.href}`
        }))
    }

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="py-4 px-6 bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto max-w-7xl">
                    <ol className="flex items-center gap-2 flex-wrap">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1

                            return (
                                <motion.li
                                    key={crumb.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-center gap-2"
                                >
                                    {index > 0 && (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    )}

                                    {isLast ? (
                                        <span className="text-gray-900 font-semibold flex items-center gap-2">
                                            {index === 0 && <Home className="w-4 h-4" />}
                                            {crumb.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={crumb.href}
                                            className="text-amber-600 hover:text-amber-700 font-medium transition-colors flex items-center gap-2 hover:underline"
                                        >
                                            {index === 0 && <Home className="w-4 h-4" />}
                                            {crumb.label}
                                        </Link>
                                    )}
                                </motion.li>
                            )
                        })}
                    </ol>
                </div>
            </nav>
        </>
    )
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [
        { label: 'Home', href: '/' }
    ]

    // Split pathname and filter empty strings
    const paths = pathname.split('/').filter(Boolean)

    // Map of path segments to readable labels
    const labelMap: Record<string, string> = {
        'about-us': 'About Us',
        'rooms': 'Rooms & Suites',
        'facilities': 'Facilities',
        'location': 'Location',
        'services': 'Services',
        'dining': 'Dining',
        'wellness': 'Wellness & Spa',
        'mehfil-ballroom': 'Mehfil Ballroom',
        'events-3': 'Events & Celebrations',
        'contact': 'Contact Us',
        'faq': 'FAQ',
        'terms': 'Terms & Conditions',
        'privacy': 'Privacy Policy',
    }

    let currentPath = ''
    paths.forEach((path) => {
        currentPath += `/${path}`
        const label = labelMap[path] || formatLabel(path)
        breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
}

// Format path segment to readable label
function formatLabel(segment: string): string {
    return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
