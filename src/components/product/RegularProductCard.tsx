'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface RegularProductCardProps {
  product: Product;
  className?: string;
}

export function RegularProductCard({ product, className }: RegularProductCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition hover:shadow-md overflow-hidden max-w-xs",
      className
    )}>
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Modern Badge with Clip-path */}
        {product.isPreorder && (
          <div className="absolute top-2 left-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1.5 shadow-lg backdrop-blur-sm"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%)'
              }}
            >
              Pre-order
            </div>
          </div>
        )}
        
        {product.isInStock && (
          <div className="absolute top-2 left-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1.5 shadow-lg backdrop-blur-sm"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%)'
              }}
            >
              In Stock
            </div>
          </div>
        )}
        
        {/* Expiry Timer for limited time offers */}
        {product.expiresAt && product.expiresAt > new Date() && (
          <div className="absolute top-2 right-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-semibold px-2 py-1 shadow-lg backdrop-blur-sm"
              style={{
                clipPath: 'polygon(8px 0%, 100% 0%, 100% 100%, 8px 100%, 0% 50%)'
              }}
            >
              🔥 Limited
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 justify-between p-3">
        {/* Content Area */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold line-clamp-2 mb-2">{product.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          {product.category && (
            <p className="text-xs text-muted-foreground/80 mt-1 font-medium">
              {product.category}
            </p>
          )}
        </div>

        {/* Bottom Section - Pricing and Action */}
        <div className="mt-3 space-y-3">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-xs",
                      i < Math.floor(product.rating!)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Estimated Delivery for Pre-orders */}
          {product.isPreorder && product.estimatedDelivery && (
            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">
              <Clock className="h-3 w-3" />
              <span>Est. delivery: {product.estimatedDelivery}</span>
            </div>
          )}

          {/* CTA Button */}
          <Button
            className="w-full gap-2 text-xs font-medium"
            size="sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-3 w-3" />
            {product.isPreorder ? "Pre-order Now" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}