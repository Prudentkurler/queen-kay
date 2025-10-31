'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RegularProductCard } from '@/components/product/RegularProductCard';
import { getPreorderProducts, getInStockProducts } from '@/data/products';
import type { Product } from '@/data/products';

interface ProductGridProps {
  title: string;
  description: string;
  products: Product[];
  viewAllHref: string;
  type: 'preorder' | 'instock';
  maxItems?: number;
}

export function ProductGrid({ 
  title, 
  description, 
  products, 
  viewAllHref, 
  type,
  maxItems = 8
}: ProductGridProps) {
  const displayProducts = products.slice(0, maxItems);

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-accent-light">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute -right-20 -top-20 h-80 w-80 rounded-full ${
          type === 'preorder' 
            ? 'bg-blue-600/30' 
            : 'bg-emerald-600/30'
        }`}></div>
        <div className={`absolute -left-20 -bottom-20 h-60 w-60 rounded-full ${
          type === 'preorder' 
            ? 'bg-indigo-600/20' 
            : 'bg-green-600/20'
        }`}></div>
        <div className={`absolute right-1/4 top-1/3 h-40 w-40 rounded-full ${
          type === 'preorder' 
            ? 'bg-purple-600/15' 
            : 'bg-teal-600/15'
        }`}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl mb-6 text-gray-900">
            {title}
          </h2>
          <p className="text-md sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {description}
          </p>
          
          <div className="mt-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-pink-600 text-white hover:bg-pink-700 border-2 border-pink-600 text-base font-bold px-8 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link href={viewAllHref}>
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product) => (
              <RegularProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg mx-auto mb-6 border-2 ${
              type === 'preorder'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-emerald-600 border-emerald-500 text-white'
            }`}>
              <span className="text-2xl font-bold">
                {type === 'preorder' ? '🚀' : '📦'}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">No products available</h3>
            <p className="text-gray-700">
              Check back soon for new {type === 'preorder' ? 'pre-order' : 'in-stock'} items.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Pre-built components for specific product types
export function PreorderSection() {
  const preorderProducts = getPreorderProducts();
  
  return (
    <ProductGrid
      title="Pre-order from China"
      description="Get exclusive access to the latest products before they hit the market. Save up to 60% by ordering directly from manufacturers with longer delivery times."
      products={preorderProducts}
      viewAllHref="/preorder"
      type="preorder"
      maxItems={4}
    />
  );
}

export function InStockSection() {
  const inStockProducts = getInStockProducts();
  
  return (
    <ProductGrid
      title="Ready to Ship"
      description="Need it fast? Browse our carefully curated in-stock inventory for immediate shipping and quick delivery. Perfect for urgent needs and last-minute gifts."
      products={inStockProducts}
      viewAllHref="/shop"
      type="instock"
      maxItems={4}
    />
  );
}