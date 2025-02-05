import {Suspense} from "react";
import {CarDetailsSkeleton} from "@/sections/CarDetails/CarDetailsSkeleton";
import SellerDetails from "@/app/seller/[id]/SellerDetails";
import CarDialog from "@/sections/CarDialog/CarDialog";

interface Props {
    params: { id: string }
}


export default function Seller({params}: Props) {
    return (<main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
        <Suspense fallback={<CarDetailsSkeleton/>}>
            <SellerDetails id={params.id}/>
        </Suspense>
        <CarDialog/>
    </main>)
}
