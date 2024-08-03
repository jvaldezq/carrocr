import type {Car} from "@/lib/definitions";
import {serverApi} from "@/lib/serverApi";

export const fetchCarById = async (id: string): Promise<Car> => {
    return await serverApi({
        path: `/listing/${id}`
    }) as Promise<Car>;
};