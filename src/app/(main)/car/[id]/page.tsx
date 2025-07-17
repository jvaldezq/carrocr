import type { Metadata } from 'next';
import { fetchCarById } from '@/app/(main)/car/[id]/service/fetchCarById';
import Image from 'next/image';
import { tw } from '@/lib/utils';
import { MoneyFormatter, NumberFormatter } from '@/lib/NumberFormats';
import { Activity, Ban, BriefcaseBusiness, Calendar, CalendarClock, Fuel, Handshake, MapPin, Settings } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import { factoryToolTips } from './mock';
import { SellerContact } from './SellerContact';
import { getUserDataById } from '@/lib/getUserById';


type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const { data, status } = await fetchCarById(id);

  const {
    year,
    make,
    model,
    trim,
    transType,
    condition,
    thumbnail,
    state,
    price,
    mileage,
    mileageType,
  } = data ?? {};

  const title = `${year} ${make} ${model} ${trim} en ${state}`;
  const description = `Compra este ${year} ${make} ${model} ${trim}, ${condition}, ${transType}, ${mileage} ${mileageType}, por $${price?.toLocaleString()} en ${state}. ¡Haz clic para más detalles!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://carrocr.com/car/${id}`,
      images: [
        {
          url: thumbnail || '',
          width: 1200,
          height: 630,
          alt: `${year} ${make} ${model} ${trim}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnail || ''],
    },
    alternates: {
      canonical: `https://carrocr.com/car/${id}`,
    },
  };
}

export default async function Car({ params }: Props) {
  const id = (await params).id;
  const { data } = await fetchCarById(id);
  const user = await getUserDataById(data?.accountData?.userID ?? '');

  const {
    model,
    price,
    currency,
    mileage = 0,
    fuelType,
    make,
    year,
    transType,
    condition,
    trim,
    thumbnail,
    state,
    bodyName,
    driveType,
    images,
    negotiableTF,
    allowTradeTF,
    factorySpecifications,
    inspectionYear,
    restrictionDay,
    sellerComment,
    accountData,
  } = data ?? {};

  return (
    <main>
      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src={thumbnail || ''}
          width={1200}
          height={630}
          alt={`${year} ${make} ${model} ${trim}`}
          className={
            tw(
              'drop-shadow-2xl',
              'drop-shadow-white',
              'w-full',
              'h-[300px]',
              'md:h-[500px]',
              'object-cover'
            )
          }
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-0% to-25% from-white to-transparent" />
      </div>
      <div className="max-w-screen-xl mx-auto px-2 py-6 flex flex-col gap-4">
        <div className={tw(
          'flex',
          'md:flex-row flex-col',
          'items-center',
          'justify-between',
          'md:items-start',
          'gap-2'
        )}>
          <div className='flex flex-col gap-2'>
            <h1 className="text-3xl font-bold text-black">{`${make} ${model} ${trim}`}</h1>
            <p className="text-black/50">
              {`${bodyName} · ${driveType} · ${condition}`}
            </p>
          </div>

          <h2 className='text-2xl font-bold text-black mt-4 md:mt-0'>{MoneyFormatter(price, currency)}</h2>
        </div>

        <hr className={tw(
          'w-full',
          'border',
          'border-black/[0.06]',
          'rounded-full',
          'my-4'
        )} />

        <div className={tw(
          'mb-16',
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-4',
          'gap-6'
        )}>

          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Calendar className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">{year}</p>
              <p className="text-sm text-black/50">Año</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Fuel className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">{fuelType}</p>
              <p className="text-sm text-black/50">Combustible</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Settings className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">{transType}</p>
              <p className="text-sm text-black/50">Transmisión</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Activity className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">{`${NumberFormatter(mileage || 0)}km`}</p>
              <p className="text-sm text-black/50">Kilometraje</p>
            </div>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-4 md:gap-6 mb-16'>
          <Image
            src={images?.imgBodyFR || ''}
            width={500}
            height={320}
            alt={`Front right side view of ${year} ${make} ${model} ${trim}`}
            className={
              tw(
                'rounded-xl',
                'w-full',
                'h-[225px]',
                'md:h-[320px]',
                'object-cover'
              )
            }
          />
          <Image
            src={images?.imgBodyRR || ''}
            width={500}
            height={320}
            alt={`${year} ${make} ${model} ${trim}`}
            className={
              tw(
                'rounded-xl',
                'w-full',
                'h-[225px]',
                'md:h-[320px]',
                'object-cover'
              )
            }
          />
        </div>

        <div className='flex flex-col gap-4 mb-16'>
          <h4 className={tw(
            'text-lg',
            'font-semibold',
            'text-black'
          )}>Descripción general (AI)</h4>
          <p className='text-sm font-light'>In production for over a decade, the Lamborghini Aventador has reached the end of its long and winding road. To celebrate the model&apos;s success, the 2022 Aventador comes only in new LP 780-4 Ultimae specification, its sonorous 6.5-liter V12 engine now equipped with titanium intake valves to make the Ultimae the most powerful example of the supercar ever made.
            Given the mere 10-horsepower increase over last year&apos;s Aventador SVJ (Super Veloce Jota). But among supercar owners, bragging rights count, and buyers who scoop up examples of the 2022 Aventador from the final run of 350 coupes and 250 convertibles will be able to tell anyone interested enough to listen that their limited-edition car has the most powerful naturally aspirated standard-production V12 in Lamborghini history.</p>

          {
            sellerComment && (
              <>
                <h4 className={tw(
                  'text-lg',
                  'font-semibold',
                  'text-black',
                  'mt-2'
                )}>Comentario del vendedor</h4>
                <p className='text-sm font-light'>{sellerComment}</p>
              </>
            )
          }
        </div>

        <div className={tw(
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'md:gap-12',
          'gap-6',
          'items-center',
        )}>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className="flex items-center gap-3">
              <div className="bg-black/5 rounded-xl p-3">
                <MapPin className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm text-black font-bold">{state}</p>
                <p className="text-sm text-black/50">Ubicación</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-black/5 rounded-xl p-3">
                <Handshake className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm text-black font-bold">{allowTradeTF ? 'Sí' : 'No'}</p>
                <p className="text-sm text-black/50">Intercambio</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-black/5 rounded-xl p-3">
                <BriefcaseBusiness className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm text-black font-bold">{negotiableTF ? 'Sí' : 'No'}</p>
                <p className="text-sm text-black/50">Negociable</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/5 rounded-xl p-3">
                <CalendarClock className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm text-black font-bold">{inspectionYear}</p>
                <p className="text-sm text-black/50">Inspección Válida Hasta</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/5 rounded-xl p-3">
                <Ban className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm text-black font-bold">{restrictionDay ?? '-'}</p>
                <p className="text-sm text-black/50">Restricción</p>
              </div>
            </div>
          </div>
          <Image
            src={images?.imgBodyRL || ''}
            width={500}
            height={320}
            alt={`Rear left side view of ${year} ${make} ${model} ${trim}`}
            className={
              tw(
                'rounded-xl',
                'w-full',
                'h-[225px]',
                'md:h-[320px]',
                'object-cover'
              )
            }
          />
        </div>

        <div className='grid md:grid-cols-2 gap-4 md:gap-6 md:mb-16 mb-8'>
          <Image
            src={images?.imgBodyRR || ''}
            width={500}
            height={320}
            alt={`${year} ${make} ${model} ${trim}`}
            className={
              tw(
                'rounded-xl',
                'w-full',
                'h-[225px]',
                'md:h-[320px]',
                'object-cover'
              )
            }
          />
          <Image
            src={images?.imgInteriorCluster || ''}
            width={500}
            height={320}
            alt={`Interior dashboard and instrument cluster of ${year} ${make} ${model} ${trim}`}
            className={
              tw(
                'rounded-xl',
                'w-full',
                'h-[225px]',
                'md:h-[320px]',
                'object-cover'
              )
            }
          />
        </div>

        <div className={tw(
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-3',
          'md:gap-12',
          'gap-10',
          'mb-16'
        )}>
          <div className='flex flex-col gap-3'>
            <h4 className={tw(
              'text-lg',
              'font-semibold',
              'text-black',
            )}>Motor y potencia (Fábrica)</h4>
            {Object.entries(factorySpecifications?.engine || {}).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <Tooltip
                  tooltipContent={
                    factoryToolTips.engine[key as keyof typeof factoryToolTips.engine]
                      .description
                  }
                >
                  <p className='text-sm font-light'>{
                    factoryToolTips.engine[key as keyof typeof factoryToolTips.engine]
                      .name
                  } <strong className='font-semibold pl-4'>{value}{' '}
                      {
                        factoryToolTips.engine[key as keyof typeof factoryToolTips.engine]
                          ?.prefix
                      }</strong></p>
                </Tooltip>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-3'>
            <h4 className={tw(
              'text-lg',
              'font-semibold',
              'text-black',
            )}>Economía (Fábrica)</h4>
            {Object.entries(factorySpecifications?.economy || {}).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <Tooltip
                  tooltipContent={
                    factoryToolTips.economy[key as keyof typeof factoryToolTips.economy]
                      .description
                  }
                >
                  <p className='text-sm font-light'>{
                    factoryToolTips.economy[key as keyof typeof factoryToolTips.economy]
                      .name
                  } <strong className='font-semibold pl-4'>{value}{' '}
                      {
                        factoryToolTips.economy[key as keyof typeof factoryToolTips.economy]
                          ?.prefix
                      }</strong></p>
                </Tooltip>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-3'>
            <h4 className={tw(
              'text-lg',
              'font-semibold',
              'text-black',
            )}>Dimensiones (Fábrica)</h4>
            {Object.entries(factorySpecifications?.dimensions || {}).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <Tooltip
                  tooltipContent={
                    factoryToolTips.dimensions[key as keyof typeof factoryToolTips.dimensions]
                      .description
                  }
                >
                  <p className='text-sm font-light'>{
                    factoryToolTips.dimensions[key as keyof typeof factoryToolTips.dimensions]
                      .name
                  } <strong className='font-semibold pl-4'>{value}{' '}
                      {
                        factoryToolTips.dimensions[key as keyof typeof factoryToolTips.dimensions]
                          ?.prefix
                      }</strong></p>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        <SellerContact
          internalId={accountData?.id}
          email={user?.email}
          phone={user?.phone}
          firstName={user?.firstName}
          lastName={user?.lastName}
        />

      </div>
    </main>
  );
}
