import type {Car} from "@/lib/definitions";

export const fetchTopCars = async (): Promise<Car[]> => {
    try {
        // const cars = await serverApi.get("/listing/mini", {
        //     params: {
        //         premium: true,
        //     },
        // });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}listing/mini?` + new URLSearchParams({
            premium: 'true',
        }).toString(), {
            next: {revalidate: 10},
        });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const response = await res.json();
        
        return response;
    } catch (error) {
        console.error("Failed to fetch top cars", error);
        return [];
    }
};