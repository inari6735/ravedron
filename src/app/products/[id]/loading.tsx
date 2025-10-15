'use client';

import { PageLayout } from '@/components';

export default function ProductLoading() {
  return (
    <PageLayout>
      {/* Breadcrumb Skeleton */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-10 h-4 bg-gray-800 animate-pulse rounded"></div>
            <span className="text-gray-600">/</span>
            <div className="w-16 h-4 bg-gray-800 animate-pulse rounded"></div>
            <span className="text-gray-600">/</span>
            <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              {/* Main Image Skeleton */}
              <div className="aspect-square bg-gray-800 animate-pulse rounded-lg"></div>
              
              {/* Thumbnail Images Skeleton */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-800 animate-pulse rounded"></div>
                ))}
              </div>
            </div>

            {/* Product Information Skeleton */}
            <div className="space-y-6">
              {/* SKU */}
              <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
              
              {/* Title */}
              <div className="space-y-2">
                <div className="w-3/4 h-8 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-1/2 h-6 bg-gray-800 animate-pulse rounded"></div>
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-4">
                <div className="w-32 h-10 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-20 h-6 bg-gray-800 animate-pulse rounded-full"></div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="w-24 h-5 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-3/4 h-4 bg-gray-800 animate-pulse rounded"></div>
              </div>

              {/* Size Selection Skeleton */}
              <div className="space-y-3">
                <div className="w-12 h-5 bg-gray-800 animate-pulse rounded"></div>
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-800 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>

              {/* Color Selection Skeleton */}
              <div className="space-y-3">
                <div className="w-14 h-5 bg-gray-800 animate-pulse rounded"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-16 h-10 bg-gray-800 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart Skeleton */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="w-20 h-5 bg-gray-800 animate-pulse rounded"></div>
                  <div className="w-32 h-12 bg-gray-800 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-14 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-20 h-4 bg-gray-800 animate-pulse rounded"></div>
              </div>

              {/* Additional Info Skeleton */}
              <div className="border-t border-gray-800 pt-6 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-48 h-4 bg-gray-800 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="mt-16 border-t border-gray-800 pt-16">
            {/* Tab Navigation Skeleton */}
            <div className="flex border-b border-gray-800 space-x-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-24 h-8 bg-gray-800 animate-pulse rounded"></div>
              ))}
            </div>
            
            {/* Tab Content Skeleton */}
            <div className="py-8 space-y-4">
              <div className="w-48 h-8 bg-gray-800 animate-pulse rounded"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                <div className="w-2/3 h-4 bg-gray-800 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
