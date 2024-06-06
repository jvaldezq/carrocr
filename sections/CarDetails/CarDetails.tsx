import {fetchCarById} from "@/sections/CarDetails/service";

interface CarDetailsProps {
    id: string;
}

export default async function CarDetails({id}: CarDetailsProps) {
    const data = await fetchCarById(id);

    return (
        <section
            className="px-4 mt-8">
            {data?.toString()}
        </section>
    );
};
