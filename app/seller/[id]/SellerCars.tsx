import {fetchTopCars} from "@/sections/TopCars/service";
import Card from "@/components/Card/Card";

export default async function SellerCars() {
    const data = await fetchTopCars();
    return (
        <section
            className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3">
            {data?.map((car) => <Card key={car.id} {...car} />)}
        </section>);
};
