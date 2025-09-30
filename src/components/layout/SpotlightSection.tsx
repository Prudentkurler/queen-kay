'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Timer, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/Product-Card';
import { getSpotlightProducts } from '@/data/products';

export function SpotlightSection() {
  const spotlightProducts = getSpotlightProducts();

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-4 w-4 text-primary fill-primary" />
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Limited Time Offers
            </Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Spotlight Deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't miss out on these exclusive deals and flash sales. 
            Limited quantities available at unbeatable prices.
          </p>
        </div>

        {/* Featured Deals Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {spotlightProducts.slice(0, 3).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className="border shadow-sm hover:shadow-xl transition-all duration-300"
            />
          ))}
        </div>

        {/* Flash Sale CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-primary text-primary-foreground p-8 lg:p-12">
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <Zap className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="text-primary bg-primary-foreground">
                Flash Sale Active
              </Badge>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3">
              Extra 20% Off Selected Items
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
              Use code <strong>FLASH20</strong> at checkout. Valid for the next 48 hours only!
            </p>
            <Button asChild variant="secondary" size="lg" className="text-base">
              <Link href="/spotlight">
                Shop Flash Sale
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/30"></div>
            <div className="absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-primary-foreground/20"></div>
            <div className="absolute right-1/4 top-1/4 h-24 w-24 rounded-full bg-primary-foreground/15"></div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/spotlight">
              View All Deals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}