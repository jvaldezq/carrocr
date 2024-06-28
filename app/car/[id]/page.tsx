import {CarDetailsSkeleton} from "@/sections/CarDetails/CarDetailsSkeleton";
import {Suspense} from "react";
import CarDetails from "@/sections/CarDetails/CarDetails";

export default function Car({params}: { params: { id: string } }) {
    return (
        <main className="min-h-dvh max-w-screen-2xl mx-auto px-4 pt-20">
            <Suspense fallback={<CarDetailsSkeleton/>}>
                <CarDetails id={params.id}/>
            </Suspense>
        </main>
    );
}
