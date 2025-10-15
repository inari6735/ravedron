'use client'

import React from 'react';
import { PageLayout } from '@/components';
import { notFound } from 'next/navigation';
import { useProduct } from '@/hooks/useShopware';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);
  const { data: product, isLoading, error } = useProduct(resolvedParams?.id || null);
  
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  
  // Show loading only when actually loading or params not resolved
  if (isLoading || !resolvedParams) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <div className="text-xl text-white">Loading product...</div>
            <div className="text-gray-400 mt-2">Fetching product details from Shopware</div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Only show not found if there's actually an error OR if loading is complete but no product
  if (error || (!isLoading && !product)) {
    console.log('Product not found - Error:', error, 'Product:', product, 'Loading:', isLoading);
    notFound();
  }

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
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <ProductDetailClient product={product} />
    </PageLayout>
  );
}
