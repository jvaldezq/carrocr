'use client';

import {useTopCars} from "@/sections/TopCars/service";
import {Card} from "@/components/Card";
import {CardLoader} from "@/components/CardLoader";
import {useCallback, useMemo, useState} from "react";
import {CarDialog} from "@/sections/CarDialog/CarDialog";

export const TopCars = () => {
    const {data, isLoading} = useTopCars();
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const loadingArr = useMemo(() => Array.from({length: 5}, (_, i) => i), []);

    const handleClick = useCallback((uuid: string) => {
        setSelectedCar(uuid);
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedCar(null);
        setIsOpen(false);
    }, []);

    return (
        <section
            className="px-4 mt-8">
            <div
                className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grod-cols-8">
                {isLoading && loadingArr.map((n) => <CardLoader key={n}/>)}
                {data?.map((car) => <Card key={car.uuid} {...car} handleCardClick={handleClick}/>)}
            </div>
            <CarDialog isOpen={isOpen} uuid={selectedCar} onClose={handleClose}/>
        </section>
    );
};
