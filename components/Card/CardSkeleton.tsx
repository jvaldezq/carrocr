import {Skeleton} from "@/components/ui/skeleton";

export const CardSkeleton = () => {
    return (
        <article className="animate-fade animate-once animate-duration-700 animate-delay-0 rounded-lg">
            <Skeleton className="h-[180px] rounded-2xl bg-primary/[0.2] dark:bg-primary/[0.7]"/>
            <div className="p-2 grid grid-cols-2 justify-between gap-2">
                <Skeleton className="h-4 w-1/2 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                <Skeleton className="h-3 w-1/3 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                <Skeleton className="h-2 w-1/4 col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                <Skeleton className="h-2 w-1/4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                <Skeleton className="h-4 w-1/6 bg-primary/[0.2] dark:bg-primary/[0.7] justify-self-end"/>
            </div>
        </article>
    );
};
