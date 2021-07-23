import {v4 as createUUID} from "uuid";
import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION
} from "app/actions/notifications";

export default function notifications(state, action) {
  switch(action.type) {
    case CREATE_NOTIFICATION:
      return [
        ...state,
        {
          createdAt: Date.now(),
          id: createUUID(),
          ...action.payload,
          type: action.payload.type || "success"
        }
      ];
    case DELETE_NOTIFICATION:
      return state.filter(({id}) => id !== action.payload.id);
    default:
      return state;
  }
}
