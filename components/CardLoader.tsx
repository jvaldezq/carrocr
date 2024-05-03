import type { Car } from "@/lib/Models";
import { Skeleton } from "@/components/ui/skeleton";

interface Props extends Car {}

export const CardLoader = () => {
  return (
    <article className="animate-fade animate-once animate-duration-700 animate-delay-0 cursor-pointer">
      <Skeleton className="h-[220px] rounded-2xl bg-primary/[0.2] dark:bg-primary/[0.7]" />
      <div className="mt-2 grid grid-cols-2 text-tertiary gap-1">
        <Skeleton className="h-3 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-3 w-[30px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-3 w-[30px] bg-primary/[0.2] dark:bg-primary/[0.7] justify-self-end " />
        <Skeleton className="h-3 w-[30px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
        <Skeleton className="h-3 w-[30px] bg-primary/[0.2] dark:bg-primary/[0.7] justify-self-end" />
        <Skeleton className="h-3 w-[60px] bg-primary/[0.2] dark:bg-primary/[0.7]" />
      </div>
    </article>
  );
};
