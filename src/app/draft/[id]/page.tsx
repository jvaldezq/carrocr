type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Draft({ params }: Props) {
  const id = (await params).id;

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <h1>{id}</h1>
      {/*<Suspense fallback={<CarDetailsSkeleton/>}>*/}
      {/*    <CarDetails id={params.id}/>*/}
      {/*</Suspense>*/}
    </main>
  );
}
