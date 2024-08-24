import {fetchCarById} from "@/sections/CarDetails/service";
import Image from 'next/image'
import {Carousel} from "@/components/Carousel";
import {CRCFormatter, NumberFormatter} from "@/lib/NumberFormats";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import {ContactInfo} from "@/sections/CarDetails/ContactInfo";
import {QualificationIcon} from "@/icons/QualificationIcon";
import {FuelIcon} from "@/icons/FuelIcon";
import {SystemIcon} from "@/icons/SystemIcon";
import {TransmissionIcon} from "@/icons/TransmissionIcon";
import {EconomyIcon} from "@/icons/EconomyIcon";
import {DoorsIcon} from "@/icons/DoorsIcon";
import {SeatsIcon} from "@/icons/SeatsIcon";
import {StyleIcon} from "@/icons/StyleIcon";
import {WeightIcon} from "@/icons/WeightIcon";
import {LengthIcon} from "@/icons/LengthIcon";
import {WidthIcon} from "@/icons/WidthIcon";
import {HeightIcon} from "@/icons/HeightIcon";
import {GroundHeightIcon} from "@/icons/GroundHeightIcon";
import {MileageIcon} from "@/icons/MileageIcon";
import {PayloadLbsIcon} from "@/icons/PayloadLbsIcon";
import {TowingLbsIcon} from "@/icons/TowingLbsIcon";
import {GasTankIcon} from "@/icons/GasTankIcon";
import {EngineLitersIcon} from "@/icons/EngineLitersIcon";
import {CylinderIcon} from "@/icons/CylinderIcon";
import {HorsePowerIcon} from "@/icons/HorsePowerIcon";
import {RPMIcon} from "@/icons/RPMIcon";
import {ValveIcon} from "@/icons/ValveIcon";
import {NmIcon} from "@/icons/NmIcon";
import {SuperFuelIcon} from "@/icons/SuperFuelIcon";

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

interface ArticleProps {
    title: string;
    value: string | number;
    isFactory?: boolean;
    className?: string;
    icon?: JSX.Element;
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
        condition,
        trim,
        thumbnail,
        img1FronL,
        imgFronC,
        img2FronR,
        imgSideL,
        imgSideR,
        img4RearR,
        imgRearC,
        img3RearL,
        img5IntDash,
        img6IntClust,
        img7IntRad,
        img8IntSeatF,
        img9IntSeatB,
        img10IntTrun,
        img11Engine,
        bodyName,
        driveType,
        factorySpecifications,
    } = data;
    const {
        liters,
        cylinderCount,
        horsepower,
        horsepowerRPM,
        torque,
        torqueRPM,
        mpgCombine,
        doorCount,
        seatCount,
        valveCount,
        length,
        width,
        height,
        curbWeight,
        payloadLbs,
        towingLbs,
        groundHeight,
        fuelCapLiters,
        camType,
        superFuelTF,
    } = factorySpecifications;

    const baseArticles: ArticleProps[] = [{
        title: 'Kilometraje', value: mileage ? `${NumberFormatter(mileage)}km` : 'N/A', icon: <MileageIcon/>
    }, {
        title: 'Calificación', value: condition ?? 'N/A', icon: <QualificationIcon/>
    }, {
        title: 'Combustible', value: fuelType ?? 'N/A', icon: <FuelIcon/>
    }, {
        title: 'Economía', value: mpgCombine ? `${mpgCombine}Km/L` : 'N/A', isFactory: true, icon: <EconomyIcon/>
    }, {
        title: 'Transmisión', value: transType ?? 'N/A', icon: <TransmissionIcon/>
    }, {
        title: 'Sistema', value: driveType ?? 'N/A', icon: <SystemIcon/>
    }, {
        title: 'Puertas', value: doorCount ? doorCount : 'N/A', isFactory: true, icon: <DoorsIcon/>
    }, {
        title: 'Asientos', value: seatCount ? seatCount : 'N/A', isFactory: true, icon: <SeatsIcon/>
    }, {
        title: 'Estilo', value: bodyName ?? 'N/A', className: 'col-span-2 md:col-auto', icon: <StyleIcon/>
    }];

    const dymentionsArticles: ArticleProps[] = [{
        title: 'Peso', value: curbWeight ? `${curbWeight}kg` : 'N/A', isFactory: true, icon: <WeightIcon/>
    }, {
        title: 'Largo', value: length ? `${length}cm` : 'N/A', isFactory: true, icon: <LengthIcon/>
    }, {
        title: 'Ancho', value: width ? `${width}cm` : 'N/A', isFactory: true, icon: <WidthIcon/>
    }, {
        title: 'Alto', value: height ? `${height}cm` : 'N/A', isFactory: true, icon: <HeightIcon/>
    }, {
        title: 'Altura al suelo',
        value: groundHeight ? `${groundHeight}cm` : 'N/A',
        isFactory: true,
        icon: <GroundHeightIcon/>
    }, {
        title: 'Carga útil', value: payloadLbs ? `${payloadLbs}kg` : 'N/A', isFactory: true, icon: <PayloadLbsIcon/>
    }, {
        title: 'Remolque', value: towingLbs ? `${towingLbs}kg` : 'N/A', isFactory: true, icon: <TowingLbsIcon/>
    }, {
        title: 'Tanque combustible',
        value: fuelCapLiters ? `${fuelCapLiters}L` : 'N/A',
        isFactory: true,
        icon: <GasTankIcon/>
    }];

    const engineArticles: ArticleProps[] = [{
        title: 'Tamaño', value: liters ? `${liters}cc` : 'N/A', isFactory: true, icon: <EngineLitersIcon/>
    }, {
        title: 'Cilindros', value: cylinderCount ?? 'N/A', isFactory: true, icon: <CylinderIcon/>
    }, {
        title: 'Fuerza HP',
        value: horsepower || horsepowerRPM ? `${horsepower}hp` : 'N/A',
        isFactory: true,
        icon: <HorsePowerIcon/>
    }, {
        title: 'Fuerza RPM',
        value: horsepower || horsepowerRPM ? `${horsepowerRPM}rpm` : 'N/A',
        isFactory: true,
        icon: <RPMIcon/>
    }, {
        title: 'Torque Nm', value: torque || torqueRPM ? `${torque}Nm` : 'N/A', isFactory: true, icon: <NmIcon/>
    }, {
        title: 'Torque RPM', value: torque || torqueRPM ? `${torqueRPM}rpm` : 'N/A', isFactory: true, icon: <RPMIcon/>
    }, {
        title: 'Válvulas', value: valveCount ? `${valveCount} (${camType})` : 'N/A', isFactory: true, icon: <ValveIcon/>
    }, {
        title: 'Gasolina Súper', value: superFuelTF ?? 'N/A', isFactory: true, icon: <SuperFuelIcon/>
    }];

    return (<section className="flex flex-col gap-5 pb-10">
        <div className='hidden lg:grid grid-cols-3 gap-5 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={img1FronL ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={540}
                height={375}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={imgFronC ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={540}
                height={375}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={img2FronR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={540}
                height={375}
            />
        </div>
        <div className='flex lg:hidden'>
            <Carousel images={[img1FronL, thumbnail, img2FronR]} model={model} showDots={true}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
                className="flex flex-col items-center justify-center bg-tertiary w-full h-full rounded-2xl text-quaternary p-4">
                <h1 className="text-2xl opacity-95 flex text-center">{make} {model} <strong
                    className='ml-1'>{year} </strong>
                </h1>
                <h1 className="text-xl  text-center">
                    {trim}
                </h1>
                <h1 className="text-3xl mt-4 rounded-2xl bg-quaternary text-tertiary px-4 py-2">{CRCFormatter(priceDollars)}</h1>
            </div>
            <ContactInfo {...ContactInfoData}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgSideL ?? CarPlaceholderImage}
                alt="Carro principal"
                width={720}
                height={405}
            />
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-5 font-light lg:justify-items-center items-start md:items-center text-center bg-primary p-4 rounded-2xl text-quaternary">
                {baseArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-2 w-full justify-center items-center ${article?.className}`}>
                        {article.icon}
                        <p className="text-sm flex justify-center items-center gap-2">{article.title}
                        </p>
                        <h3 className="text-lg font-normal bg-quaternary text-primary px-4 py-2 rounded-2xl w-full">{article.value}</h3>
                    </article>)
                })}
            </div>
        </div>
        <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-5'>
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-5 font-light lg:justify-items-center items-start md:items-center text-center bg-tertiary p-4 rounded-2xl text-quaternary">
                {dymentionsArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-2 w-full justify-center items-center ${article?.className}`}>
                        {article.icon}
                        <p className="text-sm flex justify-center items-center gap-2">{article.title}
                        </p>
                        <h3 className="text-lg font-normal bg-quaternary text-tertiary px-4 py-2 rounded-2xl w-full">{article?.value}</h3>
                    </article>)
                })}
            </div>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgSideR ?? CarPlaceholderImage}
                alt="Carro motor"
                width={720}
                height={405}
            />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img11Engine ?? CarPlaceholderImage}
                alt="Carro principal"
                width={720}
                height={405}
            />
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-5 font-light lg:justify-items-center items-start md:items-center text-center bg-primary p-4 rounded-2xl text-quaternary">
                {engineArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-2 w-full justify-center items-center ${article?.className}`}>
                        {article.icon}
                        <p className="text-sm flex justify-center items-center gap-2">{article.title}
                        </p>
                        <h3 className="text-lg font-normal bg-quaternary text-primary px-4 py-2 rounded-2xl w-full">{article?.value}</h3>
                    </article>)
                })}
            </div>
        </div>
        <div className='hidden lg:grid grid-cols-3 gap-5 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img3RearL ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgRearC ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img4RearR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />

            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img5IntDash ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img6IntClust ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={img7IntRad ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
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
                src={img9IntSeatB ?? CarPlaceholderImage}
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
            <Carousel
                images={[img3RearL, imgRearC, img4RearR, img5IntDash, img6IntClust, img7IntRad, img8IntSeatF, img9IntSeatB, img10IntTrun]}
                model={model} showDots={true}/>
        </div>
    </section>);
};
