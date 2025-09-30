'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Clock, Star, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[80vh] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-8">

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Import Smarter,{' '}
                <span className="text-primary">Save Bigger</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Pre-order from China at unbeatable prices or shop in-stock items instantly. 
                Quality products, authentic brands, delivered to your door.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base h-12 px-8">
                <Link href="/preorder">
                  Start Pre-order
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-8">
                <Link href="/shop">
                  Shop In-stock
                </Link>
              </Button>
            </div>
          </div>

          
         
        </div>

        {/* Social Proof Strip */}
        <div className="border-t pt-12 pb-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.025]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:32px_32px]"></div>
      </div>
    </section>
  );
}