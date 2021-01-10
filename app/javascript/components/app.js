import {useEffect, useReducer} from "react";
import {Context, Reducer} from "app";
import {setApp} from "app/actions/app";
import {get as getApp} from "app/requests/app";
import Router from "components/router";

const initialState = {
  app: {loading: true},
  notifications: [],
  page: {},
  pages: [],
  user: null
};

export default function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    getApp().then((data) => { dispatch(setApp(data)); });
  }, []);

  return (
    <Context.Provider value={[state, dispatch]}>
      <Router />
    </Context.Provider>
  );
}
