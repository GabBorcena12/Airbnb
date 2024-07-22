// actions.js
import { ADD_TO_CART, REMOVE_FROM_CART, LOGOUT_USER, LOGIN_USER, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './actionType.jsx';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId
});

export const addToWishhlist = (item) => ({
  type: ADD_TO_WISHLIST,
  payload: item
});

export const removeFromWishtlist = (itemId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: itemId
});


export const loginUser = (userData) => ({
  type: LOGIN_USER,
  payload: userData
});

export const logoutUser = (userData) => ({
  type: LOGOUT_USER,
  payload: userData
});
