import {fetchTopCars} from "@/sections/TopCars/service";
import Card from "@/components/Card/Card";

export default async function TopCars() {
    const data = await fetchTopCars();
    return (<section
        className="max-w-screen-3xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold text-tertiary mb-8">Featured Listings</h2>
        <div
            className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
            {data?.map((car) => <Card key={car.id} {...car} />)}
        </div>
    </section>);
};
