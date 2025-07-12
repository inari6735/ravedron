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
  }
];

export const navigationItems: NavigationItem[] = [
  { name: "FESTIVAL GEAR", href: "#" },
  { name: "RAVE ESSENTIALS", href: "#" },
  { name: "ACCESSORIES", href: "#" },
  { name: "EVENTS", href: "#" }
];

export const footerSections: FooterSection[] = [
  {
    title: "SHOP",
    links: [
      { name: "Festival Gear", href: "#" },
      { name: "Rave Essentials", href: "#" },
      { name: "Accessories", href: "#" },
      { name: "Limited Drops", href: "#" }
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
