import app from "./app";
import channel from "./channel";
import notifications from "./notifications";
import page from "./page";
import pages from "./pages";
import sections from "./sections";
import user from "./user";

const combineReducers = (reducers) => (
  (state, action) => {
    const newState = {};

    Object.keys(reducers).forEach((key) => {
      newState[key] = reducers[key](state[key], action);
    });

    return newState;
  }
);

export default combineReducers({
  app,
  channel,
  notifications,
  page,
  pages,
  sections,
  user
});
