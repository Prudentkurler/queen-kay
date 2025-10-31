'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  priceRanges: PriceRange[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPriceRange: PriceRange;
  setSelectedPriceRange: (range: PriceRange) => void;
}

export const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  categories, 
  priceRanges, 
  selectedCategory, 
  setSelectedCategory, 
  selectedPriceRange, 
  setSelectedPriceRange 
}: FilterSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 h-full w-80 bg-base-100 shadow-lg z-50 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Filters</h3>
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              <X />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="radio radio-primary"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.label}
                      checked={selectedPriceRange.label === range.label}
                      onChange={() => setSelectedPriceRange(range)}
                      className="radio radio-primary"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
