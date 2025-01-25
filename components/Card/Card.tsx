import type {Car} from "@/lib/definitions";
import {ArrowRight, Calendar, MapPin, ShieldCheck} from 'lucide-react';
import {CRCFormatter} from "@/lib/NumberFormats";
import CardTrigger from "@/components/Card/CardTrigger";
import Link from "next/link";
import Image from "next/image";

export default function Card(props: Car) {
    const {
        id,
        model,
        thumbnail,
        make,
        year,
        priceDollars,
        acctVerified,
        state,
    } = props;

    return (
        <div className="bg-white animate-fade animate-once animate-duration-700 animate-delay-0 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
             id={`car-${id}`}>
            <div className="relative aspect-[16/9]">
                <Image
                    src={thumbnail}
                    alt={`${make} ${model}`}
                    className="w-full h-full object-cover rounded-t-lg"
                    width={620}
                    height={350}
                />
                {
                    acctVerified &&
                    <div
                        className="bg-verified absolute top-1 left-1 text-white px-2 py-1 rounded-lg text-sm flex items-center opacity-45">
                        <ShieldCheck className="h-4 w-4"/>
                    </div>
                }
            </div>

            <div className="p-4">
                <div className="flex justify-between gap-2">
                    <h3 className="text-lg font-semibold text-tertiary">{`${make} ${model}`}</h3>
                </div>

                <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm font-semibold text-primary">
                        {CRCFormatter(priceDollars)}
                    </div>
                    <div className="flex items-center text-sm text-tertiary">
                        <Calendar className="h-4 w-4 mr-2"/>
                        {year}
                    </div>
                    <div className="flex w-full gap-1 items-center justify-between text-sm text-tertiary">
                        <div className="flex">
                            <MapPin className="h-4 w-4 mr-2"/>
                            {state}
                        </div>
                        <div className="flex gap-1">
                            <Link key={id} href={`/car/${id}`}
                                  className="border border-primary text-primary px-2 py-1 rounded-lg text-sm flex items-center z-40 transition-all hover:scale-110">
                                <ArrowRight className="h-4 w-4"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <CardTrigger id={+id}/>
        </div>
    );
};
