import axios from 'axios';

const deleteReview = async (id) => await axios.delete(`${process.env.REACT_APP_SERVER_URL}/${id}`);

export { deleteReview };
