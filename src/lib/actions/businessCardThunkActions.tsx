import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBusinessCard } from '../handleData/fetchContentData';

export const fetchBusinessCardThunkById: any = createAsyncThunk(
  'businessCard/fetchBusinessCardData',
  async (email: string, { rejectWithValue }) => {
    try {
      if (email) {
        const response = await fetchBusinessCard(email);
        return response;
      } else {
        return null;
      }
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);
