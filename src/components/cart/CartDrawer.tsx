"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter } from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  // Dummy data – later replace with global state (Zustand/Context)
  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 45,
      qty: 2,
      img: "/products/headphones.jpg",
    },
    {
      id: 2,
      name: "Smartwatch",
      price: 60,
      qty: 1,
      img: "/products/watch.jpg",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Drawer direction="right">
      {/* Trigger Button */}
      <DrawerTrigger asChild>
        <button className="relative p-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white">
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        </button>
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="w-full sm:w-[400px] ml-auto h-full bg-white flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold">Your Cart</DrawerTitle>
        </DrawerHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3 border-b">
              <Image
                src={item.img}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.qty} × ${item.price}
                </p>
              </div>
              <p className="text-sm font-semibold">${item.price * item.qty}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t bg-gray-50">
          <div className="flex justify-between mb-3 text-sm font-medium">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex gap-2">
            <Link href="/cart" className="flex-1">
              <Button variant="outline" className="w-full">
                View Cart
              </Button>
            </Link>
            <Link href="/checkout" className="flex-1">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Checkout
              </Button>
            </Link>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
