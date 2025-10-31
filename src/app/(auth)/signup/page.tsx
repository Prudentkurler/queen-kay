'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Sign up functionality is not available in demo mode. Please use the demo credentials to sign in.');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="text-neutral-600 hover:text-neutral-900">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Sign Up Card */}
        <Card className="shadow-lg border border-neutral-200 bg-white">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">QK</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">Create Account</CardTitle>
              <CardDescription className="text-neutral-600">
                Join Queenkay to start shopping
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Mode Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-700">
                  <p className="font-medium mb-1">Demo Mode</p>
                  <p>Sign up is disabled in demo mode. Use the demo credentials to sign in:</p>
                  <p className="font-mono text-xs mt-2 bg-white px-2 py-1 rounded border border-blue-200">
                    demo@queenkay.com / demo123
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-neutral-700">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="h-12 border-neutral-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-neutral-700">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="h-12 border-neutral-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 border-neutral-200 focus:border-blue-500 focus:ring-blue-500"
                  disabled
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="h-12 pr-12 border-neutral-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-12 pr-12 border-neutral-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-sm"
                disabled
              >
                Create Account (Demo Only)
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm text-neutral-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}