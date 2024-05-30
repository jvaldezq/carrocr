import {fetchTopCars} from "@/sections/TopCars/service";
import Card from "@/components/Card/Card";

export default async function TopCars() {
    const data = await fetchTopCars();

    return (
        <section
            className="px-4 mt-8">
            <div
                className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grod-cols-8">
                {data?.map((car) => <Card key={car.id} {...car} />)}
            </div>
        </section>
    );
};
