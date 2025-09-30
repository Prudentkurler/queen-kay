

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/layout/HeroSection';
import { SpotlightSection } from '@/components/layout/SpotlightSection';
import { PreorderSection, InStockSection } from '@/components/product/Product-Grid';
import { TestimonialsSection } from '@/components/layout/TestimonialsSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={3} />
      
      <main className="flex-1">
        <HeroSection />
        <SpotlightSection />
        <PreorderSection />
        <InStockSection />
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
}