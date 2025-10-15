'use client'

import { useState } from 'react';
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useCategories, useProductsByCategory } from '@/hooks/useShopware';

export default function CategoryProducts() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { data: productsData, isLoading: productsLoading, error } = useProductsByCategory(selectedCategoryId);

  // Extract products from the API response
  const products = productsData?.products || [];

  return (
    <section className="py-10 px-6 lg:px-8 bg-black">
      <div className="w-full">
        <h2 className="text-2xl font-heading text-white mb-8">Shop by Category</h2>
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`px-6 py-2 text-sm font-heading tracking-wider transition-colors ${
              !selectedCategoryId
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            ALL PRODUCTS
          </button>
          
          {categoriesLoading ? (
            // Category loading skeletons
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 bg-gray-800 animate-pulse rounded"
              ></div>
            ))
          ) : (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id!)}
                className={`px-6 py-2 text-sm font-heading tracking-wider transition-colors ${
                  selectedCategoryId === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))
          )}
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800 h-64 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">Failed to load products</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        ) : products.length === 0 && selectedCategoryId ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Export the component for use in other parts of the app
export { CategoryProducts };
