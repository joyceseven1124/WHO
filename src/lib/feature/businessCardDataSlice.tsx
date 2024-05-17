import { ImageTypeScript } from '@/src/lib/definitions';
import type { RootState } from '@/src/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBusinessCardThunkById } from '../actions/businessCardThunkActions';

export interface BusinessCardItems {
  id: string;
  cardType: string;
  name: string;
  work: string;
  description: string;
  userPhoto: null | ImageTypeScript;
  userPhotoInformation: string;
  userBgPhoto: null | ImageTypeScript;
  userBgPhotoInformation: string | null;
  submitStatus: boolean;
  userPhotoUrl: string;
  userBgPhotoUrl: string;
  [key: string]: null | ImageTypeScript | string | boolean;
}

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
    userPhotoInformation: '',
    userBgPhoto: null,
    userBgPhotoInformation: '',
    submitStatus: false,
    userPhotoUrl: '',
    userBgPhotoUrl: '',
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessCardThunkById.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload.data;
        } else {
          state.data = {
            id: '',
            cardType: '',
            name: '',
            work: '',
            description: '',
            userPhoto: null,
            userPhotoInformation: '',
            userBgPhoto: null,
            userBgPhotoInformation: '',
            submitStatus: false,
            userPhotoUrl: '',
            userBgPhotoUrl: '',
          };
        }
      })
      .addCase(fetchBusinessCardThunkById.rejected, (state, action) => {
        console.log('錯誤thunk');
      });
  },
});

export const { editCardData } = businessCardDataSlice.actions;

export const selectCardData = (state: RootState) => state.CardData.data;

export default businessCardDataSlice.reducer;
