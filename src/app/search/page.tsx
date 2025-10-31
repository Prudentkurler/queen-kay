'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCardSimple } from '@/components/product/ProductCardSimple';
import { getInStockProducts, getPreorderProducts } from '@/data/products';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(query);
  
  // Combine all products for search
  const allProducts = React.useMemo(() => {
    return [...getInStockProducts(), ...getPreorderProducts()];
  }, []);
  
  // Filter products based on search query
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProducts, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="container-safe py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-neutral-900 mb-6 text-center">Search Products</h1>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            
            {searchQuery && (
              <p className="text-neutral-600 mt-4 text-center">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for &quot;{searchQuery}&quot;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-safe">
          {/* Results */}
          {searchQuery ? (
            filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCardSimple product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-neutral-400" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                  No results found
                </h3>
                <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any products matching &quot;{searchQuery}&quot;. Try different keywords or browse our categories.
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                Start your search
              </h3>
              <p className="text-neutral-600 max-w-md mx-auto">
                Enter keywords to find products you&apos;re looking for
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
             