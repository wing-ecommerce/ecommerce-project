'use client';

import HeroSection from '@/components/home/HeroSection';
import BestSellingSection from '@/components/home/BestSelling';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BestSellingSection
        title="Best Selling Products"
        limit={4}
      />
      <CTASection />
    </>
  );
}