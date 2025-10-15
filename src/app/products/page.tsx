'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLayout } from '@/components';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCategories } from '@/hooks/useShopware';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'category', label: 'Category' }
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  
  // Fetch data from Shopware
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: productsData, isLoading: productsLoading } = useProducts({
    categoryId: selectedCategoryId || undefined,
    limit: 50
  });

  // Extract products from the API response
  const products = productsData?.products || [];
  const total = productsData?.total || 0;

  // Helper function to find category recursively
  const findCategoryById = (categories: any[], categoryId: string): any => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category;
      }
      if (category.children) {
        const found = findCategoryById(category.children, categoryId);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to get category breadcrumb path
  const getCategoryPath = (categories: any[], categoryId: string): any[] => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return [category];
      }
      if (category.children) {
        const childPath = getCategoryPath(category.children, categoryId);
        if (childPath.length > 0) {
          return [category, ...childPath];
        }
      }
    }
    return [];
  };

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.length > 0) {
      const category = findCategoryById(categories, categoryParam);
      if (category) {
        setSelectedCategoryId(categoryParam);
        setSelectedCategoryName(category.name);
        setSelectedCategory(category);
      }
    } else {
      setSelectedCategoryId(null);
      setSelectedCategoryName('All');
      setSelectedCategory(null);
    }
  }, [searchParams, categories]);

  // Products are already filtered by category in the API call, so just sort them
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));

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

  // Handle category selection
  const handleCategorySelect = (categoryId: string | null, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    
    // Update URL
    const url = new URL(window.location.href);
    if (categoryId) {
      url.searchParams.set('category', categoryId);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url);
  };

  return (
    <PageLayout>
      
      {/* Breadcrumbs */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <span className="text-gray-600">/</span>
            <a href="/products" className="text-gray-400 hover:text-white transition-colors">
              Products
            </a>
            {selectedCategory && (() => {
              const categoryPath = getCategoryPath(categories, selectedCategory.id);
              return categoryPath.map((cat, index) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <span className="text-gray-600">/</span>
                  <span className={index === categoryPath.length - 1 ? "text-white font-medium" : "text-gray-400"}>
                    {cat.name}
                  </span>
                </div>
              ));
            })()}
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading mb-2 text-white">
            {selectedCategoryName === 'All' ? 'ALL PRODUCTS' : selectedCategoryName}
          </h1>
          <p className="text-gray-400 text-lg">
            {selectedCategoryName === 'All' 
              ? 'Explore our complete collection of underground fashion'
              : `Browse products in ${selectedCategoryName} category`
            }
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categoriesLoading ? (
                <div className="text-gray-400">Loading categories...</div>
              ) : (
                <>
                  <button
                    onClick={() => handleCategorySelect(null, 'All')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      !selectedCategoryId
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    ALL PRODUCTS
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id!, category.name)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        selectedCategoryId === category.id
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </>
              )}
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
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 h-64 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {selectedCategoryName === 'All' 
                  ? 'No products available.'
                  : `No products found in ${selectedCategoryName} category.`
                }
              </p>
            </div>
          )}
        </div>
      </div>

    </PageLayout>
  );
}
