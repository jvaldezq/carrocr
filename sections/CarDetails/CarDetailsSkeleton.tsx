import {CardSkeleton} from "@/components/Card/CardSkeleton";

export const CarDetailsSkeleton = () => {
    return (
        <section
            className="px-4 mt-8">
            <div
                className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grod-cols-8">
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
            </div>
        </section>
    );
};
