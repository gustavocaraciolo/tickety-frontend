"use client";

const CategoryCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow animate-pulse">
            {/* Icon and title skeleton */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                    <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-6">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
    );
};

export default CategoryCardSkeleton;

