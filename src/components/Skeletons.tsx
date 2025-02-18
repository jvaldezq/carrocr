import { Skeleton } from '@/components/ui/skeleton';

export const TopCarsSkeleton = () => {
  return (
    <section className="max-w-screen-3xl mx-auto px-2 mt-8">
      <Skeleton className="w-1/4 h-10 mb-8 rounded-2xl bg-primary/[0.2] dark:bg-primary/[0.7]" />
      <div className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  );
};

export const CardSkeleton = () => {
  return (
    <article className="animate-fade animate-once animate-duration-700 animate-delay-0 rounded-lg">
      <Skeleton className="h-[180px] rounded-2xl bg-primary/[0.2] dark:bg-primary/[0.7]" />
      <div className="p-2 grid grid-cols-2 justify-between gap-2">
        <Skeleton className="h-4 w-1/2 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-3 w-1/3 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-2 w-1/4 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-2 w-1/4 bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-4 w-1/6 bg-primary/[0.2] dark:bg-primary/[0.7] justify-self-end" />
      </div>
    </article>
  );
};
