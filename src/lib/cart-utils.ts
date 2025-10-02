import { CartItem } from "@/store/useCart";

/**
 * Calculate subtotal from cart items
 */
export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
}

/**
 * Calculate shipping based on items, subtotal, and shipping method
 * Free shipping over GH₵ 500
 */
export function calcShipping(
  items: CartItem[],
  shippingMethod: 'pickup' | 'local' | 'regional' = 'local'
): number {
  const subtotal = calcSubtotal(items);
  
  // Free shipping for pickup
  if (shippingMethod === 'pickup') return 0;
  
  // Free shipping over threshold
  if (subtotal >= 500) return 0;

  const totalWeight = items.reduce(
    (total, item) => total + (item.weight || 1) * item.qty,
    0
  );

  // Calculate based on weight and zone
  if (shippingMethod === 'local') {
    return totalWeight > 5 ? 30 : 20;
  }
  
  if (shippingMethod === 'regional') {
    return totalWeight > 5 ? 50 : 35;
  }

  // Default fallback
  return 25;
}

/**
 * Calculate tax (VAT at 12.5%)
 */
export function calcTax(subtotal: number): number {
  return subtotal * 0.125;
}

/**
 * Calculate grand total
 */
export function calcTotal(
  subtotal: number,
  shipping: number,
  tax: number
): number {
  return subtotal + shipping + tax;
}

/**
 * Format currency in Ghana Cedis
 */
export function formatCurrency(amount: number): string {
  return `GH₵ ${amount.toFixed(2)}`;
}

/**
 * Get estimated delivery date string
 */
export function getEstimatedDelivery(
  shippingMethod: 'pickup' | 'local' | 'regional' | 'standard',
  productType: 'instock' | 'preorder' = 'instock'
): string {
  if (productType === 'preorder') {
    return '4-6 weeks (pre-order)';
  }

  if (shippingMethod === 'pickup') {
    return '1-2 business days (pickup)';
  }

  if (shippingMethod === 'local') {
    return '3-5 business days';
  }

  if (shippingMethod === 'regional') {
    return '7-10 business days';
  }

  return '7-14 business days';
}

/**
 * Create order payload for API submission
 */
export function createOrderPayload(
  cart: {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  },
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
  },
  shipping: {
    method: 'pickup' | 'local' | 'regional';
    pickupPoint?: string;
    deliveryAddress?: string;
  },
  paymentMethod: 'momo' | 'bank_transfer'
) {
  return {
    orderId: `QK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    customer: {
      ...customer,
      name: `${customer.firstName} ${customer.lastName}`, // Add name for backwards compatibility
    },
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      qty: item.qty,
      type: item.type,
      estimatedDelivery: item.estimatedDelivery,
    })),
    shipping,
    payment: {
      method: paymentMethod,
      status: 'pending',
    },
    pricing: {
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      tax: cart.tax,
      total: cart.total,
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
}
