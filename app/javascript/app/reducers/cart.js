import {SET_CART, SET_ITEMS, SET_SHIPPING} from "app/actions/cart";
import Cache from "lib/cache";

export default function cart(state, action) {
  switch(action.type) {
    case SET_CART: {
      const data = action.payload;

      Cache.set("cart", data);

      return {...data};
    }
    case SET_ITEMS: {
      const data = {...state, items: action.payload};

      Cache.set("cart", data);

      return {...data};
    }
    case SET_SHIPPING: {
      const data = {...state, shipping: action.payload};

      Cache.set("cart", data);

      return {...data};
    }
    default:
      return state;
  }
}
