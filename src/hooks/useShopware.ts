import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import shopwareAPI from '@/services/shopware';
import { Product, NavigationItem } from '@/types';

// Query keys for React Query
const QUERY_KEYS = {
  categories: ['categories'] as const,
  products: ['products'] as const,
  product: (id: string) => ['product', id] as const,
  productsByCategory: (categoryId: string, limit: number, page: number) => ['products', 'category', categoryId, limit, page] as const,
  searchProducts: (query: string, limit: number) => ['products', 'search', query, limit] as const,
} as const;

// Hook for fetching categories with React Query
export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => shopwareAPI.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 3,
    refetchOnWindowFocus: false, // Don't refetch when switching tabs
    refetchOnMount: false, // Don't refetch when component mounts if data exists
  });
};

// Hook for fetching products with React Query
export const useProducts = (params?: {
  limit?: number;
  page?: number;
  categoryId?: string;
  search?: string;
}) => {
  const queryKey = ['products', params?.categoryId, params?.search, params?.limit, params?.page];
  
  return useQuery({
    queryKey,
    queryFn: () => shopwareAPI.getProducts(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: true, // Always enabled, but could be conditional
  });
};

// Hook for fetching a single product with React Query
export const useProduct = (productId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.product(productId!),
    queryFn: () => shopwareAPI.getProduct(productId!),
    enabled: !!productId, // Only run query if productId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for searching products with React Query
export const useProductSearch = (query: string, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.searchProducts(query, limit),
    queryFn: () => shopwareAPI.searchProducts(query, limit),
    enabled: !!query.trim(), // Only run query if query exists
    staleTime: 1 * 60 * 1000, // 1 minute - search results become stale quickly
  });
};

// Hook for fetching products by category with React Query
export const useProductsByCategory = (categoryId: string | null, limit = 25, page = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.productsByCategory(categoryId!, limit, page),
    queryFn: () => shopwareAPI.getProductsByCategory(categoryId!, limit, page),
    enabled: !!categoryId, // Only run query if categoryId exists
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Hook for checking Shopware connection with React Query
export const useShopwareConnection = () => {
  const result = useQuery({
    queryKey: ['shopware-connection'],
    queryFn: async () => {
      try {
        await shopwareAPI.getCategories();
        return { connected: true, error: null };
      } catch (error) {
        throw new Error('Failed to connect to Shopware API. Please check your configuration.');
      }
    },
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    isConnected: result.data?.connected || false,
    loading: result.isLoading,
    error: result.error?.message || null,
  };
};
