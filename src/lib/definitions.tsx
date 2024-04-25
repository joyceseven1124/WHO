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
  description: string | null;
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
  userPhoto: ImageTypeScript;
  userBgPhoto: ImageTypeScript | null;
  // 暫時
  finishAllForm: boolean;
  time: string;
}
