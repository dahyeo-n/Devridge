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
    },
    addReview: (state, action) => {
      state.review.push(action.payload);
    },
    delReview: (state, action) => {
      state.review.filter((item) => item.id !== action.payload.id);
    },
    updateReview: (state, action) => {
      state.review.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    }
  }
});

export const { getReview, addReview, delReview, updateReview } = reviewSlice.actions;

export default reviewSlice.reducer;
