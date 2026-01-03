import ProductGrid from './ProductGrid';
import { Product } from '@/types/product';

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
  activeCategory: string;
}

export default function ProductsSection({ 
  products, 
  loading, 
  activeCategory
}: ProductsSectionProps) {
  const getCategoryLabel = () => {
    if (activeCategory === 'All') {
      return 'All Products';
    }
    const firstProduct = products[0];
    return firstProduct ? `${firstProduct.category.name} Collection` : 'Products';
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-gray-700 font-bold">
            {getCategoryLabel()}
          </h2>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <ProductGrid 
          products={products} 
          loading={loading}
        />
      </div>
    </section>
  );
}