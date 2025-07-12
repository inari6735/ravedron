import { Product, NavigationItem, FooterSection } from '@/types';

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "BASS DROP TEE",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    category: "Festival Gear"
  },
  {
    id: 2,
    name: "UNDERGROUND HOODIE",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    category: "Rave Essentials"
  },
  {
    id: 3,
    name: "TECHNO VIBES CAP",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: 4,
    name: "WAREHOUSE JACKET",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    category: "Outerwear"
  },
  {
    id: 5,
    name: "NEON NIGHTS TANK",
    price: "$40.00",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    category: "Festival Gear"
  },
  {
    id: 6,
    name: "UNDERGROUND JOGGERS",
    price: "$75.00",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    category: "Rave Essentials"
  },
  {
    id: 7,
    name: "LASER GRID HOODIE",
    price: "$90.00",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Rave Essentials"
  },
  {
    id: 8,
    name: "CYBER PUNK MASK",
    price: "$25.00",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: 9,
    name: "ELECTRO STORM JACKET",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    category: "Outerwear"
  },
  {
    id: 10,
    name: "RAVE WARRIOR BOOTS",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1608256246200-53e8b47b2206?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: 11,
    name: "PULSE NATION TEE",
    price: "$42.00",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Festival Gear"
  },
  {
    id: 12,
    name: "DARK MATTER SHORTS",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    category: "Rave Essentials"
  },
  {
    id: 13,
    name: "SYNTHETIC DREAMS HOODIE",
    price: "$88.00",
    image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=400&h=400&fit=crop",
    category: "Rave Essentials"
  },
  {
    id: 14,
    name: "NEON CIRCUIT BACKPACK",
    price: "$78.00",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: 15,
    name: "ACID HOUSE BOMBER",
    price: "$135.00",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop",
    category: "Outerwear"
  },
  {
    id: 16,
    name: "TECHNO FUTURE DRESS",
    price: "$98.00",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    category: "Festival Gear"
  }
];

export const navigationItems: NavigationItem[] = [
  { name: "ALL PRODUCTS", href: "/products" },
  { name: "FESTIVAL GEAR", href: "/products?category=Festival+Gear" },
  { name: "RAVE ESSENTIALS", href: "/products?category=Rave+Essentials" },
  { name: "ACCESSORIES", href: "/products?category=Accessories" },
  { name: "EVENTS", href: "#" }
];

export const footerSections: FooterSection[] = [
  {
    title: "SHOP",
    links: [
      { name: "All Products", href: "/products" },
      { name: "Festival Gear", href: "/products?category=Festival+Gear" },
      { name: "Rave Essentials", href: "/products?category=Rave+Essentials" },
      { name: "Accessories", href: "/products?category=Accessories" },
      { name: "Outerwear", href: "/products?category=Outerwear" }
    ]
  },
  {
    title: "COMMUNITY",
    links: [
      { name: "Events Calendar", href: "#" },
      { name: "Festival Guide", href: "#" },
      { name: "Artist Collabs", href: "#" },
      { name: "Underground News", href: "#" }
    ]
  }
];
