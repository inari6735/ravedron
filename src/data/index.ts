import { Product, NavigationItem, FooterSection } from '@/types';

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Urban Chaos Tee",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    category: "Streetwear"
  },
  {
    id: 2,
    name: "Neon Dreams Hoodie",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    category: "Hoodies"
  },
  {
    id: 3,
    name: "Chaos Cap",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Rebel Jacket",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    category: "Outerwear"
  }
];

export const navigationItems: NavigationItem[] = [
  { name: "ALL PRODUCTS", href: "#" },
  { name: "SHIRTS", href: "#" },
  { name: "ACCESSORIES", href: "#" },
  { name: "ABOUT", href: "#" }
];

export const footerSections: FooterSection[] = [
  {
    title: "SHOP",
    links: [
      { name: "All Products", href: "#" },
      { name: "Streetwear", href: "#" },
      { name: "Accessories", href: "#" },
      { name: "Sale", href: "#" }
    ]
  },
  {
    title: "SUPPORT",
    links: [
      { name: "Contact Us", href: "#" },
      { name: "Size Guide", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" }
    ]
  }
];
