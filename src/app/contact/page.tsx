'use client';

import React from 'react';
import { Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white">
        <div className="container-safe py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-8">Get in touch.</h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Have a question about your order or need help? 
              We&apos;re here to assist you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-py">
        <div className="container-safe">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="mb-8">Contact information</h2>
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-neutral-600" />
                    <h3 className="text-lg font-semibold">Email</h3>
                  </div>
                  <p className="text-neutral-600 mb-1">Our team typically replies within 24 hours</p>
                  <a href="mailto:support@queenkay.com" className="text-blue-500 hover:text-blue-600">
                    support@queenkay.com
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-neutral-600" />
                    <h3 className="text-lg font-semibold">Phone</h3>
                  </div>
                  <p className="text-neutral-600 mb-1">Monday to Friday, 9AM to 6PM EST</p>
                  <a href="tel:+15551234567" className="text-blue-500 hover:text-blue-600">
                    +1 (555) 123-4567
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-neutral-600" />
                    <h3 className="text-lg font-semibold">Business hours</h3>
                  </div>
                  <div className="space-y-1 text-neutral-600">
                    <p>Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM – 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-8">Send us a message</h2>
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">Thanks for reaching out! We&apos;ll get back to you soon.</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="John Appleseed"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input w-full"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order inquiry</option>
                    <option value="product">Product question</option>
                    <option value="shipping">Shipping & delivery</option>
                    <option value="returns">Returns & refunds</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input w-full resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <span>Send message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-py bg-neutral-50">
        <div className="container-safe">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently asked questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  How long does shipping typically take?
                </h3>
                <p className="text-neutral-600">
                  Standard shipping takes 30-45 business days for international orders from China. 
                  Domestic orders within the US arrive in 3-5 business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  What is your return policy?
                </h3>
                <p className="text-neutral-600">
                  We offer a 30-day return policy for most items. Products must be in original condition 
                  with all tags and packaging intact.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  How can I track my order?
                </h3>
                <p className="text-neutral-600">
                  Once your order ships, you&apos;ll receive a tracking number via email. 
                  You can also track your orders in your account dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Do you offer expedited shipping?
                </h3>
                <p className="text-neutral-600">
                  Yes, we offer express shipping options that can deliver your order faster. 
                  Contact us for availability and pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}