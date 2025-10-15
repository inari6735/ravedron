'use client'

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useProducts } from '@/hooks/useShopware';
import { useRef } from 'react';

interface ProductGridProps {
  products?: Product[]; // Made optional since we'll fetch from Shopware
  title?: string;
  limit?: number;
}

export default function ProductGrid({ products: fallbackProducts, title = "Featured Products", limit = 8 }: ProductGridProps) {
  const { data: productsData, isLoading: loading, error } = useProducts({ limit });
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Extract products from the API response
  const shopwareProducts = productsData?.products || [];
  
  // Use Shopware products if available, otherwise fallback to provided products
  const products = shopwareProducts.length > 0 ? shopwareProducts : fallbackProducts || [];

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.clientWidth || 300;
      const gap = 16; // 1rem gap
      sliderRef.current.scrollBy({ left: -(cardWidth + gap) * 2, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.clientWidth || 300;
      const gap = 16; // 1rem gap
      sliderRef.current.scrollBy({ left: (cardWidth + gap) * 2, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 px-6 lg:px-8 bg-black">
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading text-white">{title}</h2>
          <a 
            href="/products" 
            className="text-red-500 hover:text-red-400 transition-colors font-medium text-sm tracking-wider"
          >
            VIEW ALL PRODUCTS →
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-800 h-64 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <p className="text-red-500 text-lg mb-4">Failed to load products</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-400 text-lg">No products available</p>
          </div>
        ) : (
          <div className="relative group">
            {/* Left Arrow */}
            <button 
              onClick={scrollLeft} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/80 border border-gray-700 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Previous products"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Products Slider */}
            <div 
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-none w-72 sm:w-80 md:w-72 lg:w-80"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            {/* Right Arrow */}
            <button 
              onClick={scrollRight} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/80 border border-gray-700 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Next products"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Gradient overlays for better arrow visibility */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10" />
          </div>
        )}
      </div>
    </section>
  );
}
