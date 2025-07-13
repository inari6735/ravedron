'use client';

import { useState, useEffect } from 'react';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../domain/Category';
import { CategoryService } from '../application/CategoryService';
import { CategoryApiRepository } from '../infrastructure/CategoryApiRepository';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';

const categoryService = new CategoryService(new CategoryApiRepository());

export default function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [treeData, listData] = await Promise.all([
        categoryService.getCategoryTree(),
        categoryService.listCategories()
      ]);
      
      setCategories(treeData);
      setFlatCategories(listData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = () => {
    setSelectedCategory(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
      return;
    }

    try {
      setDeletingId(category.id);
      await categoryService.deleteCategory(category.id);
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setDeletingId(undefined);
    }
  };

  const handleSubmit = async (data: CreateCategoryRequest | UpdateCategoryRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory.id, data);
      } else {
        await categoryService.createCategory(data);
      }

      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
      throw err; // Re-throw to prevent modal from closing
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 mt-1">Manage your product categories</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Category</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={deletingId}
        />
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        categories={flatCategories}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
