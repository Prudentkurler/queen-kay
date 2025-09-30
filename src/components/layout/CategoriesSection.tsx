'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, Shirt, Home, Dumbbell, Palette, Car, Book, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    icon: Smartphone,
    href: '/preorder/electronics',
    count: '500+ items',
    color: 'bg-blue-500/10 text-blue-600'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing & accessories',
    icon: Shirt,
    href: '/preorder/fashion',
    count: '800+ items',
    color: 'bg-pink-500/10 text-pink-600'
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Furniture & home decor',
    icon: Home,
    href: '/preorder/home',
    count: '350+ items',
    color: 'bg-green-500/10 text-green-600'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Workout gear & equipment',
    icon: Dumbbell,
    href: '/preorder/sports',
    count: '200+ items',
    color: 'bg-orange-500/10 text-orange-600'
  },
  {
    id: 'beauty',
    name: 'Beauty & Health',
    description: 'Skincare & wellness',
    icon: Heart,
    href: '/preorder/beauty',
    count: '300+ items',
    color: 'bg-purple-500/10 text-purple-600'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car accessories & parts',
    icon: Car,
    href: '/preorder/automotive',
    count: '150+ items',
    color: 'bg-gray-500/10 text-gray-600'
  }
];

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Pre-order Categories
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover amazing products across different categories. Pre-order now for the best prices 
            and be the first to get the latest items.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Icon and Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium mr-2">Explore</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button asChild size="lg" className="text-base">
            <Link href="/preorder">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}