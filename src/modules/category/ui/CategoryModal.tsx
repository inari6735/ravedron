'use client';

import { useEffect } from 'react';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../domain/Category';
import CategoryForm from './CategoryForm';

interface CategoryModalProps {
  isOpen: boolean;
  category?: Category;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: CreateCategoryRequest | UpdateCategoryRequest) => Promise<void>;
  isSubmitting?: boolean;
}

export default function CategoryModal({ 
  isOpen, 
  category, 
  categories, 
  onClose, 
  onSubmit, 
  isSubmitting = false 
}: CategoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (data: CreateCategoryRequest | UpdateCategoryRequest) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {category ? 'Edit Category' : 'Create Category'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <CategoryForm
            category={category}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
