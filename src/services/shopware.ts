import axios, { AxiosInstance } from 'axios';
import {
  ShopwareApiResponse,
  ShopwareProduct,
  ShopwareCategory,
  Product,
  NavigationItem
} from '@/types';

class ShopwareAPI {
  private api: AxiosInstance;
  private endpoint: string;
  private accessToken: string;

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_SHOPWARE_ENDPOINT || 'http://localhost:8000';
    this.accessToken = process.env.NEXT_PUBLIC_SHOPWARE_ACCESS_TOKEN || '';

    this.api = axios.create({
      baseURL: `${this.endpoint}/store-api/`,
      headers: {
        'Content-Type': 'application/json',
        'sw-access-key': this.accessToken,
      }
    });

    // Add request interceptor for debugging
    this.api.interceptors.request.use(
      (config) => {
        console.log('Shopware API Request:', config.url);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Shopware API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetch all categories from Shopware
   */
  async getCategories(): Promise<NavigationItem[]> {
    try {
      console.log('🔍 Fetching categories from Shopware...');
      const response = await this.api.post('category', {
        includes: {
          category: ['id', 'name', 'translated', 'level', 'path', 'children', 'seoUrls', 'active', 'visible']
        }
      });

      console.log('📦 Raw categories response:', response.data);
      const categories: ShopwareCategory[] = response.data.elements || response.data.data || [];
      console.log('📊 Categories count:', categories.length);
      console.log('📋 Categories details:', categories.map(cat => ({ id: cat.id, name: cat.translated?.name || cat.name, level: cat.level, active: cat.active, visible: cat.visible })));
      
      const transformed = this.transformCategoriesToNavigation(categories);
      console.log('🔄 Transformed navigation items:', transformed);
      return transformed;
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Fetch products from Shopware
   */
  async getProducts(params?: {
    limit?: number;
    page?: number;
    categoryId?: string;
    search?: string;
  }): Promise<{ products: Product[]; total: number }> {
    try {
      console.log('🔍 Fetching products from Shopware...', params);
      const payload: any = {
        limit: params?.limit || 25,
        page: params?.page || 1,
        includes: {
          product: ['id', 'name', 'productNumber', 'description', 'translated', 'calculatedPrice', 'cover', 'media', 'categories', 'stock', 'availableStock', 'available', 'active'],
          product_media: ['id', 'media', 'position'],
          media: ['id', 'url', 'alt', 'title'],
          category: ['id', 'name', 'translated']
        },
        associations: {
          categories: {},
          cover: {
            media: {}
          },
          media: {
            media: {}
          }
        }
      };

      // Add category filter
      if (params?.categoryId) {
        payload.filter = {
          'product.categories.id': params.categoryId
        };
      }

      // Add search filter
      if (params?.search) {
        payload.term = params.search;
      }

      console.log('📦 Products request payload:', payload);
      const response = await this.api.post('product', payload);
      
      console.log('📦 Raw products response:', response.data);
      const products: ShopwareProduct[] = response.data.elements || response.data.data || [];
      const total = response.data.total || 0;
      
      console.log('📊 Products count:', products.length);
      console.log('📋 Products details:', products.map(prod => ({ 
        id: prod.id, 
        name: prod.translated?.name || prod.name, 
        available: prod.available,
        active: prod.active,
        categories: prod.categories?.map(cat => cat.translated?.name || cat.name)
      })));

      const transformed = products.map(this.transformProduct);
      console.log('🔄 Transformed products:', transformed.map(p => ({ id: p.id, name: p.name, price: p.price, inStock: p.inStock })));

      return {
        products: transformed,
        total
      };
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      return { products: [], total: 0 };
    }
  }

  /**
   * Fetch a single product by ID
   */
  async getProduct(productId: string): Promise<Product | null> {
    try {
      const response = await this.api.post(`product/${productId}`, {
        includes: {
          product: ['id', 'name', 'productNumber', 'description', 'translated', 'calculatedPrice', 'cover', 'media', 'categories', 'stock', 'available', 'properties'],
          product_media: ['id', 'media', 'position'],
          media: ['id', 'url', 'alt', 'title']
        }
      });

      const product: ShopwareProduct = response.data.data;
      return this.transformProduct(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  /**
   * Transform Shopware category to navigation item
   */
  private transformCategoriesToNavigation(categories: ShopwareCategory[]): NavigationItem[] {
    console.log('🔄 Transforming categories:', categories.length);
    
    const filtered = categories.filter(cat => {
      const shouldInclude = cat.active && cat.visible;
      console.log(`Category "${cat.translated?.name || cat.name}" - active: ${cat.active}, visible: ${cat.visible}, level: ${cat.level}, included: ${shouldInclude}`);
      return shouldInclude;
    });
    
    console.log('📋 Filtered categories count:', filtered.length);
    
    return filtered.map(category => ({
      id: category.id,
      name: (category.translated?.name || category.name).toUpperCase(),
      href: `/products?category=${category.id}`,
      children: category.children ? this.transformCategoriesToNavigation(category.children) : undefined,
      shopwareCategory: category
    }));
  }

  /**
   * Transform Shopware product to frontend product
   */
  private transformProduct = (shopwareProduct: ShopwareProduct): Product => {
    // Get the main image
    const mainImage = shopwareProduct.cover?.media?.url || 
                     shopwareProduct.media?.[0]?.media?.url || 
                     'https://via.placeholder.com/400x400?text=No+Image';

    // Get all images with null checks
    const images = shopwareProduct.media?.map(media => media.media?.url).filter(Boolean) || [mainImage];

    // Format price
    const price = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // You might want to make this dynamic based on Shopware currency
    }).format(shopwareProduct.calculatedPrice.unitPrice);

    // Get primary category
    const primaryCategory = shopwareProduct.categories?.[0]?.translated?.name || 'Uncategorized';

    return {
      id: shopwareProduct.id,
      name: shopwareProduct.translated.name,
      price,
      image: mainImage,
      images,
      category: primaryCategory,
      description: shopwareProduct.translated.description,
      inStock: shopwareProduct.available && shopwareProduct.availableStock > 0,
      productNumber: shopwareProduct.productNumber,
      stock: shopwareProduct.availableStock,
      shopwareProduct
    };
  };

  /**
   * Search products
   */
  async searchProducts(query: string, limit = 10): Promise<Product[]> {
    const { products } = await this.getProducts({ search: query, limit });
    return products;
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId: string, limit = 25, page = 1): Promise<{ products: Product[]; total: number }> {
    return this.getProducts({ categoryId, limit, page });
  }
}

// Create singleton instance
const shopwareAPI = new ShopwareAPI();

export default shopwareAPI;
