'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    inStock: true
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData as Product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 text-white p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Category</option>
            <option value="Festival Gear">Festival Gear</option>
            <option value="Rave Essentials">Rave Essentials</option>
            <option value="Accessories">Accessories</option>
            <option value="Outerwear">Outerwear</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData((prev) => ({ ...prev, inStock: e.target.checked }))}
              className="bg-gray-800 border border-gray-700 text-white"
            />
            <label htmlFor="inStock">In Stock</label>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
}

