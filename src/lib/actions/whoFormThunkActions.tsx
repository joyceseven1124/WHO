import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchViewContent } from '../handleData/handleContentData';

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
      console.log(errors);
      return rejectWithValue(errors);
    }
  }
);
