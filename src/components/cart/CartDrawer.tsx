"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { ShoppingCart, Plus, Minus, X, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { formatCurrency } from "@/lib/cart-utils";
import { motion } from "framer-motion";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeDrawer,
    updateQty,
    removeItem,
    totalItems,
    subtotal,
    shippingEstimate,
    taxEstimate,
    grandTotal,
  } = useCart();

  const itemCount = totalItems();
  const sub = subtotal();
  const shipping = shippingEstimate();
  const tax = taxEstimate();
  const total = grandTotal();

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      {/* Drawer Content */}
      <DrawerContent className="w-full sm:w-[420px] ml-auto h-full bg-white flex flex-col border-l border-neutral-200">
        <DrawerHeader className="border-b border-neutral-200 bg-white">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-neutral-900">
              Shopping Cart
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                className="rounded-full p-2 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-neutral-600" />
              </button>
            </DrawerClose>
          </div>
          {itemCount > 0 && (
            <p className="text-sm text-neutral-600 mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          )}
        </DrawerHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-neutral-600 mb-6">
                Add some products to get started
              </p>
              <DrawerClose asChild>
                <Link href="/shop">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">Browse Products</Button>
                </Link>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-start gap-3 py-4 border-b border-neutral-200 last:border-0"
                >
                  <Link href={`/shop/${item.productId}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${item.productId}`}>
                      <h4 className="text-sm font-medium text-neutral-900 line-clamp-2 mb-1 hover:text-blue-500 transition-colors">
                        {item.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-neutral-500 mb-3">
                      {item.type === "preorder" ? "Pre-order" : "In Stock"}
                      {item.category && ` • ${item.category}`}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="h-7 w-7 rounded-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-neutral-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-neutral-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="h-7 w-7 rounded-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-neutral-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-neutral-900">
                          {formatCurrency(item.price * item.qty)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-xs text-neutral-500 line-through">
                            {formatCurrency(item.originalPrice * item.qty)}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-xs text-neutral-600 hover:text-red-600 transition-colors flex items-center gap-1"
                      >
                        <X className="h-3 w-3" />
                        Remove
                      </button>
                      <button
                        className="text-xs text-neutral-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                      >
                        <Heart className="h-3 w-3" />
                        Save for later
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals and actions */}
        {items.length > 0 && (
          <DrawerFooter className="border-t border-neutral-200 bg-neutral-50 px-4 py-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium text-neutral-900">{formatCurrency(sub)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium text-neutral-900">
                  {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium text-neutral-900">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-3 border-t border-neutral-200">
                <span className="text-neutral-900">Total</span>
                <span className="text-neutral-900">{formatCurrency(total)}</span>
              </div>
            </div>
            
            {sub < 500 && sub > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  Add {formatCurrency(500 - sub)} more for free shipping
                </p>
              </div>
            )}
            
            {shipping === 0 && sub > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800">
                  You qualify for free shipping!
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <DrawerClose asChild>
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base">
                    Proceed to Checkout
                  </Button>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link href="/shop/cart" className="block">
                  <Button variant="outline" className="w-full border-neutral-200 text-neutral-900 hover:bg-neutral-100 h-12">
                    View Full Cart
                  </Button>
                </Link>
              </DrawerClose>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
