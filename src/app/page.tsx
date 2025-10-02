import React from 'react';
import { HeroSection } from '@/components/layout/HeroSection';
import { SpotlightSection } from '@/components/layout/SpotlightSection';
import { PreorderSection, InStockSection } from '@/components/product/Product-Grid';
import { TestimonialsSection } from '@/components/layout/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SpotlightSection />
      <PreorderSection />
      <InStockSection />
      <TestimonialsSection />
    </>
  );
}
