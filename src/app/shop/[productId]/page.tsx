'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/useCart';
import { useToast } from '@/components/ui/toast';
import { getInStockProducts, getPreorderProducts } from '@/data/products';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { useGeminiSummary } from '@/lib/useGeminiSummary';

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  const allProducts = [...getInStockProducts(), ...getPreorderProducts()];
  const product = allProducts.find(p => p.id.toString() === productId);

  if (!product) {
    notFound();
  }

  const images = [product.image, product.image, product.image, product.image];
  const { summary, loading, error } = useGeminiSummary(product.description);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      qty: quantity,
      type: product.isPreorder ? 'preorder' as const : 'instock' as const,
      category: product.category,
      weight: product.weight || 1,
    };
    addItem(cartItem);
    toast({ title: 'Added to cart', description: `${quantity}x ${product.name} added to your cart` });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({ title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist' });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ProductImageGallery images={images} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-base-content/70">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            
            {/* AI-Powered Summary */}
            <div className="p-4 bg-base-200 rounded-lg">
              {loading && <p className="text-base-content/80 italic">Generating AI summary...</p>}
              {error && <p className="text-error">Error: {error}</p>}
              {summary && <p className="text-base-content/80 italic">{summary}</p>}
            </div>

            <p className="text-base-content/80 leading-relaxed">{product.description}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={handleWishlist}>
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                Wishlist
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
