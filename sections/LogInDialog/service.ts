import axios from "axios";
import type {Car} from "@/lib/definitions";
import {useQuery} from "react-query";

const fetchCarById = async (id: number | null): Promise<Car> => {
    // TODO - Implement API call
    const cars = await axios.get("https://6635443d9bb0df2359a44894.mockapi.io/api/v1/car");
    return cars.data[0];
};

export const useGetCar = (uuid: number | null) => {
    return useQuery(["car", uuid], () => fetchCarById(uuid), {
        enabled: !!uuid,
        staleTime: 1000 * 60 * 5,
    });
};
