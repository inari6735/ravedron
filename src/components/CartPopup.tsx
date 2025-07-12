'use client'

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPopup() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Cart Popup */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-xl font-heading text-white">YOUR CART</h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="bg-red-500 text-white px-6 py-2 font-medium hover:bg-red-600 transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{item.product.name}</h3>
                      <p className="text-gray-400 text-xs">{item.product.category}</p>
                      {item.size && (
                        <p className="text-gray-400 text-xs">Size: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-gray-400 text-xs">Color: {item.color}</p>
                      )}
                      
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center border border-gray-600 hover:border-gray-500"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-white text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center border border-gray-600 hover:border-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-white font-medium">{item.product.price}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 text-xs mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-800 p-6 bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Subtotal:</span>
                <span className="text-white font-bold text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <Link href="/cart" onClick={closeCart}>
                  <button className="w-full bg-gray-700 text-white py-3 font-medium hover:bg-gray-600 transition-colors">
                    VIEW CART
                  </button>
                </Link>
                
                <Link href="/checkout" onClick={closeCart}>
                  <button className="w-full bg-red-500 text-white py-3 font-medium hover:bg-red-600 transition-colors">
                    CHECKOUT
                  </button>
                </Link>
              </div>
              
              <p className="text-gray-400 text-xs text-center mt-4">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
