'use client'

import { useState, use } from 'react';
import { Header, Footer } from '@/components';
import { featuredProducts, navigationItems, footerSections } from '@/data';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const product = featuredProducts.find(p => p.id === parseInt(resolvedParams.id));
  
  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navigationItems={navigationItems} />
      
      {/* Breadcrumbs */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
              Products
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="px-6 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square relative overflow-hidden bg-gray-800 border border-gray-700">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square relative overflow-hidden border-2 transition-colors ${
                        selectedImage === index 
                          ? 'border-red-500' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-heading mb-2 text-white">
                  {product.name}
                </h1>
                <p className="text-gray-400 text-lg">{product.category}</p>
                <div className="text-3xl font-bold text-white mt-4">
                  {product.price}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-heading text-white mb-2">DESCRIPTION</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-heading text-white mb-2">FEATURES</h3>
                  <ul className="text-gray-300 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <h3 className="text-lg font-heading text-white mb-3">SIZE</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 border text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-700 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="text-lg font-heading text-white mb-3">COLOR</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`py-2 px-4 border text-sm font-medium transition-colors ${
                          selectedColor === color
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-700 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading text-white mb-3">QUANTITY</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-700">
                      <button
                        onClick={decrementQuantity}
                        className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 text-white bg-gray-800">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-500 text-white py-4 px-8 font-medium text-lg hover:bg-red-600 transition-colors"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-400 text-sm">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-800 pt-6 space-y-3">
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Free shipping on orders over $100
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  30-day return policy
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Authentic underground brand
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer footerSections={footerSections} />
    </div>
  );
}
