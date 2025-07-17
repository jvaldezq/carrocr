import { CURRENCIES } from '@/lib/NumberFormats';
import type { CarImages } from './User';

export interface Preview {
  id: number;
  make: string;
  model: string;
  thumbnail: string;
  images: string[];
  year: number;
  price: number;
  currency: CURRENCIES;
  transType: string;
  trim: string;
  condition: string;
  mileage: number;
}

export interface SmallCard {
  id: number;
  thumbnail: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: CURRENCIES;
  acctVerified: boolean;
  transType: string;
  mileage: number;
  trim: string;
  premium: boolean;
}

export interface CatalogAll {
  listings: SmallCard[];
  pages: Pages;
}

export interface Pages {
  listings: number;
  pages: number;
  total: number;
}

export interface ListingDetails {
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
  images: CarImages;
  transType: string;
  fuelType: string;
  bodyName: string;
  driveType: string;
  sellerComment: null;
  factorySpecifications: FactorySpecification;
  inspectionYear: string;
  restrictionDay: string;
  state: string;
  accountData: AccountData;
  allowTradeTF: boolean;
  engineModifiedTF: boolean;
  favCount: number;
  lP_ConversionTF: boolean;
  negotiableTF: boolean;
  taxesPaidTF: boolean;
  transGearCount: number;
  viewCount: number;
  userID: string;
}

export interface AccountData {
  id: number;
  userID: string;
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
