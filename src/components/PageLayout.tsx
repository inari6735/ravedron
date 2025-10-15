'use client'

import { ReactNode } from 'react';
import {
  NotificationBar,
  Header,
  ScrollingTextBar,
  Footer,
} from "@/components";

import {
  navigationItems,
  footerSections,
} from "@/data";

import { useShopwareConnection } from '@/hooks/useShopware';

interface PageLayoutProps {
  children: ReactNode;
  showConnectionError?: boolean;
}

export default function PageLayout({ children, showConnectionError = false }: PageLayoutProps) {
  const { isConnected, loading: connectionLoading, error: connectionError } = useShopwareConnection();

  return (
    <div className="min-h-screen bg-black text-white">
      <NotificationBar />
      <Header navigationItems={!isConnected ? navigationItems : undefined} />
      <ScrollingTextBar />
      
      {/* Show connection status if there's an error and it's enabled */}
      {showConnectionError && connectionError && !connectionLoading && (
        <div className="bg-red-900 border border-red-500 text-red-100 px-4 py-3 rounded mx-6 mt-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              <strong>Shopware API Connection Issue:</strong> {connectionError}. Showing fallback content.
            </span>
          </div>
        </div>
      )}
      
      {children}
      
      <Footer footerSections={footerSections} />
    </div>
  );
}
