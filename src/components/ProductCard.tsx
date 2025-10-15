'use client'

import Link from "next/link";
import { Product } from "@/types";
import { useCart } from '@/contexts/CartContext';
import SafeImage from './SafeImage';

interface ProductCardProps {
  product: Product;
}


export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors">
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer group">
          <div className="relative overflow-hidden aspect-square">
            <SafeImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </Link>
      <div className="p-4 bg-gray-800">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-white font-heading mb-1 text-lg hover:text-red-400 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{product.price}</p>
          <button
            onClick={handleAddToCart}
            className="text-red-500 hover:text-red-400 text-xs font-medium tracking-wider"
          >
            + ADD
          </button>
        </div>
      </div>
    </div>
  );
}
