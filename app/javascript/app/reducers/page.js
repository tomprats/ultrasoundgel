import {SET_PAGE} from "app/actions/page";

export default function page(state, action) {
  switch(action.type) {
    case SET_PAGE: {
      const data = action.payload;

      return {...data};
    }
    default:
      return state;
  }
}
