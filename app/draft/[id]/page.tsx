interface Props {
    params: { id: string }
}

export default function Draft({params}: Props) {
    return (
        <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
            <h1>{params.id}</h1>
            {/*<Suspense fallback={<CarDetailsSkeleton/>}>*/}
            {/*    <CarDetails id={params.id}/>*/}
            {/*</Suspense>*/}
        </main>
    );
}
