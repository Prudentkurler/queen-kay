import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';

describe('useCart', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems()).toBe(0);
    expect(result.current.subtotal()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());
    
    const mockItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 100,
      image: '/test.jpg',
      type: 'instock' as const,
      qty: 1,
    };

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe('Test Product');
    expect(result.current.totalItems()).toBe(1);
    expect(result.current.subtotal()).toBe(100);
  });

  it('should increment quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart());
    
    const mockItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 100,
      image: '/test.jpg',
      type: 'instock' as const,
      qty: 1,
    };

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].qty).toBe(2);
    expect(result.current.totalItems()).toBe(2);
    expect(result.current.subtotal()).toBe(200);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());
    
    const mockItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 100,
      image: '/test.jpg',
      type: 'instock' as const,
      qty: 1,
    };

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeItem('test-1');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems()).toBe(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart());
    
    const mockItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 100,
      image: '/test.jpg',
      type: 'instock' as const,
      qty: 1,
    };

    act(() => {
      result.current.addItem(mockItem);
    });

    act(() => {
      result.current.updateQty('test-1', 5);
    });

    expect(result.current.items[0].qty).toBe(5);
    expect(result.current.totalItems()).toBe(5);
    expect(result.current.subtotal()).toBe(500);
  });

  it('should calculate shipping estimate', () => {
    const { result } = renderHook(() => useCart());
    
    const mockItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 100,
      image: '/test.jpg',
      type: 'instock' as const,
      weight: 2,
      qty: 1,
    };

    act(() => {
      result.current.addItem(mockItem);
    });

    const shipping = result.current.shippingEstimate();
    expect(shipping).toBeGreaterThan(0);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());
    
    const mockItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 100,
      image: '/test.jpg',
      type: 'instock' as const,
      qty: 1,
    };

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});