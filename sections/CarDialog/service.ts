import type {Car} from "@/lib/definitions";
import {useQuery} from "react-query";
import {serverApi} from "@/lib/serverApi";

const fetchCarById = async (id: number | null): Promise<Car> => {
    const cars = await serverApi.get(`/listing/preview/${id}`);
    return cars.data;
};

export const useGetCar = (uuid: number | null) => {
    return useQuery(["car", uuid], () => fetchCarById(uuid), {
        enabled: !!uuid,
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            console.error("Error fetching car", error);
        }
    });
};
