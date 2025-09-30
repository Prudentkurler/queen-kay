export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  isPreorder: boolean;
  isInStock: boolean;
  rating?: number;
  reviewCount?: number;
  badges?: string[];
  estimatedDelivery?: string;
  discount?: number;
  isSpotlight?: boolean;
  expiresAt?: Date;
}

export const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Toys & Games',
  'Automotive',
  'Books & Media'
];

export const mockProducts: Product[] = [
  // Pre-order Products
  {
    id: '1',
    name: 'Premium Wireless Earbuds Pro',
    price: 89.99,
    originalPrice: 129.99,
    image: '/products/1g.png',
    category: 'Electronics',
    description: 'High-quality wireless earbuds with noise cancellation and premium sound quality.',
    isPreorder: true,
    isInStock: false,
    rating: 4.8,
    reviewCount: 124,
    badges: ['Pre-order', 'Popular'],
    estimatedDelivery: '2-3 weeks',
    discount: 31,
    isSpotlight: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 299.99,
    image: '/products/2g.png',
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    isPreorder: true,
    isInStock: false,
    rating: 4.6,
    reviewCount: 89,
    badges: ['Pre-order', 'New'],
    estimatedDelivery: '3-4 weeks',
    discount: 33
  },
  {
    id: '3',
    name: 'Luxury Designer Handbag',
    price: 149.99,
    originalPrice: 249.99,
    image: '/products/3b.png',
    category: 'Fashion',
    description: 'Elegant designer handbag crafted with premium materials.',
    isPreorder: true,
    isInStock: false,
    rating: 4.9,
    reviewCount: 67,
    badges: ['Pre-order', 'Limited'],
    estimatedDelivery: '2-3 weeks',
    discount: 40,
    isSpotlight: true
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 299.99,
    originalPrice: 399.99,
    image: '/products/4p.png',
    category: 'Electronics',
    description: 'High-performance camera lens for professional photography.',
    isPreorder: true,
    isInStock: false,
    rating: 4.7,
    reviewCount: 45,
    badges: ['Pre-order'],
    estimatedDelivery: '4-5 weeks',
    discount: 25
  },

  // In-stock Products
  {
    id: '5',
    name: 'Wireless Gaming Headset',
    price: 79.99,
    originalPrice: 99.99,
    image: '/products/5bl.png',
    category: 'Electronics',
    description: 'Immersive gaming headset with 7.1 surround sound.',
    isPreorder: false,
    isInStock: true,
    rating: 4.5,
    reviewCount: 156,
    badges: ['In Stock', 'Fast Shipping'],
    discount: 20,
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  },
  {
    id: '6',
    name: 'Organic Skincare Set',
    price: 59.99,
    originalPrice: 89.99,
    image: '/products/6g.png',
    category: 'Beauty & Health',
    description: 'Complete organic skincare routine with natural ingredients.',
    isPreorder: false,
    isInStock: true,
    rating: 4.8,
    reviewCount: 203,
    badges: ['In Stock', 'Bestseller'],
    discount: 33,
    isSpotlight: true
  },
  {
    id: '7',
    name: 'Smart Home Security Camera',
    price: 119.99,
    originalPrice: 159.99,
    image: '/products/7g.png',
    category: 'Electronics',
    description: 'HD security camera with night vision and motion detection.',
    isPreorder: false,
    isInStock: true,
    rating: 4.4,
    reviewCount: 98,
    badges: ['In Stock'],
    discount: 25,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    price: 39.99,
    originalPrice: 59.99,
    image: '/products/8b.png',
    category: 'Electronics',
    description: 'Compact speaker with powerful bass and waterproof design.',
    isPreorder: false,
    isInStock: true,
    rating: 4.6,
    reviewCount: 234,
    badges: ['In Stock', 'Waterproof'],
    discount: 33
  }
];

export const getProductsByCategory = (category: string) => 
  mockProducts.filter(product => product.category === category);

export const getPreorderProducts = () => 
  mockProducts.filter(product => product.isPreorder);

export const getInStockProducts = () => 
  mockProducts.filter(product => product.isInStock);

export const getSpotlightProducts = () => 
  mockProducts.filter(product => product.isSpotlight);

export const getExpiringProducts = () => 
  mockProducts.filter(product => product.expiresAt && product.expiresAt > new Date());