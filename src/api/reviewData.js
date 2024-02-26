import axios from 'axios';
export const getReviewData = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
  return response.data;
};
