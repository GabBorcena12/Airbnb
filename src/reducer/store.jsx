// store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import wishlistReducer from './wishlistReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer
});

const store = createStore(rootReducer);

export default store;
