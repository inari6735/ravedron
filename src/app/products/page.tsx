'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components';
import { featuredProducts, navigationItems, footerSections } from '@/data';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'category', label: 'Category' }
];

const categories = ['All', 'Festival Gear', 'Rave Essentials', 'Accessories', 'Outerwear'];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products] = useState<Product[]>(featuredProducts);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));

    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navigationItems={navigationItems} />
      
      {/* Breadcrumbs */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <nav className="flex items-center space-x-2 text-sm">
          <a href="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </a>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">Products</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading mb-2 text-white">
            ALL PRODUCTS
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our complete collection of underground fashion
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-400 text-sm">
            Showing {sortedProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer footerSections={footerSections} />
    </div>
  );
}
