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

export interface BusinessCardListProp {
  id: string;
  cardType: string;
  name: string;
  work: string;
  description: string;
  userPhotoUrl: string;
  userPhotoInformation: string;
  userBgPhotoUrl: string | null;
  userBgPhotoInformation: string | null;
  // 暫時
  finishAllForm: boolean;
  time: string;
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
