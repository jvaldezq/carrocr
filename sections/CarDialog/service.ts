import axios from "axios";
import type {Car} from "@/lib/Models";
import {useEffect, useState} from "react";

const fetchTopCars = async (uuid: string): Promise<Car> => {
    // TODO - Implement API call
    const cars = await axios.get("/mock/car.json");
    return cars.data;
};

export const useGetCar = (uuid: string | null) => {
    const [data, setData] = useState<Car>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uuid) return;
        fetchTopCars(uuid)
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [uuid]);

    return {data, isLoading, error};
};
