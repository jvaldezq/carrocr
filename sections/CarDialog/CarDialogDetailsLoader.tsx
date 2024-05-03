import {Skeleton} from "@/components/ui/skeleton";

export const CarDialogDetailsLoader = () => {
    return <article
        className='text-tertiary grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-start animate-fade animate-once animate-duration-[600ms] animate-delay-0 animate-ease-linear'>
        <Skeleton className="h-3 w-10 md:col-span-2 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
        <div className='mb-2 flex flex-col md:flex-row justify-between items-start md:items-end md:col-span-2'>
            <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
        </div>
        <div>
            <Skeleton className="h-[395px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]"/>
        </div>
        <div className='flex flex-col'>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                    <Skeleton className="h-3 w-32 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <Skeleton className="h-3 w-32 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <Skeleton className="h-3 w-32 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                    <Skeleton className="h-3 w-36 bg-primary/[0.2] dark:bg-primary/[0.7]"/>
                </div>
            </div>
            <Skeleton className="h-6 w-36 bg-primary/[0.2] dark:bg-primary/[0.7] self-center"/>

            <Skeleton className="h-10 w-36 bg-primary/[0.2] dark:bg-primary/[0.7] mt-4 self-end"/>
        </div>
    </article>
}