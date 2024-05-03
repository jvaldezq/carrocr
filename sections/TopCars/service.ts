import axios from "axios";
import type { Car } from "@/lib/Models";
import { useEffect, useState } from "react";

const fetchTopCars = async (): Promise<Car[]> => {
  // TODO - Implement API call
  const cars = await axios.get("/mock/cars.json");
  return cars.data;
};

export const useTopCars = () => {
  const [data, setData] = useState<Car[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopCars()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};
