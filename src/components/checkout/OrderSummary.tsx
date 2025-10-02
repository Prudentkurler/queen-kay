'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/store/useCart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/cart-utils';
import { Truck, Clock, Package } from 'lucide-react';

export function OrderSummary() {
  const { items, subtotal, shippingEstimate, taxEstimate, grandTotal } = useCart();

  const sub = subtotal();
  const shipping = shippingEstimate();
  const tax = taxEstimate();
  const total = grandTotal();

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
            >
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Qty: {item.qty}</span>
                  {item.type === 'preorder' && (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Pre-order
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(item.price * item.qty)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} items)</span>
            <span>{formatCurrency(sub)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Shipping
            </span>
            <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (12.5%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-accent-light/50 p-3 rounded-lg text-xs text-muted-foreground">
          <div className="flex items-center gap-1 mb-1">
            <Truck className="h-3 w-3" />
            <span className="font-medium">Shipping Information</span>
          </div>
          <p>Free shipping on orders over {formatCurrency(500)}</p>
          <p>Standard delivery: 5-7 business days</p>
        </div>
      </CardContent>
    </Card>
  );
}