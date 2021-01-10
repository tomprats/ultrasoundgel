import {SET_APP} from "app/actions/app";

export default function sections(state, action) {
  switch(action.type) {
    case SET_APP: {
      const data = action.payload.sections;

      return data ? [...data] : null;
    }
    default:
      return state;
  }
}
