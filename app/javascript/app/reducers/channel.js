import {SET_APP} from "app/actions/app";

export default function channel(state, action) {
  switch(action.type) {
    case SET_APP: {
      const data = action.payload.channel;

      return data ? {...data} : null;
    }
    default:
      return state;
  }
}
