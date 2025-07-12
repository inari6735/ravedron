'use client'

import { Header, Footer } from '@/components';
import { useCart } from '@/contexts/CartContext';
import { navigationItems, footerSections } from '@/data';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  const shippingCost = 10.00;
  const taxRate = 0.08;
  const subtotal = totalPrice;
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingCost + taxes;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navigationItems={navigationItems} />
      
      {/* Breadcrumbs */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">Cart</span>
        </nav>
      </div>

      <div className="px-6 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading mb-8 text-white">
            SHOPPING CART
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-heading text-gray-400 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some items to get started</p>
              <Link href="/products">
                <button className="bg-red-500 text-white px-8 py-3 font-medium hover:bg-red-600 transition-colors">
                  CONTINUE SHOPPING
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading text-white">Items in Cart</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-400 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-6 p-6 bg-gray-900 border border-gray-800">
                      <div className="w-24 h-24 relative">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-heading text-lg mb-1">{item.product.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{item.product.category}</p>
                        {item.size && (
                          <p className="text-gray-400 text-sm">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-gray-400 text-sm">Color: {item.color}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-700">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 text-white bg-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{item.product.price}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-400 text-sm mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 border border-gray-800 p-6 sticky top-6">
                  <h2 className="text-xl font-heading text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-white">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span className="text-white">${taxes.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-lg">Total</span>
                        <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <Link href="/checkout">
                      <button className="w-full bg-red-500 text-white py-3 font-medium hover:bg-red-600 transition-colors">
                        PROCEED TO CHECKOUT
                      </button>
                    </Link>
                    
                    <Link href="/products">
                      <button className="w-full bg-gray-700 text-white py-3 font-medium hover:bg-gray-600 transition-colors">
                        CONTINUE SHOPPING
                      </button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                      Free shipping on orders over $100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer footerSections={footerSections} />
    </div>
  );
}
