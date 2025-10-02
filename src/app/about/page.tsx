'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Globe, 
  Shield, 
  Truck, 
  Heart,
  Star,
  Users,
  Award,
  Clock,
  CheckCircle,
  Target,
  Zap
} from 'lucide-react';

const stats = [
  { label: 'Happy Customers', value: '50K+', icon: Users },
  { label: 'Products Delivered', value: '200K+', icon: Truck },
  { label: 'Countries Served', value: '25+', icon: Globe },
  { label: 'Years of Experience', value: '8+', icon: Award }
];

const values = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every product undergoes rigorous quality checks before reaching you.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our top priority. We go above and beyond to serve you.'
  },
  {
    icon: Globe,
    title: 'Global Sourcing',
    description: 'We partner with trusted manufacturers worldwide to bring you the best products.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We constantly evolve our platform to provide you with the latest trends and technology.'
  }
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: '/team/sarah.jpg',
    description: 'Visionary leader with 15+ years in international trade and e-commerce.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Operations',
    image: '/team/michael.jpg',
    description: 'Operations expert ensuring smooth logistics and customer satisfaction.'
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Product',
    image: '/team/emily.jpg',
    description: 'Product strategist curating the best selections for our customers.'
  },
  {
    name: 'David Kim',
    role: 'CTO',
    image: '/team/david.jpg',
    description: 'Technology leader building the future of online shopping experiences.'
  }
];

const milestones = [
  {
    year: '2016',
    title: 'Company Founded',
    description: 'Started as a small import business with a vision to connect global products with local customers.'
  },
  {
    year: '2018',
    title: 'Online Platform Launch',
    description: 'Launched our first e-commerce platform, revolutionizing how customers access international products.'
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description: 'Expanded operations to serve customers across 25+ countries with localized experiences.'
  },
  {
    year: '2022',
    title: 'Mobile App Release',
    description: 'Introduced our mobile app, making shopping more convenient and accessible for all customers.'
  },
  {
    year: '2024',
    title: 'AI-Powered Recommendations',
    description: 'Implemented advanced AI to provide personalized product recommendations and improved customer experience.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-pink-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-pink-600 bg-pink-50 border-pink-200">
              About Queenkay Importation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connecting You to the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">
                World's Best Products
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              For over 8 years, we've been bridging the gap between global innovation and local accessibility, 
              bringing you premium products from trusted manufacturers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold">
                Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2016, Queenkay Importation began with a simple mission: to make high-quality 
                  international products accessible to everyone. What started as a small import business 
                  has grown into a trusted global platform serving customers in over 25 countries.
                </p>
                <p>
                  Our founder, Sarah Chen, recognized the challenge many faced in accessing innovative 
                  products from international markets. With her background in international trade and 
                  passion for connecting cultures through commerce, she built Queenkay to bridge this gap.
                </p>
                <p>
                  Today, we work directly with carefully vetted manufacturers and suppliers worldwide, 
                  ensuring that every product meets our strict quality standards before reaching your doorstep.
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  Learn More About Our Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-violet-100 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-24 w-24 text-pink-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Global Connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our customers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate professionals dedicated to bringing you the best shopping experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-violet-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Key milestones that shaped our company and improved our service
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-pink-600 bg-pink-50">
                          {milestone.year}
                        </Badge>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-600 to-violet-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8 text-pink-100">
              To democratize access to quality products worldwide by creating seamless connections 
              between innovative manufacturers and discerning customers, while maintaining the highest 
              standards of service, quality, and trust.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Star className="h-8 w-8 mx-auto mb-3 text-pink-200" />
                <h3 className="font-semibold mb-2">Excellence</h3>
                <p className="text-pink-200 text-sm">Delivering exceptional quality in every product and interaction</p>
              </div>
              <div>
                <Globe className="h-8 w-8 mx-auto mb-3 text-pink-200" />
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-pink-200 text-sm">Making global products accessible to everyone, everywhere</p>
              </div>
              <div>
                <Heart className="h-8 w-8 mx-auto mb-3 text-pink-200" />
                <h3 className="font-semibold mb-2">Trust</h3>
                <p className="text-pink-200 text-sm">Building lasting relationships through transparency and reliability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Shopping?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of satisfied customers and discover amazing products from around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white" asChild>
              <Link href="/shop">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}