"use client";

import Link from "next/link";

interface CarEntryWrapperProps {
    children: React.ReactNode;
}

export const CarEntryWrapper = (props: CarEntryWrapperProps) => {
    const {children} = props;
    return <>
        {children}
        <div id="car-entry-footer" className="fixed flex flex-col bottom-0 justify-end w-full py-2 px-4 bg-secondary">
            <div className="grid grid-cols-3 gap-4 mb-2">
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-300 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-[600ms] animate-ease-linear"/>
            </div>
            <Link
                href='/car-entry/create'
                className='bg-primary rounded py-1 px-2 text-secondary text-lg w-fit self-end animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>SIGUIENTE</Link>
        </div>
    </>
}