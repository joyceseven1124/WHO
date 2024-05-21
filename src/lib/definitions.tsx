import { BusinessCardItems } from './feature/businessCardDataSlice';
export interface ImageTypeScript {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface RootCardType {
  time: string;
  name: string;
  work: string;
  description: string;
  userPhoto: string;
  userPhotoAlt: string;
  bgPhoto: string | null;
  bgPhotoAlt: string | null;
}

export interface BusinessCardListProp extends BusinessCardItems {
  finishAllForm: boolean;
  time: string;
}

export type User = {
  id?: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  currentTime?: Date;
};

export type checkAuthType = {
  email: string;
  uid: string;
  authStatus: boolean;
};

export type State = {
  errors?: any;
  message?: string | null | undefined;
  success?: boolean | undefined;
  resultData?: string;
};
