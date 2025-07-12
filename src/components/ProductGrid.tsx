import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span>Shop</span>
            <span>/</span>
            <span>All products</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-gray-600 text-white text-sm hover:bg-gray-800 transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 border border-gray-600 text-white text-sm hover:bg-gray-800 transition-colors">
              Sort
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
