'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: '📊'
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: '📦'
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: '📁'
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: '📋'
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: '👥'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: '⚙️'
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className={`font-heading text-xl text-white ${collapsed ? 'hidden' : 'block'}`}>
            SHOPIK ADMIN
          </h1>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      <nav className="mt-8">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/"
          className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-lg">🏠</span>
          <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Back to Store</span>
        </Link>
      </div>
    </div>
  );
}
