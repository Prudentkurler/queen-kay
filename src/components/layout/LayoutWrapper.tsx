'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import GeminiChat from '@/components/ai/GeminiChat';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
