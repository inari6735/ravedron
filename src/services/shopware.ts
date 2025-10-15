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

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetch all categories from Shopware
   */
  async getCategories(): Promise<NavigationItem[]> {
    try {
      const response = await this.api.post('category', {
        limit: 100, // Maximum allowed by Shopware
        includes: {
          category: ['id', 'name', 'translated', 'level', 'path', 'children', 'seoUrls', 'active', 'visible', 'parentId', 'childCount']
        },
        associations: {
          children: {
            limit: 100,
            associations: {
              children: {
                limit: 100
              }
            }
          }
        },
        filter: {
          'category.active': true,
          'category.visible': true
        }
      });

      const categories: ShopwareCategory[] = response.data.elements || response.data.data || [];
      console.log('Raw categories from Shopware:', categories.map(cat => ({ id: cat.id, name: cat.name, level: cat.level, children: cat.children?.length || 0 })));
      
      return this.transformCategoriesToNavigation(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

      const response = await this.api.post('product', payload);
      const products: ShopwareProduct[] = response.data.elements || response.data.data || [];
      const total = response.data.total || 0;
      const transformed = products.map(this.transformProduct);

      return {
        products: transformed,
        total
      };
    } catch (error) {
      return { products: [], total: 0 };
    }
  }

  /**
   * Fetch a single product by ID
   */
  async getProduct(productId: string): Promise<Product | null> {
    try {
      console.log('Fetching single product with ID:', productId);
      
      // Shopware Store API only accepts POST for single product endpoint
      const response = await this.api.post(`product/${productId}`, {
        includes: {
          product: ['id', 'name', 'productNumber', 'description', 'translated', 'calculatedPrice', 'cover', 'media', 'categories', 'stock', 'availableStock', 'available', 'properties'],
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
      });

      console.log('Single product API response:', response.data);
      
      // Handle the nested product structure from single product endpoint
      const product: ShopwareProduct = response.data.product || response.data.data || response.data;
      
      if (!product) {
        console.log('No product data found in response');
        return null;
      }
      
      console.log('Raw product from Shopware:', product);
      const transformed = this.transformProduct(product);
      console.log('Transformed product:', transformed);
      
      return transformed;
    } catch (error) {
      console.error('Error fetching single product:', error);
      return null;
    }
  }

  /**
   * Transform Shopware category to navigation item
   */
  private transformCategoriesToNavigation(categories: ShopwareCategory[]): NavigationItem[] {
    const filtered = categories.filter(cat => cat.active && cat.visible);
    console.log('All categories:', filtered.map(cat => ({ 
      id: cat.id, 
      name: cat.name, 
      level: cat.level, 
      parentId: (cat as any).parentId
    })));
    
    // Only show level 2 categories in main navigation
    const level2Categories = filtered.filter(cat => cat.level === 2);
    const categoryMap = new Map<string, NavigationItem>();
    
    // Create navigation items for level 2 categories
    level2Categories.forEach(category => {
      const navItem: NavigationItem = {
        id: category.id,
        name: (category.translated?.name || category.name).toUpperCase(),
        href: `/products?category=${category.id}`,
        children: [],
        shopwareCategory: category
      };
      categoryMap.set(category.id, navItem);
    });
    
    // Find children for level 2 categories (level 3+ with parentId matching level 2)
    const childCategories = filtered.filter(cat => cat.level > 2);
    childCategories.forEach(category => {
      const parentId = (category as any).parentId;
      const parentNavItem = categoryMap.get(parentId);
      
      if (parentNavItem) {
        const childNavItem: NavigationItem = {
          id: category.id,
          name: (category.translated?.name || category.name).toUpperCase(),
          href: `/products?category=${category.id}`,
          shopwareCategory: category
        };
        parentNavItem.children!.push(childNavItem);
      }
    });
    
    // Clean up empty children arrays
    const rootCategories = Array.from(categoryMap.values());
    rootCategories.forEach(item => {
      if (item.children && item.children.length === 0) {
        delete item.children;
      }
    });
    
    console.log('Built navigation hierarchy:', rootCategories);
    return rootCategories;
  }

  /**
   * Transform Shopware product to frontend product
   */
  private transformProduct = (shopwareProduct: ShopwareProduct): Product => {
    if (!shopwareProduct) {
      console.error('transformProduct called with null/undefined product');
      throw new Error('Product data is required');
    }
    
    console.log('Transforming product:', {
      id: shopwareProduct.id,
      name: shopwareProduct.name,
      translated: shopwareProduct.translated,
      calculatedPrice: shopwareProduct.calculatedPrice,
      available: shopwareProduct.available,
      availableStock: shopwareProduct.availableStock
    });
    
    // Get the main image
    const mainImage = shopwareProduct.cover?.media?.url || 
                     shopwareProduct.media?.[0]?.media?.url || 
                     '';

    // Get all images with null checks - filter out null media objects
    const validMedia = shopwareProduct.media?.filter(media => media.media?.url) || [];
    const images = validMedia.map(media => media.media!.url).filter(Boolean);
    
    // If no valid images found, use mainImage as fallback
    const finalImages = images.length > 0 ? images : (mainImage ? [mainImage] : []);

    // Format price safely
    let price = '$0.00';
    try {
      if (shopwareProduct.calculatedPrice?.unitPrice) {
        price = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(shopwareProduct.calculatedPrice.unitPrice);
      }
    } catch (priceError) {
      console.error('Error formatting price:', priceError);
    }

    // Get primary category
    const primaryCategory = shopwareProduct.categories?.[0]?.translated?.name || 
                           shopwareProduct.categories?.[0]?.name || 
                           'Uncategorized';

    // Safe name extraction
    const name = shopwareProduct.translated?.name || shopwareProduct.name || 'Unknown Product';
    
    // Safe description extraction  
    const description = shopwareProduct.translated?.description || shopwareProduct.description || '';

    const transformedProduct: Product = {
      id: shopwareProduct.id,
      name,
      price,
      image: mainImage,
      images: finalImages,
      category: primaryCategory,
      description,
      inStock: Boolean(shopwareProduct.available && (shopwareProduct.availableStock || 0) > 0),
      productNumber: shopwareProduct.productNumber || '',
      stock: shopwareProduct.availableStock || 0,
      shopwareProduct
    };
    
    console.log('Final transformed product:', transformedProduct);
    return transformedProduct;
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
