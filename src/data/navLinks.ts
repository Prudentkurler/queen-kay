import { 
  Home, 
  ShoppingBag, 
  Clock, 
  Star, 
  Info, 
  MessageCircle,
  Search,
  ShoppingCart,
  User
} from 'lucide-react';

export interface NavLink {
  name: string;
  href: string;
  icon?: any;
}

export const mainNavLinks: NavLink[] = [
  {
    name: 'Home',
    href: '/',
    icon: Home
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: ShoppingBag
  },
  {
    name: 'Pre-order',
    href: '/preorder',
    icon: Clock
  },
  {
    name: 'Spotlight',
    href: '/spotlight',
    icon: Star
  },
  {
    name: 'About',
    href: '/about',
    icon: Info
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: MessageCircle
  }
];

export const utilityNavItems = [
  {
    name: 'Search',
    icon: Search,
    action: 'search'
  },
  {
    name: 'Cart',
    icon: ShoppingCart,
    action: 'cart',
    badge: true
  },
  {
    name: 'Profile',
    icon: User,
    action: 'profile'
  }
];