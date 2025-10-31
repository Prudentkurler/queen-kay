'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container-safe section-py">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <h1 className="mb-6">
              Premium products.
              <br />
              Delivered worldwide.
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Shop exclusive items from China or browse our in-stock collection. 
              Quality products at unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
              >
                Shop now
              </Link>
              <Link 
                href="/preorder" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-200 text-neutral-900 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                Pre-order from China
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Trust Indicators - Minimal */}
            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="text-2xl font-semibold text-neutral-900">10k+</p>
                <p className="text-sm text-neutral-500">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-500">Products</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-neutral-900">4.8★</p>
                <p className="text-sm text-neutral-500">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-neutral-100">
              <Image
                src="/products/wireless-earbuds.jpg"
                alt="Featured Product"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Card - Minimal */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
              <p className="text-sm font-medium text-neutral-500 mb-1">NEW ARRIVAL</p>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Premium Wireless Earbuds
              </h3>
              <p className="text-2xl font-semibold text-neutral-900">$79.99</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
