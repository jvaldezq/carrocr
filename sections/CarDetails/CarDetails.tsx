import {fetchCarById} from "@/sections/CarDetails/service";
import Image from 'next/image'
import {Carousel} from "@/components/Carousel";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import ProfilePlaceholderImage from "@/assets/profile-placeholder.webp";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import {VerifiedIcon} from "@/icons/VerifiedIcon";

interface CarDetailsProps {
    id: string;
}

export default async function CarDetails({id}: CarDetailsProps) {
    const data = await fetchCarById(id);
    const {
        thumbnail,
        img1FronL,
        img2FronR,
        img4RearR,
        img5IntDash,
        model,
        priceDollars,
        mileage,
        fuelType,
        make,
        year,
        acctVerified,
        transType,
        driveSystemAlt,
        driveSystem
    } = data;
    
    const articles = [
        {
            title: 'Precio',
            value: priceDollars ? USDFormatter(priceDollars) : undefined
        },
        {
            title: 'Kilometraje',
            value: mileage ? `${NumberFormatter(mileage)} km` : undefined
        },
        {
            title: 'Motor y tipo de combustible',
            value: fuelType
        },
        {
            title: 'Transmisión',
            value: transType
        },
        {
            title: 'Sistema',
            value: driveSystem || driveSystemAlt ? `${driveSystem} (${driveSystemAlt})` : undefined
        }
    ]

    return (
        <section>
            <div className='hidden md:grid grid-cols-3 gap-4 justify-between'>
                <Image
                    className="object-cover aspect-auto rounded-2xl w-full"
                    src={img1FronL ?? CarPlaceholderImage}
                    alt="Carro principal"
                    width={1024}
                    height={768}
                />
                <Image
                    className="object-cover aspect-auto rounded-2xl w-full"
                    src={img5IntDash ?? CarPlaceholderImage}
                    alt="Carro principal"
                    width={1024}
                    height={768}
                />
                <Image
                    className="object-cover aspect-auto rounded-2xl w-full"
                    src={img4RearR ?? CarPlaceholderImage}
                    alt="Carro principal"
                    width={1024}
                    height={768}
                />
            </div>
            <div className='flex md:hidden'>
                <Carousel images={[thumbnail, img1FronL, img2FronR]} model={model}/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
                <div className="grid grid-cols-2 lg:col-span-2 lg:grid-cols-3 gap-2 text-tertiary font-light">
                    {
                        articles.map((article, index) => {
                            if (!article.value) return null;
                            return (
                                <article key={index}>
                                    <h3 className="text-lg font-normal">{article.value}</h3>
                                    <p className="text-sm">{article.title}</p>
                                </article>
                            )
                        })
                    }
                </div>
                <div
                    className="shadow-2xl p-2 rounded-2xl grid grid-cols-2 gap-2 justify-center items-center text-tertiary w-full justify-self-center">
                    <div className="col-span-2 flex justify-center border-b-[1px] border-solid py-2">
                        <h1 className="text-2xl opacity-95 flex">{make} {model} <strong
                            className='ml-1'>{year} </strong>
                        </h1>
                    </div>
                    <div className="flex flex-col gap-1 justify-self-center text-center relative">
                        <Image
                            className="object-cover aspect-auto rounded-full"
                            src={ProfilePlaceholderImage}
                            alt="Carro principal"
                            width={80}
                            height={80}
                        />
                        <div>
                            <h4 className='font-medium text-lg'>Jordan V</h4>
                            {acctVerified && <h4 className="font-medium text-xs text-info">Verificado</h4>}
                        </div>
                        {
                            acctVerified && <span className='absolute top-0 right-0 bg-secondary rounded-full p-1'>
                            <VerifiedIcon/>
                        </span>
                        }
                    </div>
                    <div className="grid grid-cols-1 divide-y text-tertiary font-light gap-1">
                        <div>
                            <h3 className="text-base font-normal">jordan@email.com</h3>
                            <p className="text-xs">Email</p>
                        </div>
                        <div className="pt-1">
                            <h3 className="text-base font-normal">(506) 8392-9383</h3>
                            <p className="text-xs">Telefono</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
