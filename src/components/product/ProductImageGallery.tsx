'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
}

export const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<HTMLDivElement | null>(null);
  const [thumbApi, setThumbApi] = useState<HTMLDivElement | null>(null);

  const onThumbClick = useCallback((index: number) => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(index);
  }, [mainApi, thumbApi]);

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(selectedIndex);
  }, [mainApi, thumbApi, selectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
  }, [mainApi, onSelect]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={setMainApi}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="flex-grow-0 flex-shrink-0 w-full" key={index}>
              <Image src={src} alt="Product image" width={800} height={800} className="w-full h-auto object-contain rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden mt-4" ref={setThumbApi}>
        <div className="flex gap-4">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`flex-grow-0 flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${index === selectedIndex ? 'border-primary' : 'border-transparent'}`}
              onClick={() => onThumbClick(index)}
            >
              <Image src={src} alt="Product thumbnail" width={100} height={100} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
