
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
  Shield,
  Truck,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      <div className="min-h-screen bg-background">
        {/* Empty Cart */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                  <div className="relative bg-primary/10 p-8 rounded-full">
                    <ShoppingBag className="h-16 w-16 text-primary mx-auto" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet. 
                Start shopping to fill it up!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="min-w-[160px]">
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="min-w-[160px]">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Continue Browsing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground mt-2">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={clearCart}
              className="self-start sm:self-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.category}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.productId)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">Qty:</span>
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))}
                                  disabled={item.qty <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                                  {item.qty}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQty(item.productId, item.qty + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold text-lg text-foreground">
                                ${(item.price * item.qty).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="border-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({totalItemsCount} items)
                    </span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/shop">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}