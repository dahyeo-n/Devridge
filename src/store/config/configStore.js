import { createStore, combineReducers } from 'redux';
import reviewSlice from '../modules/reviewSlice';

const rootReducer = combineReducers({
  reviewSlice
});

const store = createStore(rootReducer);

export default store;
