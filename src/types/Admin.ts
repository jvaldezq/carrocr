import { CURRENCIES } from '@/lib/NumberFormats';
import { CarImages } from '@/types/User';

export interface PendingAccount {
  id: number;
  firstName: string;
  lastName: string;
}

export interface AccountReview {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture: string;
  identityPicture: string;
}

export interface PendingListing {
  id: number;
  year: number;
  make: string;
}

export interface ListingReview {
  id?: number;
  license?: string;
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  body?: string;
  // TEST
  state?: string | null;
  condition?: string;
  inspectionYear?: number;
  currency?: CURRENCIES;
  taxesPaidTF?: boolean;
  price?: number;
  allowTradeTF?: boolean;
  negotiableTF?: boolean;
  mileage?: number;
  mileageType?: 'KM' | 'Miles';
  transType?: string;
  transGearCount?: number;
  fuelType?: string;
  driveType?: string;
  engineModifiedTF?: boolean;
  lP_ConversionTF?: boolean;
  sellerComment?: string | null;
  images?: CarImages;
  factoryDataTF?: boolean;
}
