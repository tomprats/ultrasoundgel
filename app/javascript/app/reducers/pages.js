import {SET_APP} from "app/actions/app";

export default function pages(state, action) {
  switch(action.type) {
    case SET_APP: {
      const data = action.payload.pages;

      return data ? [...data] : [];
    }
    default:
      return state;
  }
}
