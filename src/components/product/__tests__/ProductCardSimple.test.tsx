import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCardSimple } from '../ProductCardSimple';
import { useCart } from '@/store/useCart';

// Mock the useCart hook
jest.mock('@/store/useCart');
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'A test product description',
  price: 99.99,
  originalPrice: 120.00,
  image: '/test-image.jpg',
  category: 'electronics',
  stock: 10,
  rating: 4.5,
  reviewCount: 25,
  type: 'instock' as const,
  featured: false,
  weight: 1,
  createdAt: new Date().toISOString(),
  views: 100,
  isPreorder: false,
  isInStock: true,
};

const mockAddItem = jest.fn();

beforeEach(() => {
  mockUseCart.mockReturnValue({
    items: [],
    isOpen: false,
    addItem: mockAddItem,
    removeItem: jest.fn(),
    updateQty: jest.fn(),
    clearCart: jest.fn(),
    toggleDrawer: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    totalItems: () => 0,
    subtotal: () => 0,
    shippingEstimate: () => 0,
    taxEstimate: () => 0,
    grandTotal: () => 0,
    toOrderPayload: () => ({}),
  });
});

describe('ProductCardSimple', () => {
  it('renders product information correctly', () => {
    render(<ProductCardSimple product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('shows original price when discounted', () => {
    render(<ProductCardSimple product={mockProduct} />);
    
    expect(screen.getByText('$120.00')).toBeInTheDocument();
  });

  it('displays rating and review count', () => {
    render(<ProductCardSimple product={mockProduct} />);
    
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(25)')).toBeInTheDocument();
  });

  it('shows correct CTA for in-stock products', () => {
    render(<ProductCardSimple product={mockProduct} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('shows correct CTA for preorder products', () => {
    const preorderProduct = { 
      ...mockProduct, 
      type: 'preorder' as const,
      isPreorder: true,
      isInStock: false,
    };
    render(<ProductCardSimple product={preorderProduct} />);
    
    expect(screen.getByText('Pre-order')).toBeInTheDocument();
  });
});