'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/store/useCart';
import { useToast } from '@/components/ui/toast';
import type { Product } from '@/data/products';

interface ProductCardSimpleProps {
  product: Product;
  className?: string;
}

export const ProductCardSimple: React.FC<ProductCardSimpleProps> = ({ 
  product, 
  className 
}) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      type: (product.type || (product.isPreorder ? 'preorder' : 'instock')) as 'preorder' | 'instock',
      category: product.category,
      weight: product.weight || 1,
      qty: 1,
    };

    addItem(cartItem);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div 
      className={`group relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition-all duration-300 overflow-hidden hover:shadow-lg ${className || ''}`}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Product Link Wrapper */}
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Status Badge */}
          {(product.type === 'preorder' || product.isPreorder) && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-accent-light text-primary">
                <Clock className="w-3 h-3 mr-1" />
                Pre-order
              </Badge>
            </div>
          )}
          
          {(product.stock === 0 || !product.isInStock) && (
            <div className="absolute top-2 left-2">
              <Badge variant="destructive">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-destructive text-destructive-foreground">
                -{discountPercentage}%
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3">
          {/* Product Info */}
          <div className="flex-1 mb-3">
            <h3 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {product.description}
            </p>
            
            {/* Rating */}
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
                <span className="text-xs text-muted-foreground">
                  ({product.rating})
                </span>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Outside Link */}
      <div className="p-3 pt-0">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={product.stock === 0 || !product.isInStock}
          className="w-full gap-2 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          size="sm"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-3 w-3" />
          {(product.stock === 0 || !product.isInStock)
            ? 'Out of Stock'
            : (product.type === 'preorder' || product.isPreorder)
              ? 'Pre-order' 
              : 'Add to Cart'
          }
        </Button>
      </div>
    </motion.div>
  );
};