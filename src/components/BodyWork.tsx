import React, { ReactNode } from 'react';
import Link from 'next/link';
import { SedanSvg } from '@/assets/sedan';

interface Props {
  name: string;
  icon: string | ReactNode;
  filter: string;
}

export default function BodyWork() {
  return (
    <div className="max-w-screen-3xl mx-auto px-2 my-20 flex flex-col">
      <h2 className="text-xl uppercase font-bold tracking-widest leading-loose text-center text-tertiary mb-12">
        Buscar por carrocería
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <BodyBox name="Sedán" icon={<SedanSvg />} filter="sedan" />
        <BodyBox name="Hatchbacks" icon={<SedanSvg />} filter="hatchback" />
        <BodyBox name="SUV" icon={<SedanSvg />} filter="suv" />
        <BodyBox name="Todoterreno" icon={<SedanSvg />} filter="todoterreno" />
        <BodyBox name="Pick-ups" icon={<SedanSvg />} filter="pickup" />
        <BodyBox name="Deportivo" icon={<SedanSvg />} filter="sport" />
      </div>
    </div>
  );
}

const BodyBox = (props: Props) => {
  const { name, icon, filter } = props;
  return (
    <Link
      href={{
        pathname: '/autos',
        query: { [filter]: true },
      }}
      className="flex flex-col justify-center items-center gap-2"
    >
      <div className="border border-solid border-tertiary/[0.3] hover:border-tertiary cursor-pointer rounded-md flex justify-center items-center w-full h-32">
        {icon}
      </div>
      <h1>{name}</h1>
    </Link>
  );
};
