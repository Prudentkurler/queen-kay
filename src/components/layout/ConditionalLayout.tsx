'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import GeminiChat from '../ai/GeminiChat';
import { CartDrawer } from '../cart/CartDrawer';

export function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Hide Header and Footer for dashboard and admin routes
  const isDashboardRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');
  
  if (isDashboardRoute) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <GeminiChat />
        <CartDrawer />
      </div>
    );
  }
  
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <GeminiChat />
      <CartDrawer />
    </div>
  );
}
