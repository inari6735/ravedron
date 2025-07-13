import ProductsClient from './ProductsClient';
import { featuredProducts } from '@/data';

export default async function ProductsAdminPage() {
  return <ProductsClient initialProducts={featuredProducts} />;
}
