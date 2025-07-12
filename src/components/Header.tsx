import Image from "next/image";
import { NavigationItem } from "@/types";

interface HeaderProps {
  navigationItems: NavigationItem[];
}

export default function Header({ navigationItems }: HeaderProps) {
  return (
    <header className="px-6 py-4 lg:px-8 bg-black border-b border-gray-800">
      <nav className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="SHOPIK Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <div className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-heading text-white hover:text-red-500 transition-colors text-sm tracking-wider"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="relative btn-sharp px-4 py-2 text-xs tracking-widest">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
              </svg>
              <span>CART</span>
            </div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
