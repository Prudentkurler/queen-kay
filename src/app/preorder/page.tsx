'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MobileFilter } from '@/components/shared/MobileFilter';
import { 
  Clock, 
  ArrowRight, 
  Star, 
  Search, 
  Filter,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Palette,
  Car,
  Book,
  Heart
} from 'lucide-react';
import { RegularProductCard } from '@/components/product/RegularProductCard';
import { getPreorderProducts } from '@/data/products';

const categories = [
  { id: 'all', name: 'All Categories', icon: Star, count: '1200+' },
  { id: 'electronics', name: 'Electronics', icon: Smartphone, count: '300+' },
  { id: 'fashion', name: 'Fashion', icon: Shirt, count: '450+' },
  { id: 'home', name: 'Home & Living', icon: Home, count: '250+' },
  { id: 'sports', name: 'Sports & Fitness', icon: Dumbbell, count: '180+' },
  { id: 'beauty', name: 'Beauty & Health', icon: Heart, count: '220+' },
  { id: 'automotive', name: 'Automotive', icon: Car, count: '90+' },
  { id: 'books', name: 'Books & Media', icon: Book, count: '150+' },
  { id: 'art', name: 'Art & Crafts', icon: Palette, count: '120+' }
];

export default function PreorderPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const preorderProducts = getPreorderProducts();

  const filteredProducts = preorderProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="h-8 w-8 text-pink-200" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                Pre-Order Now
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get It First,{' '}
              <span className="text-pink-200">Pay Less</span>
            </h1>
            <p className="text-xl md:text-2xl text-violet-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Secure the latest products before they're officially released. 
              <span className="font-semibold text-white"> Early bird pricing</span> and 
              <span className="font-semibold text-white"> guaranteed availability</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3">
                Browse Pre-Orders
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-3">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search pre-order products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Filter Button */}
            <Button variant="outline" size="lg" className="gap-2 h-12">
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            {/* Results Count */}
            <p className="text-gray-600 font-medium">
              {filteredProducts.length} products available for pre-order
            </p>
          </div>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Categories */}
            <div className="lg:w-72 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-pink-50 text-pink-700 border border-pink-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* How Pre-Order Works */}
              <Card className="bg-gradient-to-br from-pink-50 to-violet-50 border-pink-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">How Pre-Order Works</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        1
                      </div>
                      <p>Place your order and secure your item</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        2
                      </div>
                      <p>We'll notify you when it's ready to ship</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        3
                      </div>
                      <p>Receive your item with early bird pricing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <RegularProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or category filter to find what you're looking for.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Pre-Order with Queenkay?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get exclusive benefits when you pre-order your favorite products
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Early Bird Pricing</h3>
              <p className="text-gray-300">
                Save up to 30% with exclusive pre-order discounts before official launch
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Availability</h3>
              <p className="text-gray-300">
                Secure your item before it sells out. No more missing out on popular products
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Priority Shipping</h3>
              <p className="text-gray-300">
                Be among the first to receive new products with priority shipping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-violet-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Pre-Orders?</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who get the best deals on the latest products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-pink-600 hover:bg-gray-100 font-semibold"
              asChild
            >
              <Link href="/signup">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Filter Component */}
      <MobileFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredCount={filteredProducts.length}
      />
    </div>
  );
}