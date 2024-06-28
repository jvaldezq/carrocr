import {Skeleton} from "@/components/ui/skeleton";

export const CarDetailsSkeleton = () => {
    return (
        <section>
            <div className='hidden md:grid grid-cols-3 gap-4 justify-between'>
                <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
            </div>
            <div className='flex md:hidden'>
                <Skeleton className="h-[300px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
                <div className="grid grid-cols-2 lg:col-span-2 lg:grid-cols-3 gap-2 text-tertiary font-light">
                    <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-[100px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
                <div
                    className="shadow-2xl p-2 rounded-2xl grid grid-cols-2 gap-2 justify-center items-center text-tertiary w-full justify-self-center">
                    <div className="col-span-2 flex justify-center border-b-[1px] border-solid py-2">
                        <Skeleton className="h-[20px] bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    </div>
                    <div className="flex flex-col gap-1 justify-self-center text-center relative">
                        <Skeleton className="h-[80px] rounded-full bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                        <div>
                            <Skeleton className="h-4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                            <Skeleton className="h-4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 divide-y text-tertiary font-light gap-1">
                        <div>
                            <Skeleton className="h-4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                            <Skeleton className="h-4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                        </div>
                        <div className="pt-1">
                            <Skeleton className="h-4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                            <Skeleton className="h-4 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
