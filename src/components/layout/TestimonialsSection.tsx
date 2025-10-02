'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Customer Reviews
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust Queenkay Importation 
            for their importing needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-sm leading-relaxed mb-6 text-muted-foreground">
                  "{testimonial.review}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">{testimonial.productPurchased}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testimonial.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-background rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}