import { NavigationItem, FooterSection, Event } from '@/types';

// Fallback navigation items (used when Shopware API is not available)

export const navigationItems: NavigationItem[] = [
  { name: "ALL PRODUCTS", href: "/products" },
  { name: "FESTIVAL GEAR", href: "/products?category=Festival+Gear" },
  { name: "RAVE ESSENTIALS", href: "/products?category=Rave+Essentials" },
  { name: "ACCESSORIES", href: "/products?category=Accessories" },
  { name: "EVENTS", href: "/events" }
];

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "NEON NIGHTS: TECHNO UNDERGROUND",
    date: "2025-07-25",
    time: "22:00",
    venue: "WAREHOUSE 404",
    location: "Berlin, Germany",
    description: "Dive deep into the underground techno scene with world-class DJs spinning the darkest beats until dawn. Industrial warehouse setting with immersive light shows.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    category: "Warehouse",
    ticketPrice: "€35",
    status: "upcoming"
  },
  {
    id: 2,
    title: "BASSLINE FESTIVAL 2025",
    date: "2025-08-15",
    time: "16:00",
    venue: "ELECTRIC FIELDS",
    location: "Amsterdam, Netherlands",
    description: "Three days of non-stop electronic music featuring the biggest names in house, techno, and drum & bass. Multiple stages, art installations, and exclusive merch drops.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
    category: "Festival",
    ticketPrice: "€180",
    status: "selling-fast"
  },
  {
    id: 3,
    title: "DARK MATTER SESSIONS",
    date: "2025-08-02",
    time: "23:30",
    venue: "VOID CLUB",
    location: "London, UK",
    description: "An intimate underground experience featuring cutting-edge experimental electronic music. Limited capacity for true music connoisseurs only.",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b492589?w=800&h=400&fit=crop",
    category: "Club Night",
    ticketPrice: "£25",
    status: "upcoming"
  },
  {
    id: 4,
    title: "CYBER RAVE COLLECTIVE",
    date: "2025-08-30",
    time: "21:00",
    venue: "MATRIX WAREHOUSE",
    location: "Detroit, USA",
    description: "Step into the future of electronic music with cyberpunk aesthetics, holographic visuals, and the hardest hitting basslines in the underground scene.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop",
    category: "Underground",
    ticketPrice: "$40",
    status: "upcoming"
  },
  {
    id: 5,
    title: "ACID HOUSE REVIVAL",
    date: "2025-09-12",
    time: "20:00",
    venue: "RETRO WAREHOUSE",
    location: "Chicago, USA",
    description: "Celebrating the roots of house music with legendary DJs and the classic 303 sound that started it all. Vintage vibes meets modern production.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
    category: "Warehouse",
    ticketPrice: "$35",
    status: "upcoming"
  },
  {
    id: 6,
    title: "PULSE NATION MEGA FESTIVAL",
    date: "2025-09-28",
    time: "14:00",
    venue: "SONIC GROUNDS",
    location: "Ibiza, Spain",
    description: "The ultimate electronic music festival experience with 5 stages, 72 hours of non-stop music, and exclusive fashion collaborations. VIP experiences available.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=400&fit=crop",
    category: "Festival",
    ticketPrice: "€250",
    status: "sold-out"
  }
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
      { name: "Events Calendar", href: "/events" },
      { name: "Festival Guide", href: "#" },
      { name: "Artist Collabs", href: "#" },
      { name: "Underground News", href: "#" }
    ]
  }
];
