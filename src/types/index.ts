export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}
