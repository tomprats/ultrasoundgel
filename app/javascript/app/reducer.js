import app from "app/reducers/app";
import channel from "app/reducers/channel";
import notifications from "app/reducers/notifications";
import page from "app/reducers/page";
import pages from "app/reducers/pages";
import sections from "app/reducers/sections";
import user from "app/reducers/user";

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
