export const SET_CART = "SET_CART";
export const SET_ITEMS = "SET_ITEMS";
export const SET_SHIPPING = "SET_SHIPPING";

export const setCart = (payload) => ({payload, type: SET_CART});
export const setItems = (payload) => ({payload, type: SET_ITEMS});
export const setShipping = (payload) => ({payload, type: SET_SHIPPING});
