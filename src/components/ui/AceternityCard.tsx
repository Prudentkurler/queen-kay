import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MagicBorder } from './magic-border';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useToast } from '@/components/ui/toast';

interface AceternityCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
  className?: string;
}

export const AceternityCard = ({ product, className }: AceternityCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event propagation
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      originalPrice: parseFloat(product.price.replace('$', '')),
      image: product.image,
      qty: 1,
      type: 'preorder',
      weight: 1.5,
      category: 'General',
      estimatedDelivery: '3-5 business days',
    });
    toast({ title: 'Added to cart', description: `${product.name} added to your cart` });
  };

  return (
    <Link href={`/shop/${product.id}`} className={cn("group relative flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-xl border border-white/[0.1] p-8", className)}>
      <MagicBorder />
      <Image
        src={product.image}
        alt={product.name}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="relative z-10 w-full">
        <h3 className="text-2xl font-bold text-white">{product.name}</h3>
        <p className="text-lg font-normal text-stone-300 mb-4">{product.price}</p>
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default AceternityCard;
