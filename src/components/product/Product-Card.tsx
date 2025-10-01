"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SpotlightItem } from "@/data/spotlight";

interface ProductCardProps {
  product: SpotlightItem;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  // Debug logging to check data integrity
  if (!product) {
    console.error('ProductCard: product is undefined');
    return <div>Error: Product data missing</div>;
  }

  if (typeof product.spotlightPrice === 'undefined') {
    console.error('ProductCard: spotlightPrice is undefined for product:', product);
  }

  // ⏳ Countdown for limited-time offers
  useEffect(() => {
    if (product.isLimitedTime && product.expiresAt) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = product.expiresAt!.getTime() - now;

        if (distance <= 0) {
          clearInterval(timer);
          setTimeLeft("Expired");
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }, 60000); // update every minute

      return () => clearInterval(timer);
    }
  }, [product]);

  return (
    <div className={`group relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition hover:shadow-md overflow-hidden ${className || ''}`}>
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Remove badges for cleaner look */}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 justify-between p-3">
        {/* Content Area */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold line-clamp-2 mb-2">{product.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Bottom Section - Pricing and Action */}
        <div className="mt-3 space-y-3">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-primary">
              ${product.spotlightPrice?.toFixed(2) || '0.00'}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice?.toFixed(2) || '0.00'}
              </span>
            )}
          </div>

          {/* Timer */}
          {product.isLimitedTime && timeLeft && timeLeft !== "Expired" && (
            <div className="flex items-center gap-1 text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-md">
              <Clock className="h-3 w-3" />
              <span>Ends in {timeLeft}</span>
            </div>
          )}

          {/* CTA Button */}
          <Button
            className="w-full gap-2 text-xs font-medium"
            size="sm"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart className="h-3 w-3" />
            {product.isLimitedTime ? "Grab Deal" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};
