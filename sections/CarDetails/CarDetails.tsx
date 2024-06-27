import {fetchCarById} from "@/sections/CarDetails/service";
import Image from "next/image";

interface CarDetailsProps {
    id: string;
}

export default async function CarDetails({id}: CarDetailsProps) {
    const data = await fetchCarById(id);
    const {thumbnail, img1FronL, img2FronR, img4RearR, img3RearL, model} = data;

    return (
        <section>
            <Image
                className="object-contain w-full aspect-auto"
                src={thumbnail}
                alt="Carro principal"
                width={1140}
                height={720}
            />
            {/*<Carousel images={[thumbnail, img1FronL, img2FronR, img4RearR, img3RearL]} model={model}/>*/}
        </section>
    );
};
