'use client'

import Image from "next/image";
import { NavigationItem } from "@/types";
import { useCart } from '@/contexts/CartContext';
import { useCategories } from '@/hooks/useShopware';
import { useState } from 'react';

interface HeaderProps {
  navigationItems?: NavigationItem[]; // Made optional since we'll fetch from Shopware
}

export default function Header({ navigationItems: fallbackNavigation }: HeaderProps) {
  const { totalItems, openCart } = useCart();
  const { categories, loading, error } = useCategories();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const basePath = process.env.NODE_ENV === 'production' ? 'https://inari6735.github.io/ravedron' : '';

  // Use Shopware categories if available, otherwise fallback to provided navigation
  const navigationItems = categories.length > 0 ? [
    { name: "ALL PRODUCTS", href: "/products" },
    ...categories
  ] : fallbackNavigation || [];

  return (
    <header className="px-6 py-4 lg:px-8 bg-black border-b border-gray-800">
      <nav className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Image
              src={`${basePath}/logo.png`}
              alt="RAVEDRON Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
          />
        </div>
        <div className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          {loading ? (
            <div className="text-white text-sm tracking-wider">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-sm tracking-wider">Navigation unavailable</div>
          ) : (
            navigationItems.map((item) => (
              <div
                key={item.id || item.name}
                className="relative"
                onMouseEnter={() => item.children && setHoveredCategory(item.id || item.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <a
                  href={item.href}
                  className="font-heading text-white hover:text-red-500 transition-colors text-sm tracking-wider flex items-center"
                >
                  {item.name}
                  {item.children && item.children.length > 0 && (
                    <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
                
                {/* Dropdown menu */}
                {item.children && item.children.length > 0 && hoveredCategory === (item.id || item.name) && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-50"
                    onMouseEnter={() => setHoveredCategory(item.id || item.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="py-2">
                      {item.children.map((child) => (
                        <a
                          key={child.id || child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white hover:text-red-500 hover:bg-gray-900 transition-colors tracking-wider"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={openCart}
            className="relative btn-sharp px-4 py-2 text-xs tracking-widest hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
              </svg>
              <span>CART</span>
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
