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
  isLast: boolean;
  parentLines: boolean[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting?: string;
}

function CategoryRow({ 
  category, 
  level, 
  isLast, 
  parentLines, 
  onEdit, 
  onDelete, 
  isDeleting 
}: CategoryRowProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  const renderTreeLines = () => {
    if (level === 0) return null;

    const lines = [];
    
    // Render parent lines
    for (let i = 0; i < level - 1; i++) {
      lines.push(
        <div key={`parent-${i}`} className="w-6 h-full flex justify-center">
          {parentLines[i] && (
            <div className="w-px bg-gray-600 h-full"></div>
          )}
        </div>
      );
    }
    
    // Render current level connector
    lines.push(
      <div key="current" className="w-6 h-full flex flex-col items-center">
        <div className="w-px bg-gray-600 h-4 flex-shrink-0"></div>
        <div className="w-3 h-px bg-gray-600 flex-shrink-0"></div>
        {!isLast && (
          <div className="w-px bg-gray-600 flex-1"></div>
        )}
      </div>
    );
    
    return (
      <div className="flex items-center h-full absolute left-0 top-0 bottom-0">
        {lines}
      </div>
    );
  };

  return (
    <>
      <tr className="border-b border-gray-800 hover:bg-gray-800/50 group">
        <td className="py-4 px-6 relative">
          <div className="flex items-center" style={{ marginLeft: `${level * 24}px` }}>
            {renderTreeLines()}
            
            {hasChildren && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mr-3 w-5 h-5 flex items-center justify-center rounded border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-colors text-xs text-gray-400 hover:text-white"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
            
            {!hasChildren && level > 0 && (
              <div className="w-5 h-5 mr-3 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
            )}
            
            <div className="flex items-center">
              <span className="font-medium text-white group-hover:text-red-400 transition-colors">
                {category.name}
              </span>
              {level > 0 && (
                <span className="ml-2 text-xs text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">
                  L{level}
                </span>
              )}
            </div>
          </div>
        </td>
        <td className="py-4 px-6 text-gray-300">
          <code className="bg-gray-800 px-2 py-1 rounded text-sm border border-gray-700">
            {category.slug}
          </code>
        </td>
        <td className="py-4 px-6 text-gray-300">
          <div className="max-w-xs truncate" title={category.description || undefined}>
            {category.description || (
              <span className="text-gray-500 italic">No description</span>
            )}
          </div>
        </td>
        <td className="py-4 px-6 text-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            category.active 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {category.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td className="py-4 px-6 text-center">
          <span className="text-gray-300 bg-gray-800 px-2 py-1 rounded text-sm border border-gray-700">
            {category.position}
          </span>
        </td>
        <td className="py-4 px-6 text-center">
          <div className="flex justify-center space-x-1">
            <button
              onClick={() => onEdit(category)}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors border border-transparent hover:border-blue-500/30"
              title="Edit category"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(category)}
              disabled={isDeleting === category.id}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded disabled:opacity-50 transition-colors border border-transparent hover:border-red-500/30"
              title="Delete category"
            >
              {isDeleting === category.id ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </td>
      </tr>
      {hasChildren && isExpanded && category.children!.map((child, index) => {
        const isLastChild = index === category.children!.length - 1;
        const newParentLines = [...parentLines];
        if (level > 0) {
          newParentLines[level - 1] = !isLast;
        }
        
        return (
          <CategoryRow
            key={child.id}
            category={child}
            level={level + 1}
            isLast={isLastChild}
            parentLines={newParentLines}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        );
      })}
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
          {categories.map((category, index) => (
            <CategoryRow
              key={category.id}
              category={category}
              level={0}
              isLast={index === categories.length - 1}
              parentLines={[]}
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
