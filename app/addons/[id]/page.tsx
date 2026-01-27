'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Check, Calendar, Users, ArrowLeft, ShoppingCart } from 'lucide-react';
import { getPublicAddonById, createAddonBooking, checkAvailability } from '@/lib/addonService';
import { toast } from 'sonner';

export default function AddonDetailPage() {
    const params = useParams();
    const router = useRouter();
    const addonId = params.id as string;

    const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
    const [specialRequests, setSpecialRequests] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { data, isLoading } = useQuery({
        queryKey: ['addon', addonId],
        queryFn: () => getPublicAddonById(addonId),
        enabled: !!addonId,
    });

    const addon = data?.data;

    const bookingMutation = useMutation({
        mutationFn: createAddonBooking,
        onSuccess: (response: any) => {
            if (response.data && response.data.checkoutUrl) {
                toast.success('Redirecting to payment...');
                window.location.href = response.data.checkoutUrl;
            } else {
                toast.success('Booking created successfully!');
                router.push('/profile/addon-bookings');
            }
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create booking');
        },
    });

    const handleBooking = () => {
        if (!selectedDate) {
            toast.error('Please select a date');
            return;
        }

        bookingMutation.mutate({
            addon: addonId,
            bookingDate: selectedDate,
            timeSlot: selectedTimeSlot || undefined,
            quantity,
            specialRequests,
            deliveryLocation,
        });
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Loading...</p>
            </div>
        </div>;
    }

    if (!addon) {
        return <div className="min-h-screen flex items-center justify-center">
            <p>Addon not found</p>
        </div>;
    }

    const effectivePrice = addon.pricing.discountedPrice || addon.pricing.basePrice;
    const totalPrice = effectivePrice * quantity;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Services
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="relative h-96">
                                {addon.images?.[selectedImageIndex] && (
                                    <img
                                        src={addon.images[selectedImageIndex].url}
                                        alt={addon.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            {addon.images && addon.images.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto">
                                    {addon.images.map((img: any, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImageIndex(i)}
                                            className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${i === selectedImageIndex ? 'border-blue-600' : 'border-transparent'
                                                }`}
                                        >
                                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h1 className="text-3xl font-bold mb-2">{addon.name}</h1>
                            {addon.shopName && (
                                <p className="text-gray-600 mb-4">by {addon.shopName}</p>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{addon.stats.averageRating.toFixed(1)}</span>
                                    <span className="text-gray-500">({addon.stats.totalReviews} reviews)</span>
                                </div>
                                <div className="text-gray-500">
                                    {addon.stats.totalBookings} bookings
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <p className="text-gray-700 whitespace-pre-wrap">{addon.description}</p>
                            </div>
                        </div>

                        {/* Features */}
                        {addon.features && addon.features.length > 0 && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4">Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {addon.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Highlights */}
                        {addon.highlights && addon.highlights.length > 0 && (
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                                <ul className="space-y-2">
                                    {addon.highlights.map((highlight: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-blue-600 font-bold">•</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Booking Widget */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-1">
                                    {addon.pricing.discountedPrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-blue-600">
                                                {addon.pricing.currency} {addon.pricing.discountedPrice}
                                            </span>
                                            <span className="text-lg text-gray-400 line-through">
                                                {addon.pricing.currency} {addon.pricing.basePrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-blue-600">
                                            {addon.pricing.currency} {addon.pricing.basePrice}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">{addon.pricing.pricingType.replace('_', ' ')}</p>
                            </div>

                            {/* Date Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Time Slot Selection */}
                            {addon.availability?.timeSlots && addon.availability.timeSlots.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Time Slot</label>
                                    <select
                                        className="w-full border rounded px-3 py-2"
                                        onChange={(e) => {
                                            const slot = addon.availability.timeSlots[parseInt(e.target.value)];
                                            setSelectedTimeSlot(slot);
                                        }}
                                    >
                                        <option value="">Select time</option>
                                        {addon.availability.timeSlots.map((slot: any, i: number) => (
                                            <option key={i} value={i}>
                                                {slot.startTime} - {slot.endTime}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Quantity
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(addon.bookingRules?.minQuantity || 1, quantity - 1))}
                                        className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Delivery Location */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Room Number (Optional)</label>
                                <input
                                    type="text"
                                    value={deliveryLocation}
                                    onChange={(e) => setDeliveryLocation(e.target.value)}
                                    placeholder="e.g., Room 305"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Special Requests */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                                <textarea
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    rows={3}
                                    placeholder="Any special requirements..."
                                    className="w-full border rounded px-3 py-2 resize-none"
                                />
                            </div>

                            {/* Total Price */}
                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>{addon.pricing.currency} {totalPrice}</span>
                                </div>
                                {!addon.pricing.includesTax && (
                                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                                        <span>Tax ({addon.pricing.taxRate}%):</span>
                                        <span>{addon.pricing.currency} {(totalPrice * addon.pricing.taxRate / 100).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span className="text-blue-600">
                                        {addon.pricing.currency} {addon.pricing.includesTax ? totalPrice : (totalPrice * (1 + addon.pricing.taxRate / 100)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Book Button */}
                            <button
                                onClick={handleBooking}
                                disabled={bookingMutation.isPending || !selectedDate}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {bookingMutation.isPending ? 'Booking...' : 'Book Now'}
                            </button>

                            {/* Cancellation Policy */}
                            {addon.bookingRules?.cancellationPolicy && (
                                <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                    <p className="font-medium mb-1">Cancellation Policy</p>
                                    <p className="text-gray-600">{addon.bookingRules.cancellationPolicy}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
