'use client'

import { useState, useEffect } from 'react';
import shopwareAPI from '@/services/shopware';

export default function ShopwareTest() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('🧪 Testing Shopware API...');
        
        const categories = await shopwareAPI.getCategories();
        const products = await shopwareAPI.getProducts({ limit: 5 });
        
        setData({
          categories,
          products,
          timestamp: new Date().toISOString()
        });
        
        console.log('✅ API Test Results:', {
          categories,
          products
        });
      } catch (error) {
        console.error('❌ API Test Failed:', error);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">Shopware API Test</h2>
      
      {data ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-green-400">✅ Categories ({data.categories?.length || 0})</h3>
            <pre className="bg-black p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(data.categories, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-400">✅ Products ({data.products?.products?.length || 0})</h3>
            <pre className="bg-black p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(data.products, null, 2)}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">Last updated: {data.timestamp}</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Testing Shopware API connection...</p>
        </div>
      )}
    </div>
  );
}
