'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, ShoppingCart, Timer, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
  compact?: boolean;
}

export function ProductCard({ 
  product, 
  className,
  showAddToCart = true,
  compact = false
}: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isExpiringSoon = product.expiresAt && product.expiresAt > new Date();
  const timeLeft = isExpiringSoon 
    ? Math.ceil((product.expiresAt!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card className={cn(
      "group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", 
      className
    )}>
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          {/* Placeholder for product image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
            <Package className="h-12 w-12 text-muted-foreground/30" />
          </div>
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs font-semibold shadow-sm">
                -{discountPercentage}%
              </Badge>
            )}
            {product.isPreorder && (
              <Badge variant="secondary" className="text-xs shadow-sm">
                Pre-order
              </Badge>
            )}
            {product.isInStock && (
              <Badge className="text-xs shadow-sm bg-green-600 hover:bg-green-700">
                In Stock
              </Badge>
            )}
          </div>

          {/* Expiring Soon Badge */}
          {isExpiringSoon && (
            <div className="absolute right-3 top-3">
              <Badge variant="outline" className="text-xs bg-background/90 backdrop-blur-sm">
                <Timer className="h-3 w-3 mr-1" />
                {timeLeft}d left
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className={cn("p-4 space-y-3", compact && "p-3 space-y-2")}>
        <Link href={`/shop/${product.id}`}>
          <div className="space-y-2">
            {/* Category */}
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className={cn(
              "font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-2",
              compact ? "text-sm" : "text-base"
            )}>
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && !compact && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.floor(product.rating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-bold text-primary",
                compact ? "text-base" : "text-lg"
              )}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Delivery Info */}
            {product.isPreorder && product.estimatedDelivery && !compact && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Est. delivery: {product.estimatedDelivery}</span>
              </div>
            )}
          </div>
        </Link>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <Button 
            className={cn(
              "w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
              compact ? "h-8 text-xs" : "h-9"
            )}
            variant={product.isInStock ? "default" : "secondary"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Add to cart:', product.id);
            }}
          >
            <ShoppingCart className={cn("mr-2", compact ? "h-3 w-3" : "h-4 w-4")} />
            {product.isPreorder ? 'Pre-order Now' : 'Add to Cart'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}