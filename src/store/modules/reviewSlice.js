import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //FIXME - 최종본에서 삭제
  userId: '1',
  title: '너무좋습니다.',
  content: '이회사일하기가너무좋아요',
  nickname: '스파르탄',
  password: 1241,
  createdAt: '2024-02-25',
  location: {
    name: '팀스파르타',
    locationId: '1',
    latLng: {
      lat: 37.50232863613739,
      lng: 127.04444701396942
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
