

'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/store/useCart';
import { useToast } from '@/components/ui/toast';
import { ProductCardSimple } from '@/components/product/ProductCardSimple';
import { getInStockProducts, getPreorderProducts } from '@/data/products';
import { formatCurrency, getEstimatedDelivery } from '@/lib/cart-utils';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  // Find product from both in-stock and preorder products
  const allProducts = [...getInStockProducts(), ...getPreorderProducts()];
  const product = allProducts.find(p => p.id.toString() === params.productId);

  if (!product) {
    notFound();
  }

  // Mock image gallery (in real app, product would have multiple images)
  const images = [product.image, product.image, product.image]; // Placeholder for multiple images

  // Mock related products
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      type: (product.type || (product.isPreorder ? 'preorder' : 'instock')) as 'preorder' | 'instock',
      category: product.category,
      weight: product.weight || 1,
      qty: quantity,
    };

    addItem(cartItem);
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} added to your cart`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
    });
  };

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="py-4 border-b">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8 lg:py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="aspect-square w-full overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      aspect-square w-20 overflow-hidden rounded-md border-2 transition-colors
                      ${selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'}
                    `}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {(product.type === 'preorder' || product.isPreorder) && (
                  <Badge variant="secondary" className="bg-accent-light text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    Pre-order
                  </Badge>
                )}
                {(product.stock === 0 || !product.isInStock) && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating}) • {Math.floor(Math.random() * 100 + 50)} reviews
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-sm text-success">
                    You save {formatCurrency(product.originalPrice! - product.price)}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || !product.isInStock}
                    className="flex-1 h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {(product.stock === 0 || !product.isInStock)
                      ? 'Out of Stock'
                      : (product.type === 'preorder' || product.isPreorder)
                        ? 'Pre-order Now' 
                        : 'Add to Cart'
                    }
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleWishlist}
                    className="h-12 gap-2"
                    size="lg"
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                    Wishlist
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-12"
                    size="lg"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free shipping over $500</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <span>30-day returns</span>
                </div>
              </div>

              {/* Estimated Delivery */}
              {(product.type === 'preorder' || product.isPreorder) ? (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Pre-order Information</h4>
                    <p className="text-sm text-muted-foreground">
                      This item is available for pre-order. Expected shipping: 4-6 weeks.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Delivery Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Estimated delivery: {getEstimatedDelivery('standard', 'instock')}
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 border-t">
        <div className="container max-w-7xl mx-auto px-6 lg:px-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      This premium product is carefully sourced from trusted international suppliers 
                      and undergoes rigorous quality checks before reaching you. Each item is selected 
                      for its exceptional quality, innovative design, and excellent value proposition.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Product Specifications</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">SKU:</dt>
                          <dd className="font-medium">QK-{product.id}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Category:</dt>
                          <dd className="font-medium capitalize">{product.category}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Weight:</dt>
                          <dd className="font-medium">{product.weight || 1} kg</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Stock:</dt>
                          <dd className="font-medium">
                            {(product.stock || 0) > 0 ? `${product.stock || 0} available` : 'Out of stock'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Features</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• High-quality materials</li>
                        <li>• International supplier sourced</li>
                        <li>• Quality assured</li>
                        <li>• Fast shipping available</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Shipping Information</h4>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>• Standard shipping: 7-14 business days</p>
                        <p>• Express shipping: 3-5 business days</p>
                        <p>• Free shipping on orders over $500</p>
                        <p>• Pickup available at select locations</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Returns & Exchanges</h4>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>• 30-day return policy</p>
                        <p>• Items must be in original condition</p>
                        <p>• Free return shipping on defective items</p>
                        <p>• Exchange available for size/color variants</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCardSimple key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}