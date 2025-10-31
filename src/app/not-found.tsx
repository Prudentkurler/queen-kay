'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 blur-3xl"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative z-10">
                Page Not Found
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <p className="text-muted-foreground">
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="min-w-[160px]">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="min-w-[160px]">
              <Link href="/shop">
                <Search className="mr-2 h-5 w-5" />
                Browse Shop
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => window.history.back()}
              className="min-w-[160px]"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 p-6 bg-accent/50 rounded-lg border"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              If you think this is a mistake, please contact our support team.
            </p>
            <Button asChild variant="secondary">
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}