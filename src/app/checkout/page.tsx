'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/store/useCart';
import { CheckoutForm } from '@/components/forms/Checkout';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/checkout/EmptyCart';

export default function CheckoutPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="lg:order-1">
              <CheckoutForm />
            </div>

            {/* Order Summary */}
            <div className="lg:order-2">
              <OrderSummary />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}