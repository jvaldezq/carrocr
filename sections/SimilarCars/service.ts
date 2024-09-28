import type {Car} from "@/lib/definitions";
import {serverApi} from "@/lib/serverApi";

export const fetchSimilarCars = async (): Promise<Car[]> => {
    return await serverApi({
        path: '/listing/mini', params: {premium: 'true'},
    }) as Promise<Car[]>;
};