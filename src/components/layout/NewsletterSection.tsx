'use client';

import React from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5">
          <CardContent className="p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                Stay in the loop
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get notified about flash sales, new arrivals, and exclusive pre-order deals. 
                Join our community of smart shoppers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 bg-background border-0 shadow-sm"
                />
                <Button type="submit" size="lg" className="h-12 px-8">
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}