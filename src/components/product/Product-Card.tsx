"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useCart } from "@/store/useCart";
import { useToast } from "@/components/ui/toast";
import type { SpotlightItem } from "@/data/spotlight";

interface ProductCardProps {
  product: SpotlightItem;
  className?: string;
  variant?: 'spotlight' | 'regular';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className,
  variant = 'spotlight' 
}) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Debug logging to check data integrity
  if (!product) {
    console.error('ProductCard: product is undefined');
    return <div>Error: Product data missing</div>;
  }

  if (typeof product.spotlightPrice === 'undefined') {
    console.error('ProductCard: spotlightPrice is undefined for product:', product);
  }

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id.toString(),
      name: product.title || product.name || 'Product',
      price: product.spotlightPrice || product.price || product.originalPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      type: 'instock' as const,
      category: product.category || 'General',
      weight: product.weight || 1,
      qty: 1,
    };

    addItem(cartItem);
    toast({
      title: 'Added to cart',
      description: `${product.title || product.name} has been added to your cart`,
    });
  };

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
    <motion.div 
      className={`group relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition-all duration-300 overflow-hidden ${className || ''}`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title || product.name || 'Product'}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Limited Time Badge */}
        {product.isLimitedTime && timeLeft && timeLeft !== "Expired" && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {timeLeft}
            </Badge>
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && product.spotlightPrice && product.originalPrice > product.spotlightPrice && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-destructive text-destructive-foreground">
              -{Math.round(((product.originalPrice - product.spotlightPrice) / product.originalPrice) * 100)}%
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 justify-between p-3">
        {/* Content Area */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold line-clamp-2 mb-2">{product.title || product.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          
          {/* Rating if available */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.rating})</span>
            </div>
          )}
        </div>

        {/* Bottom Section - Pricing and Action */}
        <div className="mt-3 space-y-3">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-primary">
              ${product.spotlightPrice?.toFixed(2) || product.originalPrice?.toFixed(2) || '0.00'}
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
            onClick={handleAddToCart}
            className="w-full gap-2 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
            aria-label={`Add ${product.title || product.name} to cart`}
          >
            <ShoppingCart className="h-3 w-3" />
            {product.isLimitedTime ? "Grab Deal" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
