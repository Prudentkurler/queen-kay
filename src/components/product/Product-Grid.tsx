'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/Product-Card';
import { getPreorderProducts, getInStockProducts } from '@/data/products';

interface ProductGridProps {
  title: string;
  description: string;
  products: any[];
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
  const icon = type === 'preorder' ? Clock : Package;
  const IconComponent = icon;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>
              <Badge variant={type === 'preorder' ? 'secondary' : 'default'} className="text-sm">
                {type === 'preorder' ? 'Pre-order' : 'In Stock'}
              </Badge>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="lg" className="text-base self-start lg:self-end">
            <Link href={viewAllHref}>
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
              <IconComponent className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products available</h3>
            <p className="text-muted-foreground">
              Check back soon for new {type === 'preorder' ? 'pre-order' : 'in-stock'} items.
            </p>
          </div>
        )}

        {/* View More Button */}
        {products.length > maxItems && (
          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-base">
              <Link href={viewAllHref}>
                View {products.length - maxItems} More Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
    <div className="bg-muted/20">
      <ProductGrid
        title="Pre-order from China"
        description="Get the best deals by pre-ordering directly from manufacturers. Save up to 60% with longer delivery times and be first to receive new products."
        products={preorderProducts}
        viewAllHref="/preorder"
        type="preorder"
        maxItems={4}
      />
    </div>
  );
}

export function InStockSection() {
  const inStockProducts = getInStockProducts();
  
  return (
    <ProductGrid
      title="Ready to Ship"
      description="Need it fast? Browse our in-stock inventory for immediate shipping and quick delivery. Perfect for urgent needs and last-minute gifts."
      products={inStockProducts}
      viewAllHref="/shop"
      type="instock"
      maxItems={4}
    />
  );
}