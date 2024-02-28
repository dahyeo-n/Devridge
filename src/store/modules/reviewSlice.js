import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  review: []
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getReview: (state, action) => {
      state.review = action.payload;
    }
  }
});

export const { getReview } = reviewSlice.actions;

export default reviewSlice.reducer;
