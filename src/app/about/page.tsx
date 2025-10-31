'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Shield, Truck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white">
        <div className="container-safe py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-8">
              Quality products.
              <br />
              Delivered worldwide.
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Queenkay Importation connects you with premium products from China and beyond, 
              delivered with care and attention to every detail.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-py">
        <div className="container-safe">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Our mission</h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              To provide our customers with access to high-quality products at competitive prices, 
              backed by exceptional service and reliable delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-py bg-neutral-50">
        <div className="container-safe">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Global sourcing</h3>
              <p className="text-neutral-600">
                We partner with trusted manufacturers to bring you the best products from around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Quality assured</h3>
              <p className="text-neutral-600">
                Every product undergoes rigorous quality checks before reaching your doorstep.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Reliable delivery</h3>
              <p className="text-neutral-600">
                Fast, tracked shipping ensures your order arrives safely and on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-py">
        <div className="container-safe">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">What we offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-neutral-200 rounded-2xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Competitive pricing</h3>
                <p className="text-neutral-600">
                  Direct sourcing from manufacturers allows us to offer better prices without compromising on quality.
                </p>
              </div>
              <div className="p-6 border border-neutral-200 rounded-2xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Wide selection</h3>
                <p className="text-neutral-600">
                  From electronics to fashion, home goods to sports equipment – we&apos;ve got you covered.
                </p>
              </div>
              <div className="p-6 border border-neutral-200 rounded-2xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Pre-order options</h3>
                <p className="text-neutral-600">
                  Reserve upcoming products before they launch and lock in exclusive early bird pricing.
                </p>
              </div>
              <div className="p-6 border border-neutral-200 rounded-2xl">
                <h3 className="font-semibold text-neutral-900 mb-2">Dedicated support</h3>
                <p className="text-neutral-600">
                  Our customer service team is always ready to help with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-py bg-neutral-900 text-white">
        <div className="container-safe">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">Ready to start shopping?</h2>
            <p className="text-xl text-neutral-300 mb-10">
              Explore our curated collection of quality products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <span>Browse all products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/preorder" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-700 text-white rounded-xl font-semibold hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-200 backdrop-blur-sm"
              >
                View pre-orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
