export interface SpotlightItem {
  id: string;
  productId: string;
  title: string;
  description: string;
  discount: number;
  originalPrice: number;
  spotlightPrice: number;
  image: string;
  badge: string;
  isLimitedTime: boolean;
  expiresAt?: Date;
  featured: boolean;
}

export const spotlightItems: SpotlightItem[] = [
  {
    id: 'spotlight-1',
    productId: '1',
    title: 'Flash Sale: Premium Wireless Earbuds',
    description: 'Limited time offer on our best-selling wireless earbuds with premium sound quality.',
    discount: 45,
    originalPrice: 129.99,
    spotlightPrice: 71.49,
    image: '/products/1g.png',
    badge: 'Flash Sale',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    featured: true
  },
  {
    id: 'spotlight-2',
    productId: '3',
    title: 'Designer Handbag Collection',
    description: 'Exclusive pre-order discount on luxury designer handbags.',
    discount: 40,
    originalPrice: 249.99,
    spotlightPrice: 149.99,
    image: '/products/3b.png',
    badge: 'Exclusive',
    isLimitedTime: false,
    featured: true
  },
  {
    id: 'spotlight-3',
    productId: '6',
    title: 'Organic Beauty Bundle',
    description: 'Complete skincare routine with natural, organic ingredients at unbeatable prices.',
    discount: 35,
    originalPrice: 89.99,
    spotlightPrice: 58.49,
    image: '/products/6g.png',
    badge: 'Bundle Deal',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    featured: true
  },
  {
    id: 'spotlight-4',
    productId: '5',
    title: 'Gaming Gear Special',
    description: 'Professional gaming headset with immersive 7.1 surround sound.',
    discount: 30,
    originalPrice: 99.99,
    spotlightPrice: 69.99,
    image: '/products/5bl.png',
    badge: 'Gaming Deal',
    isLimitedTime: true,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    featured: false
  }
];

export const getFeaturedSpotlight = () => 
  spotlightItems.filter(item => item.featured);

export const getLimitedTimeOffers = () => 
  spotlightItems.filter(item => item.isLimitedTime && item.expiresAt && item.expiresAt > new Date());