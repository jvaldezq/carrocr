import { Skeleton } from '@/components/ui/skeleton';

export const CarDetailsSkeleton = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row mb-4">
        <Skeleton className="h-[50px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
      <div className="flex">
        <Skeleton className="h-[300px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mt-8">
        <Skeleton className="h-[50px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-[50px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-[50px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-[50px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="hidden md:flex h-[50px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="hidden md:flex h-[50px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[300px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
        </div>
        <Skeleton className="h-[300px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
    </section>
  );
};
