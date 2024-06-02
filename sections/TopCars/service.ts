import type {Car} from "@/lib/definitions";
import {serverApi} from "@/lib/serverApi";

export const fetchTopCars = async (): Promise<Car[]> => {
    try {
        const cars = await serverApi.get("/listing/mini", {
            params: {
                premium: true,
            },
        });
        return cars.data;
    } catch (error) {
        console.error("Failed to fetch top cars", error);
        return [];
    }
};