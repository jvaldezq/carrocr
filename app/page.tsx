import TopCars from "@/sections/TopCars/TopCars";
import {Suspense} from "react";
import {TopCarsSkeleton} from "@/sections/TopCars/TopCarsSkeleton";
import CarDialog from "@/sections/CarDialog/CarDialog";

export default function Home() {
    return (
        <main className="min-h-dvh pt-20">
            <Suspense fallback={<TopCarsSkeleton/>}>
                <TopCars/>
            </Suspense>
            <CarDialog/>
        </main>
    );
}
