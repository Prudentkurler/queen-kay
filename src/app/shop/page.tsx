'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AceternityCard } from '@/components/ui/AceternityCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { getInStockProducts } from '@/data/products';

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest' | 'rating';

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Toys & Games',
  'Automotive',
  'Books & Media'
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const allProducts = getInStockProducts();

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest': return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        default: return (b.views || 0) - (a.views || 0);
      }
    });

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  return (
    <div className="min-h-screen bg-base-100">
      <FilterSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        categories={categories}
        priceRanges={priceRanges}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Shop</h1>
            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">Browse our curated collection of in-stock products, ready to ship to your door.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white border-neutral-200 w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSidebarOpen(true)} 
                className="gap-2 h-12 border-neutral-200 hover:bg-neutral-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as SortOption)} 
                className="h-12 px-4 border border-neutral-200 rounded-lg bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="h-96">
                  <AceternityCard product={{
                    id: product.id,
                    name: product.name,
                    price: `$${product.price.toFixed(2)}`,
                    image: product.image,
                  }} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">Try adjusting your search or filter criteria.</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedPriceRange(priceRanges[0]); }} variant="outline">Clear Filters</Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}