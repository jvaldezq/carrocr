interface DealerProps {
    params: { id: string }
}

export default function Dealer({params}: DealerProps) {
    return (
        <main className="min-h-dvh max-w-screen-2xl mx-auto px-4 pt-20">
            Thi is the Dealer ID: {params.id}
            {/*<Suspense fallback={<CarDetailsSkeleton/>}>*/}
            {/*    <CarDetails id={params.id}/>*/}
            {/*</Suspense>*/}
        </main>
    );
}
