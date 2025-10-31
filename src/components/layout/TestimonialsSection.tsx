'use client';

import React from 'react';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="section-py bg-neutral-50">
      <div className="container-safe">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="mb-4">What our customers say</h2>
          <p className="text-lg text-neutral-600">
            Real experiences from people who trust Queenkay for their shopping needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-neutral-900 mb-6 italic">
                &quot;{testimonial.review}&quot;
              </p>
              <div className="border-t border-neutral-200 pt-4">
                <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-sm text-neutral-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
