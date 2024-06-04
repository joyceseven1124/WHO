import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchViewContent } from '../handleData/fetchContentData';

export const fetchWhoFormThunkById: any = createAsyncThunk(
  'WhoForm/fetchViewForm',
  async (email: string, { rejectWithValue }) => {
    try {
      if (email) {
        const response = await fetchViewContent(email);
        return response;
      } else {
        return null;
      }
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);
