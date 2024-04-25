import { ImageTypeScript } from '@/src/lib/definitions';
import type { RootState } from '@/src/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type BusinessCardItems = {
  id: string;
  cardType: string;
  name: string;
  work: string;
  description: string;
  userPhoto: null | ImageTypeScript;
  userBgPhoto: null | ImageTypeScript;
  submitStatus: boolean;
  [key: string]: null | ImageTypeScript | string | boolean;
};

export type BusinessCardData = {
  data: BusinessCardItems;
};

const initialState: BusinessCardData = {
  data: {
    id: '',
    cardType: '',
    name: '',
    work: '',
    description: '',
    userPhoto: null,
    userBgPhoto: null,
    submitStatus: false,
  },
};

export const businessCardDataSlice = createSlice({
  name: 'editCard',
  initialState,
  reducers: {
    editCardData: (
      state,
      action: PayloadAction<Partial<BusinessCardItems>>
    ) => {
      state.data = { ...state.data, ...(action.payload as BusinessCardItems) };
    },
  },
});

export const { editCardData } = businessCardDataSlice.actions;

export const selectCardData = (state: RootState) => state.CardData.data;

export default businessCardDataSlice.reducer;
