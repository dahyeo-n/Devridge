import { configureStore } from '@reduxjs/toolkit';

import review from 'store/modules/reviewSlice';

const store = configureStore({
  reducer: { review }
});

export default store;
