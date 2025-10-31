'use client';
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';

interface Product {
  image: string;
  name: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {products.map((product, index) => (
          <div className="embla__slide" key={index}>
            <Image src={product.image} alt={product.name} width={500} height={500} className="rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
