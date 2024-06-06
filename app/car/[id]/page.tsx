import {Suspense} from "react";
import CarDetails from "@/sections/CarDetails/CarDetails";
import {CarDetailsSkeleton} from "@/sections/CarDetails/CarDetailsSkeleton";

export default function Car({params}: { params: { id: string } }) {
    return (
        <main className="min-h-dvh pt-20">
            <Suspense fallback={<CarDetailsSkeleton/>}>
                <CarDetails id={params.id}/>
            </Suspense>
        </main>
    );
}
