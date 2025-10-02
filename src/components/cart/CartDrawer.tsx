"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
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
    openDrawer,
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
      {/* Trigger Button */}
      <DrawerTrigger asChild>
        <button
          onClick={openDrawer}
          className="relative p-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <ShoppingCart size={22} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {itemCount}
            </span>
          )}
        </button>
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="w-full sm:w-[420px] ml-auto h-full bg-background flex flex-col border-l">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-foreground">
              Your Cart
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                className="rounded-full p-1 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </div>
          {itemCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          )}
        </DrawerHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add some products to get started
              </p>
              <DrawerClose asChild>
                <Link href="/shop">
                  <Button>Browse Products</Button>
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
                  className="flex items-start gap-3 py-3 border-b border-border"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.type === "preorder" ? "Pre-order" : "In Stock"}
                      {item.category && ` • ${item.category}`}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="h-6 w-6 rounded-md border border-border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="h-6 w-6 rounded-md border border-border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {formatCurrency(item.price * item.qty)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatCurrency(item.originalPrice * item.qty)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals and actions */}
        {items.length > 0 && (
          <DrawerFooter className="border-t bg-muted/30 px-4 py-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(sub)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping estimate</span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (VAT)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <DrawerClose asChild>
                <Link href="/shop/cart" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link href="/checkout" className="flex-1">
                  <Button className="w-full">Checkout</Button>
                </Link>
              </DrawerClose>
            </div>
            {shipping === 0 && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                🎉 You qualify for free shipping!
              </p>
            )}
            {sub < 500 && sub > 0 && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                Add {formatCurrency(500 - sub)} more for free shipping
              </p>
            )}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
