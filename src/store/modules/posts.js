const ADD_POST = 'posts/ADD_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const INIT = 'posts/INIT';

const initialState = [];

export const addPost = (payload) => {
  return {
    type: ADD_POST,
    payload
  };
};

export const updatePost = (payload) => {
  return {
    type: UPDATE_POST,
    payload
  };
};

export const deletePost = (payload) => {
  return {
    type: DELETE_POST,
    payload
  };
};

export const init = (payload) => {
  return {
    type: INIT,
    payload
  };
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.payload];
    case UPDATE_POST: {
      const id = action.payload.id;
      const updatedData = action.payload.updatedData;

      return state.map((post) => {
        if (post.id === id) {
          return { ...post, ...updatedData };
        } else {
          return post;
        }
      });
    }
    case DELETE_POST:
      return state.filter(function (item) {
        return item.id !== action.payload;
      });
    case INIT:
      return action.payload;
    default:
      return state;
  }
};

export default posts;
