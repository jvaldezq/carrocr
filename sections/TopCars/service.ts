import axios from "axios";
import type {Car} from "@/lib/definitions";

export const fetchTopCars = async (): Promise<Car[]> => {
    // TODO - Implement API call
    const cars = await axios.get("https://6635443d9bb0df2359a44894.mockapi.io/api/v1/top-cars");
    return cars.data;
};