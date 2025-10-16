// Shopware API Response Types
export interface ShopwareMedia {
  id: string;
  url: string;
  alt?: string;
  title?: string;
}

export interface ShopwarePrice {
  net: number;
  gross: number;
  linked: boolean;
  currencyId: string;
}

export interface ShopwareCalculatedPrice {
  unitPrice: number;
  totalPrice: number;
  calculatedTaxes: any[];
  taxRules: any[];
  referencePrice?: any;
  listPrice?: any;
}

export interface ShopwareProductMedia {
  id: string;
  media: ShopwareMedia;
  position: number;
}

export interface ShopwareCategory {
  id: string;
  name: string;
  active: boolean;
  visible: boolean;
  translated: {
    name: string;
    description?: string;
  };
  level: number;
  path: string;
  childCount: number;
  children?: ShopwareCategory[];
  seoUrls?: any[];
}

// Product variant/configurator types
export interface ShopwarePropertyGroupOption {
  id: string;
  name: string;
  colorHexCode?: string;
  media?: ShopwareMedia;
  translated?: {
    name: string;
  };
  group?: {
    id: string;
    name: string;
    displayType?: string;
    translated?: {
      name: string;
    };
    options?: ShopwarePropertyGroupOption[];
  };
}

export interface ShopwareConfiguratorGroup {
  id: string;
  name: string;
  description?: string;
  displayType: 'text' | 'color' | 'image';
  sortingType: 'alphanumeric' | 'numeric' | 'position';
  translated?: {
    name: string;
    description?: string;
  };
  options: ShopwarePropertyGroupOption[];
}

export interface ShopwareProductConfigurator {
  groupId: string;
  optionId: string;
  option: ShopwarePropertyGroupOption;
}

export interface ShopwareProduct {
  id: string;
  name: string;
  productNumber: string;
  description?: string;
  active: boolean;
  price: ShopwarePrice[];
  calculatedPrice: ShopwareCalculatedPrice;
  calculatedPrices: ShopwareCalculatedPrice[];
  media?: ShopwareProductMedia[];
  cover?: ShopwareProductMedia;
  translated: {
    name: string;
    description?: string;
  };
  categories?: ShopwareCategory[];
  stock: number;
  availableStock: number;
  available: boolean;
  isCloseout: boolean;
  variation?: any[];
  options?: ShopwarePropertyGroupOption[];
  properties?: any[];
  seoUrls?: any[];
  configuratorSettings?: ShopwareProductConfigurator[];
  parentId?: string | null;
  children?: ShopwareProduct[];
  variantListingConfig?: {
    configuratorGroupConfig: {
      id: string;
      optionId: string;
      option: ShopwarePropertyGroupOption;
    }[];
  };
}

export interface ShopwareApiResponse<T> {
  data: T;
  total: number;
  aggregations?: any;
  includes?: any;
  errors?: any[];
}

// Frontend configurator types
export interface ConfiguratorOption {
  id: string;
  name: string;
  colorHexCode?: string;
  media?: string; // URL of the image
}

export interface ConfiguratorGroup {
  id: string;
  name: string;
  displayType: 'text' | 'color' | 'image';
  options: ConfiguratorOption[];
}

// Frontend Types (converted from Shopware)
export interface Product {
  id: string; // Changed from number to string to match Shopware
  name: string;
  price: string;
  image: string;
  category: string;
  description?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  features?: string[];
  productNumber?: string;
  stock?: number;
  configuratorGroups?: ConfiguratorGroup[]; // Product variant options
  shopwareProduct?: ShopwareProduct; // Original Shopware data
}

export interface NavigationItem {
  name: string;
  href: string;
  id?: string;
  children?: NavigationItem[];
  shopwareCategory?: ShopwareCategory;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  image: string;
  category: 'Festival' | 'Club Night' | 'Warehouse' | 'Underground';
  ticketPrice: string;
  status: 'upcoming' | 'selling-fast' | 'sold-out';
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'credit' | 'debit' | 'paypal' | 'apple-pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}
