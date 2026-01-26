"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Grid, Heart, Share, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toggleWatchlist } from "@/lib/user";
import { useAuth } from "@/contexts/AuthContext";
import { Property } from "@/lib/api";

interface PropertyGalleryProps {
  images?: Array<{ url: string; category?: string; _id?: string }> | string[];
  propertyData?: Property | null;
}

const getAllImagesFlattened = (images: any[]) => {
  return images.map((img: any) =>
    typeof img === "object" && img.url ? img.url : img,
  );
};

export function PropertyGallery({
  images = [],
  propertyData,
}: PropertyGalleryProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const { isAuth, user } = useAuth();

  // Normalize images array
  const normalizedImages = images.map((img: any) =>
    typeof img === "string" ? { url: img } : img,
  );

  const allImages = getAllImagesFlattened(normalizedImages);
  const displayImages = normalizedImages.slice(0, 5);
  const remainingCount = Math.max(0, normalizedImages.length - 5);

  const handleWishlistToggle = async () => {
    if (!propertyData?._id || !isAuth) return;

    try {
      setIsAnimating(true);
      const newSavedState = !isSaved;
      setIsSaved(newSavedState);

      await toggleWatchlist(
        propertyData._id,
        newSavedState ? "save" : "unsave",
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setIsSaved((prev) => !prev);
    } finally {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: propertyData?.title || propertyData?.name || "Property",
      text: `Check out this property: ${propertyData?.title || propertyData?.name}`,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n\nView property at: ${shareData.url}`,
        );
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const openImageModal = (image: any, index: number) => {
    const imageUrl = typeof image === "string" ? image : image.url;
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
    setShowAllPhotos(false);
  };

  const handleNextImage = () => {
    if (allImages.length <= 1) return;
    const nextIndex = (selectedImageIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
    setSelectedImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    if (allImages.length <= 1) return;
    const prevIndex =
      (selectedImageIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIndex]);
    setSelectedImageIndex(prevIndex);
  };

  // Lock body scroll when modals are open
  useEffect(() => {
    if (showAllPhotos || selectedImage) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [showAllPhotos, selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePreviousImage();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
        setSelectedImageIndex(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedImageIndex]);

  if (normalizedImages.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="relative px-0 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 sm:gap-2 h-[50vh] sm:h-[400px] md:h-[600px]">
          {displayImages[0] && (
            <div className="relative col-span-1 sm:col-span-2 sm:row-span-2 rounded-none sm:rounded-t-none sm:rounded-l-xl overflow-hidden">
              <Image
                src={displayImages[0]?.url || "/placeholder.svg"}
                alt="Property main image"
                fill
                className="object-cover cursor-pointer transition-transform hover:scale-105"
                onClick={() => openImageModal(displayImages[0], 0)}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {displayImages.slice(1).map((image: any, index: number) => (
            <div
              key={index}
              className={`hidden sm:block relative ${
                index === displayImages.length - 2
                  ? "rounded-tr-xl"
                  : index === displayImages.length - 1
                    ? "rounded-br-xl"
                    : ""
              }`}
            >
              <Image
                src={image?.url || "/placeholder.svg"}
                alt={`Property image ${index + 2}`}
                fill
                className="object-cover cursor-pointer transition-transform hover:scale-105"
                onClick={() => openImageModal(image, index + 1)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {index === displayImages.length - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    +{remainingCount} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 z-10">
          <button
            onClick={handleShare}
            className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white p-2 sm:p-2.5 transition-colors touch-manipulation"
            aria-label="Share"
          >
            <Share className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
          </button>
          {isAuth && (
            <button
              onClick={handleWishlistToggle}
              className={`bg-white/80 hover:bg-white transition-all duration-300 rounded-full p-2 sm:p-2.5 touch-manipulation ${
                isAnimating ? "scale-125" : "scale-100"
              }`}
              aria-label="Save to wishlist"
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                  isSaved ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>
          )}
        </div>

        {/* Show All Photos Button */}
        {normalizedImages.length > 5 && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg flex items-center touch-manipulation shadow-lg"
          >
            <Grid className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black" />
            <span className="text-black font-medium">Show all photos</span>
          </button>
        )}
      </div>

      {/* Show All Photos Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="relative w-full max-w-7xl h-full sm:h-[90vh] overflow-y-auto bg-white rounded-none sm:rounded-xl">
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b p-3 sm:p-4">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <h1 className="text-lg sm:text-2xl font-semibold">
                  All Photos
                </h1>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="rounded-full hover:bg-gray-100 p-2 touch-manipulation"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {normalizedImages.map((image: any, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => openImageModal(image, index)}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover transition duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => {
                setSelectedImage(null);
                setSelectedImageIndex(-1);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2.5 sm:p-3 touch-manipulation"
              aria-label="Close"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-50">
              <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                {selectedImageIndex + 1} / {allImages.length}
              </span>
            </div>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 sm:p-4 touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 sm:p-4 touch-manipulation"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Selected property image"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
