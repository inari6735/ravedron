import { Header, Footer } from '@/components';
import { featuredProducts, navigationItems, footerSections } from '@/data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return featuredProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = featuredProducts.find(p => p.id === parseInt(resolvedParams.id));
  
  if (!product) {
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
