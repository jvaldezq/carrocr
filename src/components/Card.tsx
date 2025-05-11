import { APPROVAL_TRANSLATIONS } from '@/lib/definitions';
import type { Car } from '@/types/Car';
import {
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck,
  Pencil,
  CircleX,
  CircleCheck,
  CircleAlert,
  CircleEllipsis,
} from 'lucide-react';
import { MoneyFormatter } from '@/lib/NumberFormats';
import Link from 'next/link';
import Image from 'next/image';
import DefaultImage from '@/assets/placeholder.webp';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { FavoritesHeart } from '@/components/FavoritesHeart/FavoritesHeart';
import { Tooltip } from '@/components/Tooltip';

type Props = Car & {
  isTemp?: boolean;
  isAuth?: boolean;
  stageID?: number;
};

export default function Card(props: Props) {
  const {
    id,
    model,
    thumbnail,
    make,
    year,
    price,
    currency,
    acctVerified,
    state,
    isTemp = false,
    stageID,
    isAuth = false,
  } = props;

  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <article className="bg-white animate-fade animate-once animate-duration-700 animate-delay-0 rounded-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer relative flex flex-col">
      <div className="relative aspect-[16/9]">
        <Image
          src={image}
          alt={`${make} ${model}`}
          className="w-full h-full object-cover rounded-t-sm"
          width={620}
          height={350}
        />
        {acctVerified && (
          <div className="bg-verified absolute top-1 left-1 text-white px-2 py-1 rounded-sm text-sm flex items-center">
            <Tooltip tooltipContent="Cuenta verificada">
              <ShieldCheck className="h-4 w-4" />
            </Tooltip>
          </div>
        )}
        {!isTemp && isAuth && <FavoritesHeart id={id} />}
        {isTemp && <StageBadge stageID={stageID || 0} />}
        <div className="flex items-center text-sm text-white backdrop-blur-md absolute bottom-1 right-1 bg-tertiary/[0.2] rounded-sm px-1 py-0.5">
          {year}
        </div>
      </div>
      <div className="p-4 relative grow flex flex-col">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-tertiary">
            {`${make} ${model}`}
          </h3>
          <div className="flex items-center text-sm font-semibold text-primary">
            {MoneyFormatter(price, currency)}
          </div>
        </div>

        <div className="flex w-full gap-1 items-end justify-between text-sm text-tertiary mt-4 grow">
          <div className="flex flex-col gap-2 w-full">
            {isTemp ? (
              <Link
                key={`edit-${id}`}
                href={`/draft/${id}`}
                className={cn(
                  'border',
                  'border-success',
                  'text-success',
                  'px-2',
                  'py-1',
                  'rounded-sm',
                  'text-xs',
                  'flex',
                  'items-center',
                  'z-40',
                  'justify-center',
                  'transition-all',
                  'min-h-10',
                )}
              >
                Editar
                <Pencil className="h-5 w-5" />
              </Link>
            ) : (
              <Tooltip tooltipContent="Ver prevista">
                <Link
                  href={{
                    query: { preview: id },
                  }}
                  key={`car-${id}`}
                  className={cn(
                    'border',
                    'border-primary',
                    'text-primary',
                    'px-2',
                    'py-1',
                    'rounded-sm',
                    'text-xs',
                    'flex',
                    'items-center',
                    'justify-center',
                    'z-40',
                    'transition-all',
                    'min-h-10',
                  )}
                >
                  Vista rápida
                </Link>
              </Tooltip>
            )}
            {((isTemp && stageID === 4) || !isTemp) && (
              <Tooltip tooltipContent="Ver anuncio">
                <Link
                  key={`view-${id}`}
                  href={`/car/${id}`}
                  className={cn(
                    'border',
                    'border-primary',
                    'text-primary',
                    'px-2',
                    'py-1',
                    'rounded-sm',
                    'text-xs',
                    'flex',
                    'items-center',
                    'justify-center',
                    'z-40',
                    'transition-all',
                    'min-h-10',
                  )}
                >
                  Conoce más
                </Link>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

const StageBadge = ({ stageID }: { stageID: number }) => {
  if (stageID === 0) return null;

  const classNames: { [key: string]: string } = {
    '1': 'bg-gray-600',
    '2': 'bg-warning',
    '3': 'bg-error',
    '4': 'bg-success',
  };

  const icons: { [key: string]: ReactNode } = {
    '1': <CircleEllipsis className="h-5 w-5" />,
    '2': <CircleAlert className="h-5 w-5" />,
    '3': <CircleX className="h-5 w-5" />,
    '4': <CircleCheck className="h-5 w-5" />,
  };

  return (
    <div
      className={cn(
        classNames[`${stageID}`],
        'absolute',
        'top-1',
        'right-1',
        'text-white',
        'px-2.5',
        'py-1',
        'rounded-2xl',
        'text-sm',
        'font-light',
        'flex',
        'items-center',
        'gap-1',
      )}
    >
      {icons[stageID]}
      {APPROVAL_TRANSLATIONS.find((stage) => stage.id === stageID)?.label}
    </div>
  );
};
