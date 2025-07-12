import Image from "next/image";
import { NavigationItem } from "@/types";

interface HeaderProps {
  navigationItems: NavigationItem[];
}

export default function Header({ navigationItems }: HeaderProps) {
  return (
    <header className="px-6 py-4 lg:px-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="SHOPIK Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-gray-300 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
