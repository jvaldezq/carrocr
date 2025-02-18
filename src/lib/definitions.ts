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

export interface AccountData {
  id: number;
  acctFullName: string;
  email: string;
  phone: string;
  acctVerified: boolean;
  picture: string;
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

export enum APPROVAL_STAGE {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  DENY = 'DENY',
  PUBLISHED = 'PUBLISHED',
}

export enum VERIFICATIONS_TRANSLATIONS {
  identification = 'Identification',
  email = 'Correo Electrónico',
  phone = 'Teléfono',
}
