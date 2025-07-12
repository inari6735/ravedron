'use client'

import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
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
      </div>
    </section>
  );
}
