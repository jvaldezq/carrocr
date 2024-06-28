import {fetchCarById} from "@/sections/CarDetails/service";
import Image from 'next/image'
import {Carousel} from "@/components/Carousel";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import EnginePlaceholderImage from "@/assets/engine-placeholder.webp";

// TODO need to integrate this
const ContactInfoData = {
    contactName: 'Autos Amigos',
    contactEmail: 'jordan@email.com',
    contactPhone: '(506) 8392-9383',
    acctVerified: true,
    thumbnail: null
}

interface CarDetailsProps {
    id: string;
}

export default async function CarDetails({id}: CarDetailsProps) {
    const data = await fetchCarById(id);
    // console.log('data', data);
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
        driveSystem,
        condition,
        transGears,
        engineSizeCC,
        engineCylinders,
        engineHp,
        engineTqNm,
        economyL100Km,
        img11Engine,
        trim
    } = data;

    const baseArticles = [{
        title: 'Precio', value: priceDollars ? USDFormatter(priceDollars) : 'No especificado'
    }, {
        title: 'Kilometraje', value: mileage ? `${NumberFormatter(mileage)} km` : 'No especificado'
    }, {
        title: 'Calificación', value: condition ?? 'No especificado'
    }, {
        title: 'Transmisión', value: transType ?? 'No especificado'
    }, {
        title: 'Sistema',
        value: driveSystem || driveSystemAlt ? `${driveSystem} (${driveSystemAlt})` : 'No especificado'
    }, {
        title: 'Velocidades', value: transGears ?? 'No especificado'
    }]

    const engineArticles = [{
        title: 'Tamaño', value: engineSizeCC ? `${engineSizeCC}cc` : 'No especificado'
    }, {
        title: 'Cilindros', value: engineCylinders ?? 'No especificado'
    }, {
        title: 'Fuerza', value: engineHp ? `${engineHp}HP` : 'No especificado'
    }, {
        title: 'Torque', value: engineTqNm ? `${engineTqNm}Nm` : 'No especificado'
    }, {
        title: 'Combustible', value: fuelType ?? 'No especificado'
    }, {
        title: 'Economía', value: economyL100Km ? `${economyL100Km} Km/L` : 'No especificado'
    },]

    return (<section>
        <div className='hidden md:grid grid-cols-3 gap-4 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full"
                src={img1FronL ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={1024}
                height={768}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full"
                src={thumbnail ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={1024}
                height={768}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full"
                src={img4RearR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={1024}
                height={768}
            />
        </div>
        <div className='flex md:hidden'>
            <Carousel images={[img1FronL, thumbnail, img2FronR]} model={model}/>
        </div>
        <div className="flex flex-col  text-tertiary my-8">
            <h1 className="text-2xl opacity-95 flex">{make} {model} <strong
                className='ml-1'>{year} </strong>
            </h1>
            <h1 className="text-xl">
                {trim}
            </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-8'>
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-tertiary font-light lg:justify-items-center items-center">
                {baseArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}>
                        <p className="text-sm">{article.title}</p>
                        <h3 className="text-lg font-normal">{article.value}</h3>
                    </article>)
                })}
            </div>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full max-h-[405px]"
                src={img5IntDash ?? CarPlaceholderImage}
                alt="Carro principal"
                width={1024}
                height={405}
            />
        </div>

        <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-4 mt-10'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full max-h-[405px]"
                src={img11Engine ?? EnginePlaceholderImage}
                alt="Carro motor"
                width={1024}
                height={405}
            />
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-tertiary font-light lg:justify-items-center items-center">
                {engineArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}>
                        <p className="text-sm">{article.title}</p>
                        <h3 className="text-lg font-normal">{article.value}</h3>
                    </article>)
                })}
            </div>
        </div>
    </section>);
};
