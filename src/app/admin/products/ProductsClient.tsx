'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductModal from './ProductModal';

interface ProductsClientProps {
  initialProducts: Product[];
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Festival Gear', 'Rave Essentials', 'Accessories', 'Outerwear'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Math.max(...products.map(p => p.id), 0) + 1
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">PRODUCT MANAGEMENT</h1>
          <p className="text-gray-400">Manage your underground fashion collection</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <span>+</span>
          ADD NEW PRODUCT
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-900 border border-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 p-4">
          <div className="text-2xl font-bold text-white">{products.length}</div>
          <div className="text-gray-400">Total Products</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4">
          <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
          <div className="text-gray-400">Filtered Results</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4">
          <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
          <div className="text-gray-400">Categories</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-gray-900 border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Image</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Name</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Price</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Stock</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{product.name}</div>
                    {product.description && (
                      <div className="text-sm text-gray-400 truncate max-w-xs">
                        {product.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      product.inStock !== false ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          {searchTerm || selectedCategory !== 'All' ? 'No products found matching your filters.' : 'No products available.'}
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
