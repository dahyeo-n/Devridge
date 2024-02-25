import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  title: '일하기너무좋은데요',
  content: '이회사너무좋아요',
  nickname: '배달맞점',
  password: 1234,
  createdAt: '2024-02-24',
  location: {
    name: '우아한형제들',
    locationId: '0',
    latLng: {
      lat: 37.516978715488555,
      lng: 127.11259630342774
    }
  }
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {}
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
