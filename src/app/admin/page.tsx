'use client'

import { useProducts, useCategories } from '@/hooks/useShopware';

export default function AdminDashboard() {
  const { products, loading: productsLoading } = useProducts();
  const { categories: shopwareCategories, loading: categoriesLoading } = useCategories();
  
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const categories = shopwareCategories;

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-white mb-2">ADMIN DASHBOARD</h1>
        <p className="text-gray-400">Welcome to your underground fashion store management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Total Products</h3>
              <p className="text-2xl font-bold text-white mt-1">{totalProducts}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">In Stock</h3>
              <p className="text-2xl font-bold text-green-400 mt-1">{inStockProducts}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Out of Stock</h3>
              <p className="text-2xl font-bold text-red-400 mt-1">{outOfStockProducts}</p>
            </div>
            <div className="text-3xl">❌</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Categories</h3>
              <p className="text-2xl font-bold text-blue-400 mt-1">{categories.length}</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-heading text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/admin/products"
            className="bg-gray-900 border border-gray-800 hover:border-red-500 p-6 transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📦</div>
              <div>
                <h3 className="text-white font-medium group-hover:text-red-400">Manage Products</h3>
                <p className="text-gray-400 text-sm">Add, edit, or remove products</p>
              </div>
            </div>
          </a>

          <a 
            href="/admin/orders"
            className="bg-gray-900 border border-gray-800 hover:border-red-500 p-6 transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📋</div>
              <div>
                <h3 className="text-white font-medium group-hover:text-red-400">View Orders</h3>
                <p className="text-gray-400 text-sm">Track and manage orders</p>
              </div>
            </div>
          </a>

          <a 
            href="/admin/users"
            className="bg-gray-900 border border-gray-800 hover:border-red-500 p-6 transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">👥</div>
              <div>
                <h3 className="text-white font-medium group-hover:text-red-400">Manage Users</h3>
                <p className="text-gray-400 text-sm">View and manage customers</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Products */}
      <div className="mb-8">
        <h2 className="text-xl font-heading text-white mb-4">Recent Products</h2>
        <div className="bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Product</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Category</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Price</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {productsLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.slice(0, 5).map((product) => (
                    <tr key={product.id} className="border-b border-gray-800">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="font-medium text-white">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          product.inStock ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div>
        <h2 className="text-xl font-heading text-white mb-4">Categories Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesLoading ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              No categories found
            </div>
          ) : (
            categories.map((category) => {
              const categoryProducts = products.filter(p => p.category === category.name);
              return (
                <div key={category.id} className="bg-gray-900 border border-gray-800 p-4">
                  <h3 className="text-white font-medium mb-2">{category.name}</h3>
                  <div className="text-2xl font-bold text-red-400">{categoryProducts.length}</div>
                  <div className="text-gray-400 text-sm">products</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
