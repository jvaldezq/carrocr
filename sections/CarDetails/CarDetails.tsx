import {fetchCarById} from "@/sections/CarDetails/service";
import Image from 'next/image'
import {Carousel} from "@/components/Carousel";
import {CRCFormatter, NumberFormatter} from "@/lib/NumberFormats";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import ContactInfo from "@/sections/CarDetails/ContactInfo";
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
        imgBodyFL,
        imgBodyFC,
        imgBodyFR,
        imgBodySL,
        imgBodySR,
        imgBodyRR,
        imgBodyRC,
        imgBodyRL,
        imgInteriorDash,
        imgInteriorCluster,
        imgInteriorRadio,
        imgInteriorSeatF,
        imgInteriorSeatR,
        imgInteriorTrunk,
        imgEngine,
        bodyName,
        driveType,
        factorySpecifications,
        negotiableTF,
        allowTradeTF,
        inspectionMonth,
        inspectionYear,
        restrictionDay,
        comments
    } = data;
    const {
        cubicCentimeters,
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
        payloadCap,
        towingCap,
        groundHeight,
        fuelCapLiters,
        camType,
        superFuel,
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
        title: 'Carga útil', value: payloadCap ? `${payloadCap}kg` : 'N/A', isFactory: true, icon: <PayloadLbsIcon/>
    }, {
        title: 'Remolque', value: towingCap ? `${towingCap}kg` : 'N/A', isFactory: true, icon: <TowingLbsIcon/>
    }, {
        title: 'Tanque combustible',
        value: fuelCapLiters ? `${fuelCapLiters}L` : 'N/A',
        isFactory: true,
        icon: <GasTankIcon/>
    }];

    const engineArticles: ArticleProps[] = [{
        title: 'Tamaño',
        value: cubicCentimeters ? `${cubicCentimeters}cc` : 'N/A',
        isFactory: true,
        icon: <EngineLitersIcon/>
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
        title: 'Gasolina Súper', value: superFuel ?? 'N/A', isFactory: true, icon: <SuperFuelIcon/>
    }];

    const generalArticles: ArticleProps[] = [{
        title: 'Negociable', value: negotiableTF ? 'Sí' : 'No', isFactory: false,
    }, {
        title: 'Se recibe vehículo', value: allowTradeTF ? 'Sí' : 'No', isFactory: false,
    }, {
        title: 'Inspección vehicular',
        value: inspectionMonth || inspectionYear ? `${inspectionMonth}/${inspectionYear}` : 'N/A',
        isFactory: false,
    }, {
        title: 'Restricción vehicular', value: restrictionDay ?? 'N/A', isFactory: false,
    }, {
        title: 'Comentarios del vendedor', value: comments ?? 'N/A', isFactory: false, className: 'col-span-2'
    }];

    return (<section className="flex flex-col gap-5 pb-10">
        <div className='hidden lg:grid grid-cols-3 gap-5 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={imgBodyFL ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={540}
                height={375}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={imgBodyFC ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={540}
                height={375}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[300px]"
                src={imgBodyFR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={540}
                height={375}
            />
        </div>
        <div className='flex lg:hidden'>
            <Carousel images={[imgBodyFL, thumbnail, imgBodyFR]} model={model} showDots={true}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
                className="flex flex-col items-center justify-center border-primary/[0.1] border border-solid shadow-sm w-full h-full rounded-2xl text-tertiary p-4">
                <h1 className="text-2xl opacity-95 flex text-center">{make} {model} <strong
                    className='ml-1'>{year} </strong>
                </h1>
                <h1 className="text-xl  text-center">
                    {trim}
                </h1>
                <h1 className="text-3xl mt-4 rounded-2xl text-tertiary border-primary/[0.1] border border-solid shadow-sm px-4 py-2">{CRCFormatter(priceDollars)}</h1>
            </div>
            <ContactInfo {...ContactInfoData}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgBodySL ?? CarPlaceholderImage}
                alt="Carro principal"
                width={720}
                height={405}
            />
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                {baseArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-0.5 w-full h-full justify-center items-center border-tertiary/[0.1] border border-solid shadow-sm rounded-2xl transition-all hover:shadow-lg hover:scale-105 py-2 ${article?.className}`}>
                            {article.icon}
                        <p className="text-sm font-normal text-tertiary/[0.7] w-full pt-2">{article.title}
                        </p>
                        <h3 className="text-md font-medium text-tertiary w-full">{article.value}</h3>
                    </article>)
                })}
            </div>
        </div>

        <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-5'>
            <div
                className="grid grid-cols-2 gap-4 text-center">
                {generalArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-0.5 w-full h-full justify-center items-center border-tertiary/[0.1] border border-solid shadow-sm rounded-2xl transition-all hover:shadow-lg hover:scale-105 py-2 ${article?.className}`}>
                        {article.icon}
                        <p className="text-sm font-normal text-tertiary/[0.7] w-full pt-2">{article.title}
                        </p>
                        <h3 className="text-md font-medium text-tertiary w-full">{article.value}</h3>
                    </article>)
                })}
            </div>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgBodyRR ?? CarPlaceholderImage}
                alt="Carro motor"
                width={720}
                height={405}
            />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgEngine ?? CarPlaceholderImage}
                alt="Carro principal"
                width={720}
                height={405}
            />
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                {engineArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-0.5 w-full h-full justify-center items-center border-tertiary/[0.1] border border-solid shadow-sm rounded-2xl transition-all hover:shadow-lg hover:scale-105 py-2 ${article?.className}`}>
                        {article.icon}
                        <p className="text-sm font-normal text-tertiary/[0.7] w-full pt-2">{article.title}
                        </p>
                        <h3 className="text-md font-medium text-tertiary w-full">{article.value}</h3>
                    </article>)
                })}
            </div>
        </div>

        <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-5'>
            <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                {dymentionsArticles.map((article, index) => {
                    if (!article.value) return null;
                    return (<article key={index}
                                     className={`flex flex-col gap-0.5 w-full h-full justify-center items-center border-tertiary/[0.1] border border-solid shadow-sm rounded-2xl transition-all hover:shadow-lg hover:scale-105 py-2 ${article?.className}`}>
                        {article.icon}
                        <p className="text-sm font-normal text-tertiary/[0.7] w-full pt-2">{article.title}
                        </p>
                        <h3 className="text-md font-medium text-tertiary w-full">{article.value}</h3>
                    </article>)
                })}
            </div>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgBodySR ?? CarPlaceholderImage}
                alt="Carro motor"
                width={720}
                height={405}
            />
        </div>

        <div className='hidden lg:grid grid-cols-3 gap-5 justify-between'>
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgBodyRL ?? CarPlaceholderImage}
                alt="Carro Frontal Delante Izquierdo"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgBodyRC ?? CarPlaceholderImage}
                alt="Carro Interior Dash"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgBodyRR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />

            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgInteriorDash ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgInteriorCluster ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgInteriorRadio ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgInteriorSeatF ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgInteriorSeatR ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
            <Image
                className="object-cover aspect-auto rounded-2xl w-full h-[405px]"
                src={imgInteriorTrunk ?? CarPlaceholderImage}
                alt="Carro Trasero Derecho"
                width={720}
                height={405}
            />
        </div>
        <div className='flex lg:hidden'>
            <Carousel
                images={[imgBodyRL, imgBodyRC, imgBodyRR, imgInteriorDash, imgInteriorCluster, imgInteriorRadio, imgInteriorSeatF, imgInteriorSeatR, imgInteriorTrunk]}
                model={model} showDots={true}/>
        </div>
    </section>);
};
