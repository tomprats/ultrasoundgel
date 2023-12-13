import {
  SET_CART,
  SET_ITEMS,
  SET_SHIPPING_RATE,
  SET_SHIPPING_RATES,
  SET_SHIPPING_RECIPIENT
} from "app/actions/cart";
import Cache from "lib/cache";

export default function cart(state, action) {
  switch(action.type) {
    case SET_CART: {
      const data = action.payload;

      Cache.set("cart", data);

      return {...data};
    }
    case SET_ITEMS: {
      const data = {...state, shipping: {...state.shipping}};
      data.items = action.payload;
      data.shipping.rate = null;
      data.shipping.rates = null;

      Cache.set("cart", data);

      return {...data};
    }
    case SET_SHIPPING_RATE: {
      const data = {...state, shipping: {...state.shipping}};
      data.shipping.rate = action.payload;

      Cache.set("cart", data);

      return {...data};
    }
    case SET_SHIPPING_RATES: {
      const data = {...state, shipping: {...state.shipping}};
      data.shipping.rate = null;
      data.shipping.rates = action.payload;

      Cache.set("cart", data);

      return {...data};
    }
    case SET_SHIPPING_RECIPIENT: {
      const data = {...state, shipping: {...state.shipping}};
      data.shipping.recipient = action.payload;

      Cache.set("cart", data);

      return {...data};
    }
    default:
      return state;
  }
}
