'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Truck, 
  Clock,
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/store/useCart';
import { useToast } from '@/components/ui/toast';
import { createOrderPayload } from '@/lib/cart-utils';
import { downloadInvoice } from '@/lib/invoice-utils';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().min(2, 'Please enter your state'),
  zipCode: z.string().min(5, 'Please enter a valid zip code'),
  country: z.string().min(2, 'Please enter your country'),
  shippingMethod: z.enum(['standard', 'express', 'pickup']),
  paymentMethod: z.enum(['momo', 'bank_transfer']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { items, clearCart, subtotal, shippingEstimate, taxEstimate, grandTotal } = useCart();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'standard',
      paymentMethod: 'momo',
      country: 'Ghana',
    },
  });

  const shippingMethod = watch('shippingMethod');
  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = createOrderPayload(
        {
          items,
          subtotal: subtotal(),
          shipping: shippingEstimate(),
          tax: taxEstimate(),
          total: grandTotal(),
        },
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}, ${data.country}`,
        },
        {
          method: data.shippingMethod === 'standard' ? 'local' : data.shippingMethod === 'express' ? 'regional' : 'pickup',
          deliveryAddress: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}, ${data.country}`,
        },
        data.paymentMethod
      );

      // Clear cart and show success
      clearCart();
      
      toast({
        title: 'Order Placed Successfully!',
        description: `Order ${orderData.orderId} has been created`,
      });

      // Download invoice
      downloadInvoice({
        orderId: orderData.orderId,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        items: orderData.items,
        pricing: orderData.pricing,
        createdAt: orderData.createdAt,
      });

      // Redirect to confirmation
      router.push(`/order-confirmation?orderId=${orderData.orderId}`);
      
    } catch (error) {
      toast({
        title: 'Order Failed',
        description: 'There was an error processing your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">First Name</label>
              <Input
                {...register('firstName')}
                className="mt-1"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Last Name</label>
              <Input
                {...register('lastName')}
                className="mt-1"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input
              {...register('email')}
              type="email"
              className="mt-1"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input
              {...register('phone')}
              className="mt-1"
              placeholder="+233 20 123 4567"
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Street Address</label>
            <Input
              {...register('address')}
              className="mt-1"
              placeholder="123 Main Street"
            />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">City</label>
              <Input
                {...register('city')}
                className="mt-1"
                placeholder="Accra"
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">State/Region</label>
              <Input
                {...register('state')}
                className="mt-1"
                placeholder="Greater Accra"
              />
              {errors.state && (
                <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Zip Code</label>
              <Input
                {...register('zipCode')}
                className="mt-1"
                placeholder="00233"
              />
              {errors.zipCode && (
                <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Country</label>
              <Input
                {...register('country')}
                className="mt-1"
                placeholder="Ghana"
              />
              {errors.country && (
                <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('shippingMethod')}
                type="radio"
                value="standard"
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-medium">Standard Delivery</div>
                <div className="text-sm text-muted-foreground">5-7 business days • Free on orders over GH₵500</div>
              </div>
              <div className="font-medium">GH₵15</div>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('shippingMethod')}
                type="radio"
                value="express"
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-medium">Express Delivery</div>
                <div className="text-sm text-muted-foreground">2-3 business days</div>
              </div>
              <div className="font-medium">GH₵35</div>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('shippingMethod')}
                type="radio"
                value="pickup"
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-medium">Store Pickup</div>
                <div className="text-sm text-muted-foreground">Available next business day</div>
              </div>
              <div className="font-medium text-success">Free</div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('paymentMethod')}
                type="radio"
                value="momo"
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-medium">Mobile Money (MOMO)</div>
                <div className="text-sm text-muted-foreground">Pay with MTN, Vodafone, or AirtelTigo</div>
              </div>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('paymentMethod')}
                type="radio"
                value="bank_transfer"
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-muted-foreground">Direct bank transfer</div>
              </div>
            </label>
          </div>

          {paymentMethod === 'momo' && (
            <div className="mt-4 p-4 bg-accent-light rounded-lg">
              <p className="text-sm text-muted-foreground">
                After placing your order, you'll receive MOMO payment instructions via SMS.
              </p>
            </div>
          )}

          {paymentMethod === 'bank_transfer' && (
            <div className="mt-4 p-4 bg-accent-light rounded-lg">
              <p className="text-sm text-muted-foreground">
                Bank details will be provided after order confirmation. Please include your order number in the transfer reference.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent"></div>
            Processing Order...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Place Order
          </div>
        )}
      </Button>
    </form>
  );
}