import { useState, useEffect, useCallback } from 'react';
import shopwareAPI from '@/services/shopware';
import { Product, NavigationItem } from '@/types';

// Hook for fetching categories
export const useCategories = () => {
  const [categories, setCategories] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await shopwareAPI.getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Categories fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook for fetching products
export const useProducts = (params?: {
  limit?: number;
  page?: number;
  categoryId?: string;
  search?: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopwareAPI.getProducts(params);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [params?.limit, params?.page, params?.categoryId, params?.search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, total, loading, error, refetch };
};

// Hook for fetching a single product
export const useProduct = (productId: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await shopwareAPI.getProduct(productId);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

// Hook for searching products
export const useProductSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (query: string, limit = 10) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await shopwareAPI.searchProducts(query, limit);
      setProducts(data);
    } catch (err) {
      setError('Failed to search products');
      console.error('Product search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setProducts([]);
    setError(null);
  }, []);

  return { products, loading, error, searchProducts, clearSearch };
};

// Hook for fetching products by category
export const useProductsByCategory = (categoryId: string | null, limit = 25, page = 1) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setProducts([]);
      setTotal(0);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await shopwareAPI.getProductsByCategory(categoryId, limit, page);
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError('Failed to fetch products by category');
        console.error('Products by category fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, limit, page]);

  return { products, total, loading, error };
};

// Hook for checking Shopware connection
export const useShopwareConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch categories as a connection test
        await shopwareAPI.getCategories();
        setIsConnected(true);
      } catch (err) {
        setIsConnected(false);
        setError('Failed to connect to Shopware API. Please check your configuration.');
        console.error('Shopware connection error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return { isConnected, loading, error };
};
