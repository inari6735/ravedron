'use client';

import { useState, useEffect } from 'react';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../domain/Category';

interface CategoryFormProps {
  category?: Category;
  categories: Category[];
  onSubmit: (data: CreateCategoryRequest | UpdateCategoryRequest) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function CategoryForm({ 
  category, 
  categories, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    meta_title: '',
    meta_description: '',
    position: 0,
    active: true,
    parent_id: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        meta_title: category.meta_title || '',
        meta_description: category.meta_description || '',
        position: category.position,
        active: category.active,
        parent_id: category.parent_id || ''
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData: CreateCategoryRequest | UpdateCategoryRequest = {
      ...formData,
      description: formData.description || undefined,
      meta_title: formData.meta_title || undefined,
      meta_description: formData.meta_description || undefined,
      parent_id: formData.parent_id || undefined,
    };

    await onSubmit(submitData);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  // Filter out the current category from parent options to prevent circular references
  const parentOptions = categories.filter(cat => cat.id !== category?.id);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={handleNameChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Slug *
        </label>
        <input
          type="text"
          required
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="category-slug"
        />
        <p className="text-xs text-gray-500 mt-1">
          URL-friendly version of the name (lowercase, hyphens allowed)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Category description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Parent Category
        </label>
        <select
          value={formData.parent_id}
          onChange={(e) => setFormData(prev => ({ ...prev, parent_id: e.target.value }))}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">No parent (root category)</option>
          {parentOptions.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Position
          </label>
          <input
            type="number"
            value={formData.position}
            onChange={(e) => setFormData(prev => ({ ...prev, position: parseInt(e.target.value) || 0 }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.active.toString()}
            onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.value === 'true' }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Meta Title
        </label>
        <input
          type="text"
          value={formData.meta_title}
          onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="SEO meta title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Meta Description
        </label>
        <textarea
          value={formData.meta_description}
          onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
          rows={2}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="SEO meta description"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-500"
        >
          {isSubmitting ? 'Saving...' : (category ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}
