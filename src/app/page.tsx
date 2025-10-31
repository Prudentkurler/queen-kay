import React from 'react';
import { HeroSection } from '@/components/layout/HeroSection';
import FeaturedProducts from '@/components/layout/FeaturedProducts';
import { TestimonialsSection } from '@/components/layout/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <TestimonialsSection />
    </>
  );
}
