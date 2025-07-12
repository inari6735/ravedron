export interface Product {
  id: number;
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
}

export interface NavigationItem {
  name: string;
  href: string;
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
