'use client'

import { createContext, useContext, ReactNode } from 'react';
import { NavigationItem } from '@/types';

interface CategoriesContextType {
  categories: NavigationItem[];
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode;
  categories: NavigationItem[]; // Server-side rendered categories
}

export function CategoriesProvider({ children, categories }: CategoriesProviderProps) {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories(): CategoriesContextType {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}
