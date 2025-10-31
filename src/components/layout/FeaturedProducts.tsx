'use client';
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedSpotlight } from "@/data/spotlight";
import { AceternityCard } from "@/components/ui/AceternityCard";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedSpotlight().slice(0, 6);

  return (
    <section className="section-py bg-neutral-50">
      <div className="container-safe">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="mb-2">Featured collection</h2>
            <p className="text-lg text-neutral-600">
              Curated picks just for you
            </p>
          </div>
          <Link 
            href="/shop" 
            className="hidden md:flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            Shop all
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid with AceternityCard - Fully responsive with varying sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[240px] sm:auto-rows-[260px] md:auto-rows-[280px]">
          {/* Large featured item - spans 2 columns and 2 rows on desktop */}
          {featuredProducts[0] && (
            <AceternityCard
              product={{
                id: featuredProducts[0].productId,
                name: featuredProducts[0].name,
                price: `$${featuredProducts[0].price.toFixed(2)}`,
                image: featuredProducts[0].image
              }}
              className="sm:col-span-2 md:col-span-2 md:row-span-2"
            />
          )}

          {/* Medium item - spans 2 columns, 1 row */}
          {featuredProducts[1] && (
            <AceternityCard
              product={{
                id: featuredProducts[1].productId,
                name: featuredProducts[1].name,
                price: `$${featuredProducts[1].price.toFixed(2)}`,
                image: featuredProducts[1].image
              }}
              className="sm:col-span-2 md:col-span-2"
            />
          )}

          {/* Small items - 1 column each */}
          {featuredProducts.slice(2, 6).map((product) => (
            <AceternityCard
              key={product.id}
              product={{
                id: product.productId,
                name: product.name,
                price: `$${product.price.toFixed(2)}`,
                image: product.image
              }}
              className=""
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            Shop all products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

