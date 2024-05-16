import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBusinessCard } from '../handleData/handleContentData';

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
      console.log(errors);
      return rejectWithValue(errors);
    }
  }
);
