'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/store/useCart';

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    updateQty, 
    subtotal, 
    totalItems,
    clearCart 
  } = useCart();

  const totalItemsCount = totalItems();
  const totalPrice = subtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto p-8"
        >
          <ShoppingBag className="h-24 w-24 text-neutral-300 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet. 
            Start shopping to fill it up!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white min-w-[180px]">
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[180px] border-neutral-200">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Browsing
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Shopping Cart
            </h1>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCart}
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
          <p className="text-lg text-neutral-600">
            {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-neutral-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-neutral-600">GH₵ {item.price.toFixed(2)} each</p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))}
                            disabled={item.qty <= 1}
                            className="h-8 w-8 p-0 text-neutral-700 hover:bg-neutral-100"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium text-neutral-900">
                            {item.qty}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQty(item.productId, item.qty + 1)}
                            className="h-8 w-8 p-0 text-neutral-700 hover:bg-neutral-100"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.productId)}
                            className="ml-auto text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="bg-white border border-neutral-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal ({totalItemsCount} items)</span>
                    <span className="font-medium text-neutral-900">GH₵ {totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-neutral-600">
                    <span>Tax</span>
                    <span className="font-medium text-neutral-900">Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-neutral-900">Total</span>
                      <span className="text-2xl font-bold text-neutral-900">
                        GH₵ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <Link href="/checkout">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full mt-3 border-neutral-200">
                  <Link href="/shop">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
