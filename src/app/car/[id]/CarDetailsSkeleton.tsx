import { Skeleton } from '@/components/ui/skeleton';

export const CarDetailsSkeleton = () => {
  return (
    <section>
      <div className="hidden md:grid grid-cols-3 gap-4 justify-between">
        <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
      <div className="flex md:hidden">
        <Skeleton className="h-[300px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <div className="grid grid-cols-2 lg:col-span-2 lg:grid-cols-3 gap-2 text-tertiary font-light">
          <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        </div>
      </div>
    </section>
  );
};
