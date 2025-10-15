'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import SafeImage from '@/components/SafeImage';
import { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  
  // Format price properly
  const formattedPrice = typeof product.price === 'string' ? product.price : `$${product.price}`;
  
  // Check if product has variants (sizes, colors, etc.)
  const hasVariants = product.sizes?.length || product.colors?.length;
  
  // Get stock information
  const stockCount = product.stock || 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;
  const isOutOfStock = !product.inStock || stockCount === 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="px-6 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden bg-gray-800 border border-gray-700">
              <SafeImage
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
                    <SafeImage
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
              {/* Product Number */}
              {product.productNumber && (
                <div className="text-gray-500 text-sm mb-2 font-mono">
                  SKU: {product.productNumber}
                </div>
              )}
              
              <h1 className="text-4xl font-heading mb-2 text-white">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg">{product.category}</p>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="text-3xl font-bold text-white">
                  {formattedPrice}
                </div>
                
                {/* Stock Badge */}
                {stockCount > 0 && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isLowStock ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'
                  }`}>
                    {isLowStock ? `Only ${stockCount} left` : `${stockCount} in stock`}
                  </div>
                )}
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

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-gray-800 pt-16">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-heading text-sm tracking-wider transition-colors ${
                activeTab === 'description'
                  ? 'border-b-2 border-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              DETAILS
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 font-heading text-sm tracking-wider transition-colors ${
                activeTab === 'specifications'
                  ? 'border-b-2 border-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SPECIFICATIONS
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-heading text-sm tracking-wider transition-colors ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              REVIEWS
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-heading text-white mb-4">PRODUCT DETAILS</h3>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>{product.description || 'No detailed description available.'}</p>
                  
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h4 className="text-lg font-heading text-white mb-3 mt-6">KEY FEATURES</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-heading text-white mb-6">SPECIFICATIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Product Number:</span>
                      <span className="text-white font-mono">{product.productNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{product.category}</span>
                    </div>
                    {product.sizes && (
                      <div className="flex justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400">Available Sizes:</span>
                        <span className="text-white">{product.sizes.join(', ')}</span>
                      </div>
                    )}
                    {product.colors && (
                      <div className="flex justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400">Available Colors:</span>
                        <span className="text-white">{product.colors.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Stock Status:</span>
                      <span className={`font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {stockCount > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400">Quantity Available:</span>
                        <span className="text-white">{stockCount} units</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-white font-bold">{formattedPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-heading text-white mb-6">CUSTOMER REVIEWS</h3>
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-400 mb-4">No reviews yet</p>
                  <p className="text-gray-500 text-sm">Be the first to review this product!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

