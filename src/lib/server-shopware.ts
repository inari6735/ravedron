import axios from 'axios';
import { NavigationItem } from '@/types';

/**
 * Server-side Shopware API client for fetching categories at build/server time
 */
class ServerShopwareAPI {
  private endpoint: string;
  private accessToken: string;

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_SHOPWARE_ENDPOINT || 'http://localhost:8000';
    this.accessToken = process.env.NEXT_PUBLIC_SHOPWARE_ACCESS_TOKEN || '';
  }

  /**
   * Fetch categories from Shopware (server-side)
   */
  async getCategories(): Promise<NavigationItem[]> {
    try {
      const response = await axios.post(`${this.endpoint}/store-api/category`, {
        limit: 100,
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
      }, {
        headers: {
          'Content-Type': 'application/json',
          'sw-access-key': this.accessToken,
        }
      });

      const categories = response.data.elements || response.data.data || [];
      return this.transformCategoriesToNavigation(categories);
    } catch (error) {
      console.error('Server-side error fetching categories:', error);
      return [];
    }
  }

  /**
   * Transform Shopware categories to navigation items (same logic as client-side)
   */
  private transformCategoriesToNavigation(categories: any[]): NavigationItem[] {
    const filtered = categories.filter((cat: any) => cat.active && cat.visible);
    
    // Only show level 2 categories in main navigation
    const level2Categories = filtered.filter((cat: any) => cat.level === 2);
    const categoryMap = new Map<string, NavigationItem>();
    
    // Create navigation items for level 2 categories
    level2Categories.forEach((category: any) => {
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
    const childCategories = filtered.filter((cat: any) => cat.level > 2);
    childCategories.forEach((category: any) => {
      const parentId = category.parentId;
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
    
    return rootCategories;
  }
}

// Create singleton instance
const serverShopwareAPI = new ServerShopwareAPI();

/**
 * Server-side function to get categories (for use in layouts/pages)
 */
export async function getServerCategories(): Promise<NavigationItem[]> {
  try {
    return await serverShopwareAPI.getCategories();
  } catch (error) {
    console.error('Failed to fetch server-side categories:', error);
    return [];
  }
}

export default serverShopwareAPI;
