import { createStore, combineReducers } from 'redux';
import posts from '../modules/posts';

const rootReducer = combineReducers({
  posts: posts
});

const store = createStore(rootReducer);

export default store;
