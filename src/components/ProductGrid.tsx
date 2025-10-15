'use client'

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useProducts } from '@/hooks/useShopware';

interface ProductGridProps {
  products?: Product[]; // Made optional since we'll fetch from Shopware
  title?: string;
  limit?: number;
}

export default function ProductGrid({ products: fallbackProducts, title = "Featured Products", limit = 16 }: ProductGridProps) {
  const { products: shopwareProducts, loading, error } = useProducts({ limit });
  
  // Use Shopware products if available, otherwise fallback to provided products
  const products = shopwareProducts.length > 0 ? shopwareProducts : fallbackProducts || [];

  const scrollLeft = () => {
    const container = document.querySelector('.product-slider');
    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.product-slider');
    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
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
          <div className="relative">
            <button 
              onClick={scrollLeft} 
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white text-black hover:bg-gray-200 transition-colors focus:outline-none shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex overflow-x-scroll space-x-4 scrollbar-hide product-slider pb-4">
              <div className="flex space-x-4" style={{width: 'max-content'}}>
                {products.map((product) => (
                  <div key={product.id} className="flex-shrink-0" style={{width: 'calc(25% - 0.75rem)'}}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={scrollRight} 
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white text-black hover:bg-gray-200 transition-colors focus:outline-none shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
