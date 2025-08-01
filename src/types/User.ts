import { CURRENCIES } from '@/lib/NumberFormats';
import { APPROVAL_STAGE } from '@/lib/definitions';

export interface UserInfo {
  id?: number;
  acctVerified?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profilePicture?: string;
  identityPicture?: string;
  state?: string;
  createdDT?: string;
  updatedDT?: string;
  approvalStage?: string;
  reviewComment?: string;
  identityVerified?: boolean;
}

export interface UserData {
  inReview?: boolean;
  hasIdentityPicture?: boolean;
  user?: UserInfo;
  userTemp?: UserInfo;
}

export interface UserListing {
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
  approvalStageId?: APPROVAL_STAGE;
  sellerComment?: string | null;
  transType?: string;
  transGearCount?: number;
  fuelType?: string;
  driveType?: string;
  images?: CarImages;
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
