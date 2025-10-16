import axios, { AxiosInstance } from 'axios';
import {
  ShopwareApiResponse,
  ShopwareProduct,
  ShopwareCategory,
  Product,
  NavigationItem,
  ConfiguratorGroup,
  ConfiguratorOption,
  ShopwarePropertyGroupOption
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
          product: ['id', 'name', 'productNumber', 'description', 'translated', 'calculatedPrice', 'cover', 'media', 'categories', 'stock', 'availableStock', 'available', 'active', 'parentId'],
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

      // Base filter - only show parent products (not variants)
      payload.filter = [
        {
          type: 'equals',
          field: 'product.parentId',
          value: null
        }
      ];
      
      // Add category filter
      if (params?.categoryId) {
        payload.filter.push({
          type: 'equals',
          field: 'product.categories.id',
          value: params.categoryId
        });
      }

      // Add search filter
      if (params?.search) {
        payload.term = params.search;
      }

      const response = await this.api.post('product', payload);
      const products: ShopwareProduct[] = response.data.elements || response.data.data || [];
      const total = response.data.total || 0;
      const transformed = products.map(product => this.transformProduct(product));

      return {
        products: transformed,
        total
      };
    } catch (error) {
      return { products: [], total: 0 };
    }
  }

  /**
   * Fetch all variants for a product (including the main product)
   */
  private async fetchProductVariants(productId: string): Promise<ShopwareProduct[]> {
    console.log('=== FETCHING PRODUCT VARIANTS DEBUG ===');
    console.log('Input productId:', productId);
    
    try {
      // First get the main product to check if it has children
      console.log('Step 1: Getting main product info...');
      const mainProductResponse = await this.api.post(`product/${productId}`, {
        includes: {
          product: ['id', 'parentId', 'childCount']
        }
      });
      
      const mainProduct = mainProductResponse.data.product || mainProductResponse.data.data || mainProductResponse.data;
      console.log('Main product data:', {
        id: mainProduct?.id,
        parentId: mainProduct?.parentId,
        childCount: mainProduct?.childCount
      });
      
      if (!mainProduct) {
        console.log('No main product found, returning empty array');
        return [];
      }
      
      // If this is a variant (has parentId), get all siblings from the parent
      const searchId = mainProduct.parentId || productId;
      console.log('Step 2: Search ID determined:', searchId, '(original productId:', productId, ')');
      
      // Get all products where parentId matches our target OR is the target itself
      console.log('Step 3: Fetching variants with filter...');
      const variantsResponse = await this.api.post('product', {
        filter: [
          {
            type: 'multi',
            operator: 'or',
            queries: [
              {
                type: 'equals',
                field: 'product.id',
                value: searchId
              },
              {
                type: 'equals',
                field: 'product.parentId',
                value: searchId
              }
            ]
          }
        ],
        includes: {
          product: ['id', 'name', 'options', 'parentId'],
          property_group_option: ['id', 'name', 'colorHexCode', 'media', 'translated', 'group'],
          property_group: ['id', 'name', 'displayType', 'translated']
        },
        associations: {
          options: {
            group: {
              translated: {}
            },
            media: {}
          }
        },
        limit: 100
      });
      
      const variants = variantsResponse.data.elements || [];
      console.log('Variants found:', variants.length);
      console.log('Raw variants response structure:', JSON.stringify(variantsResponse.data, null, 2));
      console.log('Variants data:', variants.map(v => ({
        id: v.id,
        name: v.name,
        parentId: v.parentId,
        optionsCount: v.options?.length || 0,
        options: v.options?.map(opt => ({
          id: opt.id,
          name: opt.name,
          translatedName: opt.translated?.name,
          group: opt.group,
          groupId: opt.group?.id,
          groupName: opt.group?.name,
          rawOption: opt
        }))
      })));
      
      console.log('=== END FETCHING PRODUCT VARIANTS DEBUG ===');
      return variants;
    } catch (error) {
      console.error('Error fetching product variants:', error);
      console.log('=== END FETCHING PRODUCT VARIANTS DEBUG (ERROR) ===');
      return [];
    }
  }

  /**
   * Fetch a single product by ID
   */
  async getProduct(productId: string): Promise<Product | null> {
    try {
      // Shopware Store API only accepts POST for single product endpoint
      const response = await this.api.post(`product/${productId}`, {
        includes: {
          product: ['id', 'name', 'productNumber', 'description', 'translated', 'calculatedPrice', 'cover', 'media', 'categories', 'stock', 'availableStock', 'available', 'properties', 'options', 'configuratorSettings', 'parentId', 'childCount'],
          product_media: ['id', 'media', 'position'],
          media: ['id', 'url', 'alt', 'title'],
          category: ['id', 'name', 'translated'],
          property_group_option: ['id', 'name', 'colorHexCode', 'media', 'translated', 'group'],
          property_group: ['id', 'name', 'displayType', 'sortingType', 'translated'],
          product_configurator_setting: ['id', 'position', 'optionId', 'productId']
        },
        associations: {
          categories: {},
          cover: {
            media: {}
          },
          media: {
            media: {}
          },
          options: {
            group: {
              translated: {}
            },
            media: {}
          },
          properties: {
            group: {
              translated: {},
              options: {
                media: {}
              }
            },
            media: {}
          },
          configuratorSettings: {
            option: {
              group: {
                translated: {},
                options: {}
              },
              translated: {},
              media: {}
            }
          },
          children: {
            limit: 25,
            associations: {
              options: {
                group: {
                  translated: {}
                },
                media: {}
              }
            }
          }
        }
      });

      // Handle the nested product structure from single product endpoint
      const product: ShopwareProduct = response.data.product || response.data.data || response.data;
      
      if (!product) {
        return null;
      }
      
      // Build configurator groups from product data
      const configuratorGroups = await this.buildConfiguratorGroupsFromProduct(product);
      
      const transformed = this.transformProduct(product, [], {}, configuratorGroups);
      
      return transformed;
    } catch (error) {
      console.error('Error fetching single product:', error);
      return null;
    }
  }

  /**
   * Fetch all available configurator options for a product
   */
  private async fetchConfiguratorOptions(productId: string, configuratorGroups: any[]): Promise<Record<string, any[]>> {
    const allOptions: Record<string, any[]> = {};
    
    try {
      // For each configurator group, fetch all available options
      for (const group of configuratorGroups) {
        try {
          const response = await this.api.post('property-group-option', {
            filter: {
              'property_group_option.groupId': group.id
            },
            includes: {
              property_group_option: ['id', 'name', 'colorHexCode', 'media', 'translated']
            },
            associations: {
              media: {}
            },
            limit: 100
          });
          
          allOptions[group.id] = response.data.elements || [];
        } catch (error) {
          console.error(`Error fetching options for group ${group.id}:`, error);
          allOptions[group.id] = [];
        }
      }
    } catch (error) {
      console.error('Error fetching configurator options:', error);
    }
    
    return allOptions;
  }

  /**
   * Build configurator groups from product data according to Shopware API structure
   */
  private async buildConfiguratorGroupsFromProduct(product: ShopwareProduct): Promise<ConfiguratorGroup[]> {
    console.log('=== BUILDING CONFIGURATOR GROUPS DEBUG ===');
    console.log('Product ID:', product.id);
    console.log('Product name:', product.name);
    console.log('Product configuratorSettings:', product.configuratorSettings);
    console.log('Product children count:', product.children?.length || 0);
    console.log('Product options:', product.options);
    console.log('Product parentId:', product.parentId);
    
    const configuratorGroups: ConfiguratorGroup[] = [];
    
    // Method 1: Use configuratorSettings if available (most reliable)
    if (product.configuratorSettings && product.configuratorSettings.length > 0) {
      console.log('Using Method 1: configuratorSettings');
      const groupMap = new Map<string, ConfiguratorGroup>();
      
      product.configuratorSettings.forEach(setting => {
        const option = setting.option;
        if (!option?.group) return;
        
        const groupId = option.group.id;
        const groupName = option.group.translated?.name || option.group.name;
        
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, {
            id: groupId,
            name: groupName,
            displayType: this.determineDisplayType(option.group),
            options: []
          });
        }
        
        const group = groupMap.get(groupId)!;
        group.options.push({
          id: option.id,
          name: option.translated?.name || option.name,
          colorHexCode: option.colorHexCode,
          media: option.media?.url
        });
      });
      
      configuratorGroups.push(...Array.from(groupMap.values()));
    }
    
    // Method 2: Use children products to extract configurator options
    else if (product.children && product.children.length > 0) {
      const groupMap = new Map<string, ConfiguratorGroup>();
      
      product.children.forEach(child => {
        if (!child.options) return;
        
        child.options.forEach(option => {
          if (!option.group) return;
          
          const groupId = option.group.id;
          const groupName = option.group.translated?.name || option.group.name;
          
          if (!groupMap.has(groupId)) {
            groupMap.set(groupId, {
              id: groupId,
              name: groupName,
              displayType: this.determineDisplayType(option.group),
              options: []
            });
          }
          
          const group = groupMap.get(groupId)!;
          
          // Check if option already exists in group
          const existingOption = group.options.find(opt => opt.id === option.id);
          if (!existingOption) {
            group.options.push({
              id: option.id,
              name: option.translated?.name || option.name,
              colorHexCode: option.colorHexCode,
              media: option.media?.url
            });
          }
        });
      });
      
      console.log('Using Method 2: children products');
      console.log('Children found:', product.children?.length);
      configuratorGroups.push(...Array.from(groupMap.values()));
    }
    
    // Method 3: Fetch all product variants to get complete configurator options
    else {
      console.log('Using Method 3: fetching all product variants');
      const variants = await this.fetchProductVariants(product.id);
      console.log('Fetched variants count:', variants.length);
      
      if (variants.length > 0) {
        const groupMap = new Map<string, ConfiguratorGroup>();
        
        variants.forEach(variant => {
          if (!variant.options) return;
          
          variant.options.forEach(option => {
            let groupId: string;
            let groupName: string;
            let displayType: 'text' | 'color' | 'image' = 'text';
            
            // If option has group information, use it
            if (option.group) {
              groupId = option.group.id;
              groupName = option.group.translated?.name || option.group.name;
              displayType = this.determineDisplayType(option.group);
            } else {
              // Fallback: create a generic group for options without group info
              // Try to determine group type by option name
              const optionName = (option.translated?.name || option.name || '').toLowerCase();
              
              if (this.isSizeOption(optionName)) {
                groupId = 'size-group';
                groupName = 'Size';
                displayType = 'text';
              } else if (this.isColorOption(optionName)) {
                groupId = 'color-group';
                groupName = 'Color';
                displayType = option.colorHexCode ? 'color' : 'text';
              } else {
                groupId = 'generic-options';
                groupName = 'Options';
                displayType = 'text';
              }
            }
            
            if (!groupMap.has(groupId)) {
              groupMap.set(groupId, {
                id: groupId,
                name: groupName,
                displayType,
                options: []
              });
            }
            
            const group = groupMap.get(groupId)!;
            
            // Check if option already exists in group
            const existingOption = group.options.find(opt => opt.id === option.id);
            if (!existingOption) {
              group.options.push({
                id: option.id,
                name: option.translated?.name || option.name,
                colorHexCode: option.colorHexCode,
                media: option.media?.url
              });
            }
          });
        });
        
        configuratorGroups.push(...Array.from(groupMap.values()));
      }
      
      // Method 4: Fallback - create a generic group from product options (even without group info)
      else if (product.options && product.options.length > 0) {
        console.log('Using Method 4: product options fallback (no group info)');
        const fallbackGroup: ConfiguratorGroup = {
          id: 'product-options',
          name: 'Options',
          displayType: 'text',
          options: []
        };
        
        product.options.forEach(option => {
          fallbackGroup.options.push({
            id: option.id,
            name: option.translated?.name || option.name,
            colorHexCode: option.colorHexCode,
            media: option.media?.url
          });
        });
        
        if (fallbackGroup.options.length > 0) {
          configuratorGroups.push(fallbackGroup);
        }
      }
    }
    
    console.log('Final configurator groups count:', configuratorGroups.length);
    console.log('Final configurator groups:', configuratorGroups);
    console.log('=== END BUILDING CONFIGURATOR GROUPS DEBUG ===');
    
    return configuratorGroups;
  }
  
  /**
   * Check if option name indicates a size option
   */
  private isSizeOption(optionName: string): boolean {
    const sizePatterns = [
      /^(xs|s|m|l|xl|xxl|xxxl)$/i,
      /^\d+$/,
      /^\d+(\.\d+)?\s*(cm|mm|inch|in|ft)$/i,
      /size/i,
      /rozmiar/i
    ];
    
    return sizePatterns.some(pattern => pattern.test(optionName.trim()));
  }
  
  /**
   * Check if option name indicates a color option
   */
  private isColorOption(optionName: string): boolean {
    const colorPatterns = [
      /color/i,
      /colour/i,
      /farbe/i,
      /kolor/i,
      /^(red|blue|green|yellow|black|white|grey|gray|pink|purple|orange|brown|navy|beige|cream|gold|silver)$/i
    ];
    
    return colorPatterns.some(pattern => pattern.test(optionName.trim()));
  }
  
  /**
   * Determine display type for configurator group
   */
  private determineDisplayType(group: any): 'text' | 'color' | 'image' {
    if (!group) return 'text';
    
    // Check if group has display type specified
    if (group.displayType) {
      switch (group.displayType) {
        case 'color':
        case 'media':
          return group.displayType === 'media' ? 'image' : 'color';
        default:
          return 'text';
      }
    }
    
    // Fallback: determine by group name or options
    const groupName = (group.translated?.name || group.name || '').toLowerCase();
    if (groupName.includes('color') || groupName.includes('colour') || groupName.includes('farbe')) {
      return 'color';
    }
    
    return 'text';
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
   * Transform configurator groups from Shopware product
   */
  private transformConfiguratorGroups(shopwareProduct: ShopwareProduct): ConfiguratorGroup[] {
    console.log('=== CONFIGURATOR DEBUG ===');
    console.log('Product configuratorSettings:', shopwareProduct.configuratorSettings);
    console.log('Product options:', shopwareProduct.options);
    console.log('Product properties:', shopwareProduct.properties);
    console.log('=========================');
    
    const configuratorGroups: ConfiguratorGroup[] = [];
    
    // Check if product has configurator settings or options
    if (shopwareProduct.configuratorSettings && shopwareProduct.configuratorSettings.length > 0) {
      // Group options by their group
      const groupMap = new Map<string, ConfiguratorGroup>();
      
      shopwareProduct.configuratorSettings.forEach(setting => {
        const option = setting.option;
        if (!option || !option.group) return;
        
        const groupId = option.group.id;
        const groupName = option.group.translated?.name || option.group.name;
        
        // Create group if doesn't exist
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, {
            id: groupId,
            name: groupName,
            displayType: 'text', // Default, can be enhanced later
            options: []
          });
        }
        
        // Add option to group
        const group = groupMap.get(groupId)!;
        const configuratorOption: ConfiguratorOption = {
          id: option.id,
          name: option.translated?.name || option.name,
          colorHexCode: option.colorHexCode,
          media: option.media?.url
        };
        
        group.options.push(configuratorOption);
      });
      
      configuratorGroups.push(...Array.from(groupMap.values()));
    } else if (shopwareProduct.options && shopwareProduct.options.length > 0) {
      // Fallback to direct options if no configurator settings
      const groupMap = new Map<string, ConfiguratorGroup>();
      
      shopwareProduct.options.forEach(option => {
        if (!option.group) return;
        
        const groupId = option.group.id;
        const groupName = option.group.translated?.name || option.group.name;
        
        // Create group if doesn't exist
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, {
            id: groupId,
            name: groupName,
            displayType: 'text',
            options: []
          });
        }
        
        // Add option to group
        const group = groupMap.get(groupId)!;
        const configuratorOption: ConfiguratorOption = {
          id: option.id,
          name: option.translated?.name || option.name,
          colorHexCode: option.colorHexCode,
          media: option.media?.url
        };
        
        group.options.push(configuratorOption);
      });
      
      configuratorGroups.push(...Array.from(groupMap.values()));
    }
    
    // Determine display type based on group name and options
    configuratorGroups.forEach(group => {
      const hasColors = group.options.some(opt => opt.colorHexCode);
      const hasImages = group.options.some(opt => opt.media);
      
      if (hasImages) {
        group.displayType = 'image';
      } else if (hasColors) {
        group.displayType = 'color';
      } else {
        group.displayType = 'text';
      }
    });
    
    console.log('Transformed configurator groups:', configuratorGroups);
    return configuratorGroups;
  }

  /**
   * Transform configurator data from API response
   */
  private transformConfiguratorFromApiResponse(
    configurator: any[], 
    productOptions: any[], 
    allOptions: Record<string, any[]> = {}
  ): ConfiguratorGroup[] {
    
    const configuratorGroups: ConfiguratorGroup[] = [];
    
    if (!configurator || configurator.length === 0) {
      return configuratorGroups;
    }
    
    // Transform each configurator group
    configurator.forEach(group => {
      const configuratorGroup: ConfiguratorGroup = {
        id: group.id,
        name: group.translated?.name || group.name,
        displayType: group.displayType || 'text',
        options: []
      };
      
      // Use all available options for this group, not just current product's options
      const groupOptions = allOptions[group.id] || productOptions || [];
      
      groupOptions.forEach(option => {
        const configuratorOption: ConfiguratorOption = {
          id: option.id,
          name: option.translated?.name || option.name,
          colorHexCode: option.colorHexCode,
          media: option.media?.url
        };
        
        configuratorGroup.options.push(configuratorOption);
      });
      
      if (configuratorGroup.options.length > 0) {
        configuratorGroups.push(configuratorGroup);
      }
    });
    
    // Determine display type based on options
    configuratorGroups.forEach(group => {
      const hasColors = group.options.some(opt => opt.colorHexCode);
      const hasImages = group.options.some(opt => opt.media);
      
      if (hasImages) {
        group.displayType = 'image';
      } else if (hasColors) {
        group.displayType = 'color';
      } else {
        group.displayType = 'text';
      }
    });
    
    return configuratorGroups;
  }

  /**
   * Transform Shopware product to frontend product
   */
  private transformProduct = (
    shopwareProduct: ShopwareProduct, 
    configurator: any[] = [], 
    allOptions: Record<string, any[]> = {},
    prebuiltConfiguratorGroups?: ConfiguratorGroup[]
  ): Product => {
    if (!shopwareProduct) {
      console.error('transformProduct called with null/undefined product');
      throw new Error('Product data is required');
    }
    
    
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

    // Use prebuilt configurator groups if provided, otherwise transform from API response
    const configuratorGroups = prebuiltConfiguratorGroups || this.transformConfiguratorFromApiResponse(
      configurator, 
      shopwareProduct.options || [], 
      allOptions
    );

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
      configuratorGroups,
      shopwareProduct
    };
    
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
