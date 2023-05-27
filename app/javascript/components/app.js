import {useEffect, useMemo, useReducer} from "react";
import {setApp} from "app/actions/app";
import Context from "app/context";
import Reducer from "app/reducer";
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
  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  useEffect(() => {
    getApp().then((data) => { dispatch(setApp(data)); });
  }, []);

  return (
    <Context.Provider value={value}>
      <Router />
    </Context.Provider>
  );
}
