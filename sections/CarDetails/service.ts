import type {Car} from "@/lib/definitions";
import {serverApi} from "@/lib/serverApi";

export const fetchCarById = async (id: string): Promise<Car | null> => {
    try {
        const car = await serverApi.get(`/listing/${id}`);
        return car.data;
    } catch (error) {
        console.error("Failed to fetch top cars", error);
        return null;
    }
};