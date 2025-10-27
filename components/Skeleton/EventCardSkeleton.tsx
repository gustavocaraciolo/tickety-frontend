"use client";

const EventCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-200"></div>
            
            {/* Content skeleton */}
            <div className="p-6">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                
                {/* Location and date skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                
                {/* Price skeleton */}
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                
                {/* Category badge skeleton */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                
                {/* Button skeleton */}
                <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;

