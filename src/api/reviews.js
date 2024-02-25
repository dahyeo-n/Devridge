// reviews.js :  reviews관련 데이터를 불러오는  api를 관리할 파일
import axios from 'axios';
export const getReview = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
  return response.data;
};
