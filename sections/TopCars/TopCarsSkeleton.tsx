import {CardSkeleton} from "@/components/Card/CardSkeleton";
import {Skeleton} from "@/components/ui/skeleton";

export const TopCarsSkeleton = () => {
    return (
        <section
            className="max-w-screen-3xl mx-auto px-2 mt-8">
            <Skeleton className="w-1/4 h-10 mb-8 rounded-2xl bg-primary/[0.2] dark:bg-primary/[0.7]"/>
            <div
                className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
            </div>
        </section>
    );
};
