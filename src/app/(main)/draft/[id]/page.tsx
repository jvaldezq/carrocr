import Details from '@/app/(main)/draft/[id]/Details';
import { fetchDraftById } from '@/app/(main)/draft/[id]/service/getDraftById';
import type { Metadata } from 'next';
import Image from 'next/image';
import DefaultImage from '@/assets/placeholder.webp';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const { data, status } = await fetchDraftById(id);

  const { year, make, model, trim, transType, condition } = data ?? {};
  const title = `${year} ${make} ${model} ${trim} - Transmisión ${transType}, Condición ${condition}`;
  const description = `Descubre este impecable`;

  return { title, description };
}

export default async function Draft({ params }: Props) {
  const id = (await params).id;
  const { data, status } = await fetchDraftById(id);

  const { make, model, trim, year, license, images } = data ?? {};

  const image = images?.imgBodyFL ? images?.imgBodyFL : DefaultImage;

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <div className="flex flex-col gap-4 md:flex-row justify-between md:justify-start items-start md:items-center mb-8">
        <Image
          src={image}
          alt="Thumbnail"
          width={620}
          height={350}
          className="justify-self-center self-center object-cover rounded-lg h-full w-full md:h-40 md:w-80"
          priority={true}
        />
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-3xl font-bold text-tertiary">
              {make} {model}
            </h1>
            <h1 className="text-2xl font-bold text-tertiary">{trim}</h1>
          </div>
          <p className="text-xl text-tertiary">{license}</p>
          <p className="text-xl text-primary">{year}</p>
        </div>
      </div>
      <Details car={data} />
    </main>
  );
}
