
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal,
  Star,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Heart,
  Book,
  Car,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCardSimple } from '@/components/product/ProductCardSimple';
import { MobileFilter } from '@/components/shared/MobileFilter';
import { getInStockProducts } from '@/data/products';

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest' | 'rating';

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

const categoriesWithIcons = [
  { id: 'All', name: 'All', icon: Star, count: '200+' },
  { id: 'Electronics', name: 'Electronics', icon: Smartphone, count: '50+' },
  { id: 'Fashion', name: 'Fashion', icon: Shirt, count: '40+' },
  { id: 'Home & Living', name: 'Home & Living', icon: Home, count: '30+' },
  { id: 'Sports & Fitness', name: 'Sports & Fitness', icon: Dumbbell, count: '25+' },
  { id: 'Beauty & Health', name: 'Beauty & Health', icon: Heart, count: '35+' },
  { id: 'Books & Media', name: 'Books & Media', icon: Book, count: '20+' },
  { id: 'Automotive', name: 'Automotive', icon: Car, count: '15+' },
  { id: 'Art & Crafts', name: 'Art & Crafts', icon: Palette, count: '18+' },
];

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Sports & Fitness',
  'Beauty & Health',
  'Books & Media',
  'Automotive',
  'Art & Crafts',
];

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  const allProducts = getInStockProducts();

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || 
                             product.category === selectedCategory.toLowerCase().replace(' & ', '_').replace(' ', '_');
      
      // Price filter
      const matchesPrice = product.price >= selectedPriceRange.min && 
                          product.price <= selectedPriceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'popularity':
        default:
          return (b.views || 0) - (a.views || 0);
      }
    });

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Shop Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Collection
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover premium products from trusted global suppliers, carefully curated for quality and value.
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {allProducts.length} Products Available
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b bg-background/95 backdrop-blur-sm sticky top-16 z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-border focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-9 px-3 rounded-md border border-border bg-background text-sm focus:border-primary focus:ring-primary focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Results Count */}
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedProducts.length} results
              </span>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.label}
                          checked={selectedPriceRange === range}
                          onChange={() => setSelectedPriceRange(range)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedPriceRange(priceRanges[0]);
                      setSortBy('popularity');
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, staggerChildren: 0.1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            >
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCardSimple product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or browse our categories to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedPriceRange(priceRanges[0]);
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mobile Filter Component */}
      <MobileFilter
        categories={categoriesWithIcons}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredCount={filteredAndSortedProducts.length}
      />
    </div>
  );
}