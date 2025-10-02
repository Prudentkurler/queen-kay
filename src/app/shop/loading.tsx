import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <Skeleton className="h-12 w-72 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-8" />
            <Skeleton className="h-8 w-32 mx-auto" />
          </div>
        </div>
      </section>

      {/* Search and Filters Skeleton */}
      <section className="py-8 border-b bg-background/95 backdrop-blur-sm sticky top-16 z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <Skeleton className="h-10 w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ProductGridSkeleton count={12} />
        </div>
      </section>
    </div>
  );
}