import type {Car} from "@/lib/definitions";
import {useQuery} from "@tanstack/react-query";
import {clientApi} from "@/lib/clientApi";

const fetchCarById = async (id: number | null): Promise<Car> => {
    const cars = await clientApi.get(`/listing/preview/${id}`);
    return cars.data;
};

export const useGetCar = (uuid: number | null) => useQuery({
    queryKey: ["car"],
    staleTime: 0,
    enabled: !!uuid,
    queryFn: () => fetchCarById(uuid),
    retry: 2,
    refetchOnReconnect: false,
});
