'use client';

import React from 'react';
import { Clock, Info, Search } from 'lucide-react';
import { RegularProductCard } from '@/components/product/RegularProductCard';
import { getPreorderProducts } from '@/data/products';

export default function PreorderPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const preorderProducts = getPreorderProducts();

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

  const filteredProducts = preorderProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white">
        <div className="container-safe py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Pre-Order</span>
            </div>
            <h1 className="text-white mb-8">
              Order ahead.
              <br />
              Get it first.
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10">
              Reserve upcoming products from China at exclusive pre-order prices. 
              Guaranteed availability and delivery within 30-45 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="#products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Browse pre-orders
              </a>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-700 text-white rounded-xl font-semibold hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-200"
              >
                How it works
              </a>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start gap-3 bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-200 text-left">
                  Pre-order items are shipped directly from our partners in China. 
                  Payment is processed immediately, and shipping begins once stock arrives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-neutral-200 bg-white sticky top-16 z-40">
        <div className="container-safe py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-py">
        <div className="container-safe">
          <div className="flex items-center justify-between mb-8">
            <p className="text-neutral-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-600 mb-4">No products found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <RegularProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="section-py bg-neutral-50">
        <div className="container-safe">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">How pre-order works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Place your order</h3>
                <p className="text-neutral-600 text-sm">
                  Reserve your item with immediate payment. Lock in the pre-order price.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">We source it</h3>
                <p className="text-neutral-600 text-sm">
                  Our team in China secures your product directly from manufacturers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Delivery to you</h3>
                <p className="text-neutral-600 text-sm">
                  Shipped with tracking within 30-45 days. Quality guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}