'use client';

import { useState } from 'react';
import { Category } from '../domain/Category';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting?: string;
}

interface CategoryRowProps {
  category: Category;
  level: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting?: string;
}

function CategoryRow({ category, level, onEdit, onDelete, isDeleting }: CategoryRowProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  const indentClass = level > 0 ? `pl-${level * 8}` : '';

  return (
    <>
      <tr className="border-b border-gray-800 hover:bg-gray-800/50">
        <td className={`py-4 px-6 ${indentClass}`}>
          <div className="flex items-center">
            {hasChildren && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mr-2 text-gray-400 hover:text-white"
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            )}
            <span className="font-medium text-white">{category.name}</span>
          </div>
        </td>
        <td className="py-4 px-6 text-gray-300">
          <code className="bg-gray-800 px-2 py-1 rounded text-sm">
            {category.slug}
          </code>
        </td>
        <td className="py-4 px-6 text-gray-300">
          {category.description || '-'}
        </td>
        <td className="py-4 px-6 text-center">
          <span className={`px-2 py-1 rounded-full text-xs ${
            category.active 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {category.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td className="py-4 px-6 text-center text-gray-300">
          {category.position}
        </td>
        <td className="py-4 px-6 text-center">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => onEdit(category)}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded"
              title="Edit category"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(category)}
              disabled={isDeleting === category.id}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded disabled:opacity-50"
              title="Delete category"
            >
              {isDeleting === category.id ? '⏳' : '🗑️'}
            </button>
          </div>
        </td>
      </tr>
      {hasChildren && isExpanded && category.children!.map(child => (
        <CategoryRow
          key={child.id}
          category={child}
          level={level + 1}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </>
  );
}

export default function CategoryList({ categories, onEdit, onDelete, isDeleting }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">📁</div>
        <p className="text-gray-400">No categories found</p>
        <p className="text-gray-500 text-sm mt-2">Create your first category to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-4 px-6 text-gray-300 font-medium">Name</th>
            <th className="text-left py-4 px-6 text-gray-300 font-medium">Slug</th>
            <th className="text-left py-4 px-6 text-gray-300 font-medium">Description</th>
            <th className="text-center py-4 px-6 text-gray-300 font-medium">Status</th>
            <th className="text-center py-4 px-6 text-gray-300 font-medium">Position</th>
            <th className="text-center py-4 px-6 text-gray-300 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <CategoryRow
              key={category.id}
              category={category}
              level={0}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
