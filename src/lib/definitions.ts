import { CURRENCIES } from '@/lib/NumberFormats';

export interface FactorySpecification {
  engine?: {
    cubicCentimeters?: number;
    cylinderCount?: string;
    horsepower?: number;
    horsepowerRPM?: number;
    torque?: number;
    torqueRPM?: number;
    valveCount?: number;
    camType?: string;
    superFuel?: string;
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    groundHeight?: number;
  };
  economy?: {
    mpgCombine?: number;
    mpgCity?: number;
    mpgHighway?: number;
  };
  capacity?: {
    doorCount?: number;
    seatCount?: number;
    curbWeight?: number;
    grossWeight?: number;
    payloadCap?: number;
    towingCap?: number;
    cargoCapLiters?: number;
    fuelCapLiters?: number;
  };
}

export interface ListingCounters {
  denied: number;
  draft: number;
  review: number;
  pending: number;
  ended: number;
  delete: number;
  published: number;
  total: number;
}

export enum APPROVAL_STAGE {
  DRAFT = 'Draft',
  REVIEW = 'Review',
  DENY = 'Denied',
  PUBLISHED = 'Published',
  DELETED = 'Deleted',
  ENDED = 'Ended',
}

export const currencies_options = [
  {
    label: CURRENCIES.CRC,
    value: CURRENCIES.CRC,
  },
  {
    label: CURRENCIES.USD,
    value: CURRENCIES.USD,
  },
];

export const states_options = [
  {
    label: 'San José',
    value: 'San José',
  },
  {
    label: 'Alajuela',
    value: 'Alajuela',
  },
  {
    label: 'Cartago',
    value: 'Cartago',
  },
  {
    label: 'Heredia',
    value: 'Heredia',
  },
  {
    label: 'Guanacaste',
    value: 'Guanacaste',
  },
  {
    label: 'Puntarenas',
    value: 'Puntarenas',
  },
  {
    label: 'Limón',
    value: 'Limón',
  },
];

export const condition_options = [
  {
    label: 'Excelente',
    value: 'Excelente',
  },
  {
    label: 'Muy Bueno',
    value: 'Muy Bueno',
  },
  {
    label: 'Bueno',
    value: 'Bueno',
  },
  {
    label: 'Regular',
    value: 'Regular',
  },
  {
    label: 'Malo',
    value: 'Malo',
  },
];

export const milage_options = [
  {
    label: 'Km',
    value: 'KM',
  },
  {
    label: 'Millas',
    value: 'MI',
  },
];

export const transType_options = [
  {
    label: 'Sin Transmisión',
    value: 'Sin Transmisión',
  },
  {
    label: 'Automático',
    value: 'Automatico',
  },
  {
    label: 'Semi-Automático',
    value: 'Semi-Automático',
  },
  {
    label: 'Manual',
    value: 'Manual',
  },
  {
    label: 'CVT',
    value: 'CVT',
  },
];

export const transGearCount_options = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
];

export const fuelType_options = [
  {
    label: 'Gasolina',
    value: 'Gasolina',
  },
  {
    label: 'Diesel',
    value: 'Diesel',
  },
  {
    label: 'Híbrido',
    value: 'Híbrido',
  },
  {
    label: 'Eléctrico',
    value: 'Eléctrico',
  },
  {
    label: 'Gas',
    value: 'Gas',
  },
  {
    label: 'Hidrógeno',
    value: 'Hidrógeno',
  },
];

export const driveType_options = [
  {
    label: 'AWD',
    value: 'AWD',
  },
  {
    label: '4WD',
    value: '4WD',
  },
  {
    label: 'FWD',
    value: 'FWD',
  },
  {
    label: 'RWD',
    value: 'RWD',
  },
  {
    label: '6WD',
    value: '6WD',
  },
];

export const APPROVAL_TRANSLATIONS = [
  {
    id: 4,
    label: 'Publicado',
    key: 'published',
  },
  {
    id: 1,
    label: 'Borrador',
    key: 'draft',
  },
  {
    id: 2,
    label: 'Revisión',
    key: 'review',
  },
  {
    id: 3,
    label: 'Denegado',
    key: 'denied',
  },
];
