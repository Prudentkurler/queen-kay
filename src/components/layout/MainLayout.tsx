'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Pages where we don't want navbar/footer
  const excludePages = [
    '/signin',
    '/signup', 
    '/dashboard'
  ];
  
  const shouldShowNavAndFooter = !excludePages.some(page => pathname.startsWith(page));

  return (
    <div className="min-h-screen flex flex-col sm:p-x-0 lg:px-6">
      {shouldShowNavAndFooter && <Navbar />}
      <main className={`flex-1 ${shouldShowNavAndFooter ? 'px-4 sm:px-6 lg:px-12 pt-4' : ''}`}>
        {children}
      </main>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
}