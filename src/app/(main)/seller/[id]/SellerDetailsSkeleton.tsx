import { Skeleton } from '@/components/ui/skeleton';

export const SellerDetailsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 grid md:grid-cols-2 justify-center items-center gap-6 md:justify-start md:items-start relative">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <Skeleton className="w-16 h-16 rounded-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-[250px] h-6  bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="w-[250px] h-4  bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="w-[250px] h-4  bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <Skeleton className="w-[250px] h-4  bg-primary/[0.2] dark:bg-primary/[0.7]" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 absolute top-0 right-1 md:relative">
        <Skeleton className="md:w-24 md:h-24 w-10 h-10 rounded-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="w-[80px] h-4  bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
    </div>
  );
};
