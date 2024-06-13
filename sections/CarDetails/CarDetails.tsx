import {fetchCarById} from "@/sections/CarDetails/service";
import {Carousel} from "@/components/Carousel";

interface CarDetailsProps {
    id: string;
}

export default async function CarDetails({id}: CarDetailsProps) {
    const data = await fetchCarById(id);
    const {thumbnail, images, model} = data;

    return (
        <section
            className="px-4 mt-8">
            <Carousel images={[thumbnail, ...images]} model={model} className="md:hidden"/>
        </section>
    );
};
