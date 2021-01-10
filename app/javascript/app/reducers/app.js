import {SET_APP} from "app/actions/app";

export default function app(state, action) {
  switch(action.type) {
    case SET_APP: {
      const data = action.payload.app || {};

      return {...data};
    }
    default:
      return state;
  }
}
