interface SellerProps {
    params: { id: string }
}

export default function Seller({params}: SellerProps) {
    return (
        <main className="min-h-dvh max-w-screen-2xl mx-auto px-4 pt-20">
            Thi is the seller ID: {params.id}
            {/*<Suspense fallback={<CarDetailsSkeleton/>}>*/}
            {/*    <CarDetails id={params.id}/>*/}
            {/*</Suspense>*/}
        </main>
    );
}
