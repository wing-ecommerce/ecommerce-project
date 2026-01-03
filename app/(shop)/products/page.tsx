'use client';

import { useState, useEffect } from 'react';
import CategoryFilter from '../../../components/product/CategoryFilter';
import ProductsSection from '../../../components/product/ProductsSection';
import { Product, Category } from '../../../types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();

        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.categoryId === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (slug: string) => {
    // Handled by ProductCard
    console.log('Add to cart:', slug);
  };

  const categoryOptions = [
    { id: 'All', name: 'All', slug: 'all' },
    ...categories,
  ];

  return (
    <>
      <CategoryFilter
        categories={categoryOptions}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryFilter}
      />

      <ProductsSection
        products={filteredProducts}
        loading={loading}
        activeCategory={activeCategory}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}