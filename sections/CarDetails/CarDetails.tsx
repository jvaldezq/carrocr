import {fetchCarById} from "@/sections/CarDetails/service";
import Image from 'next/image'
import {Carousel} from "@/components/Carousel";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import EnginePlaceholderImage from "@/assets/engine-placeholder.webp";
import {ContactInfo} from "@/sections/CarDetails/ContactInfo";

// TODO need to integrate this
const ContactInfoData = {
    acctId: 1,
    contactName: 'Jordan Valdez',
    contactEmail: 'jordanf.valdez@gmail.com',
    contactPhone: '(506) 8392-9383',
    acctVerified: true,
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQGe8yTcqObEog/profile-displayphoto-shrink_800_800/0/1542814433921?e=1728518400&v=beta&t=8a0wBtjGSnnTa-dXhACJfmLSrM47F-DD5HVZR0y2mEE',
    isDealer: false
}

interface CarDetailsProps {
    id: string;
}

export default async function CarDetails({id}: CarDetailsProps) {
    const data = await fetchCarById(id);
    const {
        model,
        priceDollars,
        mileage,
        fuelType,
        make,
        year,
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
        trim,
        thumbnail,
        img1FronL,
        img2FronR,
        img4RearR,
        img5IntDash,
        img6IntClust,
        img7IntRad,
        img8IntSeatF,
        img9IntSeatB,
        img10IntTrun,
        img11Engine,
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
    }];

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
    }];

    return (<section className="flex flex-col gap-10 pb-10">
        <div className='hidden lg:grid grid-cols-3 gap-4 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={img1FronL ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={540}
                height={375}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={thumbnail ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={540}
                height={375}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={img4RearR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={540}
                height={375}
            />
        </div>
        <div className='flex lg:hidden'>
            <Carousel images={[img1FronL, thumbnail, img2FronR]} model={model} showIcon={true}/>
        </div>
        <div className="text-tertiary grid md:grid-cols-2 gap-4 items-center justify-items-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl opacity-95 flex text-center">{make} {model} <strong
                    className='ml-1'>{year} </strong>
                </h1>
                <h1 className="text-xl  text-center">
                    {trim}
                </h1>
            </div>
            <ContactInfo {...ContactInfoData}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img5IntDash ?? CarPlaceholderImage}
                alt="Carro principal"
                width={720}
                height={405}
            />
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
        </div>
        <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-4'>
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
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img11Engine ?? EnginePlaceholderImage}
                alt="Carro motor"
                width={720}
                height={405}
            />
        </div>
        <div className='hidden lg:grid grid-cols-3 gap-4 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img6IntClust ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img7IntRad ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img8IntSeatF ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img10IntTrun ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
        </div>
        <div className='flex lg:hidden'>
            <Carousel images={[img6IntClust, img7IntRad, img8IntSeatF, img9IntSeatB, img10IntTrun]} model={model}/>
        </div>
        <div className="flex flex-col gap-4">
            <div>
                <div className="flex flex-col text-tertiary my-8">
                    <h1 className="text-lg opacity-95 flex font-semibold">Especificaciones de Fábrica
                    </h1>
                    <h1 className="text-base">
                        Esta información es de referencia y no refleja el estado actual del
                        vehículo en venta.
                    </h1>
                </div>
                <div
                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-tertiary font-light items-center">
                    {engineArticles.map((article, index) => {
                        if (!article.value) return null;
                        return (<article key={index}>
                            <p className="text-sm">{article.title}</p>
                            <h3 className="text-lg font-normal">{article.value}</h3>
                        </article>)
                    })}
                </div>
            </div>
        </div>
    </section>);
};
