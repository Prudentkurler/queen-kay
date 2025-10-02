'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function CartItemSkeleton() {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Image Skeleton */}
          <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg" />

          {/* Content Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-8 rounded" />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
              
              <div className="text-right space-y-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CartSummarySkeleton() {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        
        <div className="space-y-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        <div className="mt-6 pt-6 border-t space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-9 w-32" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-9 w-48 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:sticky lg:top-24 h-fit">
            <CartSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}