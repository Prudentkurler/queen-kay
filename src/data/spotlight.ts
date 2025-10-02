export interface SpotlightItem {
  id: string;
  productId: string;
  title: string;
  name: string;
  description: string;
  discount: number;
  originalPrice: number;
  spotlightPrice: number;
  price: number;
  image: string;
  badge: string;
  isLimitedTime: boolean;
  expiresAt?: Date;
  featured: boolean;
  category: string;
  rating: number;
  weight: number;
}

export const spotlightItems: SpotlightItem[] = [
  {
    id: 'spotlight-1',
    productId: '1',
    title: 'Flash Sale: Premium Wireless Earbuds',
    name: 'Premium Wireless Earbuds',
    description: 'Limited time offer on our best-selling wireless earbuds with premium sound quality.',
    discount: 45,
    originalPrice: 129.99,
    spotlightPrice: 71.49,
    price: 71.49,
    image: '/products/1g.png',
    badge: 'Flash Sale',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    featured: true,
    category: 'Electronics',
    rating: 4.8,
    weight: 0.2
  },
  {
    id: 'spotlight-2',
    productId: '3',
    title: 'Designer Handbag Collection',
    name: 'Designer Handbag Collection',
    description: 'Exclusive pre-order discount on luxury designer handbags.',
    discount: 40,
    originalPrice: 249.99,
    spotlightPrice: 149.99,
    price: 149.99,
    image: '/products/3b.png',
    badge: 'Exclusive',
    isLimitedTime: false,
    featured: true,
    category: 'Fashion',
    rating: 4.6,
    weight: 0.8
  },
  {
    id: 'spotlight-3',
    productId: '6',
    title: 'Organic Beauty Bundle',
    name: 'Organic Beauty Bundle',
    description: 'Complete skincare routine with natural, organic ingredients at unbeatable prices.',
    discount: 35,
    originalPrice: 89.99,
    spotlightPrice: 58.49,
    price: 58.49,
    image: '/products/6g.png',
    badge: 'Bundle Deal',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    featured: true,
    category: 'Beauty & Health',
    rating: 4.9,
    weight: 0.3
  },
  {
    id: 'spotlight-4',
    productId: '5',
    title: 'Gaming Gear Special',
    name: 'Gaming Gear Special',
    description: 'Professional gaming headset with immersive 7.1 surround sound.',
    discount: 30,
    originalPrice: 99.99,
    spotlightPrice: 69.99,
    price: 69.99,
    image: '/products/5bl.png',
    badge: 'Gaming Deal',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    featured: true,
    category: 'Electronics',
    rating: 4.7,
    weight: 0.6
  },
  {
    id: 'spotlight-5',
    productId: '7',
    title: 'Smart Fitness Tracker',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
    discount: 35,
    originalPrice: 159.99,
    spotlightPrice: 103.99,
    price: 103.99,
    image: '/products/7g.png',
    badge: 'Health Tech',
    isLimitedTime: false,
    featured: true,
    category: 'Electronics',
    rating: 4.5,
    weight: 0.1
  },
  {
    id: 'spotlight-6',
    productId: '8',
    title: 'Wireless Speaker Pro',
    name: 'Wireless Speaker Pro',
    description: 'Portable Bluetooth speaker with premium sound quality.',
    discount: 25,
    originalPrice: 79.99,
    spotlightPrice: 59.99,
    price: 59.99,
    image: '/products/8b.png',
    badge: 'Audio Deal',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    featured: true,
    category: 'Electronics',
    rating: 4.4,
    weight: 0.5
  },
  {
    id: 'spotlight-7',
    productId: '2',
    title: 'Eco-Friendly Water Bottle',
    name: 'Eco-Friendly Water Bottle',
    description: 'Sustainable stainless steel water bottle with temperature control.',
    discount: 20,
    originalPrice: 39.99,
    spotlightPrice: 31.99,
    price: 31.99,
    image: '/products/2g.png',
    badge: 'Eco-Friendly',
    isLimitedTime: false,
    featured: true,
    category: 'Lifestyle',
    rating: 4.3,
    weight: 0.4
  },
  {
    id: 'spotlight-8',
    productId: '4',
    title: 'Luxury Skincare Set',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with natural organic ingredients.',
    discount: 40,
    originalPrice: 149.99,
    spotlightPrice: 89.99,
    price: 89.99,
    image: '/products/4p.png',
    badge: 'Beauty Sale',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    featured: true,
    category: 'Beauty & Health',
    rating: 4.8,
    weight: 0.3
  }
];

export const getFeaturedSpotlight = () => 
  spotlightItems.filter(item => item.featured);

export const getLimitedTimeOffers = () => 
  spotlightItems.filter(item => item.isLimitedTime && item.expiresAt && item.expiresAt > new Date());