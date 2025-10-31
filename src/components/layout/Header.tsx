'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{email: string; name: string} | null>(null);
  const router = useRouter();
  const totalItems = useCart((state) => state.totalItems());
  const openDrawer = useCart((state) => state.openDrawer);

  useEffect(() => {
    setUser(getCurrentUser());
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200' : 'bg-white'
      }`}
    >
      <div className="container-safe">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 hover:bg-neutral-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            Queenkay
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/shop" className="text-sm font-medium hover:opacity-70 transition-opacity">
              Shop
            </Link>
            <Link href="/preorder" className="text-sm font-medium hover:opacity-70 transition-opacity">
              Pre-order
            </Link>
            <Link href="/about" className="text-sm font-medium hover:opacity-70 transition-opacity">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative"
              onClick={openDrawer}
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-neutral-600" />
                </button>

                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg z-20">
                      <div className="p-3 border-b border-neutral-200">
                        <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                        <p className="text-xs text-neutral-600">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/signin">
                  <button className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                    Sign in
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <nav className="container-safe py-4 space-y-1">
            <Link 
              href="/shop" 
              className="block px-4 py-3 text-base font-medium hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/preorder" 
              className="block px-4 py-3 text-base font-medium hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pre-order
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-base font-medium hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-base font-medium hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Auth Links */}
            {user ? (
              <>
                <div className="border-t border-neutral-200 pt-3 mt-3">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                    <p className="text-xs text-neutral-600">{user.email}</p>
                  </div>
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-3 px-4 py-3 text-base font-medium hover:bg-neutral-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-base font-medium hover:bg-neutral-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-neutral-200 pt-3 mt-3 space-y-2 px-4">
                <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                    Sign in
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-lg transition-colors">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
