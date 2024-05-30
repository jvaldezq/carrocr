'use client';
import {previewConfig} from "@/store/previewStore";
import {useCallback} from "react";

interface CardTriggerProps {
    id: number;
}

export default function CardTrigger(props: CardTriggerProps) {
    const {id} = props;

    const handleClick = useCallback(() => {
        previewConfig.set({id});
    }, [id]);

    return (
        <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer z-10"
            onClick={handleClick}
        >
        </div>
    );
};
