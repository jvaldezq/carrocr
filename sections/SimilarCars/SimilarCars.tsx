import Card from "@/components/Card/Card";
import {fetchSimilarCars} from "@/sections/SimilarCars/service";

export default async function SimilarCars() {
    const data = await fetchSimilarCars();

    return (<section>
        <h2 className="text-2xl text-tertiary border-b border-solid border-tertiary/[0.2] pb-1 font-semibold mb-4">Autos Jordan Valdez</h2>
        <div
            className="grid gap-y-6 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((car) => <Card key={car.id} {...car} />)}
            {data?.map((car) => <Card key={car.id} {...car} />)}
            {data?.map((car) => <Card key={car.id} {...car} />)}
        </div>
    </section>);
};
