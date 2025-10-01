'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, ShoppingCart, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpotlightItem } from '@/data/spotlight';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  item: SpotlightItem;
  className?: string;
}

export function SpotlightCard({ 
  item, 
  className
}: SpotlightCardProps) {
  const timeRemaining = item.expiresAt 
    ? Math.ceil((item.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={cn(
      "group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-orange-200", 
      className
    )}>
      {/* Spotlight Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 z-10">
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-bold">{item.badge}</span>
        </div>
      </div>

      {/* Product Image */}
      <Link href={`/shop/${item.productId}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-gray-50 mt-10">
          {/* Product Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Discount Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-3 py-1">
              -{item.discount}% OFF
            </Badge>
          </div>

          {/* Timer Badge */}
          {item.isLimitedTime && timeRemaining && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-3 py-1 flex items-center gap-1">
                <Timer className="w-3 h-3" />
                {timeRemaining}d left
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 space-y-4">
        <Link href={`/shop/${item.productId}`} className="block">
          {/* Title */}
          <h3 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors text-lg">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-orange-600">
              ${item.spotlightPrice.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
              Save ${(item.originalPrice - item.spotlightPrice).toFixed(2)}
            </span>
          </div>
        </Link>

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Add spotlight item to cart:', item.productId);
          }}
        >
          <ShoppingCart className="mr-2 w-5 h-5" />
          Grab This Deal
        </Button>

        {/* Limited Time Notice */}
        {item.isLimitedTime && (
          <p className="text-xs text-center text-gray-500 mt-2">
            ⚡ Limited time offer - Act fast!
          </p>
        )}
      </div>
    </div>
  );
}