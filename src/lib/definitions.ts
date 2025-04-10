import { CURRENCIES } from '@/lib/NumberFormats';

export interface Car {
  id: number;
  condition: string;
  trim: string;
  model: string;
  make: string;
  price: number;
  currency: CURRENCIES;
  year: number;
  mileage: number;
  mileageType: string;
  thumbnail: string;
  images: string[];
  transType: string;
  fuelType: string;
  bodyName: string;
  driveType: string;
  sellerComment: null;
  approvalStageID: number;
  acctVerified: boolean;
  factorySpecifications: FactorySpecification;
  negotiableTF: boolean;
  allowTradeTF: boolean;
  inspectionMonth: string;
  inspectionYear: string;
  restrictionDay: string;
  comments: string;
  city: string;
  state: string;
  accountData: AccountData;
}

export interface CarImages {
  imgBodyFL: string | null;
  imgBodyFC: string | null;
  imgBodyFR: string | null;
  imgBodyRL: string | null;
  imgBodyRC: string | null;
  imgBodyRR: string | null;
  imgBodySL: string | null;
  imgBodySR: string | null;
  imgInteriorDash: string | null;
  imgInteriorCluster: string | null;
  imgInteriorRadio: string | null;
  imgInteriorSeatF: string | null;
  imgInteriorSeatR: string | null;
  imgInteriorTrunk: string | null;
  imgEngine: string | null;
}

export interface FormCarType {
  id?: number;
  makeId?: number;
  modelId?: number;
  trimId?: number;
  allowTradeTF?: boolean;
  license?: string;
  mileage?: number;
  mileageType?: 'KM' | 'Miles';
  price?: number;
  currency?: CURRENCIES;
  negotiableTF?: boolean;
  year?: number;
  country?: string | null;
  state?: string | null;
  make?: string;
  model?: string;
  trim?: string;
  body?: string;
  condition?: string;
  inspectionYear?: number;
  taxesPaidTF?: boolean;
  engineModifiedTF?: boolean;
  lP_ConversionTF?: boolean;
  approvalStageID?: APPROVAL_STAGE;
  sellerComment?: string | null;
  transType?: string;
  transGearCount?: number;
  fuelType?: string;
  driveType?: string;
  images?: CarImages;
}

export interface AccountData {
  id: number;
  email: string;
  phone: string;
  acctVerified: boolean;
  profileImage: string;
  countryName: string;
  statename: string;
  firstName: string;
  lastName: string;
}

export interface FactorySpecification {
  engine: {
    cubicCentimeters: number;
    cylinderCount: string;
    horsepower: number;
    horsepowerRPM: number;
    torque: number;
    torqueRPM: number;
    valveCount: number;
    camType: string;
    superFuel: string;
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    groundHeight: number;
  };
  economy: {
    mpgCombine: number;
    mpgCity: number;
    mpgHighway: number;
  };
  capacity: {
    doorCount: number;
    seatCount: number;
    curbWeight: number;
    grossWeight: number;
    payloadCap: number;
    towingCap: number;
    cargoCapLiters: number;
    fuelCapLiters: number;
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

export interface UserInfo {
  account: UserProfile;
  counts: ListingCounters;
}

export interface UserProfile {
  id: number;
  acctVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  authID: null | string;
  acctType: number;
  acctTypeName: string;
  idNumber: string;
  profileLogo: string;
  profileHeader: string;
  profileImage: string;
  country: string;
  state: string;
  createdDT: string;
  updatedDT: string;
}

export interface ListingResponse {
  listings: Car[];
  pages: Pages;
}

export interface Pages {
  listings: number;
  pages: number;
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

export enum VERIFICATIONS_TRANSLATIONS {
  identification = 'Identification',
  email = 'Correo Electrónico',
  phone = 'Teléfono',
}

export const currencies_options = [
  {
    label: 'Moneda',
    options: [
      {
        label: CURRENCIES.CRC,
        value: CURRENCIES.CRC,
      },
      {
        label: CURRENCIES.USD,
        value: CURRENCIES.USD,
      },
    ],
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
    label: 'Condición',
    options: [
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
    ],
  },
];

export const milage_options = [
  {
    label: 'Tipo',
    options: [
      {
        label: 'Km',
        value: 'Km',
      },
      {
        label: 'Millas',
        value: 'Millas',
      },
    ],
  },
];

export const transType_options = [
  {
    label: 'Transmisión',
    options: [
      {
        label: 'Sin Transmisión',
        value: 'Sin Transmisión',
      },
      {
        label: 'Automático',
        value: 'Automático',
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
    ],
  },
];

export const transGearCount_options = [
  {
    label: 'Número de Marchas',
    options: [
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
    ],
  },
];

export const fuelType_options = [
  {
    label: 'Tipo de combustible',
    options: [
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
    ],
  },
];

export const driveType_options = [
  {
    label: 'Tipo de Tracción',
    options: [
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
    ],
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

export interface ListResultType {
  label: string;
  value: string | number;
}
