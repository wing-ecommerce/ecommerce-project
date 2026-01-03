'use client';

import HeroSection from '@/components/home/HeroSection';
import BestSellingSection from '@/components/home/BestSelling';
import CTASection from '@/components/home/CTASection';
import { useCartStore } from '../../store/cart.store';

export default function HomePage() {
  const { items } = useCartStore();

  const handleAddToCart = (slug: string) => {
    // This is handled by the ProductCard component
    console.log('Add to cart:', slug);
  };

  return (
    <>
      <HeroSection />
      <BestSellingSection
        title="Best Selling Products"
        limit={4}
        onAddToCart={handleAddToCart}
      />
      <CTASection />
    </>
  );
}