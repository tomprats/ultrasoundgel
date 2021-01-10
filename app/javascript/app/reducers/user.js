import {SET_APP} from "app/actions/app";
import {SET_USER} from "app/actions/user";

export default function user(state, action) {
  switch(action.type) {
    case SET_APP: {
      const data = action.payload.user;

      return data ? {...data} : null;
    }
    case SET_USER: {
      const data = action.payload;

      return data ? {...data} : null;
    }
    default:
      return state;
  }
}
