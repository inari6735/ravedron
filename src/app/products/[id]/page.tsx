'use client'

import React from 'react';
import { Header, Footer } from '@/components';
import { navigationItems, footerSections } from '@/data';
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
  const { product, loading, error } = useProduct(resolvedParams?.id || '');
  
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  
  if (loading || !resolvedParams) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading product...</div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navigationItems={navigationItems} />
      
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

      <Footer footerSections={footerSections} />
    </div>
  );
}
