'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: string;
}

interface MobileFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  filteredCount: number;
}

export function MobileFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  filteredCount 
}: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Filter Button - Only visible on small screens */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 h-14 w-14 p-0"
        >
          <Filter className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Filter Products</h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredCount} products available
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Categories */}
                <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                            selectedCategory === category.id
                              ? 'bg-primary text-primary-foreground shadow-md scale-[0.98]'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge 
                            variant={selectedCategory === category.id ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {category.count}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-muted/30">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                    size="lg"
                  >
                    Apply Filters ({filteredCount} products)
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}