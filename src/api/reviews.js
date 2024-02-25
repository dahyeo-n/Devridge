import axios from 'axios';

const deleteReview = async (id) => await axios.delete(`${process.env.REACT_APP_SERVER_URL}/${id}`); //NOTE - 튜터님한테 물어보기

export { deleteReview };
