'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/useCart';
import { useToast } from '@/components/ui/toast';

interface RegularProductCardProps {
  product: Product;
  className?: string;
}

export function RegularProductCard({ product, className }: RegularProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      type: product.isPreorder ? 'preorder' : 'instock',
      category: product.category,
      weight: product.weight || 1,
      qty: 1,
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <Link 
      href={`/shop/${product.id}`}
      className={cn(
        "group block bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Minimal Status Badge */}
        {product.isPreorder && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
              Pre-order
            </span>
          </div>
        )}
        
        {product.isInStock && !product.isPreorder && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
              In Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info - Clean & Minimal */}
      <div className="p-5">
        {/* Category - subtle */}
        {product.category && (
          <p className="text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wide">
            {product.category}
          </p>
        )}
        
        {/* Product Name */}
        <h3 className="text-base font-semibold text-neutral-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Description - minimal */}
        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-semibold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-green-600">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Estimated Delivery for Pre-orders - Clean */}
        {product.isPreorder && product.estimatedDelivery && (
          <p className="text-xs text-neutral-500 mb-4">
            Estimated delivery: {product.estimatedDelivery}
          </p>
        )}

        {/* Add to Cart Button - Minimal */}
        <button
          onClick={handleAddToCart}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.isPreorder ? "Pre-order" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}