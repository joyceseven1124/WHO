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
  // id: string;
  // cardType: string;
  // name: string;
  // work: string;
  // description: string;
  // userPhotoUrl: string;
  // userPhotoInformation: string;
  // userBgPhotoUrl: string | null;
  // userBgPhotoInformation: string | null;
  // // 暫時
  // finishAllForm: boolean;
  // time: string;
  // userPhotoUrl: string;
  // userBgPhotoUrl: string | null;
  // 暫時
  finishAllForm: boolean;
  time: string;
  // userBgPhotoInformation: string; // 修改類型為字符串
}

export type User = {
  id?: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
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
