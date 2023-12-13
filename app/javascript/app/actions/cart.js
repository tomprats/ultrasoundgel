export const SET_CART = "SET_CART";
export const SET_ITEMS = "SET_ITEMS";
export const SET_SHIPPING_RATE = "SET_SHIPPING_RATE";
export const SET_SHIPPING_RATES = "SET_SHIPPING_RATES";
export const SET_SHIPPING_RECIPIENT = "SET_SHIPPING_RECIPIENT";

export const setCart = (payload) => ({payload, type: SET_CART});
export const setItems = (payload) => ({payload, type: SET_ITEMS});
export const setShippingRate = (payload) => ({payload, type: SET_SHIPPING_RATE});
export const setShippingRates = (payload) => ({payload, type: SET_SHIPPING_RATES});
export const setShippingRecipient = (payload) => ({payload, type: SET_SHIPPING_RECIPIENT});
