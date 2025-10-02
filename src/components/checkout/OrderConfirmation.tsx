'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface OrderConfirmationProps {
  orderData: {
    orderId: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
    };
    total: number;
    items: Array<{
      name: string;
      qty: number;
      price: number;
    }>;
    estimatedDelivery: string;
  };
  onDownloadInvoice: () => void;
}

export function OrderConfirmation({ orderData, onDownloadInvoice }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We've sent a confirmation email to{' '}
            <span className="font-medium">{orderData.customer.email}</span>
          </p>

          {/* Order Details */}
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge variant="secondary">{orderData.orderId}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Customer:</span>
                  <p className="font-medium">
                    {orderData.customer.firstName} {orderData.customer.lastName}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <p className="font-medium">{orderData.estimatedDelivery}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Items Ordered:</h4>
                <div className="space-y-2">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} (x{item.qty})</span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-primary">${orderData.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onDownloadInvoice}
                variant="outline" 
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              
              <Button asChild className="flex-1">
                <Link href="/shop" className="flex items-center justify-center">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <Button variant="ghost" asChild className="w-full">
              <Link href="/" className="flex items-center justify-center">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="mt-8 bg-accent-light/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  <p>We'll process your order and prepare it for shipping</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  <p>You'll receive tracking information when your order ships</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  <p>Your order will arrive by {orderData.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}