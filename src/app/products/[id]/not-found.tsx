'use client';

import { PageLayout } from '@/components';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg 
              className="w-24 h-24 text-gray-600 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
            <h1 className="text-4xl font-heading text-white mb-4">PRODUCT NOT FOUND</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              The product you're looking for doesn't exist or may have been removed from our underground collection.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/products"
              className="inline-block bg-red-500 text-white px-8 py-3 font-medium hover:bg-red-600 transition-colors"
            >
              BROWSE ALL PRODUCTS
            </Link>
            <div className="block">
              <Link 
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
