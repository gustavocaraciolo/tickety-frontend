"use client";

const CarouselSkeleton = () => {
    return (
        <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            
            {/* Content skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="h-8 bg-gray-300 rounded-lg w-64 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                </div>
            </div>
            
            {/* Navigation dots skeleton */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                ))}
            </div>
        </div>
    );
};

export default CarouselSkeleton;

